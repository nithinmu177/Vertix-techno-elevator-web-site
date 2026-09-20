const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const storePath = path.join(__dirname, "..", "data", "local-store.json");
const uploadDir = path.join(__dirname, "..", "public", "uploads");

let store = { media: [], projects: [], settings: {}, messages: [], quotes: [], resources: {} };
try {
  const content = fs.readFileSync(storePath, "utf8");
  store = JSON.parse(content);
} catch (err) {
  console.log("Creating fresh store structure:", err.message);
}

store.media = store.media || [];
store.projects = store.projects || [];
store.resources = store.resources || {};

const existingMap = new Map();
store.media.forEach((m) => {
  if (m.filename) existingMap.set(m.filename, m);
});

const files = fs.readdirSync(uploadDir).filter((f) => f !== ".gitkeep" && f !== "vertix-projects");

let added = 0;
files.forEach((filename) => {
  if (!existingMap.has(filename)) {
    const fullPath = path.join(uploadDir, filename);
    const stats = fs.statSync(fullPath);
    const ext = path.extname(filename).toLowerCase();
    const isVideo = ext === ".mp4" || ext === ".webm";
    const mimeType = isVideo ? "video/mp4" : ext === ".png" ? "image/png" : "image/jpeg";
    const type = isVideo ? "VIDEO" : "IMAGE";

    const timeMatch = filename.match(/^(\d+)-/);
    const createdAt = timeMatch
      ? new Date(parseInt(timeMatch[1], 10)).toISOString()
      : stats.birthtime.toISOString();

    const mediaItem = {
      id: crypto.randomUUID(),
      filename,
      originalName: filename,
      url: `/uploads/${filename}`,
      type,
      category: "GENERAL",
      mimeType,
      size: stats.size,
      title: isVideo ? "Elevator Video Footage" : "Elevator Installation Photo",
      altText: isVideo ? "Elevator Video" : "Elevator Photo",
      createdAt,
      updatedAt: createdAt
    };
    store.media.push(mediaItem);
    existingMap.set(filename, mediaItem);
    added++;
  }
});

// Sort newest first
store.media.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

fs.writeFileSync(storePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
console.log(`SYNC COMPLETE: Recovered ${added} files. Total media in library: ${store.media.length}`);
