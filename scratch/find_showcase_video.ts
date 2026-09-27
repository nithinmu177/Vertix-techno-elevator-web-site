import { prisma } from "../lib/db/prisma";

async function main() {
  // Find the original video used in video-showcase-modal.tsx
  // original filename was: 1789547309580-d2573b19337303eb.mp4
  const showcaseVideo = await prisma.media.findFirst({
    where: { url: { contains: "1789547309580-d2573b19337303eb" } }
  });
  console.log("Showcase video URL:", showcaseVideo?.url);

  // Also check summary stats
  const remaining = await prisma.media.count({ where: { url: { startsWith: "/uploads/" } } });
  const cloudCount = await prisma.media.count({ where: { url: { contains: "cloudinary" } } });
  console.log(`\n✅ Migration complete!\n  /uploads/ remaining: ${remaining}\n  On Cloudinary: ${cloudCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
