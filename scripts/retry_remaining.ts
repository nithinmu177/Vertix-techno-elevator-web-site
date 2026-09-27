import { v2 as cloudinary } from "cloudinary";
import { prisma } from "../lib/db/prisma";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "tt4rgc2n",
  api_key: process.env.CLOUDINARY_API_KEY || "952851658953269",
  api_secret: process.env.CLOUDINARY_API_SECRET || "4fCKFrUIUPPez9bVNQ45-p9KB-I",
  secure: true
});

async function main() {
  const remaining = await prisma.media.findMany({
    where: { url: { startsWith: "/uploads/" } }
  });

  if (remaining.length === 0) {
    console.log("✅ All media already migrated to Cloudinary!");
    return;
  }

  console.log(`Found ${remaining.length} item(s) still needing migration.`);

  for (const item of remaining) {
    const localPath = path.join(process.cwd(), "public", item.url);
    const isVideo = item.type === "VIDEO" || item.url.endsWith(".mp4");

    if (!fs.existsSync(localPath)) {
      console.error(`❌ File not found: ${localPath}`);
      continue;
    }

    const sizeMB = (fs.statSync(localPath).size / (1024 * 1024)).toFixed(2);
    console.log(`Uploading ${isVideo ? "VIDEO" : "IMAGE"} (${sizeMB} MB): ${path.basename(localPath)}...`);

    let retries = 3;
    let lastError: any = null;

    while (retries > 0) {
      try {
        const result = await cloudinary.uploader.upload(localPath, {
          folder: "vertix-elevators",
          resource_type: isVideo ? "video" : "image",
          use_filename: true,
          unique_filename: true
        });

        await prisma.media.update({
          where: { id: item.id },
          data: { url: result.secure_url }
        });

        console.log(`✅ Synced: ${result.secure_url}`);
        lastError = null;
        break;
      } catch (err: any) {
        lastError = err;
        retries--;
        if (retries > 0) {
          console.warn(`  Retry ${3 - retries}/3 after error: ${err.message ?? err}`);
          await new Promise((r) => setTimeout(r, 3000));
        }
      }
    }

    if (lastError) {
      console.error(`❌ Failed after retries: ${lastError.message ?? lastError}`);
    }
  }

  const stillRemaining = await prisma.media.count({ where: { url: { startsWith: "/uploads/" } } });
  const cloudCount = await prisma.media.count({ where: { url: { contains: "cloudinary" } } });
  console.log(`\n=== Final State ===`);
  console.log(`Still at /uploads/: ${stillRemaining}`);
  console.log(`On Cloudinary: ${cloudCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
