import type { NextRequest } from "next/server";
import { handlers } from "@/lib/auth/auth";

async function proxyToBackend(request: NextRequest, fallback: (request: NextRequest) => Promise<Response>) {
	const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
	if (!backendUrl) return fallback(request);

	const requestUrl = new URL(request.url);
	const targetUrl = `${backendUrl}${requestUrl.pathname}${requestUrl.search}`;
	const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer();
	const response = await fetch(targetUrl, {
		method: request.method,
		headers: request.headers,
		body,
		redirect: "manual"
	});

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
