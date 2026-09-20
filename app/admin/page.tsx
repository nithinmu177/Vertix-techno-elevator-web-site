import { prisma } from "@/lib/db/prisma";
import { getProducts, getProjects } from "@/lib/data";
import { listLocalMedia, listLocalMessages, listLocalQuotes } from "@/lib/local-store";
import { ArrowUpRight, Boxes, Database, FolderKanban, ImageIcon, Inbox, MessageSquare, Radio, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  let counts = { products: 0, projects: 0, quotes: 0, messages: 0, media: 0 };
  if (process.env.DATABASE_URL) {
    try {
      const [products, projects, quotes, messages, media] = await Promise.all([
        prisma.product.count(),
        prisma.project.count(),
        prisma.quoteRequest.count(),
        prisma.contactMessage.count(),
        prisma.media.count(),
      ]);
      counts = { products, projects, quotes, messages, media };
    } catch {}
  } else {
    try {
      const [products, projects, quotes, messages, media] = await Promise.all([
        getProducts(),
        getProjects(),
        listLocalQuotes(),
        listLocalMessages(),
        listLocalMedia(),
      ]);
      counts = {
        products: products?.length ?? 0,
        projects: projects?.length ?? 0,
        quotes: quotes?.length ?? 0,
        messages: messages?.length ?? 0,
        media: media?.length ?? 0,
      };
    } catch (err) {
      console.error("[Dashboard count error]:", err);
    }
  }

  const stats = [
    { label: "Projects", value: counts.projects, icon: FolderKanban, href: "/admin/projects", color: "#00e5ff" },
    { label: "Products", value: counts.products, icon: Boxes, href: "/admin/products", color: "#d4af37" },
    { label: "Media Assets", value: counts.media, icon: ImageIcon, href: "/admin/media", color: "#00e5ff" },
    { label: "Quote Requests", value: counts.quotes, icon: Inbox, href: "/admin/quotes", color: "#d4af37" },
    { label: "Messages", value: counts.messages, icon: MessageSquare, href: "/admin/messages", color: "#00e5ff" },
  ];

  const quickActions = [
    { label: "Manage Projects", href: "/admin/projects", desc: "Add or edit elevator project installations" },
    { label: "Add Product", href: "/admin/products", desc: "Upload new elevator model" },
    { label: "Open Media Library", href: "/admin/media", desc: "Manage photos & videos" },
    { label: "View Quotes", href: "/admin/quotes", desc: "Review incoming requests" },
  ];

  return (
    <section className="grid gap-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#d4af37]">Vertix / Operations</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-white">Good morning, control room.</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
            A live view of the content and customer signals shaping your elevator business.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[#00e5ff]/20 bg-[#00e5ff]/5 px-4 py-2 text-xs font-bold text-[#00e5ff]">
          <Radio className="size-3" />
          System Connected
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c121e] p-5 transition hover:border-white/[0.12] hover:shadow-[0_0_30px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-start justify-between">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl border transition group-hover:scale-110"
                style={{ borderColor: `${color}30`, backgroundColor: `${color}10`, color }}
              >
                <Icon className="size-5" />
              </div>
              <TrendingUp className="size-3.5 text-slate-600 transition group-hover:text-slate-400" />
            </div>
            <strong className="mt-4 block text-4xl font-black text-white">{value}</strong>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
            <div
              className="pointer-events-none absolute -bottom-4 -right-4 h-20 w-20 rounded-full opacity-10 blur-xl transition group-hover:opacity-20"
              style={{ backgroundColor: color }}
            />
          </Link>
        ))}
      </div>

      {/* Content pipeline + quick actions */}
      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        {/* Pipeline card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c121e] p-8">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#d4af37]/6 blur-[60px]" />
          </div>
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#d4af37]">Content Pipeline</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-white">Keep the public experience moving.</h2>
              </div>
              <Database className="size-6 shrink-0 text-[#d4af37]/40" />
            </div>
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-500">
              Update products, projects, media and stories here. Changes flow directly into the public-facing Vertix experience in real time.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/admin/media"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f5e2a3] to-[#c59e33] px-5 py-2.5 text-sm font-black text-[#06090e] shadow-[#d4af37]/20 shadow-lg hover:brightness-110 transition"
              >
                Open Media Library <ArrowUpRight className="size-4" />
              </Link>
              <Link
                href="/admin/settings"
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] px-5 py-2.5 text-sm font-black text-slate-300 hover:border-white/20 hover:text-white transition"
              >
                Review Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#0c121e] p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#d4af37]">Quick Actions</p>
          <h2 className="mt-2 text-lg font-black text-white">Jump to task</h2>
          <div className="mt-5 grid gap-2">
            {quickActions.map(({ label, href, desc }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition hover:border-[#d4af37]/25 hover:bg-[#d4af37]/5"
              >
                <div>
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="text-[11px] text-slate-500">{desc}</p>
                </div>
                <ArrowUpRight className="size-4 text-slate-600 transition group-hover:text-[#d4af37]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
