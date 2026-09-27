import Link from "next/link";
import Image from "next/image";

export function Brand({ light: _light = true }: { light?: boolean }) {
  return (
    <Link href="/" className="focus-ring group inline-flex items-center gap-2 rounded-xl transition duration-300 hover:opacity-95">
      <div className="relative flex items-center py-1">
        <Image
          src="/images/vertix-logo.png"
          alt="Vertix Techno Elevator"
          width={220}
          height={60}
          priority
          className="h-9 sm:h-11 w-auto object-contain transition duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.25)]"
        />
      </div>
    </Link>
  );
}
