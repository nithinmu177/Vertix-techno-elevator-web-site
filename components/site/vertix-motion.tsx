"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const floors = [
  { code: "PH", label: "Sky Penthouse" },
  { code: "03", label: "Innovation Hub" },
  { code: "02", label: "Corporate Deck" },
  { code: "01", label: "Executive Suites" },
  { code: "G", label: "Grand Lobby" },
  { code: "B2", label: "Secure Parking" }
];

export function VertixMotion() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "85%"]);

  return (
    <aside
      className="pointer-events-none sticky top-28 hidden h-[680px] w-36 shrink-0 lg:block select-none"
      aria-hidden
    >
      <div className="relative mx-auto h-full w-full rounded-2xl border border-white/[0.08] bg-[#0a0f18]/60 p-3 shadow-2xl backdrop-blur-xl">
        {/* Header telemetry badge */}
        <div className="mb-4 text-center border-b border-white/[0.06] pb-2">
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#d4af37]">Shaft HUD</p>
          <div className="flex items-center justify-center gap-1.5 mt-0.5">
            <span className="size-1.5 rounded-full bg-[#00e5ff] animate-ping" />
            <span className="text-[10px] font-bold text-slate-400">Live Status</span>
          </div>
        </div>

        {/* Vertical Guide Rail */}
        <div className="relative h-[560px] mx-auto w-1 bg-white/[0.06] rounded-full">
          {/* Shaft Center Wire */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-[#d4af37]/40 via-[#00e5ff]/30 to-[#d4af37]/40" />

          {/* Elevator Cab */}
          <motion.div
            style={{ y }}
            className="absolute -left-4 top-0 z-20 flex size-9 items-center justify-center rounded-xl border border-[#d4af37] bg-gradient-to-br from-[#1c2738] to-[#0a0f18] text-white shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            <div className="relative flex flex-col items-center justify-center">
              <span className="text-[10px] font-black tracking-tighter text-[#f5e2a3]">V</span>
              <span className="size-1 rounded-full bg-[#00e5ff] shadow-[0_0_6px_#00e5ff]" />
            </div>
          </motion.div>

          {/* Floor Markers */}
          {floors.map((floor, index) => (
            <div
              key={floor.code}
              className="absolute left-6 flex items-center gap-2 -translate-y-1/2 whitespace-nowrap"
              style={{ top: `${(index / (floors.length - 1)) * 100}%` }}
            >
              <span className="inline-block size-1.5 rounded-full bg-white/20" />
              <div>
                <strong className="block text-[11px] font-black text-white">{floor.code}</strong>
                <span className="block text-[8px] font-bold uppercase tracking-wider text-slate-400">
                  {floor.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
