import type { MetadataRoute } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://vertix-techno-elevator-web-site.onrender.com").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all search engines to crawl all public pages
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
      }
    ],
    // Sitemap URL — tells Google exactly where to find all pages
    sitemap: `${SITE_URL}/sitemap.xml`,
    // Host declaration helps Google identify the canonical domain
    host: SITE_URL
  };
}
