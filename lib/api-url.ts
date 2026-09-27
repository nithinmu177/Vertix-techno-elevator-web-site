export function apiUrl(path: string) {
  let baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

  // When loaded in a public production browser, ensure we never call localhost
  if (typeof window !== "undefined") {
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (!isLocal && (baseUrl?.includes("localhost") || baseUrl?.includes("127.0.0.1"))) {
      baseUrl = "";
    }
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return baseUrl ? `${baseUrl}${cleanPath}` : cleanPath;
}