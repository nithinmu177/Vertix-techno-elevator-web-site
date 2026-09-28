import type { MetadataRoute } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://vertix-techno-elevator-web-site.onrender.com").replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
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
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}


