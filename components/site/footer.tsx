import Link from "next/link";
import { Brand } from "./brand";
import { ShieldCheck, PhoneCall, Mail, MapPin, Award, Clock, MessageSquare } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Our Projects", href: "/projects" },
  { label: "Why Choose Us", href: "/#why-choose-us" },
  { label: "Contact Us", href: "/contact" },
  { label: "Elevator Models", href: "/products" },
  { label: "Safety Standards", href: "/about/safety" },
  { label: "Technology", href: "/about/technology" },
  { label: "Quality Assurance", href: "/about/quality" },
  { label: "FAQ", href: "/faq" }
];

const serviceLinks = [
  { label: "Passenger Elevators", href: "/products/passenger-lift" },
  { label: "Residential Elevators", href: "/products/home-lift" },
  { label: "Commercial Elevators", href: "/products/mrl-lift" },
  { label: "Elevator Installation", href: "/services" },
  { label: "Elevator Maintenance & AMC", href: "/services" },
  { label: "Elevator Repair", href: "/services" },
  { label: "Elevator Modernization", href: "/services" }
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" }
];

export function Footer() {
  return (
    <footer className="relative bg-[#172B4D] text-white">
      {/* Top Banner: 24/7 Breakdown Assistance & Free Quote */}
      <div className="border-b border-white/10 bg-[#12223c] py-5">
        <div className="container flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600/20 text-[#2563EB]">
              <Clock className="size-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
                24/7 Breakdown & Rescue Support
              </p>
              <p className="text-sm font-semibold text-slate-200">
                Rapid response field engineers on standby across Bengaluru and Karnataka
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/916360598915?text=Hello%20Vertix%20Techno%20Elevator,%20I%20would%20like%20to%20enquire%20about%20elevators"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#16A34A] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#15803D]"
            >
              <MessageSquare className="size-3.5" />
              <span>WhatsApp Us</span>
            </a>
            <a
              href="tel:+916360598915"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/10"
            >
              <PhoneCall className="size-3.5 text-[#2563EB]" />
              <span>+91 63605 98915</span>
            </a>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#1D4ED8]"
            >
              <span>Get a Free Quote</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* 1. Company Information */}
        <div className="space-y-4">
          <Brand light />
          <p className="text-xs leading-relaxed text-slate-300">
            Vertix Techno Elevator delivers safe, dependable, and energy-efficient elevator solutions for residential buildings, villas, commercial complexes, and healthcare facilities across Bengaluru and Karnataka.
          </p>

          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="size-4 text-[#16A34A] shrink-0" />
              <span>IS 14665 & EN 81-20/50 Safety Standard Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Award className="size-4 text-[#2563EB] shrink-0" />
              <span>ISO 9001:2015 Quality Manufacturing Practices</span>
            </div>
          </div>
        </div>

        {/* 2. Quick Navigation */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-xs text-slate-300">
            {quickLinks.slice(0, 6).map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="transition duration-150 hover:text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Our Services */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300">
            Our Services
          </h3>
          <ul className="mt-4 space-y-2 text-xs text-slate-300">
            {serviceLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="transition duration-150 hover:text-white hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Verified Contact Info */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-300">
            Contact Information
          </h3>
          <div className="mt-4 space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#2563EB]" />
              <span>Ground Floor, 3/3/2, Sarck Preci Tech, Rajagopal Nagar Main Road, 3rd Phase, 9th Cross Road, Peenya, Bengaluru, Karnataka - 560058</span>
            </div>
            <div className="flex items-center gap-2.5">
              <PhoneCall className="size-4 shrink-0 text-[#2563EB]" />
              <a href="tel:+916360598915" className="hover:text-white transition">
                +91 63605 98915
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="size-4 shrink-0 text-[#2563EB]" />
              <a href="mailto:manthmint@gmail.com" className="hover:text-white transition">
                manthmint@gmail.com
              </a>
            </div>
            <div className="pt-2">
              <span className="inline-block rounded bg-white/10 px-2.5 py-1 text-[11px] font-mono tracking-wider text-slate-200">
                GSTIN: 29EIDPM7520J1ZX
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-white/10 bg-[#12223c] py-5 text-xs text-slate-400">
        <div className="container flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Vertix Techno Elevator. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            {legalLinks.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className="hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
