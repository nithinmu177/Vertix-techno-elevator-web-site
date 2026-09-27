import Link from "next/link";
import Image from "next/image";

export function Brand({ light: _light = true }: { light?: boolean }) {
  return (
    <Link href="/" className="focus-ring group inline-flex items-center gap-3 rounded-xl transition duration-300 hover:opacity-95">
      <div className="relative flex size-12 items-center justify-center rounded-xl border border-[#d4af37]/35 bg-[radial-gradient(circle_at_30%_20%,rgba(245,226,163,0.28),transparent_30%),linear-gradient(135deg,#16211b,#0a0f18_55%,#11192a)] p-1.5 shadow-[0_10px_30px_rgba(212,175,55,0.12)] transition duration-300 group-hover:border-[#d4af37] group-hover:shadow-[0_12px_36px_rgba(212,175,55,0.22)]">
        <Image src="/images/vertix-logo-mark.svg" alt="Vertix" width={36} height={36} priority className="transition duration-300 group-hover:scale-110" />
      </div>
      <div className="leading-none">
        <div className="flex items-center gap-2">
          <strong className="block font-black text-[15px] tracking-[0.18em] text-white transition duration-300 group-hover:text-[#f5e2a3]">
            VERTIX
          </strong>
          <span className="inline-block size-1.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
        </div>
        <span className="mt-1.5 block text-[8px] font-bold uppercase tracking-[0.28em] text-[#d4af37]">
          Techno Elevators
        </span>
      </div>
    </Link>
  );
}
