import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { getFaqs } from "@/lib/data";
import { CtaLink } from "@/components/ui/button";
import { HelpCircle, PhoneCall } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions | Vertix Elevators",
  description: "Comprehensive answers regarding elevator installation requirements, pit depths, ARD emergency systems, AMC coverage, and costs.",
  alternates: { canonical: "/faq" }
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#06090e] py-16 text-slate-100">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-[#0c121e] via-[#111a2c] to-[#0c121e] p-8 lg:p-14 shadow-2xl mb-14">
            <div className="max-w-3xl">
              <span className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37] mb-3 block">
                Technical Knowledge Base
              </span>
              <h1 className="display-type text-3xl font-black text-white md:text-5xl lg:text-6xl tracking-tight">
                Frequently Asked Elevator Questions
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Find clear answers to common structural, electrical, and maintenance considerations for villa lifts, commercial high-speed systems, and hospital elevators.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq: any) => (
              <details
                key={faq.id}
                className="group rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 p-6 shadow-xl backdrop-blur-xl transition hover:border-[#d4af37]/40"
              >
                <summary className="flex cursor-pointer items-center justify-between text-base font-black text-white">
                  <span>{faq.question}</span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/[0.1] text-xs font-bold text-[#d4af37] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-4 border-t border-white/[0.06] pt-4 text-sm leading-relaxed text-slate-300">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-20 max-w-4xl mx-auto rounded-3xl border border-[#d4af37]/30 bg-gradient-to-r from-[#0c121e] via-[#141f36] to-[#0c121e] p-8 lg:p-10 shadow-2xl flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black text-white">Have an Unanswered Technical Question?</h3>
              <p className="mt-1 text-xs text-slate-300">
                Our application engineering team will review your specific architectural drawings.
              </p>
            </div>
            <CtaLink href="/contact" variant="primary">
              CONTACT APPLICATIONS DESK
            </CtaLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
