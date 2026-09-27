import { v2 as cloudinary } from "cloudinary";
import { MediaCategory, MediaType } from "@prisma/client";
import { detectMediaType, validateUpload } from "./local";

import os from "os";
import fs from "fs/promises";
import path from "path";

// Ensure Cloudinary is configured with env-var credentials only — no hardcoded fallbacks
function getCloudinary() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables."
    );
  }
  cloudinary.config({ cloud_name, api_key, api_secret, secure: true });
  return cloudinary;
}

export async function saveCloudinaryMedia(file: File, category: MediaCategory = MediaCategory.GENERAL) {
  const validation = validateUpload(file);
  if (!validation.ok) throw new Error(validation.error);

  const isVideo = validation.type === MediaType.VIDEO;
  const resourceType = isVideo ? "video" : "image";
  const cld = getCloudinary();

  const buffer = Buffer.from(await file.arrayBuffer());
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
  const tempPath = path.join(os.tmpdir(), `upload-${Date.now()}-${sanitizedName}`);

  try {
    await fs.writeFile(tempPath, buffer);

    const uploadMethod = isVideo ? cld.uploader.upload_large.bind(cld.uploader) : cld.uploader.upload.bind(cld.uploader);
    const result: any = await uploadMethod(tempPath, {
      folder: "vertix-elevators",
      resource_type: resourceType,
      public_id: `${Date.now()}-${sanitizedName}`,
      chunk_size: isVideo ? 6000000 : undefined
    });

    return {
      filename: result.public_id,
      originalName: file.name,
      url: result.secure_url,
      type: validation.type,
      category,
      mimeType: file.type || (isVideo ? "video/mp4" : "image/jpeg"),
      size: result.bytes || file.size
    };
  } catch (err: any) {
    console.error("[Cloudinary Upload Error]:", err);
    throw new Error(err?.message || "Failed to upload file to Cloudinary.");
  } finally {
    await fs.unlink(tempPath).catch(() => undefined);
  }
}

export async function deleteCloudinaryMedia(urlOrPublicId: string) {
  try {
    // If it's a full Cloudinary URL, extract the public_id
    let publicId = urlOrPublicId;
    if (urlOrPublicId.includes("res.cloudinary.com")) {
      const parts = urlOrPublicId.split("/");
      const uploadIdx = parts.indexOf("upload");
      if (uploadIdx !== -1) {
        // Drop version tag (e.g. v1700000000) if present
        const rest = parts.slice(uploadIdx + 1);
        if (rest[0] && rest[0].startsWith("v")) rest.shift();
        const fullFilename = rest.join("/");
        publicId = fullFilename.replace(/\.[^/.]+$/, "");
      }
    }

    const isVideo = urlOrPublicId.endsWith(".mp4") || urlOrPublicId.endsWith(".webm");
    await cloudinary.uploader.destroy(publicId, {
      resource_type: isVideo ? "video" : "image"
    });
  } catch (err) {
    console.warn("[Cloudinary Delete Warning]:", err);
  }
}
