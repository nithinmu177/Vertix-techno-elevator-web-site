import { prisma } from "../lib/db/prisma";

async function main() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
    select: {
      id: true,
      type: true,
      originalName: true,
      title: true,
      url: true,
      createdAt: true
    }
  });

  console.log("=== RECENT 30 MEDIA IN DB ===");
  media.forEach((m, idx) => {
    console.log(`[${idx + 1}] ID: ${m.id} | Type: ${m.type} | Name: ${m.originalName || m.title} | Created: ${m.createdAt.toISOString()} | URL: ${m.url.substring(0, 70)}...`);
  });

  const projects = await prisma.project.findMany({
    include: {
      media: {
        include: { media: true }
      }
    }
  });
  console.log("\n=== PROJECTS IN DB ===");
  projects.forEach((p) => {
    console.log(`- Project: ${p.name} (ID: ${p.id}, Slug: ${p.slug}) | Media count: ${p.media.length}`);
    p.media.forEach((pm) => console.log(`    Media: ${pm.media.originalName || pm.media.title} (${pm.media.type})`));
  });

  const products = await prisma.product.findMany({
    include: {
      media: {
        include: { media: true }
      }
    }
  });
  console.log("\n=== PRODUCTS IN DB ===");
  products.forEach((p) => {
    console.log(`- Product: ${p.name} (ID: ${p.id}, Slug: ${p.slug}) | Media count: ${p.media.length}`);
    p.media.forEach((pm) => console.log(`    Media: ${pm.media.originalName || pm.media.title} (${pm.media.type})`));
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
