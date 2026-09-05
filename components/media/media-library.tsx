"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Copy, Trash2, Upload } from "lucide-react";
import { formatBytes } from "@/lib/utils";

export function MediaLibrary({ picker = false, onSelect }: { picker?: boolean; onSelect?: (media: any) => void }) {
  const [media, setMedia] = useState<any[]>([]);
  const [q, setQ] = useState("");
  const [type, setType] = useState("ALL");
  const [status, setStatus] = useState("");

  async function load() {
    const response = await fetch(`/api/media?q=${encodeURIComponent(q)}&type=${type}`);
    setMedia(response.ok ? await response.json() : []);
  }
  useEffect(() => { load(); }, [type]);
  const filtered = useMemo(() => media.filter((m) => !q || m.originalName.toLowerCase().includes(q.toLowerCase()) || m.title?.toLowerCase().includes(q.toLowerCase())), [media, q]);

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;
    const body = new FormData();
    Array.from(files).forEach((file) => body.append("files", file));
    body.append("category", "GENERAL");
    setStatus("Uploading...");
    const response = await fetch("/api/media", { method: "POST", body });
    setStatus(response.ok ? "Uploaded." : "Upload failed. Check file type, size and admin login.");
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this media file?")) return;
    await fetch(`/api/media?id=${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <section className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-black">Media Library</h1>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#063f31] px-4 py-2 text-sm font-bold text-white"><Upload className="size-4" /> Upload Media<input type="file" multiple accept="image/jpeg,image/png,image/webp,image/svg+xml,video/mp4,video/webm" className="hidden" onChange={upload} /></label>
      </div>
      <div className="grid gap-3 rounded-lg bg-white p-4 md:grid-cols-[1fr_auto]">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search media..." className="rounded-lg border p-3" />
        <div className="flex gap-2">{["ALL","IMAGE","VIDEO"].map((item) => <button className={`rounded-lg border px-4 font-bold ${type===item ? "bg-[#063f31] text-white" : ""}`} onClick={() => setType(item)} key={item}>{item}</button>)}</div>
      </div>
      <p className="text-sm font-bold text-[#063f31]">{status}</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => (
          <article className="overflow-hidden rounded-lg bg-white shadow-sm" key={item.id}>
            <div className="relative aspect-square bg-[#e8eadf]">{item.type === "IMAGE" ? <Image src={item.url} alt={item.altText || item.originalName} fill className="object-cover" /> : <video src={item.url} className="h-full w-full object-cover" controls preload="metadata" />}</div>
            <div className="grid gap-2 p-4 text-sm">
              <strong className="truncate">{item.title || item.originalName}</strong>
              <span className="text-[#56635d]">{item.type} · {formatBytes(item.size)}</span>
              <span className="text-[#56635d]">{new Date(item.createdAt).toLocaleDateString()}</span>
              <div className="flex flex-wrap gap-2 pt-2">
                {picker && <button onClick={() => onSelect?.(item)} className="rounded bg-[#063f31] px-3 py-2 font-bold text-white">Select</button>}
                <button onClick={() => navigator.clipboard.writeText(item.url)} title="Copy reference" className="rounded border p-2"><Copy className="size-4" /></button>
                <button onClick={() => remove(item.id)} title="Delete" className="rounded border p-2 text-red-700"><Trash2 className="size-4" /></button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && <div className="rounded-lg border border-dashed border-[#063f31]/20 bg-white p-10 text-center font-bold text-[#56635d]">No media found. Upload elevator photos or videos to begin.</div>}
    </section>
  );
}
