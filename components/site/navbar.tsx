"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { CtaLink } from "@/components/ui/button";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Products", "/products"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Technology", "/about/technology"],
  ["Safety", "/about/safety"],
  ["Blog", "/blog"],
  ["Contact", "/contact"]
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[#063f31]/10 bg-[#fbfaf4]/90 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Brand />
        <nav className="hidden items-center gap-5 text-sm font-semibold text-[#29332f] lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link className="transition hover:text-[#063f31]" href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <CtaLink href="/quote">REQUEST A QUOTE</CtaLink>
        </div>
        <button className="focus-ring rounded-lg border border-[#063f31]/15 p-2 lg:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" className="border-t border-[#063f31]/10 bg-[#fbfaf4] px-4 pb-5 lg:hidden" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <Link onClick={() => setOpen(false)} className="block border-b border-[#063f31]/10 py-3 font-semibold" href={href} key={href}>
              {label}
            </Link>
          ))}
          <div className="pt-4">
            <CtaLink href="/quote">REQUEST A QUOTE</CtaLink>
          </div>
        </nav>
      )}
    </header>
  );
}
