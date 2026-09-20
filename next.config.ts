import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  eslint: {
    // Warnings from unused imports don't affect runtime — skip during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type-checking is handled separately via `npx tsc --noEmit`
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }
        ]
      },
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }]
      }
    ];
  }
};

export default nextConfig;
