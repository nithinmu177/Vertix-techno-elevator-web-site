import Link from "next/link";
import Image from "next/image";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="focus-ring group inline-flex items-center gap-2 rounded-xl transition duration-200 hover:opacity-95"
    >
      <div className={`relative flex items-center py-1 ${light ? "bg-white px-2.5 py-1 rounded-xl shadow-sm" : ""}`}>
        <Image
          src="/images/vertix-logo.png"
          alt="VERTIX TECHNO ELEVATOR"
          width={220}
          height={60}
          priority
          className="h-9 sm:h-10 w-auto object-contain transition duration-200 group-hover:scale-[1.02]"
        />
      </div>
    </Link>
  );
}
