import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  eslint: {
    // Warnings from unused imports don't affect runtime — skip during build
    ignoreDuringBuilds: true
  },
  typescript: {
    // Type-checking is handled separately via `npx tsc --noEmit`
    ignoreBuildErrors: false
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" }
    ]
  },
  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    const siteUrl = "https://www.vertix-techno-elevator.com";

    // Content-Security-Policy — controls where scripts, images, and media are loaded from
    const csp = [
      `default-src 'self'`,
      `script-src 'self' 'unsafe-inline' 'unsafe-eval'`, // unsafe-inline/eval required by Next.js
      `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
      `font-src 'self' https://fonts.gstatic.com data:`,
      `img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com${isDev ? " http://localhost:*" : ""}`,
      `media-src 'self' blob: https://res.cloudinary.com`,
      `connect-src 'self' https://api.cloudinary.com https://res.cloudinary.com${isDev ? " http://localhost:* ws://localhost:*" : " " + siteUrl}`,
      `frame-ancestors 'none'`,
      `form-action 'self'`,
      `base-uri 'self'`,
      `object-src 'none'`
    ].join("; ");

    return [
      {
        // Security headers applied to all pages
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          { key: "Content-Security-Policy", value: csp }
        ]
      },
      {
        // Prevent caching of API responses
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, no-cache, must-revalidate" }]
      }
    ];
  }
};

export default nextConfig;
