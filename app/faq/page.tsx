import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { getFaqs } from "@/lib/data";
import { CtaLink } from "@/components/ui/button";

export const metadata = {
  title: "Elevator FAQs | Costs, Installation & Safety Standards",
  description: "Find clear answers on elevator installation costs, shaft dimensions, safety codes, and AMC maintenance contracts from VERTIX TECHNO ELEVATOR in Bengaluru.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Elevator FAQs | VERTIX TECHNO ELEVATOR Bengaluru",
    description: "Clear answers to common questions about elevator cost, installation timeline, AMC coverage, and safety standards by VERTIX TECHNO ELEVATOR in Bengaluru.",
    url: "https://vertix-techno-elevator-web-site.onrender.com/faq"
  }
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-14 shadow-sm mb-14">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3 block">
                Elevator Company in Bengaluru • Knowledge Base
              </span>
              <h1 className="display-type text-3xl font-extrabold text-[#172B4D] md:text-5xl lg:text-6xl tracking-tight">
                Frequently Asked Elevator Questions
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                Find clear answers to structural, electrical, pricing, and AMC maintenance questions for home lifts, commercial elevators, and hospital lifts from VERTIX TECHNO ELEVATOR in Bengaluru.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq: any) => (
              <details
                key={faq.id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#2563EB]"
              >
                <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-[#172B4D]">
                  <span>{faq.question}</span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-[#2563EB] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-4 border-t border-slate-100 pt-4 text-sm leading-relaxed text-[#475569]">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-16 max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-10 shadow-sm flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#172B4D]">Have an Unanswered Technical Question?</h3>
              <p className="mt-1 text-xs text-[#475569]">
                Our application engineering team will review your specific architectural requirements.
              </p>
            </div>
            <CtaLink href="/contact" variant="primary">
              Contact Applications Desk
            </CtaLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
