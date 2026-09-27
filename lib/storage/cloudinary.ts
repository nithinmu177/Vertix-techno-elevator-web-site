import { v2 as cloudinary } from "cloudinary";
import { MediaCategory, MediaType } from "@prisma/client";
import { detectMediaType, validateUpload } from "./local";

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export async function saveCloudinaryMedia(file: File, category: MediaCategory = MediaCategory.GENERAL) {
  const validation = validateUpload(file);
  if (!validation.ok) throw new Error(validation.error);

  const buffer = Buffer.from(await file.arrayBuffer());
  const resourceType = validation.type === MediaType.VIDEO ? "video" : "image";

  return new Promise<{
    filename: string;
    originalName: string;
    url: string;
    type: MediaType;
    category: MediaCategory;
    mimeType: string;
    size: number;
  }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "vertix-elevators",
        resource_type: resourceType,
        public_id: `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40)}`
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload failed with empty result."));
        }

        resolve({
          filename: result.public_id,
          originalName: file.name,
          url: result.secure_url,
          type: validation.type,
          category,
          mimeType: file.type,
          size: result.bytes || file.size
        });
      }
    );

    uploadStream.end(buffer);
  });
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
