import Link from "next/link";
import { Brand } from "./brand";

const links = ["About", "Products", "Services", "Projects", "Technology", "Safety", "Contact"];

export function Footer() {
  return (
    <footer className="bg-[#101613] text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Brand light />
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
            Premium elevator engineering for safer, smarter and more seamless vertical mobility. Company details are editable from Site Settings.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#c6a15b]">Quick Links</h2>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-white/70">
            {links.map((link) => (
              <Link href={link === "Technology" || link === "Safety" ? `/about/${link.toLowerCase()}` : `/${link.toLowerCase()}`} key={link}>
                {link}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#c6a15b]">Legal</h2>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/55">© 2026 Vertix Techno Elevator. Content and claims should be reviewed by the company before launch.</div>
    </footer>
  );
}
