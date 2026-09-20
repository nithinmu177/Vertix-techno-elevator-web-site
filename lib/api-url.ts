export function apiUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  return baseUrl ? `${baseUrl}${path}` : path;
}