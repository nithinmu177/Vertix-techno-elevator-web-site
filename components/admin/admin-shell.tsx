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
          ? "bg-[#2563EB] text-white shadow-xs"
          : "text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon className={`size-4 transition ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
      <span className="flex-1">{label}</span>
      {isActive && <ChevronRight className="size-3 text-white/80" />}
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
    <div className="min-h-screen bg-[#F3F6FA] text-[#172B4D] lg:grid lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="relative flex flex-col border-r border-slate-200 bg-[#172B4D] text-white">
        <div className="relative flex-1 p-5">
          {/* Brand */}
          <Link href="/" className="group flex items-center pb-5 border-b border-white/10">
            <div className="bg-white px-2.5 py-1 rounded-xl shadow-xs">
              <Image
                src="/images/vertix-logo.png"
                alt="Vertix Techno Elevator"
                width={200}
                height={50}
                priority
                className="h-9 w-auto object-contain transition group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Status pill */}
          <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5">
            <div className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#16A34A] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#16A34A]" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-green-300">Live System Connected</p>
              <p className="text-[11px] text-slate-300">Operations desk active</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="mt-6 grid gap-1">
            {nav.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </nav>
        </div>

        {/* Back link & Logout */}
        <div className="relative border-t border-white/10 p-4 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-white transition"
          >
            <span>↗ Back to Live Site</span>
            <ArrowUpRight className="size-3.5 text-[#2563EB]" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-between rounded-xl border border-red-400/20 bg-red-500/10 px-3.5 py-2.5 text-xs font-semibold text-red-300 hover:bg-red-500/20 transition cursor-pointer"
          >
            <span>Sign Out Admin</span>
            <LogOut className="size-3.5" />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-xs">
          <div className="flex items-center gap-3">
            <Activity className="size-4 text-[#2563EB]" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">Command Console</p>
              <strong className="text-sm font-bold text-[#172B4D]">Vertix Operations Admin</strong>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1D4ED8] transition"
            >
              <span>Live Site</span> <ArrowUpRight className="size-3.5" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-[#F3F6FA] px-3.5 py-2 text-xs font-semibold text-[#172B4D] hover:bg-slate-200 transition cursor-pointer"
            >
              <LogOut className="size-3.5 text-red-500" />
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
