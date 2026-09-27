import { prisma } from "../lib/db/prisma";

async function main() {
  const media = await prisma.media.findMany({
    where: {
      url: { contains: "cloudinary" }
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      type: true,
      originalName: true,
      url: true,
      size: true,
      mimeType: true,
      createdAt: true
    }
  });

  console.log(`Found ${media.length} Cloudinary media items in DB:`);
  media.forEach((m, i) => {
    console.log(`${i + 1}. [${m.type}] ID: ${m.id} | Name: ${m.originalName} | Size: ${(m.size / (1024 * 1024)).toFixed(2)} MB | URL: ${m.url}`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
