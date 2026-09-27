import crypto from "crypto";
import path from "path";
import { MediaCategory } from "@prisma/client";
import { detectMediaType, validateUpload } from "./local";

const githubApi = "https://api.github.com";

function settings() {
  const token = process.env.GITHUB_TOKEN;
  const repository = process.env.GITHUB_REPOSITORY;
  if (!token || !repository) throw new Error("GitHub storage requires GITHUB_TOKEN and GITHUB_REPOSITORY.");
  return {
    token,
    repository,
    branch: process.env.GITHUB_BRANCH || "main",
    uploadPath: (process.env.GITHUB_UPLOAD_PATH || "public/uploads").replace(/^\/+|\/+$/g, "")
  };
}

function extensionFromName(name: string) {
  return path.extname(name).toLowerCase().replace(/[^.a-z0-9]/g, "");
}

async function githubRequest(url: string, options: RequestInit = {}) {
  const { token } = settings();
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...options.headers
    }
  });
  if (!response.ok) throw new Error(`GitHub storage request failed (${response.status}).`);
  return response;
}

export async function saveGithubMedia(file: File, category: MediaCategory = MediaCategory.GENERAL) {
  const validation = validateUpload(file);
  if (!validation.ok) throw new Error(validation.error);

  const { repository, branch, uploadPath } = settings();
  const ext = extensionFromName(file.name) || (validation.type === detectMediaType("video/mp4") ? ".mp4" : ".webp");
  const filename = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;
  const repositoryPath = `${uploadPath}/${filename}`;
  const content = Buffer.from(await file.arrayBuffer()).toString("base64");
  await githubRequest(`${githubApi}/repos/${repository}/contents/${repositoryPath}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: `Upload ${filename}`, content, branch })
  });

  return {
    filename,
    originalName: file.name,
    url: `https://raw.githubusercontent.com/${repository}/${branch}/${repositoryPath}`,
    type: validation.type,
    category,
    mimeType: file.type,
    size: file.size
  };
}

export async function deleteGithubMedia(url: string) {
  const match = url.match(/^https:\/\/raw\.githubusercontent\.com\/([^/]+\/[^/]+)\/([^/]+)\/(.+)$/);
  if (!match) return;
  const { repository, branch } = settings();
  if (match[1] !== repository || match[2] !== branch) return;
  const repositoryPath = match[3];
  const metadata = await githubRequest(`${githubApi}/repos/${repository}/contents/${repositoryPath}?ref=${encodeURIComponent(branch)}`);
  const file = await metadata.json() as { sha: string };
  await githubRequest(`${githubApi}/repos/${repository}/contents/${repositoryPath}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: `Delete ${path.basename(repositoryPath)}`, sha: file.sha, branch })
  });
}