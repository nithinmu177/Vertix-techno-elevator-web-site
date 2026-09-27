import { NextRequest, NextResponse } from "next/server";

const privatePaths = ["/admin", "/profile", "/login", "/register", "/forgot-password", "/reset-password"];
const localOrigins = process.env.NODE_ENV === "production" ? [] : ["http://localhost:3000", "http://localhost:3001"];
const rateLimitWindowMs = 60_000;
const rateLimitMaxRequests = Number(process.env.API_RATE_LIMIT_PER_MINUTE || 120);

type RateLimitEntry = { count: number; resetAt: number };
const rateLimitStore = new Map<string, RateLimitEntry>();

function configuredOrigins() {
  return [
    process.env.FRONTEND_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    ...(process.env.CORS_ALLOWED_ORIGINS?.split(",") ?? []),
    ...localOrigins
  ]
    .filter(Boolean)
    .map((origin) => origin!.trim().replace(/\/$/, ""))
    .filter(Boolean);
}

function isOriginAllowed(origin: string, request: NextRequest): boolean {
  if (!origin) return true;
  const cleanOrigin = origin.trim().replace(/\/$/, "");

  // 1. Same-origin match with request URL
  if (cleanOrigin === request.nextUrl.origin.replace(/\/$/, "")) {
    return true;
  }

  // 2. Match with Host header
  const host = request.headers.get("host");
  if (host && (cleanOrigin === `https://${host}` || cleanOrigin === `http://${host}`)) {
    return true;
  }

  // 3. Render cloud domains
  try {
    const url = new URL(cleanOrigin);
    if (url.hostname.endsWith(".onrender.com") || url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return true;
    }
  } catch {}

  // 4. Configured origins from environment
  const allowed = configuredOrigins();
  return allowed.some((allowedOrigin) => cleanOrigin === allowedOrigin);
}

function getClientKey(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function rateLimit(request: NextRequest) {
  const key = `${getClientKey(request)}:${request.nextUrl.pathname}`;
  const now = Date.now();
  const current = rateLimitStore.get(key);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }
  current.count += 1;
  return current.count > rateLimitMaxRequests;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const origin = request.headers.get("origin") || "";

  const isAllowedOrigin = isOriginAllowed(origin, request);

  // Handle preflight OPTIONS requests for API routes
  if (request.method === "OPTIONS" && pathname.startsWith("/api/")) {
    const preflightResponse = new NextResponse(null, { status: 204 });
    if (origin && isAllowedOrigin) {
      preflightResponse.headers.set("Access-Control-Allow-Origin", origin);
      preflightResponse.headers.set("Access-Control-Allow-Credentials", "true");
      preflightResponse.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
      preflightResponse.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");
      preflightResponse.headers.set("Access-Control-Max-Age", "86400");
    }
    return preflightResponse;
  }

  if (pathname.startsWith("/api/") && !isAllowedOrigin) {
    return NextResponse.json({ error: "Origin is not allowed." }, { status: 403 });
  }

  if (pathname.startsWith("/api/") && rateLimit(request)) {
    const response = NextResponse.json({ error: "Too many requests." }, { status: 429 });
    response.headers.set("Retry-After", String(rateLimitWindowMs / 1000));
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return response;
  }

  const response = NextResponse.next();

  // Attach CORS headers for API requests
  if (pathname.startsWith("/api/")) {
    if (origin && isAllowedOrigin) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Credentials", "true");
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");
    }
    // Block search crawlers from indexing API endpoints
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  } else if (privatePaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    // Block search crawlers from indexing admin, auth, and private pages
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
