import type { NextRequest } from "next/server";
import { handlers } from "@/lib/auth/auth";

function isSelfUrl(backendUrl: string, request: NextRequest) {
	const normalizeHost = (value: string) => value.replace(/^https?:\/\//, "").replace(/\/$/, "").toLowerCase();

	if (backendUrl === request.nextUrl.origin) return true;

	// Behind a reverse proxy (Render, Vercel, etc.) request.nextUrl.origin is the
	// internal address (e.g. http://localhost:10000), so compare hosts instead to
	// avoid proxying a request back to this same server (which causes an
	// infinite loop / HTTP 508).
	const backendHost = normalizeHost(backendUrl);
	const forwardedHost = normalizeHost(request.headers.get("x-forwarded-host") || "");
	const hostHeader = normalizeHost(request.headers.get("host") || "");
	const requestOrigin = normalizeHost(request.nextUrl.origin);

	return [forwardedHost, hostHeader, requestOrigin].filter(Boolean).includes(backendHost);
}

async function proxyToBackend(request: NextRequest, fallback: (request: NextRequest) => Promise<Response>) {
	const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
	if (!backendUrl || isSelfUrl(backendUrl, request)) return fallback(request);

	const requestUrl = new URL(request.url);
	const targetUrl = `${backendUrl}${requestUrl.pathname}${requestUrl.search}`;
	const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer();
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 15000);
	let response: Response;
	try {
		response = await fetch(targetUrl, {
			method: request.method,
			headers: request.headers,
			body,
			redirect: "manual",
			signal: controller.signal
		});
	} catch {
		return new Response(JSON.stringify({ error: "Authentication service unavailable." }), {
			status: 503,
			headers: { "Content-Type": "application/json" }
		});
	} finally {
		clearTimeout(timeout);
	}

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: response.headers
	});
}

export function GET(request: NextRequest) {
	return proxyToBackend(request, handlers.GET);
}

export function POST(request: NextRequest) {
	return proxyToBackend(request, handlers.POST);
}
