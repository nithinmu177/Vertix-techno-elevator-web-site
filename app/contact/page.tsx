import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ContactForm } from "@/components/forms/contact-form";
import { PhoneCall, Mail, MapPin, Clock, AlertCircle, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact Us | Elevator Company in Peenya, Bengaluru",
  description: "Contact VERTIX TECHNO ELEVATOR at Peenya, Bengaluru, Karnataka. Call +91 63605 98915 for elevator installation, AMC maintenance, or site surveys.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact VERTIX TECHNO ELEVATOR | Bengaluru, Karnataka",
    description: "Get in touch with VERTIX TECHNO ELEVATOR in Peenya, Bengaluru for elevator installation quotes, AMC contracts, and 24/7 emergency service.",
    url: "https://vertix-techno-elevator-web-site.onrender.com/contact"
  }
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <div className="container">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-12 shadow-sm mb-12">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3 block">
                Elevator Company in Bengaluru • Direct Communications
              </span>
              <h1 className="display-type text-3xl font-extrabold text-[#172B4D] md:text-5xl lg:text-6xl tracking-tight">
                Contact VERTIX TECHNO ELEVATOR
              </h1>
              <p className="mt-3 text-base leading-relaxed text-[#475569]">
                Connect with our applications engineering desk in Peenya, Bengaluru for new elevator project consultations, on-site shaft feasibility surveys, and 24/7 emergency dispatch.
              </p>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Left Contact Details & Hotline */}
            <div>
              <div className="space-y-4">
                {/* Emergency Card */}
                <div className="rounded-2xl border border-red-200 bg-red-50/70 p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 mb-2">
                    <AlertCircle className="size-4" />
                    <span>24/7 Emergency Breakdown Dispatch</span>
                  </div>
                  <p className="text-xl font-bold text-[#172B4D]">
                    <a href="tel:+916360598915" className="hover:text-red-600 transition">
                      +91 63605 98915
                    </a>
                  </p>
                  <p className="mt-1 text-xs text-[#475569]">
                    Immediate emergency passenger rescue hotline with rapid response field routing.
                  </p>
                </div>

                {/* Direct Line Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                      <PhoneCall className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">General Inquiries & Sales</span>
                      <p className="text-base font-bold text-[#172B4D]">
                        <a href="tel:+916360598915" className="hover:text-[#2563EB] transition">
                          +91 63605 98915
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                      <Mail className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Technical Proposals & Drawings</span>
                      <p className="text-base font-bold text-[#172B4D]">
                        <a href="mailto:manthmint@gmail.com" className="hover:text-[#2563EB] transition">
                          manthmint@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Card */}
                <div className="rounded-2xl border border-green-200 bg-green-50/60 p-6 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#16A34A] text-white">
                      <MessageSquare className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#16A34A]">Instant Messaging</span>
                      <p className="text-sm font-bold text-[#172B4D]">WhatsApp Direct Consultation</p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/916360598915?text=Hello%20Vertix%20Techno%20Elevator,%20I%20have%20an%20inquiry%20regarding%20elevators."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-[#16A34A] px-4 py-2 text-xs font-bold text-white hover:bg-[#15803D] transition"
                  >
                    Chat Now
                  </a>
                </div>

                {/* Corporate Address */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Headquarters & Plant</span>
                      <p className="text-sm font-semibold text-[#172B4D] leading-relaxed mt-0.5">
                        Ground Floor, 3/3/2, Sarck Preci Tech, Rajagopal Nagar Main Road, 3rd Phase, 9th Cross Road, Beadie Kamadhenu Auto CNC Private Limited, Peenya, Bengaluru, Karnataka - 560058
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-[#F3F6FA] px-3 py-1.5 shadow-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">GSTIN</span>
                        <span className="text-xs font-bold tracking-widest text-[#172B4D]">29EIDPM7520J1ZX</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs text-[#475569]">
                        <Clock className="size-3.5 text-[#2563EB]" />
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
