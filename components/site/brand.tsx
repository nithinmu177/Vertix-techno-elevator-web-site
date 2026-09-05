import Link from "next/link";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-lg">
      <span className="relative grid size-11 place-items-center overflow-hidden rounded-lg border border-[#c6a15b]/50 bg-[#063f31] text-lg font-black text-white">
        V
        <span className="absolute bottom-1 top-1 w-px bg-[#c6a15b]" />
      </span>
      <span className={light ? "text-white" : "text-[#121815]"}>
        <strong className="block text-sm leading-tight tracking-wide">VERTIX TECHNO</strong>
        <span className="block text-xs font-semibold uppercase text-[#c6a15b]">Elevator</span>
      </span>
    </Link>
  );
}
