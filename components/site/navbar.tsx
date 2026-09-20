"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall, Sparkles, ArrowRight } from "lucide-react";
import { Brand } from "./brand";

const links = [
  ["Home", "/"],
  ["Products", "/products"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Technology", "/about/technology"],
  ["Safety", "/about/safety"],
  ["About", "/about"],
  ["Contact", "/contact"]
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.08] bg-[#06090e]/85 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-2xl py-3"
          : "border-b border-white/[0.05] bg-[#06090e]/60 backdrop-blur-xl py-4"
      }`}
    >
      <div className="container flex items-center justify-between gap-4">
        <Brand />

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-[#0c121e]/70 px-4 py-1.5 backdrop-blur-md lg:flex"
          aria-label="Main navigation"
        >
          {links.map(([label, href]) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/10 text-[#f5e2a3] shadow-[0_0_15px_rgba(212,175,55,0.2)] border border-[#d4af37]/30"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+916360598915"
            className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs font-bold text-slate-300 transition hover:border-[#00e5ff]/40 hover:text-[#00e5ff]"
          >
            <PhoneCall className="size-3.5 text-[#00e5ff]" />
            <span>24/7 Hotline</span>
          </a>
          <Link
            href="/quote"
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f5e2a3] to-[#c59e33] px-4 py-2 text-xs font-black uppercase tracking-wider text-[#06090e] shadow-lg shadow-[#d4af37]/20 transition-all hover:brightness-110 hover:shadow-[#d4af37]/40 active:scale-95"
          >
            <Sparkles className="size-3.5" />
            <span>Get Quote</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="focus-ring flex size-10 items-center justify-center rounded-xl border border-white/[0.12] bg-[#0c121e] text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          aria-controls="mobile-menu"
        >
          {open ? <X className="size-5 text-[#d4af37]" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="border-b border-white/[0.08] bg-[#080c14]/98 px-6 pb-8 pt-4 shadow-2xl backdrop-blur-3xl lg:hidden"
        >
          <div className="flex flex-col gap-1 divide-y divide-white/[0.06]">
            {links.map(([label, href]) => {
              const isActive = pathname === href;
              return (
                <Link
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-3.5 text-sm font-bold uppercase tracking-wider transition ${
                    isActive ? "text-[#f5e2a3]" : "text-slate-300 hover:text-white"
                  }`}
                  href={href}
                  key={href}
                >
                  <span>{label}</span>
                  <ArrowRight className="size-4 text-white/30" />
                </Link>
              );
            })}
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              onClick={() => setOpen(false)}
              href="/quote"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f5e2a3] to-[#c59e33] py-3 text-sm font-black uppercase tracking-wider text-[#06090e] shadow-lg shadow-[#d4af37]/20"
            >
              <Sparkles className="size-4" /> Request Custom Quote
            </Link>
            <a
              href="tel:+916360598915"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] py-3 text-xs font-bold text-slate-300"
            >
              <PhoneCall className="size-4 text-[#00e5ff]" /> Call 24/7 Support: +91 63605 98915
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
