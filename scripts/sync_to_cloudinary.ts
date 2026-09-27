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

async function uploadFile(filePath: string, isVideo: boolean) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "vertix-elevators",
    resource_type: isVideo ? "video" : "image",
    use_filename: true,
    unique_filename: true
  });
  return result.secure_url;
}

async function main() {
  console.log("=== Starting Cloudinary Media Migration ===");
  const mediaItems = await prisma.media.findMany({
    where: {
      url: {
        startsWith: "/uploads/"
      }
    }
  });

  console.log(`Found ${mediaItems.length} media items with /uploads/ URLs in database.`);

  // Sort images first so visual thumbnails and project galleries appear immediately
  mediaItems.sort((a, b) => {
    const aIsVid = a.type === "VIDEO" || a.url.endsWith(".mp4");
    const bIsVid = b.type === "VIDEO" || b.url.endsWith(".mp4");
    if (!aIsVid && bIsVid) return -1;
    if (aIsVid && !bIsVid) return 1;
    return 0;
  });

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < mediaItems.length; i++) {
    const item = mediaItems[i];
    const localPath = path.join(process.cwd(), "public", item.url);
    const isVideo = item.type === "VIDEO" || item.url.endsWith(".mp4") || item.url.endsWith(".webm");

    if (!fs.existsSync(localPath)) {
      console.warn(`[${i + 1}/${mediaItems.length}] Local file not found: ${localPath}`);
      failCount++;
      continue;
    }

    try {
      const stats = fs.statSync(localPath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`[${i + 1}/${mediaItems.length}] Uploading ${isVideo ? "VIDEO" : "IMAGE"} (${sizeMB} MB): ${path.basename(localPath)}...`);

      const cloudUrl = await uploadFile(localPath, isVideo);

      await prisma.media.update({
        where: { id: item.id },
        data: { url: cloudUrl }
      });

      console.log(`  ✓ Synced to Cloudinary: ${cloudUrl}`);
      successCount++;
    } catch (err: any) {
      console.error(`  ✗ Failed to upload ${localPath}:`, err.message || err);
      failCount++;
    }
  }

  console.log("=== Migration Summary ===");
  console.log(`Successfully migrated: ${successCount}`);
  console.log(`Failed / Skipped: ${failCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
