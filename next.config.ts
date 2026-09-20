import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
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
  }
};

export default nextConfig;
