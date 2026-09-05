"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const floors = ["ABOUT", "SOLUTIONS", "TECHNOLOGY", "SAFETY", "PROJECTS", "CONTACT"];

export function VertixMotion() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "82%"]);
  return (
    <aside className="pointer-events-none sticky top-28 hidden h-[620px] w-28 shrink-0 lg:block" aria-hidden>
      <div className="relative mx-auto h-full w-px bg-[#063f31]/20">
        <motion.div style={{ y }} className="absolute -left-5 top-0 grid size-10 place-items-center rounded-lg border border-[#c6a15b] bg-[#063f31] text-xs font-black text-white shadow-xl shadow-[#063f31]/25">
          V
        </motion.div>
        {floors.map((floor, index) => (
          <div key={floor} className="absolute left-4 text-xs font-black text-[#063f31]/60" style={{ top: `${index * 16}%` }}>
            {String(index + 1).padStart(2, "0")} {floor}
          </div>
        ))}
      </div>
    </aside>
  );
}
