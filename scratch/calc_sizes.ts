import { prisma } from "../lib/db/prisma";
import fs from "fs";
import path from "path";

async function main() {
  const media = await prisma.media.findMany();
  let imgBytes = 0;
  let vidBytes = 0;

  for (const m of media) {
    if (m.url.startsWith("/uploads/")) {
      const localPath = path.join(process.cwd(), "public", m.url);
      if (fs.existsSync(localPath)) {
        const stat = fs.statSync(localPath);
        if (m.type === "VIDEO") vidBytes += stat.size;
        else imgBytes += stat.size;
      }
    }
  }

  console.log({
    imagesCount: 59,
    imagesSizeMB: (imgBytes / (1024 * 1024)).toFixed(2) + " MB",
    videosCount: 121,
    videosSizeMB: (vidBytes / (1024 * 1024)).toFixed(2) + " MB"
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
