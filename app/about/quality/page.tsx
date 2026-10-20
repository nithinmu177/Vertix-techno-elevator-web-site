import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaLink } from "@/components/ui/button";
import { Award, CheckCircle2, ShieldCheck, Layers, Gauge, Sliders } from "lucide-react";

export const metadata = {
  title: "Quality Assurance & Manufacturing Standards | ISO 9001",
  description: "Vertix Techno Elevator follows ISO 9001:2015 quality control with CNC laser fabrication, dynamic load testing, and rigorous metallurgical standards at every stage.",
  alternates: { canonical: "/about/quality" },
  openGraph: {
    title: "Quality Assurance & Standards | Vertix Techno Elevator",
    description: "ISO 9001:2015 certified quality processes in elevator design, manufacturing, and installation — built for long-term reliability and safety."
  }
};

const qualityStandards = [
  {
    title: "Precision CNC Laser Fabrication",
    icon: Sliders,
    desc: "Cabin walls, door headers, and structural car slings are cut and folded with CNC fiber laser machines achieving ±0.2mm mechanical tolerances for rattle-free assembly."
  },
  {
    title: "Dynamic Overload Testing (125% Load)",
    icon: Gauge,
    desc: "Before commissioning handover, every Vertix elevator undergoes full 125% rated capacity dynamic load testing to verify drive torque, brake holding force, and governor trip points."
  },
  {
    title: "High-Tensile Steel Wire Ropes",
    icon: Layers,
    desc: "Certified 8x19 Warrington-Seale high-grade steel core traction cables tested for 12x minimum safety factor against rated working load."
  },
  {
    title: "ISO 9001:2015 Certified Assembly",
    icon: Award,
    desc: "Standardized quality management protocols oversee every stage: component intake, motor calibration, control panel assembly, and factory staging."
  },
  {
    title: "Noise & Vibration Laser Measurement",
    icon: CheckCircle2,
    desc: "In-cabin acoustic checks verify ambient operational sound levels below 45 dB(A) and lateral vibration velocity under 0.1 m/s²."
  },
  {
    title: "Traceable Batch Certification",
    icon: ShieldCheck,
    desc: "Every critical component—from guide shoes to door operators—carries serialized tracking linking directly to original mill test certificates."
  }
];

export default function QualityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-14 shadow-sm mb-16">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3 block">
                Manufacturing Integrity
              </span>
              <h1 className="display-type text-3xl font-extrabold text-[#172B4D] md:text-5xl lg:text-6xl tracking-tight">
                Quality Assurance & Precision Testing
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                At Vertix, every elevator is engineered as a long-term capital investment designed to deliver decades of quiet, trouble-free vertical service.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {qualityStandards.map((q) => {
              const Icon = q.icon;
              return (
                <div
                  key={q.title}
                  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-[#2563EB] hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB] mb-6">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#172B4D]">{q.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#475569]">{q.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-12 shadow-sm flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-[#172B4D]">Inspect Our Quality Standards</h3>
              <p className="mt-1 text-sm text-[#475569]">
                Learn more about our manufacturing processes and visit our Peenya facility in Bengaluru.
              </p>
            </div>
            <CtaLink href="/contact" variant="primary">
              Schedule a Factory Visit
            </CtaLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
