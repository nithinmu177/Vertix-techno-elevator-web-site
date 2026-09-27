import { MediaCategory } from "@prisma/client";
import { deleteLocalMedia, saveLocalMedia } from "./local";
import { deleteGithubMedia, saveGithubMedia } from "./github";

const isGithubStorage = () => process.env.STORAGE_PROVIDER?.toLowerCase() === "github";

export function saveMedia(file: File, category?: MediaCategory) {
  return isGithubStorage() ? saveGithubMedia(file, category) : saveLocalMedia(file, category);
}

export function deleteMedia(url: string) {
  return isGithubStorage() ? deleteGithubMedia(url) : deleteLocalMedia(url);
}