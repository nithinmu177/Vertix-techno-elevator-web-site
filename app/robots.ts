import type { MetadataRoute } from "next";

const CANONICAL_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://vertix-techno-elevator-web-site.onrender.com").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all legitimate crawlers to index public pages, CSS, JS, and assets
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/profile",
          "/profile/",
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/api/"
        ]
      },
      {
        // Block known bad bots that ignore robots.txt selectively
        userAgent: "AhrefsBot",
        disallow: ["/"]
      },
      {
        userAgent: "SemrushBot",
        disallow: ["/"]
      }
    ],
    sitemap: `${CANONICAL_URL}/sitemap.xml`,
    host: CANONICAL_URL
  };
}

