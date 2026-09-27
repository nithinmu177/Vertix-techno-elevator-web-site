import { prisma } from "../lib/db/prisma";

async function main() {
  const remaining = await prisma.media.findMany({
    where: { url: { startsWith: "/uploads/" } },
    select: { id: true, url: true, type: true }
  });
  console.log("Remaining /uploads/ items:", remaining.length);
  remaining.forEach((m) => console.log(" -", m.type, m.url));

  const cloudCount = await prisma.media.count({ where: { url: { contains: "cloudinary" } } });
  console.log("Total on Cloudinary in DB:", cloudCount);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
