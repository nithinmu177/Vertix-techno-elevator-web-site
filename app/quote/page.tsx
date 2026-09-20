import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { QuoteForm } from "@/components/forms/quote-form";
import { QuoteCalculator } from "@/components/site/quote-calculator";
import { ShieldCheck, Award, Clock, FileText } from "lucide-react";

export const metadata = {
  title: "Request Formal Elevator Quote & Pricing | Vertix",
  description: "Receive instant customized elevator cost estimates and submit formal architectural specifications to the Vertix engineering team.",
  alternates: { canonical: "/quote" }
};

export default function QuotePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#06090e] py-16 text-slate-100">
        <div className="container">
          {/* Header */}
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-[#0c121e] via-[#111a2c] to-[#0c121e] p-8 lg:p-14 shadow-2xl mb-16">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37] mb-3 block">
                Technical Pricing & Feasibility
              </span>
              <h1 className="display-type text-3xl font-black text-white md:text-5xl lg:text-6xl tracking-tight">
                Request An Engineered Elevator Quote
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Receive accurate turnkey pricing including drive equipment, car architectural finishes, structural guide rails, automatic doors, installation commissioning, and factory warranty.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-xs font-bold text-slate-300">
                <span className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2">
                  <Clock className="size-4 text-[#00e5ff]" /> Proposal within 2-4 Hours
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2">
                  <FileText className="size-4 text-[#d4af37]" /> Complimentary Preliminary CAD Drawings
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2">
                  <ShieldCheck className="size-4 text-emerald-400" /> Direct Factory Transparent Pricing
                </span>
              </div>
            </div>
          </div>

          {/* Quick Interactive Estimator */}
          <div className="mb-16">
            <QuoteCalculator />
          </div>

          {/* Detailed Full Specification Form */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0c121e]/80 p-8 lg:p-12 shadow-2xl backdrop-blur-xl">
            <SectionHeading
              eyebrow="Detailed Project Specifications"
              title="Submit Comprehensive Structural Parameters"
              text="Provide your site specifics below to help our applications team model exact power loads, pit depth allowances, and cabin dimension options."
            />
            <QuoteForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
