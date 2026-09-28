import type { MetadataRoute } from "next";
import { getProducts, getProjects, getPosts } from "@/lib/data";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://vertix-techno-elevator-web-site.onrender.com").replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // 1. Real static public pages that exist in the website
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`,                  lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/about`,            lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about/technology`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about/safety`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about/quality`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/products`,         lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${SITE_URL}/services`,         lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/projects`,         lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${SITE_URL}/blog`,             lastModified: now, changeFrequency: "weekly",  priority: 0.75 },
    { url: `${SITE_URL}/faq`,              lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`,          lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/quote`,            lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/terms`,            lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/privacy`,          lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/cookies`,          lastModified: now, changeFrequency: "yearly",  priority: 0.3 }
  ];

  try {
    const [products, projects, posts] = await Promise.all([
      getProducts(),
      getProjects(),
      getPosts()
    ]);

    // 2. Real dynamic product pages: /products/[slug]
    const productRoutes: MetadataRoute.Sitemap = (products as any[])
      .filter((p) => p && p.slug && (p.status === "PUBLISHED" || !p.status))
      .map((p) => ({
        url: `${SITE_URL}/products/${encodeURIComponent(p.slug)}`,
        lastModified: new Date(p.updatedAt || now),
        changeFrequency: "monthly" as const,
        priority: 0.9
      }));

    // 3. Real dynamic project pages: /projects/[slug]
    const projectRoutes: MetadataRoute.Sitemap = (projects as any[])
      .filter((p) => p && p.slug && (p.status === "PUBLISHED" || !p.status))
      .map((p) => ({
        url: `${SITE_URL}/projects/${encodeURIComponent(p.slug)}`,
        lastModified: new Date(p.updatedAt || now),
        changeFrequency: "monthly" as const,
        priority: 0.85
      }));

    // 4. Real dynamic blog post pages: /blog/[slug]
    const postRoutes: MetadataRoute.Sitemap = (posts as any[])
      .filter((p) => p && p.slug && (p.status === "PUBLISHED" || !p.status))
      .map((p) => ({
        url: `${SITE_URL}/blog/${encodeURIComponent(p.slug)}`,
        lastModified: new Date(p.publishedAt || p.updatedAt || now),
        changeFrequency: "monthly" as const,
        priority: 0.7
      }));

    return [...staticRoutes, ...productRoutes, ...projectRoutes, ...postRoutes];
  } catch {
    // If DB is temporarily unavailable, always return the valid static routes
    return staticRoutes;
  }
}

