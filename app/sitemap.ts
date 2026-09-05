import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  return ["", "/about", "/products", "/services", "/projects", "/about/technology", "/about/safety", "/blog", "/faq", "/contact", "/quote"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date()
  }));
}
