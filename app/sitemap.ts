import type { MetadataRoute } from "next";
import { getProducts, getProjects, getPosts, getServices } from "@/lib/data";

const CANONICAL_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://vertix-techno-elevator.onrender.com").replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static public pages with appropriate SEO priorities
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${CANONICAL_URL}`,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${CANONICAL_URL}/about`,              lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${CANONICAL_URL}/about/technology`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${CANONICAL_URL}/about/safety`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${CANONICAL_URL}/about/quality`,      lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${CANONICAL_URL}/products`,           lastModified: now, changeFrequency: "weekly",  priority: 0.95 },
    { url: `${CANONICAL_URL}/services`,           lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${CANONICAL_URL}/projects`,           lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${CANONICAL_URL}/blog`,               lastModified: now, changeFrequency: "weekly",  priority: 0.75 },
    { url: `${CANONICAL_URL}/faq`,                lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${CANONICAL_URL}/contact`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${CANONICAL_URL}/quote`,              lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${CANONICAL_URL}/terms`,              lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${CANONICAL_URL}/privacy`,            lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${CANONICAL_URL}/cookies`,            lastModified: now, changeFrequency: "yearly",  priority: 0.3 }
  ];

  try {
    const [products, projects, posts, services] = await Promise.all([
      getProducts(),
      getProjects(),
      getPosts(),
      getServices()
    ]);

    const productRoutes: MetadataRoute.Sitemap = (products as any[])
      .filter((p) => p.status === "PUBLISHED" || !p.status)
      .map((p) => ({
        url: `${CANONICAL_URL}/products/${p.slug}`,
        lastModified: new Date(p.updatedAt || now),
        changeFrequency: "monthly" as const,
        priority: 0.9
      }));

    const projectRoutes: MetadataRoute.Sitemap = (projects as any[])
      .filter((p) => p.status === "PUBLISHED" || !p.status)
      .map((p) => ({
        url: `${CANONICAL_URL}/projects/${p.slug}`,
        lastModified: new Date(p.updatedAt || now),
        changeFrequency: "monthly" as const,
        priority: 0.85
      }));

    const postRoutes: MetadataRoute.Sitemap = (posts as any[])
      .filter((p) => p.status === "PUBLISHED" || !p.status)
      .map((p) => ({
        url: `${CANONICAL_URL}/blog/${p.slug}`,
        lastModified: new Date(p.publishedAt || p.updatedAt || now),
        changeFrequency: "monthly" as const,
        priority: 0.7
      }));

    const serviceRoutes: MetadataRoute.Sitemap = (services as any[])
      .filter((s) => s.status === "PUBLISHED" || !s.status)
      .filter((s) => s.slug)
      .map((s) => ({
        url: `${CANONICAL_URL}/services/${s.slug}`,
        lastModified: new Date(s.updatedAt || now),
        changeFrequency: "monthly" as const,
        priority: 0.8
      }));

    return [...staticRoutes, ...productRoutes, ...projectRoutes, ...postRoutes, ...serviceRoutes];
  } catch {
    // Fallback to static routes if DB is unavailable at build time
    return staticRoutes;
  }
}

