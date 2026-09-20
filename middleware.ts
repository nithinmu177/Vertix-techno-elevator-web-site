import { NextRequest, NextResponse } from "next/server";

const privatePaths = ["/admin", "/profile", "/login", "/register", "/forgot-password", "/reset-password"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const origin = request.headers.get("origin") || "";

  // Dynamic CORS origin verification
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    "http://localhost:3000",
    "http://localhost:3001"
  ].filter(Boolean) as string[];

  const isAllowedOrigin =
    !origin ||
    allowedOrigins.some((allowed) => allowed && origin === allowed.replace(/\/$/, "")) ||
    origin.endsWith(".onrender.com") ||
    origin.endsWith(".github.io");

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