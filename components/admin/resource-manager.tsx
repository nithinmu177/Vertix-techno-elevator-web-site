"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Edit3, Loader2, Plus, RotateCcw, Save, Trash2, CheckCircle2, AlertCircle, ChevronDown, Video, Film, Image as ImageIcon, Play, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";
import { MediaPicker } from "@/components/media/media-picker";
import { apiUrl } from "@/lib/api-url";

type Resource = "products" | "projects" | "services" | "blog" | "faq" | "testimonials";

const fieldClass =
  "w-full rounded-xl border border-white/[0.08] bg-[#080c14] px-4 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20";
const labelClass = "grid gap-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500";

function listFromText(value: FormDataEntryValue | null) {
  return String(value || "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function textFromList(value: unknown) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function mediaRoleFor(resource: Resource) {
  if (resource === "products") return "MAIN";
  if (resource === "projects") return "COVER";
  if (resource === "services") return "IMAGE";
  return "";
}

function mediaForItem(item: any, resource: Resource) {
  if (resource === "blog") return item.coverMedia ?? null;
  if (resource === "testimonials") return item.photoMedia ?? null;
  const role = mediaRoleFor(resource);
  return item.media?.find((entry: any) => entry.role === role)?.media ?? item.media?.[0]?.media ?? null;
}

function Field({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <label className={`${labelClass} ${wide ? "md:col-span-2" : ""}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

const statusBadge: Record<string, string> = {
  PUBLISHED: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  DRAFT: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  ARCHIVED: "border-slate-600/30 bg-slate-600/10 text-slate-400",
};

export function ResourceManager({ resource, title }: { resource: Resource; title: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(null);
  const [editing, setEditing] = useState<any>(null);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [coverMedia, setCoverMedia] = useState<any>(null);
  const [videoMedia, setVideoMedia] = useState<any>(null);
  const [galleryMedia, setGalleryMedia] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);

  const primary = useMemo(
    () =>
      resource === "blog"
        ? "title"
        : resource === "faq"
        ? "question"
        : resource === "testimonials"
        ? "customerName"
        : "name",
    [resource]
  );

  async function load() {
    setBusy(true);
    const response = await fetch(apiUrl(`/api/${resource}`), { credentials: "include" });
    setItems(response.ok ? await response.json() : []);
    setBusy(false);
  }

  useEffect(() => { load(); }, []);

  function resetForm() {
    setEditing(null);
    setSelectedMedia(null);
    setCoverMedia(null);
    setVideoMedia(null);
    setGalleryMedia([]);
    setStatus(null);
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const name = String(
      form.get("name") || form.get("title") || form.get("question") || form.get("customerName") || "Untitled"
    );
    const payload: any = Object.fromEntries(form);
    payload.slug ||= slugify(name);
    payload.status ||= "PUBLISHED";

    if (resource === "products") {
      payload.shortDescription = payload.shortDescription || payload.description || "";
      payload.fullDescription = payload.fullDescription || payload.description || payload.shortDescription;
      payload.applications = listFromText(form.get("applications"));
      payload.safetyFeatures = listFromText(form.get("safetyFeatures"));
      payload.finishes = listFromText(form.get("finishes"));
      payload.specifications = {
        capacity: payload.capacity || "",
        speed: payload.speed || "",
        floors: payload.floors || "",
        driveType: payload.driveType || "",
      };
    }
    if (resource === "projects") {
      payload.description ||= "Editable project description";
      payload.elevatorType ||= "Passenger Elevator";
      payload.specifications = {
        timeline: payload.timeline || "",
        results: payload.results || "",
        location: payload.location || "",
      };
    }
    if (resource === "services") {
      payload.benefits = listFromText(form.get("benefits"));
      payload.process = listFromText(form.get("process"));
    }
    if (resource === "blog") {
      payload.excerpt ||= "Editable excerpt";
      payload.content ||= "Editable article content";
      payload.author ||= "Vertix Admin";
      payload.publishedAt ||= new Date().toISOString();
    }
    if (resource === "faq") {
      payload.category ||= "General";
      payload.answer ||= "Editable answer";
      payload.sortOrder = Number(payload.sortOrder || 0);
    }
    if (resource === "testimonials") {
      payload.customerName ||= name;
      payload.quote ||= "Editable testimonial";
      payload.rating = Number(payload.rating || 5);
      payload.isDemo = payload.isDemo === "on";
    }

    if (resource === "projects") {
      const mediaMap: Record<string, string | string[]> = {};
      if (coverMedia?.id) mediaMap.COVER = coverMedia.id;
      if (videoMedia?.id) mediaMap.VIDEO = videoMedia.id;
      if (galleryMedia.length) mediaMap.GALLERY = galleryMedia.map((m: any) => m.id);
      payload.media = mediaMap;
    } else if (resource === "products") {
      const mediaMap: Record<string, string | string[]> = {};
      if (coverMedia?.id) mediaMap.MAIN = coverMedia.id;
      if (galleryMedia.length) mediaMap.GALLERY = galleryMedia.map((m: any) => m.id);
      payload.media = mediaMap;
    } else {
      if (selectedMedia && resource === "services") payload.media = { IMAGE: selectedMedia.id };
      if (selectedMedia && resource === "blog") payload.coverMediaId = selectedMedia.id;
      if (selectedMedia && resource === "testimonials") payload.photoMediaId = selectedMedia.id;
    }

    const method = editing?.id ? "PATCH" : "POST";
    if (editing?.id) payload.id = editing.id;

    const response = await fetch(apiUrl(`/api/${resource}`), {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));
    setStatus({
      text: response.ok
        ? `${title} saved successfully.`
        : result.error || "Save failed. Check required fields and login status.",
      ok: response.ok,
    });
    if (response.ok) resetForm();
    await load();
    setBusy(false);
  }

  async function remove(id: string) {
    if (!confirm("Delete this item permanently?")) return;
    setBusy(true);
    await fetch(apiUrl(`/api/${resource}?id=${id}`), { method: "DELETE", credentials: "include" });
    await load();
    setBusy(false);
  }

  return (
    <section className="grid gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#d4af37]">Backend Manager</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-white">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          {busy && <Loader2 className="size-4 animate-spin text-[#d4af37]" />}
        </div>
      </div>

      {/* Status */}
      {status && (
        <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold ${status.ok ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400" : "border-red-500/20 bg-red-500/10 text-red-400"}`}>
          {status.ok ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
          {status.text}
        </div>
      )}

      {/* Form */}
      <form
        key={editing?.id || "new"}
        onSubmit={save}
        className="grid gap-5 rounded-2xl border border-white/[0.06] bg-[#0c121e] p-6 md:grid-cols-2"
      >
        {/* Form header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-5 md:col-span-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white">{editing ? `Edit ${title}` : `Add New ${title}`}</h2>
              {editing && (
                <span className="rounded-md border border-[#d4af37]/30 bg-[#d4af37]/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#d4af37]">
                  Editing ID: {editing.id?.slice(0, 8)}...
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              {editing
                ? `Modifying "${editing[primary] || editing.name || editing.title}". Update the fields below and click "Update ${title}".`
                : "Fill the fields, choose publish status, and attach media where needed."}
            </p>
          </div>
          {editing ? (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 px-3.5 py-2 text-xs font-bold text-[#d4af37] hover:bg-[#d4af37]/20 transition"
            >
              <RotateCcw className="size-3.5" /> Cancel Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] px-3.5 py-2 text-xs font-bold text-slate-400 hover:border-white/20 hover:text-white transition"
            >
              <RotateCcw className="size-3.5" /> Clear Form
            </button>
          )}
        </div>

        <Field label={primary}>
          <input name={primary} defaultValue={editing?.[primary] ?? ""} placeholder={primary} className={fieldClass} required />
        </Field>

        {resource !== "faq" && resource !== "testimonials" && (
          <Field label="Slug">
            <input name="slug" defaultValue={editing?.slug ?? ""} placeholder="auto-created if blank" className={fieldClass} />
          </Field>
        )}

        {["products", "projects", "services"].includes(resource) && (
          <Field label="Description" wide>
            <textarea name="description" defaultValue={editing?.description ?? editing?.shortDescription ?? ""} placeholder="Short visible description" className={`${fieldClass} min-h-24`} required />
          </Field>
        )}

        {resource === "products" && (
          <>
            <Field label="Full Description" wide>
              <textarea name="fullDescription" defaultValue={editing?.fullDescription ?? ""} placeholder="Detailed product page description" className={`${fieldClass} min-h-28`} />
            </Field>
            {["capacity", "speed", "floors", "doorType", "driveType", "energyEfficiency"].map((field) => (
              <Field label={field} key={field}>
                <input name={field} defaultValue={editing?.[field] ?? ""} className={fieldClass} />
              </Field>
            ))}
            <Field label="Applications" wide>
              <textarea name="applications" defaultValue={textFromList(editing?.applications)} placeholder="One per line or comma separated" className={`${fieldClass} min-h-20`} />
            </Field>
            <Field label="Safety Features" wide>
              <textarea name="safetyFeatures" defaultValue={textFromList(editing?.safetyFeatures)} placeholder="One per line or comma separated" className={`${fieldClass} min-h-20`} />
            </Field>
            <Field label="Finishes" wide>
              <textarea name="finishes" defaultValue={textFromList(editing?.finishes)} placeholder="One per line or comma separated" className={`${fieldClass} min-h-20`} />
            </Field>
          </>
        )}

        {resource === "projects" && (
          <>
            <Field label="Location"><input name="location" defaultValue={editing?.location ?? ""} className={fieldClass} required /></Field>
            <Field label="Elevator Type"><input name="elevatorType" defaultValue={editing?.elevatorType ?? ""} className={fieldClass} required /></Field>
            <Field label="Challenge" wide><textarea name="challenge" defaultValue={editing?.challenge ?? ""} className={`${fieldClass} min-h-20`} /></Field>
            <Field label="Solution" wide><textarea name="solution" defaultValue={editing?.solution ?? ""} className={`${fieldClass} min-h-20`} /></Field>
            <Field label="Timeline"><input name="timeline" defaultValue={editing?.timeline ?? ""} className={fieldClass} /></Field>
            <Field label="Results"><input name="results" defaultValue={editing?.results ?? ""} className={fieldClass} /></Field>
          </>
        )}

        {resource === "services" && (
          <>
            <Field label="Benefits" wide><textarea name="benefits" defaultValue={textFromList(editing?.benefits)} placeholder="One per line or comma separated" className={`${fieldClass} min-h-24`} /></Field>
            <Field label="Process Steps" wide><textarea name="process" defaultValue={textFromList(editing?.process)} placeholder="One per line or comma separated" className={`${fieldClass} min-h-24`} /></Field>
          </>
        )}

        {resource === "blog" && (
          <>
            <Field label="Excerpt" wide><textarea name="excerpt" defaultValue={editing?.excerpt ?? ""} className={`${fieldClass} min-h-20`} required /></Field>
            <Field label="Content" wide><textarea name="content" defaultValue={editing?.content ?? ""} className={`${fieldClass} min-h-40`} required /></Field>
            <Field label="Author"><input name="author" defaultValue={editing?.author ?? "Vertix Admin"} className={fieldClass} /></Field>
          </>
        )}

        {resource === "faq" && (
          <>
            <Field label="Category"><input name="category" defaultValue={editing?.category ?? "General"} className={fieldClass} /></Field>
            <Field label="Sort Order"><input name="sortOrder" type="number" defaultValue={editing?.sortOrder ?? 0} className={fieldClass} /></Field>
            <Field label="Answer" wide><textarea name="answer" defaultValue={editing?.answer ?? ""} className={`${fieldClass} min-h-28`} required /></Field>
          </>
        )}

        {resource === "testimonials" && (
          <>
            <Field label="Company"><input name="company" defaultValue={editing?.company ?? ""} className={fieldClass} /></Field>
            <Field label="Designation"><input name="designation" defaultValue={editing?.designation ?? ""} className={fieldClass} /></Field>
            <Field label="Rating"><input name="rating" type="number" min="1" max="5" defaultValue={editing?.rating ?? 5} className={fieldClass} /></Field>
            <label className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#080c14] px-4 py-3 text-sm font-bold text-slate-300 cursor-pointer">
              <input name="isDemo" type="checkbox" defaultChecked={editing?.isDemo ?? false} className="accent-[#d4af37]" />
              Mark as demo
            </label>
            <Field label="Quote" wide><textarea name="quote" defaultValue={editing?.quote ?? ""} className={`${fieldClass} min-h-28`} required /></Field>
          </>
        )}

        {/* Dedicated Media Architecture for Projects */}
        {resource === "projects" && (
          <div className="rounded-2xl border border-white/[0.08] bg-[#080c14] p-5 md:col-span-2 space-y-6">
            <div className="border-b border-white/[0.06] pb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00e5ff]">Project Media Architecture</span>
              <h3 className="text-base font-black text-white mt-0.5">Cover, Walkthrough Video & Gallery Assets</h3>
              <p className="text-xs text-slate-400 mt-1">Configure exactly which media displays on the frontend hero banner, cards, video player, and project gallery.</p>
            </div>

            {/* Row 1: Cover Media & Walkthrough Video */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Cover Media */}
              <div className="rounded-xl border border-white/[0.06] bg-[#0c121e] p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#d4af37]">Hero & Card Cover</span>
                    <p className="text-xs font-bold text-white">Main Cover Asset</p>
                  </div>
                  <MediaPicker label={coverMedia ? "Change Cover" : "Select Cover"} onSelect={setCoverMedia} />
                </div>
                {coverMedia ? (
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-white/[0.1] bg-[#06090e]">
                    {coverMedia.type === "VIDEO" || coverMedia.url?.endsWith(".mp4") || coverMedia.url?.endsWith(".webm") ? (
                      <video src={coverMedia.url} className="h-full w-full object-cover" controls preload="metadata" />
                    ) : (
                      <Image src={coverMedia.url} alt={coverMedia.altText || "Cover"} fill sizes="300px" className="object-cover" />
                    )}
                    <button
                      type="button"
                      onClick={() => setCoverMedia(null)}
                      title="Remove Cover"
                      className="absolute top-2 right-2 rounded-lg bg-black/70 p-1.5 text-white hover:bg-red-600 transition"
                    >
                      <X className="size-3.5" />
                    </button>
                    <div className="absolute bottom-2 left-2">
                      <span className="rounded bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                        COVER {coverMedia.type || "ASSET"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-white/[0.1] bg-black/20 text-xs text-slate-500">
                    No cover selected. Click &quot;Select Cover&quot; above.
                  </div>
                )}
              </div>

              {/* Walkthrough Video */}
              <div className="rounded-xl border border-white/[0.06] bg-[#0c121e] p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#00e5ff]">Walkthrough Player</span>
                    <p className="text-xs font-bold text-white">Installation Video</p>
                  </div>
                  <MediaPicker label={videoMedia ? "Change Video" : "Select Video"} onSelect={setVideoMedia} />
                </div>
                {videoMedia ? (
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-white/[0.1] bg-[#06090e]">
                    <video src={videoMedia.url} className="h-full w-full object-cover" controls preload="metadata" />
                    <button
                      type="button"
                      onClick={() => setVideoMedia(null)}
                      title="Remove Video"
                      className="absolute top-2 right-2 rounded-lg bg-black/70 p-1.5 text-white hover:bg-red-600 transition"
                    >
                      <X className="size-3.5" />
                    </button>
                    <div className="absolute bottom-2 left-2">
                      <span className="rounded bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#00e5ff]">
                        WALKTHROUGH VIDEO
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-white/[0.1] bg-black/20 text-xs text-slate-500">
                    No walkthrough video selected. Click &quot;Select Video&quot; above.
                  </div>
                )}
              </div>
            </div>

            {/* Row 2: Gallery Assets */}
            <div className="rounded-xl border border-white/[0.06] bg-[#0c121e] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#d4af37]">Frontend Project Gallery</span>
                  <p className="text-xs font-bold text-white">Gallery Photos & Videos ({galleryMedia.length} assets attached)</p>
                </div>
                <MediaPicker
                  label="+ Add Photo/Video to Gallery"
                  onSelect={(m) => {
                    if (!galleryMedia.some((existing) => existing.id === m.id)) {
                      setGalleryMedia((prev) => [...prev, m]);
                    }
                  }}
                />
              </div>

              {galleryMedia.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-72 overflow-y-auto pr-1">
                  {galleryMedia.map((m, idx) => (
                    <div key={m.id || idx} className="group relative aspect-video overflow-hidden rounded-lg border border-white/[0.1] bg-[#06090e]">
                      {m.type === "VIDEO" || m.url?.endsWith(".mp4") || m.url?.endsWith(".webm") ? (
                        <video src={m.url} className="h-full w-full object-cover" muted />
                      ) : (
                        <Image src={m.url} alt={m.altText || "Gallery"} fill sizes="120px" className="object-cover" />
                      )}
                      <button
                        type="button"
                        onClick={() => setGalleryMedia((prev) => prev.filter((_, i) => i !== idx))}
                        title="Remove from Gallery"
                        className="absolute top-1 right-1 rounded bg-black/80 p-1 text-white opacity-0 group-hover:opacity-100 hover:bg-red-600 transition"
                      >
                        <X className="size-3" />
                      </button>
                      <div className="absolute bottom-1 left-1">
                        <span className="rounded bg-black/70 px-1 py-0.5 text-[8px] font-bold uppercase text-slate-300">
                          {m.type || "ASSET"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center rounded-lg border border-dashed border-white/[0.08] text-xs text-slate-500">
                  No gallery items attached yet. Click &quot;+ Add Photo/Video to Gallery&quot; to attach installation footage.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dedicated Media for Products */}
        {resource === "products" && (
          <div className="rounded-2xl border border-white/[0.08] bg-[#080c14] p-5 md:col-span-2 space-y-4">
            <div className="border-b border-white/[0.06] pb-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]">Product Visuals</span>
                <h3 className="text-base font-black text-white mt-0.5">Main Showcase & Gallery</h3>
              </div>
              <MediaPicker label={coverMedia ? "Change Main Media" : "Select Main Media"} onSelect={setCoverMedia} />
            </div>
            {coverMedia && (
              <div className="flex items-center gap-3 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5 p-3">
                <div className="relative size-16 overflow-hidden rounded-lg bg-[#06090e]">
                  {coverMedia.type === "VIDEO" || coverMedia.url?.endsWith(".mp4") || coverMedia.url?.endsWith(".webm") ? (
                    <video src={coverMedia.url} className="h-full w-full object-cover" muted />
                  ) : (
                    <Image src={coverMedia.url} alt={coverMedia.altText || "Main"} fill sizes="64px" className="object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#d4af37]">Main Model Asset ({coverMedia.type || "IMAGE"})</p>
                  <p className="text-sm font-bold text-white">{coverMedia.title || coverMedia.originalName}</p>
                </div>
                <button type="button" onClick={() => setCoverMedia(null)} className="rounded p-1 text-slate-400 hover:text-red-400">
                  <X className="size-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Standard Single Media for Services, Blog, Testimonials */}
        {["services", "blog", "testimonials"].includes(resource) && (
          <div className="rounded-2xl border border-white/[0.06] bg-[#080c14] p-4 md:col-span-2">
            <MediaPicker label="Attach from Media Library" onSelect={setSelectedMedia} />
            {selectedMedia && (
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/5 p-3">
                <div className="relative size-16 overflow-hidden rounded-lg bg-[#06090e]">
                  {selectedMedia.type === "VIDEO" || selectedMedia.url?.endsWith(".mp4") || selectedMedia.url?.endsWith(".webm") ? (
                    <video src={selectedMedia.url} className="h-full w-full object-cover" muted />
                  ) : (
                    <Image src={selectedMedia.url} alt={selectedMedia.altText || selectedMedia.title || "Selected media"} fill sizes="64px" className="object-cover" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#d4af37]">Media selected ({selectedMedia.type || "ASSET"})</p>
                  <p className="text-sm font-bold text-white">{selectedMedia.title || selectedMedia.originalName}</p>
                </div>
              </div>
            )}
          </div>
        )}

        <Field label="Publish Status">
          <select name="status" defaultValue={editing?.status ?? "PUBLISHED"} className={`${fieldClass} cursor-pointer`}>
            <option className="bg-[#0c121e]">DRAFT</option>
            <option className="bg-[#0c121e]">PUBLISHED</option>
            <option className="bg-[#0c121e]">ARCHIVED</option>
          </select>
        </Field>

        <div className="flex items-end gap-3 md:col-span-2 pt-2 border-t border-white/[0.06]">
          <Button variant="gold" disabled={busy}>
            <Save className="size-4" /> {editing ? `Update ${title}` : `Insert ${title}`}
          </Button>
          {editing ? (
            <Button type="button" variant="secondary" onClick={resetForm}>
              Cancel Edit
            </Button>
          ) : (
            <Button type="button" variant="secondary" onClick={() => setStatus({ text: "Form cleared and ready for new entry.", ok: true })}>
              <Plus className="size-4" /> New
            </Button>
          )}
        </div>
      </form>

      {/* Records table */}
      <div className="overflow-auto rounded-2xl border border-white/[0.06] bg-[#0c121e]">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Image", "Item", "Status", "Updated", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3.5 text-[10px] font-black uppercase tracking-wider text-slate-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {items.map((item) => {
              const itemMedia = mediaForItem(item, resource);
              const isVideo = itemMedia && (itemMedia.type === "VIDEO" || itemMedia.url?.endsWith(".mp4") || itemMedia.url?.endsWith(".webm"));
              const cover = item.media?.find((m: any) => m.role === "COVER")?.media || itemMedia;
              const hasVideo = Boolean(item.media?.some((m: any) => m.role === "VIDEO"));
              const galleryCount = item.media?.filter((m: any) => m.role === "GALLERY")?.length ?? 0;

              return (
                <tr key={item.id} className="group transition hover:bg-white/[0.02]">
                  <td className="px-4 py-3.5">
                    {cover ? (
                      <div className="relative size-14 overflow-hidden rounded-xl bg-[#080c14]">
                        {cover.type === "VIDEO" || cover.url?.endsWith(".mp4") || cover.url?.endsWith(".webm") ? (
                          <video src={cover.url} className="h-full w-full object-cover" muted />
                        ) : (
                          <Image
                            src={cover.url}
                            alt={cover.altText || cover.title || item[primary] || "Media"}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        )}
                      </div>
                    ) : (
                      <span className="inline-flex size-14 items-center justify-center rounded-xl bg-[#080c14] text-[10px] font-bold text-slate-600">
                        No img
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-bold text-white">{item[primary] || item.name || item.title}</p>
                    {resource === "projects" && (
                      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
                        {cover && (
                          <span className="rounded bg-[#d4af37]/10 px-1.5 py-0.5 font-bold text-[#d4af37]">
                            Cover ✓
                          </span>
                        )}
                        {hasVideo && (
                          <span className="rounded bg-[#00e5ff]/10 px-1.5 py-0.5 font-bold text-[#00e5ff]">
                            Walkthrough Video ✓
                          </span>
                        )}
                        {galleryCount > 0 && (
                          <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-bold text-slate-300">
                            {galleryCount} Gallery Assets
                          </span>
                        )}
                        {item.location && <span className="text-slate-500">• {item.location}</span>}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`rounded-lg border px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${statusBadge[item.status] || statusBadge.DRAFT}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500">{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : "—"}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setEditing(item);
                          if (resource === "projects") {
                            const cov = item.media?.find((m: any) => m.role === "COVER")?.media || item.media?.[0]?.media || null;
                            const vid = item.media?.find((m: any) => m.role === "VIDEO")?.media || null;
                            const gal = item.media?.filter((m: any) => m.role === "GALLERY")?.map((m: any) => m.media) || [];
                            setCoverMedia(cov);
                            setVideoMedia(vid);
                            setGalleryMedia(gal);
                          } else if (resource === "products") {
                            const main = item.media?.find((m: any) => m.role === "MAIN")?.media || item.media?.[0]?.media || null;
                            const gal = item.media?.filter((m: any) => m.role === "GALLERY")?.map((m: any) => m.media) || [];
                            setCoverMedia(main);
                            setGalleryMedia(gal);
                          } else {
                            setSelectedMedia(itemMedia);
                          }
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4af37] hover:text-[#f5e2a3] transition"
                      >
                        <Edit3 className="size-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => remove(item.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500/70 hover:text-red-400 transition"
                      >
                        <Trash2 className="size-3.5" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {!items.length && (
              <tr>
                <td colSpan={5} className="px-4 py-16 text-center text-sm text-slate-600">
                  No {title.toLowerCase()} records yet. Use the form above to add your first entry.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
