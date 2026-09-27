import { prisma } from "../lib/db/prisma";
import fs from "fs";
import path from "path";

async function main() {
  const media = await prisma.media.findMany();
  let existingFiles = 0;
  let missingFiles = 0;
  let images = 0;
  let videos = 0;

  for (const m of media) {
    if (m.url.startsWith("/uploads/")) {
      const localPath = path.join(process.cwd(), "public", m.url);
      if (fs.existsSync(localPath)) {
        existingFiles++;
        const stat = fs.statSync(localPath);
        if (m.type === "VIDEO") videos++;
        else images++;
      } else {
        missingFiles++;
      }
    }
  }

  console.log({ existingFiles, missingFiles, images, videos });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
