import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaLink } from "@/components/ui/button";
import { Award, CheckCircle2, Cpu, Eye, ShieldCheck, Target, Users, Zap } from "lucide-react";

export const metadata = {
  title: "About Us | Vertix Techno Elevators",
  description: "Learn about Vertix Techno Elevators: our engineering roots, mission, architectural craftsmanship, and safety-first philosophy."
};

export default function AboutPage() {
  const pillars = [
    {
      title: "Our Mission",
      icon: Target,
      desc: "To deliver vertical mobility solutions that seamlessly blend precision drive engineering, uncompromised passenger safety, and bespoke architectural aesthetics for premier buildings."
    },
    {
      title: "Our Vision",
      icon: Eye,
      desc: "To be the foremost trusted partner for architects, developers, and homeowners seeking high-reliability, zero-breakdown vertical transport systems across India and global markets."
    },
    {
      title: "Engineering Discipline",
      icon: Cpu,
      desc: "Every Vertix elevator operates on synchronous permanent magnet technology with closed-loop 32-bit vector controllers, guaranteeing millimeter-accurate leveling and whisper-quiet acoustics."
    },
    {
      title: "Safety as a Moral Imperative",
      icon: ShieldCheck,
      desc: "We engineer redundant safety protections into every mechanical and electrical subsystem, strictly adhering to EN 81-20/50 and Bureau of Indian Standards IS 14665."
    },
    {
      title: "Architectural Bespoke Craft",
      icon: Award,
      desc: "We collaborate directly with interior designers and structural consultants to tailor cabin textures—from laser-etched champagne gold mirror brass to acoustic Italian timber and panoramic glass."
    },
    {
      title: "Lifecycle Care & 24/7 SLA",
      icon: Zap,
      desc: "Beyond manufacturing and installation, our dedicated emergency rescue and preventive maintenance teams guarantee 99.9% uptime and 30-minute rapid response."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#06090e] py-16 text-slate-100">
        <div className="container">
          {/* Header */}
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-[#0c121e] via-[#111a2c] to-[#0c121e] p-8 lg:p-14 shadow-2xl mb-16">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37] mb-3 block">
                The Vertix Story & Heritage
              </span>
              <h1 className="display-type text-3xl font-black text-white md:text-5xl lg:text-6xl tracking-tight">
                Engineering The Way Up With Passion & Discipline
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Founded on the premise that elevators are not merely mechanical lifting devices, but vital architectural centerpieces that define the daily rhythm and safety of every modern building.
              </p>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-3xl border border-white/[0.08] bg-[#0c121e]/80 p-8 shadow-xl backdrop-blur-xl transition hover:border-[#d4af37]/40 hover:-translate-y-1"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37] mb-6">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-black text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{pillar.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Bottom Banner */}
          <div className="mt-20 rounded-3xl border border-[#d4af37]/30 bg-gradient-to-r from-[#0c121e] via-[#141f36] to-[#0c121e] p-8 lg:p-12 shadow-2xl flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white">Looking for an Engineered Elevator Solution?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Connect directly with our senior applications team for a site feasibility assessment.
              </p>
            </div>
            <CtaLink href="/contact" variant="primary">
              CONNECT WITH OUR LEADERSHIP
            </CtaLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
