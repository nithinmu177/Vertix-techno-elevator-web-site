"use client";

import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api-url";
import { Mail, Phone, User, MessageSquare, Clock } from "lucide-react";

const statusColors: Record<string, string> = {
  NEW: "border-[#00e5ff]/30 bg-[#00e5ff]/10 text-[#00e5ff]",
  READ: "border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37]",
  REPLIED: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  ARCHIVED: "border-slate-600/30 bg-slate-600/10 text-slate-400",
};

export default function MessagesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const r = await fetch(apiUrl("/api/contact"), { credentials: "include" });
    setItems(r.ok ? await r.json() : []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: string) {
    await fetch(apiUrl("/api/contact"), {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  return (
    <section className="grid gap-6">
      {/* Header */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#d4af37]">Inbox</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-white">Messages</h1>
        <p className="mt-1 text-sm text-slate-500">{items.length} messages in inbox</p>
      </div>

      {loading && (
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#d4af37] border-t-transparent" />
          Loading messages…
        </div>
      )}

      <div className="grid gap-4">
        {items.map((m) => (
          <article
            key={m.id}
            className="rounded-2xl border border-white/[0.06] bg-[#0c121e] p-6 transition hover:border-white/[0.10]"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="font-black text-white">{m.subject || "No subject"}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <User className="size-3.5 text-[#d4af37]" /> {m.name}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="size-3.5 text-[#d4af37]" /> {m.email}
                  </span>
                  {m.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="size-3.5 text-[#d4af37]" /> {m.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-slate-600" />
                    {new Date(m.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <select
                value={m.status}
                onChange={(e) => setStatus(m.id, e.target.value)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-bold uppercase tracking-wider outline-none cursor-pointer bg-transparent transition ${statusColors[m.status] || statusColors.NEW}`}
              >
                <option value="NEW" className="bg-[#0c121e] text-white">NEW</option>
                <option value="READ" className="bg-[#0c121e] text-white">READ</option>
                <option value="REPLIED" className="bg-[#0c121e] text-white">REPLIED</option>
                <option value="ARCHIVED" className="bg-[#0c121e] text-white">ARCHIVED</option>
              </select>
            </div>
            <div className="mt-4 rounded-xl border border-white/[0.04] bg-[#080c14] p-4">
              <p className="text-sm leading-relaxed text-slate-400">{m.message}</p>
            </div>
          </article>
        ))}

        {!items.length && !loading && (
          <div className="rounded-2xl border border-dashed border-white/[0.06] bg-[#0c121e]/50 p-16 text-center">
            <MessageSquare className="mx-auto mb-3 size-10 text-slate-700" />
            <p className="text-sm font-bold text-slate-600">No messages yet. Customer inquiries will appear here.</p>
          </div>
        )}
      </div>
    </section>
  );
}
