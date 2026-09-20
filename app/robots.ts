import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "https://vertix-techno-elevator.onrender.com").replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/about/*", "/products", "/products/*", "/services", "/projects", "/projects/*", "/blog", "/blog/*", "/faq", "/contact", "/quote", "/terms", "/privacy", "/cookies"],
        disallow: ["/admin", "/admin/*", "/profile", "/profile/*", "/login", "/register", "/forgot-password", "/reset-password", "/api/*"]
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
