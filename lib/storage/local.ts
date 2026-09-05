import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { MediaCategory, MediaType } from "@prisma/client";

const uploadRoot = path.join(process.cwd(), "public", "uploads");

export const mediaRules = {
  maxImageSize: 8 * 1024 * 1024,
  maxVideoSize: 80 * 1024 * 1024,
  allowedImages: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
  allowedVideos: ["video/mp4", "video/webm"]
};

function extensionFromName(name: string) {
  return path.extname(name).toLowerCase().replace(/[^.a-z0-9]/g, "");
}

export function detectMediaType(mimeType: string): MediaType | null {
  if (mediaRules.allowedImages.includes(mimeType)) return MediaType.IMAGE;
  if (mediaRules.allowedVideos.includes(mimeType)) return MediaType.VIDEO;
  return null;
}

export function validateUpload(file: File) {
  const type = detectMediaType(file.type);
  if (!type) return { ok: false as const, error: "Unsupported file type." };
  const maxSize = type === MediaType.IMAGE ? mediaRules.maxImageSize : mediaRules.maxVideoSize;
  if (file.size > maxSize) return { ok: false as const, error: "File is larger than the allowed size." };
  if (file.type === "image/svg+xml") {
    const ext = extensionFromName(file.name);
    if (ext !== ".svg") return { ok: false as const, error: "SVG uploads must use the .svg extension." };
  }
  return { ok: true as const, type };
}

export async function saveLocalMedia(file: File, category: MediaCategory = MediaCategory.GENERAL) {
  const validation = validateUpload(file);
  if (!validation.ok) throw new Error(validation.error);

  await mkdir(uploadRoot, { recursive: true });
  const ext = extensionFromName(file.name) || (validation.type === MediaType.VIDEO ? ".mp4" : ".webp");
  const filename = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadRoot, filename), buffer);

  return {
    filename,
    originalName: file.name,
    url: `/uploads/${filename}`,
    type: validation.type,
    category,
    mimeType: file.type,
    size: file.size
  };
}

export async function deleteLocalMedia(url: string) {
  if (!url.startsWith("/uploads/")) return;
  const filename = path.basename(url);
  await unlink(path.join(uploadRoot, filename)).catch(() => undefined);
}
