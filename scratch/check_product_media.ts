import { prisma } from "../lib/db/prisma";

async function main() {
  const products = await prisma.product.findMany({
    include: {
      media: {
        include: {
          media: true
        }
      }
    }
  });

  for (const p of products) {
    console.log(`Product: ${p.name} (slug: ${p.slug})`);
    console.log(`Total media: ${p.media.length}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
