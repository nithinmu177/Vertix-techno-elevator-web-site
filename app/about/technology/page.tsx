import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaLink } from "@/components/ui/button";
import { Cpu, Zap, Activity, ShieldCheck, Gauge, Layers } from "lucide-react";

export const metadata = {
  title: "Elevator Technology & Innovation | PMSM, VVVF Drives & IoT",
  description: "Explore the advanced propulsion and control technologies powering Vertix elevators: PMSM gearless motors, 32-bit VVVF drives, and IoT remote telemetry.",
  alternates: { canonical: "/about/technology" },
  openGraph: {
    title: "Elevator Technology & Drives | Vertix Techno Elevator",
    description: "Advanced elevator technologies: synchronous gearless motors, VVVF frequency drives, energy regeneration, and smart IoT monitoring."
  }
};

const techModules = [
  {
    title: "Permanent Magnet Synchronous Motor (PMSM)",
    icon: Zap,
    desc: "Gearless synchronous motor technology delivering up to 40% energy conservation compared to legacy geared drives, operating with zero oil lubrication and quiet acoustics."
  },
  {
    title: "32-Bit Closed-Loop VVVF Vector Controller",
    icon: Cpu,
    desc: "Calculates acceleration and deceleration curves in real-time with micro-second responsiveness, guaranteeing 1mm floor levelling accuracy and jerk-free starts and stops."
  },
  {
    title: "Regenerative Power Harvesting",
    icon: Gauge,
    desc: "Captures potential gravitational energy during counterweight-assisted travel and converts it into clean electricity fed back into the building's internal power network."
  },
  {
    title: "Automatic Rescue Device (ARD)",
    icon: ShieldCheck,
    desc: "High-capacity industrial battery backup automatically powers the drive during mains power failure, gently moving the car to the nearest landing and opening doors safely."
  },
  {
    title: "IoT Remote Diagnostics & Telemetry",
    icon: Activity,
    desc: "Continuous monitoring of vibration sensors, door cycle counts, and thermal patterns sends real-time predictive service telemetry to our central monitoring center."
  },
  {
    title: "Smart Destination Dispatch AI",
    icon: Layers,
    desc: "Algorithms analyze passenger destination requests before boarding, batching passengers efficiently to eliminate intermediate stops and minimize wait times."
  }
];

export default function TechnologyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-14 shadow-sm mb-16">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3 block">
                Next-Generation Vertical Mobility
              </span>
              <h1 className="display-type text-3xl font-extrabold text-[#172B4D] md:text-5xl lg:text-6xl tracking-tight">
                Advanced Elevator Technology
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                Vertix systems combine precision magnetics, VVVF frequency controllers, and closed-loop micro-leveling software to set industry benchmarks for ride comfort, quiet acoustics, and energy conservation.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {techModules.map((mod) => {
              const Icon = mod.icon;
              return (
                <div
                  key={mod.title}
                  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-[#2563EB] hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB] mb-6">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#172B4D]">{mod.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#475569]">{mod.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-12 shadow-sm flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-[#172B4D]">Explore Precision Engineering For Your Building</h3>
              <p className="mt-1 text-sm text-[#475569]">
                Talk to our applications engineering desk for detailed technical specifications and motor drive sizing.
              </p>
            </div>
            <CtaLink href="/quote" variant="primary">
              Request Technical Proposal
            </CtaLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
