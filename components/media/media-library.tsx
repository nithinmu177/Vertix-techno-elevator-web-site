"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Copy,
  Trash2,
  Upload,
  Image as ImageIcon,
  Video,
  LayoutGrid,
  Search,
  CheckCircle2,
  AlertCircle,
  CheckSquare,
  Square,
  XCircle,
  Play,
  X,
  Loader2
} from "lucide-react";
import { formatBytes } from "@/lib/utils";
import { apiUrl } from "@/lib/api-url";

export function MediaLibrary({ picker = false, onSelect }: { picker?: boolean; onSelect?: (media: any) => void }) {
  const [media, setMedia] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [type, setType] = useState("ALL");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<any | null>(null);

  async function load() {
    try {
      const response = await fetch(apiUrl(`/api/media?q=${encodeURIComponent(q)}&type=${type}`), { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        setMedia(Array.isArray(data) ? data : []);
      } else {
        setMedia([]);
      }
    } catch {
      setMedia([]);
    }
  }

  useEffect(() => {
    load();
  }, [type]);

  const filtered = useMemo(
    () =>
      media.filter(
        (m) =>
          !q ||
          m.originalName?.toLowerCase().includes(q.toLowerCase()) ||
          m.title?.toLowerCase().includes(q.toLowerCase()) ||
          m.altText?.toLowerCase().includes(q.toLowerCase())
      ),
    [media, q]
  );

  const allFilteredSelected = filtered.length > 0 && filtered.every((m) => selectedIds.includes(m.id));

  function toggleSelect(id: string) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  function handleSelectAll() {
    if (allFilteredSelected) {
      // Unselect all in current filter
      const filteredSet = new Set(filtered.map((m) => m.id));
      setSelectedIds((prev) => prev.filter((id) => !filteredSet.has(id)));
    } else {
      // Select all in current filter
      const merged = Array.from(new Set([...selectedIds, ...filtered.map((m) => m.id)]));
      setSelectedIds(merged);
    }
  }

  function handleClearSelection() {
    setSelectedIds([]);
  }

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;

    setLoading(true);
    setStatus({ text: `Uploading ${files.length} file(s)... Please wait.`, ok: true });

    try {
      const body = new FormData();
      Array.from(files).forEach((file) => body.append("files", file));
      body.append("category", "GENERAL");

      const response = await fetch(apiUrl("/api/media"), {
        method: "POST",
        body,
        credentials: "include"
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        setStatus({
          text: `Successfully uploaded ${Array.isArray(data) ? data.length : files.length} file(s) to Cloudinary & Database!`,
          ok: true
        });
        await load();
      } else {
        setStatus({
          text: data?.error || "Upload failed. Please check file type, size and admin login.",
          ok: false
        });
      }
    } catch (err: any) {
      setStatus({
        text: err?.message || "Upload network error. Please verify your connection.",
        ok: false
      });
    } finally {
      setLoading(false);
      // Reset input value so same files can be re-selected if desired
      event.target.value = "";
    }
  }

  async function removeSingle(id: string, name: string) {
    if (!confirm(`Permanently delete "${name}" from database and Cloudinary storage?`)) return;
    setLoading(true);
    try {
      const res = await fetch(apiUrl(`/api/media?id=${id}`), { method: "DELETE", credentials: "include" });
      if (res.ok) {
        setSelectedIds((prev) => prev.filter((i) => i !== id));
        setStatus({ text: "Media file deleted successfully.", ok: true });
        await load();
      } else {
        const err = await res.json().catch(() => null);
        setStatus({ text: err?.error || "Failed to delete media.", ok: false });
      }
    } catch {
      setStatus({ text: "Network error while deleting media.", ok: false });
    } finally {
      setLoading(false);
    }
  }

  async function deleteSelected() {
    if (!selectedIds.length) return;
    if (!confirm(`Are you sure you want to permanently delete ${selectedIds.length} selected media file(s)?`)) return;

    setLoading(true);
    setStatus({ text: `Deleting ${selectedIds.length} file(s)...`, ok: true });

    try {
      const res = await fetch(apiUrl(`/api/media?ids=${selectedIds.join(",")}`), {
        method: "DELETE",
        credentials: "include"
      });

      if (res.ok) {
        setStatus({ text: `Successfully deleted ${selectedIds.length} media file(s).`, ok: true });
        setSelectedIds([]);
        await load();
      } else {
        const err = await res.json().catch(() => null);
        setStatus({ text: err?.error || "Failed to delete selected media.", ok: false });
      }
    } catch {
      setStatus({ text: "Network error while deleting selected media.", ok: false });
    } finally {
      setLoading(false);
    }
  }

  async function deleteAll() {
    if (!media.length) return;
    const confirmText = prompt(
      `⚠️ DANGER: You are about to permanently delete ALL ${media.length} media files from Cloudinary and your database.\n\nType "DELETE ALL" to confirm:`
    );
    if (confirmText !== "DELETE ALL") {
      alert("Action cancelled.");
      return;
    }

    setLoading(true);
    setStatus({ text: `Deleting all ${media.length} files...`, ok: true });

    try {
      const res = await fetch(apiUrl(`/api/media?all=true`), {
        method: "DELETE",
        credentials: "include"
      });

      if (res.ok) {
        setStatus({ text: `All media files have been cleared successfully.`, ok: true });
        setSelectedIds([]);
        await load();
      } else {
        const err = await res.json().catch(() => null);
        setStatus({ text: err?.error || "Failed to clear all media.", ok: false });
      }
    } catch {
      setStatus({ text: "Network error while clearing media.", ok: false });
    } finally {
      setLoading(false);
    }
  }

  const typeIcons: Record<string, React.ReactNode> = {
    ALL: <LayoutGrid className="size-3.5" />,
    IMAGE: <ImageIcon className="size-3.5" />,
    VIDEO: <Video className="size-3.5" />
  };

  return (
    <section className="grid gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#d4af37]">Asset Management</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-white">
            Media Library <span className="text-sm font-normal text-slate-400 font-mono">({filtered.length} files)</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <label className={`inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f5e2a3] to-[#c59e33] px-5 py-2.5 text-sm font-black uppercase tracking-wider text-[#06090e] shadow-lg shadow-[#d4af37]/20 hover:brightness-110 active:scale-95 transition ${loading ? "pointer-events-none opacity-60" : ""}`}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            <span>Upload Photos & Videos</span>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={upload}
              disabled={loading}
            />
          </label>
        </div>
      </div>

      {/* Status banner */}
      {status && (
        <div
          className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-bold animate-in fade-in duration-200 ${
            status.ok ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-red-500/20 bg-red-500/10 text-red-400"
          }`}
        >
          <div className="flex items-center gap-2">
            {status.ok ? <CheckCircle2 className="size-4 shrink-0" /> : <AlertCircle className="size-4 shrink-0" />}
            <span>{status.text}</span>
          </div>
          <button onClick={() => setStatus(null)} className="text-slate-400 hover:text-white transition">
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#0c121e] p-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search media files by name or tag…"
            className="w-full rounded-xl border border-white/[0.08] bg-[#080c14] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 outline-none focus:border-[#d4af37] transition"
          />
        </div>

        <div className="flex gap-2">
          {["ALL", "IMAGE", "VIDEO"].map((item) => (
            <button
              key={item}
              onClick={() => setType(item)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                type === item
                  ? "bg-[#d4af37] text-[#06090e] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  : "border border-white/[0.08] text-slate-400 hover:border-[#d4af37]/40 hover:text-[#d4af37]"
              }`}
            >
              {typeIcons[item]} {item}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk Operations Toolbar */}
      {filtered.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-[#070b14] px-4 py-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSelectAll}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 font-bold text-slate-300 hover:border-[#00e5ff] hover:text-[#00e5ff] transition"
            >
              {allFilteredSelected ? <CheckSquare className="size-3.5 text-[#00e5ff]" /> : <Square className="size-3.5" />}
              <span>{allFilteredSelected ? "Unselect All" : "Select All"}</span>
            </button>

            {selectedIds.length > 0 && (
              <button
                onClick={handleClearSelection}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 font-bold text-slate-400 hover:text-white transition"
              >
                <XCircle className="size-3.5" />
                <span>Clear Selection ({selectedIds.length})</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <button
                onClick={deleteSelected}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/40 bg-red-500/10 px-3.5 py-1.5 font-bold text-red-400 hover:bg-red-500/20 active:scale-95 transition"
              >
                <Trash2 className="size-3.5" />
                <span>Delete Selected ({selectedIds.length})</span>
              </button>
            )}

            <button
              onClick={deleteAll}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-900/40 bg-red-950/20 px-3 py-1.5 font-bold text-red-500/80 hover:border-red-500 hover:text-red-400 hover:bg-red-500/10 transition"
              title="Delete all media files from library"
            >
              <Trash2 className="size-3.5" />
              <span>Delete All Files</span>
            </button>
          </div>
        </div>
      )}

      {/* Media Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          const isVid = item.type === "VIDEO" || item.url?.endsWith(".mp4") || item.url?.endsWith(".webm");

          return (
            <article
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl border transition ${
                isSelected
                  ? "border-[#00e5ff] bg-[#0c1626] shadow-[0_0_25px_rgba(0,229,255,0.2)]"
                  : "border-white/[0.06] bg-[#0c121e] hover:border-[#d4af37]/40 hover:shadow-[0_0_25px_rgba(212,175,55,0.08)]"
              }`}
            >
              {/* Card Thumbnail Area */}
              <div
                className="relative aspect-square cursor-pointer bg-[#080c14] overflow-hidden"
                onClick={() => setPreviewMedia(item)}
              >
                {isVid ? (
                  <div className="relative h-full w-full bg-slate-950 flex flex-col items-center justify-center p-4">
                    <div className="size-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white group-hover:scale-110 group-hover:border-[#00e5ff] group-hover:text-[#00e5ff] transition">
                      <Play className="size-5 fill-current ml-0.5" />
                    </div>
                    <span className="mt-2 text-[11px] font-mono text-slate-400">Click to preview video</span>
                  </div>
                ) : (
                  <Image
                    src={item.url}
                    alt={item.altText || item.originalName}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                )}

                {/* Top Badge: Selection Checkbox */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSelect(item.id);
                  }}
                  className="absolute top-2 left-2 z-10 flex size-7 items-center justify-center rounded-lg border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:border-[#00e5ff]"
                >
                  {isSelected ? (
                    <CheckSquare className="size-4 text-[#00e5ff]" />
                  ) : (
                    <Square className="size-4 text-slate-400 group-hover:text-white" />
                  )}
                </button>

                {/* Top Right: Type Badge */}
                <div className="absolute top-2 right-2">
                  <span className="rounded-lg border border-white/10 bg-[#06090e]/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 backdrop-blur-sm">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Card Meta & Actions */}
              <div className="grid gap-2 p-3.5">
                <strong className="truncate text-xs font-bold text-white" title={item.title || item.originalName}>
                  {item.title || item.originalName}
                </strong>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>{formatBytes(item.size)}</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="mt-1 flex items-center gap-1.5 border-t border-white/[0.06] pt-2">
                  {picker && (
                    <button
                      type="button"
                      onClick={() => onSelect?.(item)}
                      className="flex-1 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 py-1 text-xs font-bold text-[#d4af37] hover:bg-[#d4af37]/20 transition"
                    >
                      Select
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(item.url);
                      setStatus({ text: `Copied URL: ${item.url}`, ok: true });
                    }}
                    title="Copy URL"
                    className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-white/[0.08] p-1.5 text-xs text-slate-400 hover:border-[#00e5ff]/40 hover:text-[#00e5ff] transition"
                  >
                    <Copy className="size-3" />
                    <span>Copy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => removeSingle(item.id, item.title || item.originalName)}
                    title="Delete permanently"
                    className="rounded-lg border border-white/[0.08] p-1.5 text-slate-400 hover:border-red-500/40 hover:text-red-400 transition"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {!filtered.length && (
        <div className="rounded-2xl border border-dashed border-white/[0.08] bg-[#0c121e]/50 p-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/5">
            <ImageIcon className="size-7 text-[#d4af37]/50" />
          </div>
          <p className="text-sm font-bold text-slate-400">No media found matching current filter or search.</p>
          <p className="mt-1 text-xs text-slate-600">Click &quot;Upload Photos & Videos&quot; above to add files to your library.</p>
        </div>
      )}

      {/* Lightbox / Video Modal */}
      {previewMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setPreviewMedia(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/[0.15] bg-[#0c121e] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
              <h4 className="text-sm font-black uppercase tracking-wider text-white truncate max-w-[80%]">
                {previewMedia.title || previewMedia.originalName}
              </h4>
              <button
                onClick={() => setPreviewMedia(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/[0.1] hover:text-white transition"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {previewMedia.type === "VIDEO" || previewMedia.url?.endsWith(".mp4") || previewMedia.url?.endsWith(".webm") ? (
                <video src={previewMedia.url} controls autoPlay playsInline className="h-full w-full object-contain" />
              ) : (
                <Image
                  src={previewMedia.url}
                  alt={previewMedia.altText || previewMedia.originalName}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
