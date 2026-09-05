import Link from "next/link";
import { BarChart3, Boxes, Briefcase, FileQuestion, FolderKanban, ImageIcon, Inbox, MessageSquare, Newspaper, Settings, Users } from "lucide-react";
import { Brand } from "@/components/site/brand";

const nav = [
  ["Dashboard", "/admin", BarChart3],
  ["Products", "/admin/products", Boxes],
  ["Projects", "/admin/projects", FolderKanban],
  ["Services", "/admin/services", Briefcase],
  ["Media Library", "/admin/media", ImageIcon],
  ["Quote Requests", "/admin/quotes", Inbox],
  ["Messages", "/admin/messages", MessageSquare],
  ["Customers", "/admin/customers", Users],
  ["Blog", "/admin/blog", Newspaper],
  ["FAQ", "/admin/faq", FileQuestion],
  ["Testimonials", "/admin/testimonials", Users],
  ["Settings", "/admin/settings", Settings]
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#eef1e8] text-[#121815] lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-r border-[#063f31]/10 bg-[#101613] p-5 text-white">
        <Brand light />
        <nav className="mt-8 grid gap-1">
          {nav.map(([label, href, Icon]) => (
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-bold text-white/75 hover:bg-white/10 hover:text-white" href={href as string} key={href as string}>
              <Icon className="size-4" /> {label as string}
            </Link>
          ))}
        </nav>
      </aside>
      <div>
        <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between border-b border-[#063f31]/10 bg-white/85 px-5 backdrop-blur">
          <strong>Vertix Admin</strong>
          <Link className="rounded-lg bg-[#063f31] px-4 py-2 text-sm font-bold text-white" href="/">View Site</Link>
        </header>
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}
