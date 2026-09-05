"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";
import { MediaPicker } from "@/components/media/media-picker";

type Resource = "products" | "projects" | "services" | "blog" | "faq" | "testimonials";

export function ResourceManager({ resource, title }: { resource: Resource; title: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [status, setStatus] = useState("");
  const [editing, setEditing] = useState<any>(null);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  async function load() {
    const response = await fetch(`/api/${resource}`);
    setItems(response.ok ? await response.json() : []);
  }

  useEffect(() => { load(); }, []);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || form.get("title") || form.get("question") || "Untitled");
    const payload: any = Object.fromEntries(form);
    payload.slug ||= slugify(name);
    payload.status ||= "PUBLISHED";
    if (resource === "products") Object.assign(payload, { shortDescription: payload.shortDescription || payload.description, fullDescription: payload.fullDescription || payload.description, applications: [], safetyFeatures: [], finishes: [] });
    if (resource === "projects") Object.assign(payload, { description: payload.description || "Editable project description", elevatorType: payload.elevatorType || "Editable" });
    if (resource === "services") Object.assign(payload, { benefits: [], process: [] });
    if (resource === "blog") Object.assign(payload, { excerpt: payload.excerpt || "Editable excerpt", content: payload.content || "Editable article content", author: payload.author || "Vertix Admin", publishedAt: new Date().toISOString() });
    if (resource === "faq") Object.assign(payload, { category: payload.category || "General", answer: payload.answer || "Editable answer", sortOrder: 0 });
    if (resource === "testimonials") Object.assign(payload, { customerName: payload.customerName || name, quote: payload.quote || "Demo testimonial", rating: Number(payload.rating || 5), isDemo: true });
    if (selectedMedia && resource === "products") payload.media = { MAIN: selectedMedia.id };
    if (selectedMedia && resource === "projects") payload.media = { COVER: selectedMedia.id };
    if (selectedMedia && resource === "services") payload.media = { IMAGE: selectedMedia.id };
    if (selectedMedia && resource === "blog") payload.coverMediaId = selectedMedia.id;
    if (selectedMedia && resource === "testimonials") payload.photoMediaId = selectedMedia.id;
    const method = editing?.id ? "PATCH" : "POST";
    if (editing?.id) payload.id = editing.id;
    const response = await fetch(`/api/${resource}`, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setStatus(response.ok ? "Saved." : "Save failed.");
    setEditing(null);
    setSelectedMedia(null);
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/${resource}?id=${id}`, { method: "DELETE" });
    await load();
  }

  const primary = resource === "blog" ? "title" : resource === "faq" ? "question" : resource === "testimonials" ? "customerName" : "name";
  return (
    <section className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-black">{title}</h1><p className="text-sm font-bold text-[#063f31]">{status}</p></div>
      <form onSubmit={save} className="grid gap-3 rounded-lg bg-white p-5 md:grid-cols-2">
        <input name={primary} defaultValue={editing?.[primary] ?? ""} placeholder={primary} className="rounded-lg border p-3" required />
        {resource !== "faq" && resource !== "testimonials" && <input name="slug" defaultValue={editing?.slug ?? ""} placeholder="slug" className="rounded-lg border p-3" />}
        <input name="description" defaultValue={editing?.description ?? editing?.shortDescription ?? ""} placeholder="description" className="rounded-lg border p-3 md:col-span-2" />
        {resource === "projects" && <input name="location" defaultValue={editing?.location ?? ""} placeholder="location" className="rounded-lg border p-3" required />}
        {resource === "faq" && <><input name="category" defaultValue={editing?.category ?? "General"} placeholder="category" className="rounded-lg border p-3" /><textarea name="answer" defaultValue={editing?.answer ?? ""} placeholder="answer" className="rounded-lg border p-3 md:col-span-2" /></>}
        {resource === "testimonials" && <textarea name="quote" defaultValue={editing?.quote ?? ""} placeholder="quote" className="rounded-lg border p-3 md:col-span-2" />}
        {["products","projects","services","blog","testimonials"].includes(resource) && <div className="md:col-span-2"><MediaPicker label="Select from Media Library" onSelect={setSelectedMedia} />{selectedMedia && <p className="mt-2 text-sm font-bold text-[#063f31]">Selected: {selectedMedia.title || selectedMedia.originalName}</p>}</div>}
        <select name="status" defaultValue={editing?.status ?? "PUBLISHED"} className="rounded-lg border p-3"><option>DRAFT</option><option>PUBLISHED</option><option>ARCHIVED</option></select>
        <Button>{editing ? "Update" : "Add"} {title}</Button>
      </form>
      <div className="overflow-auto rounded-lg bg-white">
        <table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-[#102019] text-white"><tr><th className="p-3">Item</th><th>Status</th><th>Updated</th><th>Actions</th></tr></thead><tbody>{items.map((item) => <tr className="border-t" key={item.id}><td className="p-3 font-bold">{item[primary] || item.name || item.title}</td><td>{item.status}</td><td>{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : ""}</td><td className="flex gap-2 p-3"><button onClick={() => setEditing(item)} className="font-bold text-[#063f31]">Edit</button><button onClick={() => remove(item.id)} className="font-bold text-red-700">Delete</button></td></tr>)}</tbody></table>
      </div>
    </section>
  );
}
