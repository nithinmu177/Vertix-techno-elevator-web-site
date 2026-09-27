import { prisma } from "../lib/db/prisma";

async function main() {
  const projects = await prisma.project.findMany({
    include: {
      media: {
        include: {
          media: true
        }
      }
    }
  });

  for (const p of projects) {
    console.log(`Project: ${p.name} (slug: ${p.slug})`);
    console.log(`Total media: ${p.media.length}`);
    const vids = p.media.filter((pm) => pm.media.type === "VIDEO");
    const imgs = p.media.filter((pm) => pm.media.type === "IMAGE");
    console.log(`  - Images: ${imgs.length}`);
    console.log(`  - Videos: ${vids.length}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
