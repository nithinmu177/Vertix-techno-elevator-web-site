import { mkdir, readFile, writeFile, readdir, stat } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

type LocalMedia = {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  type: string;
  category: string;
  mimeType: string;
  size: number;
  title?: string | null;
  altText?: string | null;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
};

type LocalProject = {
  id: string;
  name: string;
  slug: string;
  location: string;
  categoryId?: string | null;
  category?: null;
  description: string;
  challenge?: string;
  solution?: string;
  elevatorType: string;
  specifications?: Record<string, unknown>;
  timeline?: string;
  results?: string;
  status: string;
  media: LocalProjectMedia[];
  createdAt: string;
  updatedAt: string;
};

type LocalProjectMedia = {
  id: string;
  projectId: string;
  mediaId: string;
  role: string;
  sortOrder: number;
  media: LocalMedia;
};

type LocalStore = {
  media: LocalMedia[];
  projects: LocalProject[];
  settings: Record<string, unknown>;
  messages: any[];
  quotes: any[];
  resources: Record<string, any[]>;
};

const storePath = path.join(process.cwd(), "data", "local-store.json");
const uploadsDir = path.join(process.cwd(), "public", "uploads");

let cachedStore: LocalStore | null = null;
let writeQueue = Promise.resolve();

function normalizeStore(store: Partial<LocalStore>): LocalStore {
  return {
    media: store.media ?? [],
    projects: store.projects ?? [],
    settings: store.settings ?? {},
    messages: store.messages ?? [],
    quotes: store.quotes ?? [],
    resources: store.resources ?? {}
  };
}

async function syncUploadsWithStore(store: LocalStore): Promise<boolean> {
  try {
    const files = await readdir(uploadsDir).catch(() => []);
    const existing = new Set(store.media.map((m) => m.filename));
    let changed = false;

    for (const filename of files) {
      if (filename === ".gitkeep" || filename === "vertix-projects" || existing.has(filename)) continue;
      try {
        const fullPath = path.join(uploadsDir, filename);
        const fileStat = await stat(fullPath);
        const ext = path.extname(filename).toLowerCase();
        const isVideo = ext === ".mp4" || ext === ".webm";
        const mimeType = isVideo ? "video/mp4" : ext === ".png" ? "image/png" : "image/jpeg";
        const type = isVideo ? "VIDEO" : "IMAGE";

        const timeMatch = filename.match(/^(\d+)-/);
        const createdAt = timeMatch
          ? new Date(parseInt(timeMatch[1], 10)).toISOString()
          : fileStat.birthtime.toISOString();

        store.media.push({
          id: randomUUID(),
          filename,
          originalName: filename,
          url: `/uploads/${filename}`,
          type,
          category: "GENERAL",
          mimeType,
          size: fileStat.size,
          title: isVideo ? "Elevator Video Footage" : "Elevator Installation Photo",
          altText: isVideo ? "Elevator Video" : "Elevator Photo",
          createdAt,
          updatedAt: createdAt
        });
        existing.add(filename);
        changed = true;
      } catch {
        // Skip unreadable files
      }
    }

    if (changed) {
      store.media.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }
    return changed;
  } catch {
    return false;
  }
}

async function readStore(): Promise<LocalStore> {
  try {
    const content = await readFile(storePath, "utf8");
    const parsed = JSON.parse(content) as LocalStore;
    const store = normalizeStore(parsed);
    const hasNewFiles = await syncUploadsWithStore(store);
    cachedStore = store;
    if (hasNewFiles) {
      await writeStore(store);
    }
    return cachedStore;
  } catch {
    if (cachedStore) return cachedStore;
    const fallback = normalizeStore({});
    await syncUploadsWithStore(fallback);
    cachedStore = fallback;
    return cachedStore;
  }
}

async function writeStore(store: LocalStore) {
  cachedStore = normalizeStore(store);
  writeQueue = writeQueue.then(async () => {
    try {
      await mkdir(path.dirname(storePath), { recursive: true });
      await writeFile(storePath, `${JSON.stringify(cachedStore, null, 2)}\n`, "utf8");
    } catch (err) {
      console.error("[writeStore Error]:", err);
    }
  });
  await writeQueue;
}

function attachProjectMedia(project: Omit<LocalProject, "media">, mediaMap: Record<string, string | string[]> | undefined, mediaItems: LocalMedia[]) {
  const entries = Object.entries(mediaMap ?? {});
  return entries.flatMap<LocalProjectMedia>(([role, value]) => {
    const ids = Array.isArray(value) ? value : value ? [value] : [];
    const linkedMedia: LocalProjectMedia[] = [];
    ids.forEach((mediaId, sortOrder) => {
      const media = mediaItems.find((item) => item.id === mediaId);
      if (!media) return;
      linkedMedia.push({ id: randomUUID(), projectId: project.id, mediaId, role, sortOrder, media });
    });
    return linkedMedia;
  });
}

function attachResourceMedia(item: any, mediaMap: Record<string, string | string[]> | undefined, mediaItems: LocalMedia[]) {
  const entries = Object.entries(mediaMap ?? {});
  return entries.flatMap((entry) => {
    const [role, value] = entry;
    const ids = Array.isArray(value) ? value : value ? [value] : [];
    return ids
      .map((mediaId, sortOrder) => {
        const media = mediaItems.find((mediaItem) => mediaItem.id === mediaId);
        if (!media) return null;
        return { id: randomUUID(), [`${item.__resource ?? "resource"}Id`]: item.id, mediaId, role, sortOrder, media };
      })
      .filter(Boolean);
  });
}

function attachDirectMedia(item: any, mediaId: string | undefined, field: string, mediaItems: LocalMedia[]) {
  if (!mediaId) return {};
  const media = mediaItems.find((mediaItem) => mediaItem.id === mediaId);
  return media ? { [`${field}Id`]: mediaId, [field]: media } : {};
}

export async function listLocalMedia() {
  const store = await readStore();
  return store.media.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function createLocalMedia(payload: Omit<LocalMedia, "id" | "createdAt" | "updatedAt">) {
  const store = await readStore();
  const now = new Date().toISOString();
  const media = { ...payload, id: randomUUID(), createdAt: now, updatedAt: now };
  store.media.unshift(media);
  await writeStore(store);
  return media;
}

export async function createLocalMediaBatch(payloads: Array<Omit<LocalMedia, "id" | "createdAt" | "updatedAt">>) {
  const store = await readStore();
  const now = new Date().toISOString();
  const created: LocalMedia[] = payloads.map((payload) => ({
    ...payload,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now
  }));
  store.media.unshift(...created);
  await writeStore(store);
  return created;
}

export async function updateLocalMedia(id: string, payload: Partial<Pick<LocalMedia, "title" | "altText" | "description" | "category">>) {
  const store = await readStore();
  const media = store.media.find((item) => item.id === id);
  if (!media) return null;
  Object.assign(media, payload, { updatedAt: new Date().toISOString() });
  await writeStore(store);
  return media;
}

export async function deleteLocalMediaRecord(id: string) {
  const store = await readStore();
  const media = store.media.find((item) => item.id === id);
  store.media = store.media.filter((item) => item.id !== id);
  store.projects = store.projects.map((project) => ({ ...project, media: project.media.filter((entry) => entry.mediaId !== id) }));
  await writeStore(store);
  return media ?? null;
}

export async function listLocalProjects() {
  const store = await readStore();
  return store.projects.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
}

export async function ensureLocalProjects(defaultProjects: any[]) {
  const store = await readStore();
  if (store.projects.length) {
    return store.projects.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
  }

  const now = new Date().toISOString();
  store.projects = defaultProjects.map((project, projectIndex) => ({
    id: String(project.id || randomUUID()),
    name: project.name,
    slug: project.slug,
    location: project.location,
    categoryId: project.categoryId ?? null,
    category: project.category ?? null,
    description: project.description,
    challenge: project.challenge ?? "",
    solution: project.solution ?? "",
    elevatorType: project.elevatorType,
    specifications: project.specifications ?? {},
    timeline: project.timeline ?? "",
    results: project.results ?? "",
    status: project.status ?? "PUBLISHED",
    createdAt: now,
    updatedAt: now,
    media: (project.media ?? []).map((entry: any, mediaIndex: number) => {
      const media = entry.media;
      const mediaId = `demo-project-media-${projectIndex}-${mediaIndex}`;
      return {
        id: `demo-project-link-${projectIndex}-${mediaIndex}`,
        projectId: String(project.id || project.slug),
        mediaId,
        role: entry.role ?? "COVER",
        sortOrder: mediaIndex,
        media: {
          id: mediaId,
          filename: path.basename(media.url ?? `project-${projectIndex}.jpg`),
          originalName: path.basename(media.url ?? `project-${projectIndex}.jpg`),
          url: media.url,
          type: media.type ?? "IMAGE",
          category: "PROJECT",
          mimeType: "image/jpeg",
          size: 0,
          title: media.altText ?? project.name,
          altText: media.altText ?? project.name,
          createdAt: now,
          updatedAt: now
        }
      };
    })
  }));
  await writeStore(store);
  return store.projects;
}

export async function createLocalProject(payload: Omit<LocalProject, "id" | "category" | "media" | "createdAt" | "updatedAt">, mediaMap?: Record<string, string | string[]>) {
  const store = await readStore();
  const now = new Date().toISOString();
  const base = { ...payload, id: randomUUID(), category: null, createdAt: now, updatedAt: now };
  const project = { ...base, media: attachProjectMedia(base, mediaMap, store.media) };
  store.projects.unshift(project);
  await writeStore(store);
  return project;
}

export async function updateLocalProject(id: string, payload: Omit<LocalProject, "id" | "category" | "media" | "createdAt" | "updatedAt">, mediaMap?: Record<string, string | string[]>) {
  const store = await readStore();
  const index = store.projects.findIndex((project) => project.id === id);
  if (index === -1) return null;
  const existing = store.projects[index];
  const updatedBase = { ...existing, ...payload, updatedAt: new Date().toISOString() };
  store.projects[index] = {
    ...updatedBase,
    media: mediaMap === undefined ? existing.media : attachProjectMedia(updatedBase, mediaMap, store.media)
  };
  await writeStore(store);
  return store.projects[index];
}

export async function deleteLocalProject(id: string) {
  const store = await readStore();
  store.projects = store.projects.filter((project) => project.id !== id);
  await writeStore(store);
}

export async function ensureLocalResource(resource: string, defaults: any[]) {
  const store = normalizeStore(await readStore());
  if (store.resources[resource]?.length) return store.resources[resource];
  const now = new Date().toISOString();
  store.resources[resource] = defaults.map((item) => ({
    ...item,
    id: String(item.id || randomUUID()),
    status: item.status ?? "PUBLISHED",
    createdAt: item.createdAt ?? now,
    updatedAt: item.updatedAt ?? now
  }));
  await writeStore(store);
  return store.resources[resource];
}

export async function listLocalResource(resource: string) {
  const store = normalizeStore(await readStore());
  return store.resources[resource] ?? [];
}

export async function createLocalResource(resource: string, payload: Record<string, unknown>, options?: { mediaMap?: Record<string, string | string[]>; directMediaId?: string; directMediaField?: string }) {
  const store = normalizeStore(await readStore());
  const now = new Date().toISOString();
  const base = { ...payload, id: randomUUID(), createdAt: now, updatedAt: now, __resource: resource };
  const item = {
    ...base,
    ...(options?.mediaMap ? { media: attachResourceMedia(base, options.mediaMap, store.media) } : {}),
    ...(options?.directMediaField ? attachDirectMedia(base, options.directMediaId, options.directMediaField, store.media) : {})
  };
  delete (item as Record<string, any>).__resource;
  store.resources[resource] = [item, ...(store.resources[resource] ?? [])];
  await writeStore(store);
  return item;
}

export async function updateLocalResource(resource: string, id: string, payload: Record<string, unknown>, options?: { mediaMap?: Record<string, string | string[]>; directMediaId?: string; directMediaField?: string }) {
  const store = normalizeStore(await readStore());
  const items = store.resources[resource] ?? [];
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const current = items[index];
  const base = { ...current, ...payload, id, updatedAt: new Date().toISOString(), __resource: resource };
  const item = {
    ...base,
    media: options?.mediaMap === undefined ? current.media : attachResourceMedia(base, options.mediaMap, store.media),
    ...(options?.directMediaField
      ? options.directMediaId === undefined
        ? {}
        : attachDirectMedia(base, options.directMediaId, options.directMediaField, store.media)
      : {})
  };
  delete (item as Record<string, any>).__resource;
  items[index] = item;
  store.resources[resource] = items;
  await writeStore(store);
  return item;
}

export async function deleteLocalResource(resource: string, id: string) {
  const store = normalizeStore(await readStore());
  store.resources[resource] = (store.resources[resource] ?? []).filter((item) => item.id !== id);
  await writeStore(store);
}

export async function getLocalSettings() {
  const store = normalizeStore(await readStore());
  return store.settings;
}

export async function saveLocalSettings(settings: Record<string, unknown>) {
  const store = normalizeStore(await readStore());
  store.settings = { ...store.settings, ...settings };
  await writeStore(store);
  return Object.entries(store.settings).map(([key, value]) => ({ key, value }));
}

export async function listLocalMessages() {
  const store = normalizeStore(await readStore());
  return store.messages.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function createLocalMessage(payload: Record<string, unknown>) {
  const store = normalizeStore(await readStore());
  const now = new Date().toISOString();
  const message = { ...payload, id: randomUUID(), status: "NEW", createdAt: now, updatedAt: now };
  store.messages.unshift(message);
  await writeStore(store);
  return message;
}

export async function updateLocalMessageStatus(id: string, status: string) {
  const store = normalizeStore(await readStore());
  const message = store.messages.find((item) => item.id === id);
  if (!message) return null;
  message.status = status;
  message.updatedAt = new Date().toISOString();
  await writeStore(store);
  return message;
}

export async function listLocalQuotes() {
  const store = normalizeStore(await readStore());
  return store.quotes.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
}

export async function createLocalQuote(payload: Record<string, unknown>) {
  const store = normalizeStore(await readStore());
  const now = new Date().toISOString();
  const quote = { ...payload, id: randomUUID(), status: "NEW", createdAt: now, updatedAt: now };
  store.quotes.unshift(quote);
  await writeStore(store);
  return quote;
}

export async function updateLocalQuoteStatus(id: string, status: string) {
  const store = normalizeStore(await readStore());
  const quote = store.quotes.find((item) => item.id === id);
  if (!quote) return null;
  quote.status = status;
  quote.updatedAt = new Date().toISOString();
  await writeStore(store);
  return quote;
}
