import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export function LegalPage({ title }: { title: string }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <div className="container max-w-3xl">
          <div className="rounded-2xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-12 shadow-sm">
            <h1 className="text-3xl font-bold text-[#172B4D] md:text-4xl">{title}</h1>
            <p className="mt-6 leading-relaxed text-[#475569]">
              Vertix Techno Elevator is committed to ethical operations, transparency, and the protection of customer privacy and property.
            </p>
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-[#475569]">
              <h2 className="text-lg font-bold text-[#172B4D]">1. Overview</h2>
              <p>
                This document outlines our operating terms, privacy protocols, and service commitments for clients, building owners, architects, and facility managers who interact with Vertix Techno Elevator online and through our engineering services in Bengaluru, Karnataka.
              </p>
              <h2 className="text-lg font-bold text-[#172B4D]">2. Technical Specifications & Quotations</h2>
              <p>
                All elevator models, shaft dimension calculations, power requirements, and cost estimates provided through our online quotation system or technical proposals are engineered based on current site parameters and standard Indian & European elevator codes (IS 14665 & EN 81-20/50).
              </p>
              <h2 className="text-lg font-bold text-[#172B4D]">3. Contact & Inquiries</h2>
              <p>
                If you have questions regarding our legal terms or privacy policies, please reach our administrative office at Peenya Industrial Area, Bengaluru, or write to us at <a href="mailto:manthmint@gmail.com" className="text-[#2563EB] underline">manthmint@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
