"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Copy, Trash2, Upload, Image as ImageIcon, Video, LayoutGrid, Search, CheckCircle2, AlertCircle } from "lucide-react";
import { formatBytes } from "@/lib/utils";
import { apiUrl } from "@/lib/api-url";

export function MediaLibrary({ picker = false, onSelect }: { picker?: boolean; onSelect?: (media: any) => void }) {
  const [media, setMedia] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [type, setType] = useState("ALL");
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(null);

  async function load() {
    const response = await fetch(apiUrl(`/api/media?q=${encodeURIComponent(q)}&type=${type}`));
    setMedia(response.ok ? await response.json() : []);
  }
  useEffect(() => { load(); }, [type]);
  const filtered = useMemo(
    () => media.filter((m) => !q || m.originalName.toLowerCase().includes(q.toLowerCase()) || m.title?.toLowerCase().includes(q.toLowerCase())),
    [media, q]
  );

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;
    const body = new FormData();
    Array.from(files).forEach((file) => body.append("files", file));
    body.append("category", "GENERAL");
    setStatus({ text: "Uploading…", ok: true });
    const response = await fetch(apiUrl("/api/media"), { method: "POST", body });
    setStatus({ text: response.ok ? "Upload successful." : "Upload failed. Check file type, size and login.", ok: response.ok });
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this media file permanently?")) return;
    await fetch(apiUrl(`/api/media?id=${id}`), { method: "DELETE" });
    await load();
  }

  const typeIcons: Record<string, React.ReactNode> = {
    ALL: <LayoutGrid className="size-3.5" />,
    IMAGE: <ImageIcon className="size-3.5" />,
    VIDEO: <Video className="size-3.5" />,
  };

  return (
    <section className="grid gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#d4af37]">Asset Management</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-white">Media Library</h1>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f5e2a3] to-[#c59e33] px-5 py-2.5 text-sm font-black uppercase tracking-wider text-[#06090e] shadow-lg shadow-[#d4af37]/20 hover:brightness-110 transition">
          <Upload className="size-4" /> Upload Files
          <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/svg+xml,video/mp4,video/webm" className="hidden" onChange={upload} />
        </label>
      </div>

      {/* Status */}
      {status && (
        <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold ${status.ok ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-red-500/20 bg-red-500/10 text-red-400"}`}>
          {status.ok ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
          {status.text}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/[0.06] bg-[#0c121e] p-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search media files…"
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

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c121e] transition hover:border-[#d4af37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]"
          >
            <div className="relative aspect-square bg-[#080c14]">
              {item.type === "IMAGE" ? (
                <Image src={item.url} alt={item.altText || item.originalName} fill className="object-cover transition group-hover:scale-105" />
              ) : (
                <video src={item.url} className="h-full w-full object-cover" controls preload="metadata" />
              )}
              <div className="absolute top-2 right-2">
                <span className="rounded-lg border border-white/10 bg-[#06090e]/80 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300 backdrop-blur-sm">
                  {item.type}
                </span>
              </div>
            </div>
            <div className="grid gap-2 p-4">
              <strong className="truncate text-sm text-white">{item.title || item.originalName}</strong>
              <span className="text-xs text-slate-500">{formatBytes(item.size)} · {new Date(item.createdAt).toLocaleDateString()}</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {picker && (
                  <button
                    onClick={() => onSelect?.(item)}
                    className="flex-1 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 py-1.5 text-xs font-bold text-[#d4af37] hover:bg-[#d4af37]/20 transition"
                  >
                    Select
                  </button>
                )}
                <button
                  onClick={() => navigator.clipboard.writeText(item.url)}
                  title="Copy URL"
                  className="rounded-lg border border-white/[0.08] p-1.5 text-slate-500 hover:border-[#00e5ff]/40 hover:text-[#00e5ff] transition"
                >
                  <Copy className="size-3.5" />
                </button>
                <button
                  onClick={() => remove(item.id)}
                  title="Delete"
                  className="rounded-lg border border-white/[0.08] p-1.5 text-slate-500 hover:border-red-500/40 hover:text-red-400 transition"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!filtered.length && (
        <div className="rounded-2xl border border-dashed border-white/[0.08] bg-[#0c121e]/50 p-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/5">
            <ImageIcon className="size-7 text-[#d4af37]/50" />
          </div>
          <p className="text-sm font-bold text-slate-500">No media found. Upload elevator photos or videos to begin.</p>
        </div>
      )}
    </section>
  );
}
