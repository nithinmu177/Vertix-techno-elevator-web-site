import type { MetadataRoute } from "next";
import { getProducts, getProjects, getPosts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "https://vertix-techno-elevator.onrender.com").replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/about/technology",
    "/about/safety",
    "/about/quality",
    "/products",
    "/services",
    "/projects",
    "/blog",
    "/faq",
    "/contact",
    "/quote",
    "/terms",
    "/privacy",
    "/cookies"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1.0 : 0.8
  }));

  try {
    const [products, projects, posts] = await Promise.all([
      getProducts(),
      getProjects(),
      getPosts()
    ]);

    const productRoutes: MetadataRoute.Sitemap = products.map((p: any) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: new Date(p.updatedAt || Date.now()),
      changeFrequency: "monthly",
      priority: 0.9
    }));

    const projectRoutes: MetadataRoute.Sitemap = projects.map((p: any) => ({
      url: `${baseUrl}/projects/${p.slug}`,
      lastModified: new Date(p.updatedAt || Date.now()),
      changeFrequency: "monthly",
      priority: 0.85
    }));

    const postRoutes: MetadataRoute.Sitemap = posts.map((p: any) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt || Date.now()),
      changeFrequency: "monthly",
      priority: 0.7
    }));

    return [...staticRoutes, ...productRoutes, ...projectRoutes, ...postRoutes];
  } catch {
    return staticRoutes;
  }
}
