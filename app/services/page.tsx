import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { getServices } from "@/lib/data";
import { CtaLink } from "@/components/ui/button";
import { ShieldCheck, CheckCircle2, Clock, Wrench, AlertTriangle, PhoneCall } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Elevator Installation, Maintenance & AMC in Bengaluru",
  description: "Professional elevator installation, preventive maintenance, 24/7 AMC support, and modernization in Bengaluru, Karnataka by VERTIX TECHNO ELEVATOR.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Elevator Installation, Maintenance & AMC in Bengaluru | VERTIX TECHNO ELEVATOR",
    description: "Expert elevator engineering, turnkey installation, 24/7 emergency repair, and preventive AMC maintenance across Bengaluru and Karnataka.",
    url: "https://vertix-techno-elevator-web-site.onrender.com/services"
  }
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <div className="container">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-14 shadow-sm mb-16">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3 block">
                Elevator Company in Bengaluru • Lifecycle Engineering
              </span>
              <h1 className="display-type text-3xl font-extrabold text-[#172B4D] md:text-5xl lg:text-6xl tracking-tight">
                Elevator Installation, Maintenance & Modernization
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                From initial 3D laser shaft feasibility surveys in Bengaluru and across Karnataka to ongoing round-the-clock maintenance diagnostics, VERTIX TECHNO ELEVATOR delivers uninterrupted vertical mobility backed by guaranteed response times.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold text-[#172B4D]">
                <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-xs">
                  <Clock className="size-4 text-[#2563EB]" /> Fast Response Support
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-xs">
                  <ShieldCheck className="size-4 text-[#16A34A]" /> 48-Point Monthly Safety Audits
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-xs">
                  <Wrench className="size-4 text-[#2563EB]" /> 100% Genuine OEM Spares
                </span>
              </div>
            </div>
          </div>

          {/* Services Deep Dive */}
          <div className="space-y-12">
            {services.map((service: any, index: number) => (
              <div
                key={service.id}
                className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-10 shadow-sm"
              >
                <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2563EB]">
                      <span>SERVICE 0{index + 1}</span>
                      <span className="h-px w-8 bg-blue-200" />
                    </div>
                    <h2 className="mt-2 text-2xl font-bold text-[#172B4D] lg:text-3xl">
                      {service.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                      {service.description}
                    </p>

                    {/* Key Benefits */}
                    <div className="mt-6 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#172B4D]">
                        Guaranteed Deliverables
                      </h4>
                      {service.benefits?.map((benefit: string) => (
                        <div key={benefit} className="flex items-center gap-2 text-xs font-medium text-[#475569]">
                          <CheckCircle2 className="size-4 text-[#16A34A] shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <CtaLink href={`/quote?service=${encodeURIComponent(service.name)}`} variant="primary">
                        Request Service Consultation
                      </CtaLink>
                    </div>
                  </div>

                  {/* 5-Step Process Roadmap */}
                  <div className="rounded-2xl border border-slate-200 bg-[#F3F6FA] p-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#172B4D] mb-4">
                      Engineering Execution Process
                    </h3>
                    <div className="space-y-3.5">
                      {service.process?.map((step: string, sIdx: number) => (
                        <div key={step} className="flex items-start gap-3 text-xs">
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-blue-50 border border-blue-200 font-mono text-[10px] font-bold text-[#2563EB]">
                            {sIdx + 1}
                          </span>
                          <span className="font-medium text-[#475569] mt-0.5">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Consultation CTA Banner */}
          <div className="mt-16 rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-12 shadow-sm flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-2 block">
                Free Technical Consultation
              </span>
              <h2 className="text-2xl font-bold text-[#172B4D]">Need an Elevator Installation or AMC Contract in Bengaluru?</h2>
              <p className="mt-2 text-sm text-[#475569]">
                Our application engineers provide free site feasibility surveys, custom CAD shaft layouts, and transparent pricing across Bengaluru and Karnataka.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <CtaLink href="/quote" variant="primary">
                Request Elevator Quote
              </CtaLink>
              <CtaLink href="/contact" variant="secondary">
                Contact Engineering Desk
              </CtaLink>
            </div>
          </div>

          {/* 24/7 Breakdown Hotline Banner */}
          <div className="mt-12 rounded-3xl border border-red-200 bg-red-50/70 p-8 lg:p-12 shadow-sm flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 mb-2">
                <AlertTriangle className="size-4" />
                <span>Emergency Field Dispatch Unit</span>
              </div>
              <h3 className="text-2xl font-bold text-[#172B4D]">Experiencing an Elevator Stoppage?</h3>
              <p className="mt-2 text-sm text-[#475569]">
                Our mobile field engineers are stationed across Bengaluru and operate 24 hours a day with prompt priority response.
              </p>
            </div>
            <a
              href="tel:+916360598915"
              className="inline-flex items-center gap-3 rounded-2xl bg-red-600 px-7 py-4 text-sm font-bold text-white shadow-md shadow-red-600/20 hover:bg-red-700 transition"
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
