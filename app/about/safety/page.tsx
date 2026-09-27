import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaLink } from "@/components/ui/button";
import { ShieldCheck, AlertOctagon, CheckCircle2, Lock, Flame, Activity } from "lucide-react";

export const metadata = {
  title: "Elevator Safety Standards & Compliance | EN 81-20/50",
  description: "Vertix Techno Elevator builds multi-layer safety mechanisms into every lift: EN 81-20/50 compliance, automatic rescue devices, overspeed governors, and fire-rated doors.",
  alternates: { canonical: "/about/safety" },
  openGraph: {
    title: "Elevator Safety Standards | Vertix Techno Elevator",
    description: "Industry-standard safety compliance in every Vertix elevator installation — ARD rescue, overspeed protection, and EN 81 certified systems."
  }
};

const safetyProtocols = [
  {
    title: "Centrifugal Overspeed Governor",
    icon: AlertOctagon,
    desc: "A fail-safe mechanical flyweight device that monitors car speed independently of software. If rated speed is exceeded by 15%, it instantly trips the safety gear clamps."
  },
  {
    title: "Bi-Directional Progressive Safety Clamps",
    icon: Lock,
    desc: "Heavy-duty hardened steel wedge clamps that physically grip the solid steel guide rails, bringing the fully loaded elevator car to a controlled stop with progressive deceleration."
  },
  {
    title: "Automatic Rescue Device (ARD)",
    icon: ShieldCheck,
    desc: "Integrated industrial battery bank and invertor system that automatically activates upon total building power loss, bringing the car to the nearest floor and opening doors."
  },
  {
    title: "128-Beam Optical Infrared Light Curtain",
    icon: Activity,
    desc: "An invisible infrared web covering the entire door entrance height. The moment any beam is broken, door closing is halted and instantly reversed without physical contact."
  },
  {
    title: "Emergency Fireman Mode & Seismic Interlocks",
    icon: Flame,
    desc: "Automatic integration with building fire alarm panels and ground accelerometers. In an emergency, cars immediately return non-stop to the evacuation exit floor."
  },
  {
    title: "Triple Electro-Mechanical Door Locks",
    icon: CheckCircle2,
    desc: "Every landing door features dual electrical contacts and mechanical interlocks ensuring the elevator car cannot move unless all doors are 100% closed and locked."
  }
];

export default function SafetyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#06090e] py-16 text-slate-100">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-[#0c121e] via-[#111a2c] to-[#0c121e] p-8 lg:p-14 shadow-2xl mb-16">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-[0.24em] text-emerald-400 mb-3 block">
                Zero-Tolerance Safety Benchmark
              </span>
              <h1 className="display-type text-3xl font-black text-white md:text-5xl lg:text-6xl tracking-tight">
                Multi-Layer Passenger Safety Architecture
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                At Vertix, safety is not an afterthought or optional add-on—it is the foundational premise upon which every single structural rail, cable, drive, and circuit board is calculated and certified.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {safetyProtocols.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-3xl border border-white/[0.08] bg-[#0c121e]/80 p-8 shadow-xl backdrop-blur-xl transition hover:border-emerald-500/40 hover:-translate-y-1"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 mb-6">
                    <Icon className="size-6" />
                  </div>
                  <h2 className="text-xl font-black text-white">{p.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{p.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-20 rounded-3xl border border-[#d4af37]/30 bg-gradient-to-r from-[#0c121e] via-[#141f36] to-[#0c121e] p-8 lg:p-12 shadow-2xl flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white">Have Specific Municipal or High-Rise Safety Queries?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Our licensed elevator safety consultants provide full code compliance documentation.
              </p>
            </div>
            <CtaLink href="/contact" variant="primary">
              CONSULT SAFETY ENGINEERS
            </CtaLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
