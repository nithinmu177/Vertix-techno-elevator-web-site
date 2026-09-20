import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { PhoneCall, Mail, MapPin, Clock, ShieldCheck, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Contact Engineering & 24/7 Hotline | Vertix",
  description: "Get in touch with Vertix Techno Elevators for new project consultations, 24/7 emergency dispatch, and technical customer service.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#06090e] py-16 text-slate-100">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Left Contact Details & Hotline */}
            <div>
              <SectionHeading
                eyebrow="Direct Communications"
                title="Connect With Our Applications Engineering Desk."
                text="Whether discussing custom elevator shaft dimensions for an upcoming project, scheduling an on-site feasibility survey, or requesting emergency service."
              />

              <div className="mt-8 space-y-4">
                {/* Emergency Card */}
                <div className="rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-[#0c121e] to-red-950/30 p-6 shadow-xl">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-400 mb-2">
                    <AlertCircle className="size-4" />
                    <span>24/7 Emergency Breakdown Dispatch</span>
                  </div>
                  <p className="text-xl font-black text-white">+91 63605 98915</p>
                  <p className="mt-1 text-xs text-slate-300">
                    Immediate emergency passenger rescue hotline with rapid response field routing.
                  </p>
                </div>

                {/* Direct Line Card */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 p-6 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 text-[#d4af37]">
                      <PhoneCall className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">General Inquiries & Sales</span>
                      <p className="text-base font-black text-white">+91 63605 98915</p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 p-6 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl border border-[#00e5ff]/30 bg-[#00e5ff]/10 text-[#00e5ff]">
                      <Mail className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Technical Proposals & Drawings</span>
                      <p className="text-base font-black text-white">manthmint@gmail.com</p>
                    </div>
                  </div>
                </div>

                {/* Corporate Address */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 p-6 backdrop-blur-xl">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.05] text-slate-300">
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Headquarters & Manufacturing</span>
                      <p className="text-sm font-semibold text-white leading-relaxed mt-0.5">
                        Ground Floor, Building No. 36/2, Sarck Preci Tech, Rajgopal Nagar Main Road, 3rd Phase, 9th Cross Road, Peenya, Bengaluru, Karnataka 560058
                      </p>
                      <div className="mt-4 inline-flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-[#0c121e] px-3 py-2 shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">GSTIN</span>
                        <span className="text-xs font-black tracking-widest text-[#d4af37]">29EIDPM7520J1ZX</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                        <Clock className="size-3.5 text-[#d4af37]" />
                        <span>Corporate Hours: Mon – Sat 09:00 to 19:00 IST</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
