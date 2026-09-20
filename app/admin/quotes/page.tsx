"use client";

import { useEffect, useState } from "react";
import { Clock, Mail, Phone, User, Tag, MapPin, Layers, CheckCircle2 } from "lucide-react";

const statuses = ["NEW", "CONTACTED", "IN_PROGRESS", "QUOTED", "WON", "CLOSED"];

const statusColors: Record<string, string> = {
  NEW: "border-[#00e5ff]/30 bg-[#00e5ff]/10 text-[#00e5ff]",
  CONTACTED: "border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37]",
  IN_PROGRESS: "border-violet-500/30 bg-violet-500/10 text-violet-400",
  QUOTED: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  WON: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  CLOSED: "border-slate-600/30 bg-slate-600/10 text-slate-400",
};

export default function QuotesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const r = await fetch("/api/quotes");
    setItems(r.ok ? await r.json() : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: string) {
    await fetch("/api/quotes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  return (
    <section className="grid gap-6">
      {/* Header */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#d4af37]">CRM Pipeline</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-white">Quote Requests</h1>
        <p className="mt-1 text-sm text-slate-500">{items.length} total requests in the pipeline</p>
      </div>

      {loading && (
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#d4af37] border-t-transparent" />
          Loading requests…
        </div>
      )}

      {/* Table */}
      <div className="overflow-auto rounded-2xl border border-white/[0.06] bg-[#0c121e]">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Customer", "Company", "Phone", "Email", "Project", "Location", "Elevator", "Date", "Status"].map((h) => (
                <th key={h} className="px-4 py-3.5 text-[10px] font-black uppercase tracking-wider text-slate-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {items.map((q) => (
              <tr key={q.id} className="group transition hover:bg-white/[0.02]">
                <td className="px-4 py-3.5 font-bold text-white">{q.name}</td>
                <td className="px-4 py-3.5 text-slate-400">{q.company || "—"}</td>
                <td className="px-4 py-3.5 text-slate-400">{q.phone || "—"}</td>
                <td className="px-4 py-3.5 text-slate-400">{q.email}</td>
                <td className="px-4 py-3.5 text-slate-400">{q.projectType || "—"}</td>
                <td className="px-4 py-3.5 text-slate-400">{q.location || "—"}</td>
                <td className="px-4 py-3.5 text-slate-400">{q.elevatorType || "—"}</td>
                <td className="px-4 py-3.5 text-slate-400">{new Date(q.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3.5">
                  <select
                    value={q.status}
                    onChange={(e) => setStatus(q.id, e.target.value)}
                    className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider outline-none transition cursor-pointer bg-transparent ${statusColors[q.status] || statusColors.NEW}`}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s} className="bg-[#0c121e] text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {!items.length && !loading && (
              <tr>
                <td colSpan={9} className="px-4 py-16 text-center text-sm text-slate-600">
                  No quote requests yet. They will appear here when customers submit the quote form.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
