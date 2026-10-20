import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { QuoteForm } from "@/components/forms/quote-form";
import { QuoteCalculator } from "@/components/site/quote-calculator";
import { ShieldCheck, Clock, FileText } from "lucide-react";

export const metadata = {
  title: "Request an Elevator Quote | Bengaluru, Karnataka",
  description: "Get a customized elevator quote from VERTIX TECHNO ELEVATOR for passenger elevators, residential home lifts, or goods elevators in Bengaluru.",
  alternates: { canonical: "/quote" },
  openGraph: {
    title: "Request an Elevator Quote | VERTIX TECHNO ELEVATOR Bengaluru",
    description: "Receive instant customized elevator estimates and submit project specifications to the VERTIX TECHNO ELEVATOR engineering team in Bengaluru.",
    url: "https://vertix-techno-elevator-web-site.onrender.com/quote"
  }
};

export default function QuotePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <div className="container">
          {/* Header */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-14 shadow-sm mb-16">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3 block">
                Elevator Company in Bengaluru • Technical Pricing & Feasibility
              </span>
              <h1 className="display-type text-3xl font-extrabold text-[#172B4D] md:text-5xl lg:text-6xl tracking-tight">
                Request a Free Elevator Quote
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                Receive accurate turnkey pricing from VERTIX TECHNO ELEVATOR including drive equipment, car architectural finishes, structural guide rails, automatic doors, installation commissioning, and factory warranty across Karnataka.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold text-[#172B4D]">
                <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-xs">
                  <Clock className="size-4 text-[#2563EB]" /> Proposal within 2-4 Hours
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-xs">
                  <FileText className="size-4 text-[#2563EB]" /> Preliminary CAD Drawings
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-xs">
                  <ShieldCheck className="size-4 text-[#16A34A]" /> Direct Factory Transparent Pricing
                </span>
              </div>
            </div>
          </div>

          {/* Quick Interactive Estimator */}
          <div className="mb-16">
            <QuoteCalculator />
          </div>

          {/* Detailed Full Specification Form */}
          <div className="rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-12 shadow-sm">
            <SectionHeading
              eyebrow="Detailed Project Specifications"
              title="Submit Comprehensive Structural Parameters"
              text="Provide your site specifics below to help our applications team model exact power loads, pit depth allowances, and cabin dimension options."
            />
            <div className="max-w-3xl mx-auto">
              <QuoteForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
