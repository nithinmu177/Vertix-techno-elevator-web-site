import { MediaCategory } from "@prisma/client";
import { deleteLocalMedia, saveLocalMedia } from "./local";
import { deleteGithubMedia, saveGithubMedia } from "./github";
import { deleteCloudinaryMedia, saveCloudinaryMedia } from "./cloudinary";

const getStorageProvider = () => {
  const provider = process.env.STORAGE_PROVIDER?.toLowerCase();
  if (provider === "cloudinary" || process.env.CLOUDINARY_CLOUD_NAME) return "cloudinary";
  if (provider === "github") return "github";
  return "local";
};

export function saveMedia(file: File, category?: MediaCategory) {
  const provider = getStorageProvider();
  if (provider === "cloudinary") return saveCloudinaryMedia(file, category);
  if (provider === "github") return saveGithubMedia(file, category);
  return saveLocalMedia(file, category);
}

export function deleteMedia(url: string) {
  const provider = getStorageProvider();
  if (provider === "cloudinary" || url.includes("res.cloudinary.com")) return deleteCloudinaryMedia(url);
  if (provider === "github" || url.includes("raw.githubusercontent.com")) return deleteGithubMedia(url);
  return deleteLocalMedia(url);
}