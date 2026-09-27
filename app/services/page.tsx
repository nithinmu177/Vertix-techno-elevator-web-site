import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { getServices } from "@/lib/data";
import { CtaLink } from "@/components/ui/button";
import { ShieldCheck, CheckCircle2, Clock, Wrench, RefreshCw, AlertTriangle, PhoneCall } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Engineering Services & 24/7 AMC Support",
  description: "Comprehensive elevator lifecycle services: custom installation, preventive maintenance, modernization, and rapid emergency breakdown rescue.",
  alternates: { canonical: "/services" }
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#06090e] py-16 text-slate-100">
        <div className="container">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-[#0c121e] via-[#111a2c] to-[#0c121e] p-8 lg:p-14 shadow-2xl mb-16">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37] mb-3 block">
                Lifecycle Elevator Engineering
              </span>
              <h1 className="display-type text-3xl font-black text-white md:text-5xl lg:text-6xl tracking-tight">
                Turnkey Installation, Modernization & 24/7 AMC
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                From initial 3D laser shaft feasibility surveys to ongoing round-the-clock telemetry diagnostics, Vertix delivers uninterrupted vertical reliability backed by guaranteed response times.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-xs font-bold text-slate-300">
                <span className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2">
                  <Clock className="size-4 text-[#00e5ff]" /> 30-Min Emergency Response
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2">
                  <ShieldCheck className="size-4 text-emerald-400" /> 48-Point Monthly Safety Audits
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2">
                  <Wrench className="size-4 text-[#d4af37]" /> 100% Genuine OEM Spares
                </span>
              </div>
            </div>
          </div>

          {/* Services Deep Dive */}
          <div className="space-y-12">
            {services.map((service: any, index: number) => (
              <div
                key={service.id}
                className="rounded-3xl border border-white/[0.08] bg-[#0c121e]/80 p-8 lg:p-10 shadow-2xl backdrop-blur-xl"
              >
                <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-black text-[#d4af37]">
                      <span>SERVICE 0{index + 1}</span>
                      <span className="h-px w-8 bg-[#d4af37]/40" />
                    </div>
                    <h2 className="mt-2 text-2xl font-black text-white lg:text-3xl">
                      {service.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {service.description}
                    </p>

                    {/* Key Benefits */}
                    <div className="mt-6 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Guaranteed Deliverables
                      </h4>
                      {service.benefits?.map((benefit: string) => (
                        <div key={benefit} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                          <CheckCircle2 className="size-4 text-[#00e5ff] shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <CtaLink href={`/quote?service=${encodeURIComponent(service.name)}`} variant="primary">
                        REQUEST SERVICE CONSULTATION
                      </CtaLink>
                    </div>
                  </div>

                  {/* 5-Step Process Roadmap */}
                  <div className="rounded-2xl border border-white/[0.06] bg-[#080c14]/90 p-6">
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#d4af37] mb-4">
                      Engineering Execution Process
                    </h3>
                    <div className="space-y-3.5">
                      {service.process?.map((step: string, sIdx: number) => (
                        <div key={step} className="flex items-start gap-3 text-xs">
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-[#d4af37]/30 bg-[#d4af37]/10 font-mono text-[10px] font-black text-[#f5e2a3]">
                            {sIdx + 1}
                          </span>
                          <span className="font-semibold text-slate-300 mt-0.5">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 24/7 Breakdown Hotline Banner */}
          <div className="mt-20 rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-[#0c121e] to-red-950/40 p-8 lg:p-12 shadow-2xl flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-400 mb-2">
                <AlertTriangle className="size-4" />
                <span>Emergency Field Dispatch Unit</span>
              </div>
              <h3 className="text-2xl font-black text-white">Experiencing an Elevator Stoppage or Entrapment?</h3>
              <p className="mt-2 text-sm text-slate-300">
                Our mobile field engineers are stationed across all metro hubs and operate 24 hours a day, 365 days a year with immediate priority dispatch.
              </p>
            </div>
            <a
              href="tel:+916360598915"
              className="inline-flex items-center gap-3 rounded-2xl bg-red-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-red-600/30 hover:bg-red-500 transition"
            >
              <PhoneCall className="size-5" />
              <span>EMERGENCY SOS: +91 63605 98915</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
