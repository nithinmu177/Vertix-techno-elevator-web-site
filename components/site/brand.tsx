import Link from "next/link";
import Image from "next/image";

export function Brand({ light: _light = true }: { light?: boolean }) {
  return (
    <Link href="/" className="focus-ring group inline-flex items-center gap-3 rounded-xl transition duration-300">
      <div className="relative flex size-11 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-gradient-to-br from-[#1a2333] to-[#0a0f18] p-1.5 shadow-lg shadow-[#d4af37]/10 transition duration-300 group-hover:border-[#d4af37] group-hover:shadow-[#d4af37]/25">
        <Image src="/images/vertix-logo-mark.svg" alt="Vertix" width={32} height={32} priority className="transition duration-300 group-hover:scale-110" />
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <strong className="block font-black text-[16px] tracking-[0.2em] text-white transition duration-300 group-hover:text-[#f5e2a3]">
            VERTIX
          </strong>
          <span className="inline-block size-1.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
        </div>
        <span className="block text-[9px] font-bold uppercase tracking-[0.26em] text-[#d4af37]">
          Techno Elevators
        </span>
      </div>
    </Link>
  );
}
