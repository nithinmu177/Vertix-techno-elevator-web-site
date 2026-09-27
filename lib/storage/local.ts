import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { MediaCategory, MediaType } from "@prisma/client";

const uploadRoot = path.join(process.cwd(), "public", "uploads");

export const mediaRules = {
  maxImageSize: 50 * 1024 * 1024, // 50 MB
  maxVideoSize: 500 * 1024 * 1024, // 500 MB
  allowedImages: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/svg+xml",
    "image/gif",
    "image/heic",
    "image/heif",
    "image/bmp",
    "image/tiff",
    "image/avif"
  ],
  allowedVideos: [
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-matroska",
    "video/m4v",
    "video/avi",
    "video/3gpp",
    "video/x-msvideo",
    "video/x-flv",
    "video/ogg"
  ]
};

function extensionFromName(name: string) {
  return path.extname(name).toLowerCase().replace(/[^.a-z0-9]/g, "");
}

export function detectMediaType(mimeType: string, filename?: string): MediaType | null {
  const lowerMime = (mimeType || "").toLowerCase();
  const ext = filename ? extensionFromName(filename) : "";

  // 1. Check MIME type
  if (lowerMime.startsWith("image/") || mediaRules.allowedImages.includes(lowerMime)) return MediaType.IMAGE;
  if (lowerMime.startsWith("video/") || mediaRules.allowedVideos.includes(lowerMime)) return MediaType.VIDEO;

  // 2. Fallback to file extension
  const imageExts = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".heic", ".heif", ".bmp", ".tiff", ".tif", ".avif"];
  const videoExts = [".mp4", ".webm", ".mov", ".mkv", ".m4v", ".avi", ".3gp", ".wmv", ".flv", ".ts", ".mts"];

  if (imageExts.includes(ext)) return MediaType.IMAGE;
  if (videoExts.includes(ext)) return MediaType.VIDEO;

  return null;
}

export function validateUpload(file: File) {
  const type = detectMediaType(file.type, file.name);
  if (!type) return { ok: false as const, error: `Unsupported file type (${file.type || "unknown"}). Please select an image or video file.` };
  const maxSize = type === MediaType.IMAGE ? mediaRules.maxImageSize : mediaRules.maxVideoSize;
  if (file.size > maxSize) {
    const limitMB = Math.round(maxSize / (1024 * 1024));
    return { ok: false as const, error: `File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed is ${limitMB} MB.` };
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
