import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
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
    desc: "Cabin walls, door headers, and structural car slings are cut and folded with CNC fiber laser machines achieving ±0.2mm mechanical tolerances for rattle-free assembly."
  },
  {
    title: "Dynamic Overload Testing (125% Load)",
    desc: "Before commissioning handover, every Vertix elevator undergoes full 125% rated capacity dynamic load testing to verify drive torque, brake holding force, and governor trip points."
  },
  {
    title: "High-Tensile Steel Wire Ropes",
    desc: "Certified 8x19 Warrington-Seale high-grade steel core traction cables tested for 12x minimum safety factor against rated working load."
  },
  {
    title: "ISO 9001:2015 Certified Assembly",
    desc: "Standardized quality management protocols oversee every stage: component intake, motor calibration, control panel assembly, and factory staging."
  },
  {
    title: "Noise & Vibration Laser Measurement",
    desc: "In-cabin acoustic checks verify ambient operational sound levels below 45 dB(A) and lateral vibration velocity under 0.1 m/s²."
  },
  {
    title: "Traceable Batch Certification",
    desc: "Every critical component—from guide shoes to door operators—carries serialized QR batch tags linking directly to original mill test certificates."
  }
];

export default function QualityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#06090e] py-16 text-slate-100">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-[#0c121e] via-[#111a2c] to-[#0c121e] p-8 lg:p-14 shadow-2xl mb-16">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37] mb-3 block">
                Manufacturing Integrity
              </span>
              <h1 className="display-type text-3xl font-black text-white md:text-5xl lg:text-6xl tracking-tight">
                Quality Assurance & Precision Testing
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                At Vertix, every elevator is engineered as a long-term capital investment designed to deliver 25+ years of quiet, trouble-free vertical service.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {qualityStandards.map((q) => (
              <div
                key={q.title}
                className="rounded-3xl border border-white/[0.08] bg-[#0c121e]/80 p-8 shadow-xl backdrop-blur-xl transition hover:border-[#d4af37]/40 hover:-translate-y-1"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] mb-6">
                  <Award className="size-6" />
                </div>
                <h2 className="text-xl font-black text-white">{q.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{q.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 rounded-3xl border border-[#d4af37]/30 bg-gradient-to-r from-[#0c121e] via-[#141f36] to-[#0c121e] p-8 lg:p-12 shadow-2xl flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white">Request Factory Test Certificates</h3>
              <p className="mt-1 text-sm text-slate-300">
                Download mill test reports, motor performance curves, and ISO audit summaries.
              </p>
            </div>
            <CtaLink href="/contact" variant="primary">
              REQUEST QUALITY DOSSIER
            </CtaLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
