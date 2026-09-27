import { prisma } from "../lib/db/prisma";
import fs from "fs";
import path from "path";

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
    const vids = p.media.filter((pm) => pm.media.type === "VIDEO");
    let totalVidSize = 0;
    for (const v of vids) {
      const pth = path.join(process.cwd(), "public", v.media.url);
      if (fs.existsSync(pth)) {
        totalVidSize += fs.statSync(pth).size;
      }
    }
    console.log(`${p.slug}: ${vids.length} videos, ${(totalVidSize / (1024 * 1024)).toFixed(2)} MB`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
