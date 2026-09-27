"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Activity, ArrowUpRight, BarChart3, Boxes, Briefcase,
  FileQuestion, FolderKanban, ImageIcon, Inbox, MessageSquare,
  Newspaper, Settings, Users, Star, ChevronRight, LogOut
} from "lucide-react";
import { signOut } from "next-auth/react";

const nav = [
  { label: "Dashboard", href: "/admin", Icon: BarChart3 },
  { label: "Products", href: "/admin/products", Icon: Boxes },
  { label: "Projects", href: "/admin/projects", Icon: FolderKanban },
  { label: "Services", href: "/admin/services", Icon: Briefcase },
  { label: "Media Library", href: "/admin/media", Icon: ImageIcon },
  { label: "Quote Requests", href: "/admin/quotes", Icon: Inbox },
  { label: "Messages", href: "/admin/messages", Icon: MessageSquare },
  { label: "Customers", href: "/admin/customers", Icon: Users },
  { label: "Blog", href: "/admin/blog", Icon: Newspaper },
  { label: "FAQ", href: "/admin/faq", Icon: FileQuestion },
  { label: "Testimonials", href: "/admin/testimonials", Icon: Star },
  { label: "Settings", href: "/admin/settings", Icon: Settings },
];

function NavItem({ label, href, Icon }: { label: string; href: string; Icon: any }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-[#d4af37]/15 to-transparent border border-[#d4af37]/20 text-[#f5e2a3] shadow-[0_0_20px_rgba(212,175,55,0.06)]"
          : "text-slate-400 hover:bg-white/[0.04] hover:text-[#f5e2a3] border border-transparent"
      }`}
    >
      <Icon className={`size-4 transition ${isActive ? "text-[#d4af37]" : "text-slate-500 group-hover:text-[#d4af37]"}`} />
      <span className="flex-1">{label}</span>
      {isActive && <ChevronRight className="size-3 text-[#d4af37]/60" />}
    </Link>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
    } catch {}
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#06090e] text-slate-100 lg:grid lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="relative flex flex-col border-r border-white/[0.06] bg-[#080c14]">
        {/* Sidebar glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#d4af37]/8 blur-[60px]" />
        </div>

        <div className="relative flex-1 p-5">
          {/* Brand */}
          <Link href="/" className="group flex items-center pb-5 border-b border-white/[0.06]">
            <Image
              src="/images/vertix-logo.png"
              alt="Vertix Techno Elevator"
              width={200}
              height={50}
              priority
              className="h-10 w-auto object-contain transition group-hover:scale-105 filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]"
            />
          </Link>

          {/* Status pill */}
          <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
            <div className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00e5ff] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00e5ff]" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#00e5ff]">Live System Connected</p>
              <p className="text-[10px] text-slate-500">Real-time operations active</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="mt-6 grid gap-0.5">
            {nav.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </nav>
        </div>

        {/* Back link & Logout */}
        <div className="relative border-t border-white/[0.06] p-4 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-xs font-bold text-slate-400 hover:border-[#d4af37]/30 hover:text-[#d4af37] transition"
          >
            <span>↗ Back to Live Site</span>
            <ArrowUpRight className="size-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/5 px-3.5 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/15 hover:border-red-500/40 active:scale-95 transition cursor-pointer"
          >
            <span>Sign Out Admin</span>
            <LogOut className="size-3.5" />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between border-b border-white/[0.06] bg-[#080c14]/90 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Activity className="size-4 text-[#00e5ff]" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#d4af37]">Command Console</p>
              <strong className="text-sm font-black text-white">Vertix Operations Admin</strong>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f5e2a3] to-[#c59e33] px-4 py-2 text-xs font-black uppercase tracking-wider text-[#06090e] shadow-lg shadow-[#d4af37]/20 hover:brightness-110 transition"
            >
              Live Site <ArrowUpRight className="size-3.5" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/20 active:scale-95 transition cursor-pointer"
            >
              <LogOut className="size-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
