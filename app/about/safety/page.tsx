import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
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
    desc: "Integrated industrial battery bank and inverter system that automatically activates upon total building power loss, bringing the car to the nearest floor and opening doors."
  },
  {
    title: "128-Beam Optical Infrared Light Curtain",
    icon: Activity,
    desc: "An invisible infrared web covering the entire door entrance height. The moment any beam is broken, door closing is halted and instantly reversed without physical contact."
  },
  {
    title: "Emergency Fireman Mode & Seismic Interlocks",
    icon: Flame,
    desc: "Automatic integration with building fire alarm panels. In an emergency, cars immediately return non-stop to the designated evacuation exit floor."
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
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-14 shadow-sm mb-16">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#16A34A] mb-3 block">
                Zero-Tolerance Safety Benchmark
              </span>
              <h1 className="display-type text-3xl font-extrabold text-[#172B4D] md:text-5xl lg:text-6xl tracking-tight">
                Multi-Layer Passenger Safety Architecture
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                At Vertix, safety is the foundational premise upon which every single structural rail, cable, drive, and electronic controller is calculated, inspected, and certified.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {safetyProtocols.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-[#16A34A] hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-green-50 text-[#16A34A] mb-6">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#172B4D]">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#475569]">{p.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-12 shadow-sm flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-[#172B4D]">Have Questions About Building Safety Standards?</h3>
              <p className="mt-1 text-sm text-[#475569]">
                Our safety engineering team conducts complete building structural reviews and code compliance checks.
              </p>
            </div>
            <CtaLink href="/contact" variant="primary">
              Consult a Safety Engineer
            </CtaLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
