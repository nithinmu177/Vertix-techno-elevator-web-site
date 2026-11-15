"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall, ArrowRight } from "lucide-react";
import { Brand } from "./brand";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Our Projects", href: "/projects" },
  { label: "Why Choose Us", href: "/#why-choose-us" },
  { label: "Contact Us", href: "/contact" }
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md py-2.5"
          : "border-b border-slate-100 bg-white py-3.5"
      }`}
    >
      <div className="container flex items-center justify-between gap-4">
        <Brand />

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-1 xl:gap-2 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-violet-50 text-[#7C3AED] font-bold"
                    : "text-[#3B1F6E] hover:text-[#7C3AED] hover:bg-violet-50/50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 sm:flex">
          <a
            href="tel:+916360598915"
            className="flex items-center gap-2 rounded-xl border border-violet-200/70 bg-white px-3.5 py-2 text-xs font-semibold text-[#3B1F6E] transition hover:border-[#7C3AED] hover:text-[#7C3AED]"
          >
            <PhoneCall className="size-3.5 text-[#7C3AED]" />
            <span>+91 63605 98915</span>
          </a>
          <Link
            href="/quote"
            className="flex items-center gap-2 rounded-xl bg-[#7C3AED] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#6D28D9] active:scale-95"
          >
            <span>Get a Free Quote</span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="focus-ring flex size-10 items-center justify-center rounded-xl border border-violet-200/70 bg-white text-[#3B1F6E] lg:hidden hover:border-[#7C3AED]"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          aria-controls="mobile-menu"
        >
          {open ? <X className="size-5 text-[#7C3AED]" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="border-b border-violet-100 bg-white px-6 pb-6 pt-3 shadow-lg lg:hidden"
        >
          <div className="flex flex-col divide-y divide-violet-50">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-3 text-sm font-semibold transition ${
                    isActive ? "text-[#7C3AED] font-bold" : "text-[#3B1F6E] hover:text-[#7C3AED]"
                  }`}
                  href={item.href}
                  key={item.label}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="size-4 text-violet-300" />
                </Link>
              );
            })}
          </div>
          <div className="mt-5 flex flex-col gap-3">
            <Link
              onClick={() => setOpen(false)}
              href="/quote"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#7C3AED] py-3 text-sm font-bold text-white shadow-sm hover:bg-[#6D28D9]"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:+916360598915"
              className="flex items-center justify-center gap-2 rounded-xl border border-violet-200/70 bg-[#F5F3FF] py-2.5 text-xs font-bold text-[#3B1F6E]"
            >
              <PhoneCall className="size-4 text-[#7C3AED]" /> Call: +91 63605 98915
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
