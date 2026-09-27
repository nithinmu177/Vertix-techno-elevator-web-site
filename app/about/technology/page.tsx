import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaLink } from "@/components/ui/button";
import { Cpu, Zap, Activity, ShieldCheck, Gauge, Layers } from "lucide-react";

export const metadata = {
  title: "Elevator Technology & Drives | Vertix",
  description: "Explore the advanced propulsion and control technologies powering Vertix elevators: PMSM gearless motors, 32-bit VVVF drives, and IoT telemetry."
};

const techModules = [
  {
    title: "Permanent Magnet Synchronous Motor (PMSM)",
    icon: Zap,
    desc: "Gearless synchronous motor technology delivering up to 40% energy conservation compared to legacy geared drives, operating with zero oil lubrication and near-zero heat loss."
  },
  {
    title: "32-Bit Closed-Loop VVVF Vector Controller",
    icon: Cpu,
    desc: "Calculates acceleration and deceleration curves in real-time with micro-second responsiveness, guaranteeing 1mm floor levelling accuracy and jerk-free starts and stops."
  },
  {
    title: "Regenerative Power Harvesting",
    icon: Gauge,
    desc: "Captures potential gravitational energy during counterweight-assisted descents and converts it into clean AC electricity fed back into the building's internal power network."
  },
  {
    title: "Automatic Rescue Device (ARD)",
    icon: ShieldCheck,
    desc: "High-capacity industrial battery backup automatically powers the drive during mains power failure, gently moving the car to the nearest landing and opening the doors safely."
  },
  {
    title: "IoT Remote Diagnostics & Telemetry",
    icon: Activity,
    desc: "Continuous monitoring of vibration sensors, door cycle counts, and thermal patterns sends real-time predictive service telemetry to our central monitoring center."
  },
  {
    title: "Smart Destination Dispatch AI",
    icon: Layers,
    desc: "Algorithms analyze passenger destination requests before boarding, batching passengers efficiently to eliminate intermediate stops and reduce wait times by up to 40%."
  }
];

export default function TechnologyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#06090e] py-16 text-slate-100">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-[#0c121e] via-[#111a2c] to-[#0c121e] p-8 lg:p-14 shadow-2xl mb-16">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-[0.24em] text-[#00e5ff] mb-3 block">
                Next-Generation Vertical Propulsion
              </span>
              <h1 className="display-type text-3xl font-black text-white md:text-5xl lg:text-6xl tracking-tight">
                Advanced Elevator Technology
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Vertix systems combine German-engineered magnetics, Japanese VVVF power electronics, and proprietary micro-leveling software to set new industry benchmarks for ride comfort, whisper acoustics, and energy conservation.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {techModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.title}
                  className="rounded-3xl border border-white/[0.08] bg-[#0c121e]/80 p-8 shadow-xl backdrop-blur-xl transition hover:border-[#00e5ff]/40 hover:-translate-y-1"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-[#00e5ff]/30 bg-[#00e5ff]/10 text-[#00e5ff] mb-6">
                    <Icon className="size-6" />
                  </div>
                  <h2 className="text-xl font-black text-white">{mod.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{mod.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Drive & Motor Engineering (From Brochure Page 4) */}
          <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-[#0e1626] to-[#080c14] p-8 lg:p-12 shadow-2xl mb-16">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37]">
                MOTOR SELECTION • DIRECT OEM PARTNERSHIPS
              </span>
              <h2 className="display-type text-2xl font-black text-white md:text-3xl mt-2">
                Heavy-Duty Drive Motors (Gearless & Geared)
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Vertix partners with world-leading motor manufacturers to guarantee silent acoustic operation, zero lubrication maintenance, and decades of operational endurance.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Montanari */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#0c121e] p-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                  <h3 className="text-lg font-black text-white">Montanari Giulio & C.</h3>
                  <span className="text-xs font-bold text-[#d4af37]">Italy</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center justify-between"><span>5 HP Gearless PMSM</span><span className="font-mono text-[#00e5ff]">Smooth Traction</span></li>
                  <li className="flex items-center justify-between"><span>10 HP Gearless PMSM</span><span className="font-mono text-[#00e5ff]">High-Speed</span></li>
                  <li className="flex items-center justify-between"><span>5 HP Geared Motor</span><span className="font-mono text-slate-400">High-Torque</span></li>
                </ul>
              </div>

              {/* Torin */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#0c121e] p-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                  <h3 className="text-lg font-black text-white">Torin Drive Motors</h3>
                  <span className="text-xs font-bold text-[#00e5ff]">Global Leader</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center justify-between"><span>5 HP Gearless Motor</span><span className="font-mono text-[#00e5ff]">Ultra-Compact</span></li>
                  <li className="flex items-center justify-between"><span>10 HP Gearless Motor</span><span className="font-mono text-[#00e5ff]">Commercial Duty</span></li>
                  <li className="flex items-center justify-between"><span>5 HP Geared Hoisting</span><span className="font-mono text-slate-400">Continuous Duty</span></li>
                </ul>
              </div>

              {/* Mona */}
              <div className="rounded-2xl border border-white/[0.08] bg-[#0c121e] p-6">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                  <h3 className="text-lg font-black text-white">Mona Drive Systems</h3>
                  <span className="text-xs font-bold text-emerald-400">Precision</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center justify-between"><span>5 HP Gearless PMSM</span><span className="font-mono text-[#00e5ff]">Villa / Low-Rise</span></li>
                  <li className="flex items-center justify-between"><span>10 HP Gearless PMSM</span><span className="font-mono text-[#00e5ff]">Mid-Rise Tower</span></li>
                  <li className="flex items-center justify-between"><span>5 HP Geared Motor</span><span className="font-mono text-slate-400">Heavy Goods</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Overhead & Shaft Requirements (From Brochure Page 13, 15, 19) */}
          <div className="grid gap-6 md:grid-cols-3 mb-16">
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c121e] p-6 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">Hydraulic Lift</span>
              <p className="mt-2 text-3xl font-black text-white">10 – 12 Feet</p>
              <p className="mt-1 text-xs text-slate-400">Minimum Overhead Requirement</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                Ideal for restricted roof headroom, low-rise villas, and heavy industrial freight.
              </p>
            </div>

            <div className="rounded-2xl border border-[#00e5ff]/30 bg-[#0c121e] p-6 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00e5ff]">MRL (Machine Room Less)</span>
              <p className="mt-2 text-3xl font-black text-white">14+ Feet Min</p>
              <p className="mt-1 text-xs text-slate-400">Headroom Overhead (4500mm / Pit: 1500mm)</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                Motor mounted directly in shaft ceiling. Completely eliminates rooftop concrete penthouse.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#0c121e] p-6 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">LMR (With Machine Room)</span>
              <p className="mt-2 text-3xl font-black text-white">7+ to 10+ Feet</p>
              <p className="mt-1 text-xs text-slate-400">Overhead: 4500mm • MR: 2100mm • Pit: 1350mm</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-300">
                Dedicated overhead machine room for high-traffic, high-speed commercial passenger towers.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-[#d4af37]/30 bg-gradient-to-r from-[#0c121e] via-[#141f36] to-[#0c121e] p-8 lg:p-12 shadow-2xl flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white">Review Engineering Blueprints</h3>
              <p className="mt-1 text-sm text-slate-300">
                Request power supply schematics, drive kW ratings, and shaft load charts.
              </p>
            </div>
            <CtaLink href="/quote" variant="primary">
              REQUEST TECHNICAL SPEC SHEETS
            </CtaLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
