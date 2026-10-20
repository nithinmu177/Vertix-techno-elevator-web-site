import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaLink } from "@/components/ui/button";
import { Award, CheckCircle2, Cpu, Eye, ShieldCheck, Target, Users, Zap } from "lucide-react";

export const metadata = {
  title: "About Vertix Techno Elevator | Elevator Company in Bengaluru",
  description: "Learn about VERTIX TECHNO ELEVATOR — a professional elevator company based in Peenya, Bengaluru, Karnataka specialising in passenger lifts, home lifts, commercial elevators, installation, AMC and modernization.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Vertix Techno Elevator | Elevator Company in Bengaluru",
    description: "VERTIX TECHNO ELEVATOR is a trusted elevator company in Bengaluru delivering safe, reliable, and energy-efficient vertical transportation solutions for residential and commercial buildings.",
    url: "https://vertix-techno-elevator-web-site.onrender.com/about",
    type: "website",
    siteName: "VERTIX TECHNO ELEVATOR"
  }
};

export default function AboutPage() {
  const coreValues = [
    {
      num: "01",
      title: "SAFETY FIRST",
      icon: ShieldCheck,
      desc: "We prioritize the safety of passengers, customers, technicians, and everyone who interacts with our elevator systems."
    },
    {
      num: "02",
      title: "QUALITY",
      icon: Award,
      desc: "We are committed to delivering reliable elevator solutions with a strong focus on quality components, engineering, installation, and service."
    },
    {
      num: "03",
      title: "RELIABILITY",
      icon: CheckCircle2,
      desc: "We strive to provide dependable elevator systems and responsive maintenance support that our customers can rely on."
    },
    {
      num: "04",
      title: "INNOVATION",
      icon: Cpu,
      desc: "We embrace modern technology and innovative engineering solutions to improve elevator performance, comfort, and efficiency."
    },
    {
      num: "05",
      title: "CUSTOMER FOCUS",
      icon: Users,
      desc: "We understand each customer's requirements and provide solutions tailored to their building, application, and expectations."
    },
    {
      num: "06",
      title: "INTEGRITY",
      icon: Target,
      desc: "We believe in honest communication, transparency, ethical business practices, and building long-term trust with our customers and partners."
    },
    {
      num: "07",
      title: "SUSTAINABILITY",
      icon: Zap,
      desc: "We aim to promote energy-conscious and environmentally responsible solutions while contributing to a more sustainable future."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <div className="container">
          {/* Header & About Company */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-14 shadow-sm mb-16">
            <div className="max-w-4xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3 block">
                About Company • Moving You Higher, Safely and Reliably
              </span>
              <h1 className="display-type text-3xl font-extrabold text-[#172B4D] md:text-5xl lg:text-6xl tracking-tight">
                About VERTIX TECHNO ELEVATOR
              </h1>
              <p className="mt-2 text-base sm:text-lg font-bold text-[#2563EB]">
                Elevator Company in Bengaluru | Elevating Safety, Comfort & Reliability
              </p>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#475569]">
                <p>
                  Headquartered in Peenya Industrial Area, Bengaluru, Karnataka, VERTIX TECHNO ELEVATOR is committed to providing innovative, safe, and reliable solutions for vertical transportation in India. We offer a comprehensive range of high-quality elevator products and services designed to meet the diverse requirements of residential villas, commercial complexes, healthcare facilities, and industrial buildings.
                </p>
                <p>
                  At our core, we believe in putting our customers first. We are dedicated to understanding the unique architectural and shaft requirements of every project in Bengaluru and across Karnataka, providing personalized elevator solutions, professional installation, proactive preventive maintenance, and dependable after-sales assistance.
                </p>
                <p>
                  VERTIX TECHNO ELEVATOR is a company that values quality, innovation, sustainability, and customer satisfaction. We continuously adopt modern propulsion technologies such as Permanent Magnet Synchronous (PMSM) gearless drives and 32-bit closed-loop microprocessor leveling controllers to deliver elevator systems that combine superior ride comfort, uncompromised safety, energy efficiency, and contemporary design.
                </p>
                <p>
                  We operate with integrity and transparency, building long-term relationships with builders, architects, facility managers, and homeowners across Bengaluru and South India.
                </p>
              </div>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="grid gap-8 md:grid-cols-2 mb-16">
            {/* Mission */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-10 shadow-sm">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB] mb-6">
                <Target className="size-7" />
              </div>
              <h2 className="text-2xl font-bold text-[#172B4D]">Our Mission</h2>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                Our mission is to provide safe, reliable, innovative, and efficient elevator solutions that meet the evolving needs of our customers. We are committed to delivering quality products, professional installation, dependable maintenance, and responsive after-sales service while maintaining the highest standards of safety and customer satisfaction.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-10 shadow-sm">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-green-50 text-[#16A34A] mb-6">
                <Eye className="size-7" />
              </div>
              <h2 className="text-2xl font-bold text-[#172B4D]">Our Vision</h2>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                Our vision is to become a trusted and leading elevator solutions provider in India, recognized for quality, innovation, safety, sustainability, and customer-focused service. We aim to create modern vertical transportation solutions that make buildings more accessible, efficient, comfortable, and connected.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
                GUIDING PRINCIPLES
              </span>
              <h2 className="display-type text-3xl font-bold text-[#172B4D] md:text-4xl mt-2">
                Our Core Values
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {coreValues.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="rounded-2xl border border-slate-200 bg-[#F3F6FA] p-6 shadow-sm transition hover:border-[#2563EB] hover:bg-white hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xl font-bold text-slate-300">{val.num}</span>
                      <div className="flex size-10 items-center justify-center rounded-xl bg-white text-[#2563EB] border border-slate-200">
                        <Icon className="size-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-[#172B4D]">{val.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#475569]">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-12 shadow-sm flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-[#172B4D]">Ready to Discuss Your Elevator Project?</h3>
              <p className="mt-1 text-sm text-[#475569]">
                Contact our Bengaluru headquarters for site surveys, CAD designs, and free quotes.
              </p>
            </div>
            <CtaLink href="/contact" variant="primary">
              Contact Our Engineers
            </CtaLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
