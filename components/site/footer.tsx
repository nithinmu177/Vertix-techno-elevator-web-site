import Link from "next/link";
import { Brand } from "./brand";
import { ShieldCheck, PhoneCall, Mail, MapPin, ArrowUpRight, Award, Clock } from "lucide-react";

const quickLinks = [
  ["Home", "/"],
  ["Products Catalog", "/products"],
  ["Custom Engineering", "/services"],
  ["Featured Projects", "/projects"],
  ["Elevator Technology", "/about/technology"],
  ["Safety Certifications", "/about/safety"],
  ["Quality Standards", "/about/quality"],
  ["Company Story", "/about"],
  ["Blog & Insights", "/blog"],
  ["Request Quote", "/quote"],
  ["Contact Support", "/contact"]
];

const legalLinks = [
  ["Privacy Policy", "/privacy"],
  ["Terms & Conditions", "/terms"],
  ["Cookie Policy", "/cookies"]
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#04060a] text-white">
      {/* Top Banner: Emergency & Fast Assistance */}
      <div className="border-b border-white/[0.06] bg-gradient-to-r from-[#d4af37]/10 via-[#00e5ff]/5 to-transparent py-6">
        <div className="container flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37]">
              <Clock className="size-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">24/7 Breakdown & Rescue Support</p>
              <p className="text-sm font-semibold text-slate-300">Rapid response field engineers on standby across all sectors</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="tel:+916360598915"
              className="inline-flex items-center gap-2 rounded-xl bg-white/[0.06] px-4 py-2.5 text-sm font-bold text-white border border-white/[0.1] hover:border-[#00e5ff] hover:text-[#00e5ff] transition"
            >
              <PhoneCall className="size-4 text-[#00e5ff]" />
              <span>+91 63605 98915</span>
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f5e2a3] to-[#c59e33] px-5 py-2.5 text-sm font-black text-[#06090e] shadow-lg shadow-[#d4af37]/20 hover:brightness-110 transition"
            >
              <span>Instant Lift Quote</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container grid gap-12 py-16 lg:grid-cols-[1.3fr_1fr_1fr]">
        {/* Company & Badges */}
        <div className="space-y-6">
          <Brand />
          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            VERTIX TECHNO ELEVATOR is a premier vertical mobility engineering firm in Bengaluru specializing in bespoke residential villa lifts, high-speed commercial passenger elevators, and precision industrial freight elevators across Karnataka.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <ShieldCheck className="size-5 text-[#00e5ff]" />
              <span className="text-xs font-bold text-slate-300">EN 81-20/50 & IS 14665 Compliant</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <Award className="size-5 text-[#d4af37]" />
              <span className="text-xs font-bold text-slate-300">ISO 9001:2015 Certified Manufacturing</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#d4af37]">
            <span>Navigation & Solutions</span>
          </h3>
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-slate-400">
            {quickLinks.map(([label, href]) => (
              <Link
                href={href}
                key={href}
                className="transition duration-200 hover:translate-x-1 hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact & Headquarters */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#d4af37]">Headquarters & Inquiries</h3>
          <div className="mt-5 space-y-3.5 text-sm text-slate-400">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-[#00e5ff]" />
              <span>Ground Floor, 3/3/2, Sarck Preci Tech, Rajagopal Nagar Main Road, 3rd Phase, 9th Cross Road, Beadie Kamadhenu Auto CNC Private Limited, Peenya, Bengaluru, Karnataka - 560058</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-[#00e5ff]" />
              <a href="mailto:manthmint@gmail.com" className="hover:text-white transition">
                manthmint@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <PhoneCall className="size-4 shrink-0 text-[#00e5ff]" />
              <a href="tel:+916360598915" className="hover:text-white transition">
                +91 63605 98915 (Direct Lines)
              </a>
            </div>
            <div className="mt-4 inline-flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">GSTIN</span>
              <span className="text-xs font-black tracking-widest text-[#d4af37]">
                29EIDPM7520J1ZX
              </span>
            </div>
          </div>

          <div className="mt-6 border-t border-white/[0.08] pt-4">
            <div className="flex flex-wrap gap-4 text-xs text-slate-500">
              {legalLinks.map(([label, href]) => (
                <Link href={href} key={href} className="hover:text-slate-300 transition">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06] bg-[#020306] py-6 text-center text-xs text-slate-500">
        <div className="container flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} VERTIX TECHNO ELEVATOR. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="inline-block size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">All elevator systems operational • Telemetry live</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
