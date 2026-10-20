"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const floors = [
  { code: "PH", label: "Penthouse Level" },
  { code: "03", label: "Commercial Floor" },
  { code: "02", label: "Residential Deck" },
  { code: "01", label: "Upper Living" },
  { code: "G", label: "Grand Lobby" },
  { code: "B1", label: "Parking Level" }
];

export function VertixMotion() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "85%"]);

  return (
    <aside
      className="pointer-events-none sticky top-28 hidden h-[680px] w-36 shrink-0 lg:block select-none"
      aria-hidden
    >
      <div className="relative mx-auto h-full w-full rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-md backdrop-blur-md">
        {/* Header indicator */}
        <div className="mb-4 text-center border-b border-slate-100 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">Shaft Tracker</p>
          <div className="flex items-center justify-center gap-1.5 mt-0.5">
            <span className="size-2 rounded-full bg-[#16A34A] animate-pulse" />
            <span className="text-[10px] font-semibold text-[#475569]">System Active</span>
          </div>
        </div>

        {/* Vertical Guide Rail */}
        <div className="relative h-[560px] mx-auto w-1 bg-slate-200 rounded-full">
          {/* Elevator Cab */}
          <motion.div
            style={{ y }}
            className="absolute -left-4 top-0 z-20 flex size-9 items-center justify-center rounded-xl border-2 border-[#2563EB] bg-white text-[#172B4D] shadow-md shadow-blue-500/20"
          >
            <div className="relative flex flex-col items-center justify-center">
              <span className="text-[10px] font-black text-[#2563EB]">V</span>
              <span className="size-1.5 rounded-full bg-[#16A34A]" />
            </div>
          </motion.div>

          {/* Floor Markers */}
          {floors.map((floor, index) => (
            <div
              key={floor.code}
              className="absolute left-6 flex items-center gap-2 -translate-y-1/2 whitespace-nowrap"
              style={{ top: `${(index / (floors.length - 1)) * 100}%` }}
            >
              <span className="inline-block size-1.5 rounded-full bg-slate-300" />
              <div>
                <strong className="block text-[11px] font-bold text-[#172B4D]">{floor.code}</strong>
                <span className="block text-[9px] font-medium text-[#475569]">
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
