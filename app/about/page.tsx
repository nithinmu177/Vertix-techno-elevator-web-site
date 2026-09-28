import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaLink } from "@/components/ui/button";
import { Award, CheckCircle2, Cpu, Eye, ShieldCheck, Target, Users, Zap } from "lucide-react";

export const metadata = {
  title: "About Us | Elevator Company in Bengaluru",
  description: "Learn about VERTIX TECHNO ELEVATOR — premier elevator company based in Peenya, Bengaluru, Karnataka specializing in passenger, home, and commercial lifts.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | VERTIX TECHNO ELEVATOR Bengaluru",
    description: "VERTIX TECHNO ELEVATOR is a certified elevator company in Bengaluru delivering safe, reliable, and energy-efficient vertical transportation solutions.",
    url: "https://vertix-techno-elevator-web-site.onrender.com/about"
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
      <main className="min-h-screen bg-[#06090e] py-16 text-slate-100">
        <div className="container">
          {/* Header & About Company */}
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-[#0c121e] via-[#111a2c] to-[#0c121e] p-8 lg:p-14 shadow-2xl mb-16">
            <div className="max-w-4xl">
              <span className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37] mb-3 block">
                ABOUT COMPANY • ELEVATING NATURE. ENRICHING LIFE.
              </span>
              <h1 className="display-type text-3xl font-black text-white md:text-5xl lg:text-6xl tracking-tight">
                About VERTIX TECHNO ELEVATOR
              </h1>
              <p className="mt-2 text-lg font-bold text-[#00e5ff]">
                Elevator Company in Bengaluru | Elevating Safety, Comfort & Reliability
              </p>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-300">
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
            <div className="rounded-3xl border border-[#d4af37]/30 bg-gradient-to-b from-[#0e1626] to-[#080c14] p-8 lg:p-10 shadow-2xl">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-[#d4af37]/40 bg-[#d4af37]/10 text-[#d4af37] mb-6">
                <Target className="size-7" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">Our Mission</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Our mission is to provide safe, reliable, innovative, and efficient elevator solutions that meet the evolving needs of our customers. We are committed to delivering quality products, professional installation, dependable maintenance, and responsive after-sales service while maintaining the highest standards of safety and customer satisfaction.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-3xl border border-[#00e5ff]/30 bg-gradient-to-b from-[#0e1626] to-[#080c14] p-8 lg:p-10 shadow-2xl">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-[#00e5ff]/40 bg-[#00e5ff]/10 text-[#00e5ff] mb-6">
                <Eye className="size-7" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-wider">Our Vision</h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Our vision is to become a trusted and leading elevator solutions provider in India, recognized for quality, innovation, safety, sustainability, and customer-focused service. We aim to create modern vertical transportation solutions that make buildings more accessible, efficient, comfortable, and connected.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37]">
                GUIDING PRINCIPLES
              </span>
              <h2 className="display-type text-3xl font-black text-white md:text-4xl mt-2">
                Our Core Values
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {coreValues.map((val) => {
                const Icon = val.icon;
                return (
                  <div
                    key={val.title}
                    className="rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 p-6 shadow-xl backdrop-blur-xl transition hover:border-[#d4af37]/40 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-2xl font-black text-[#d4af37]/40">{val.num}</span>
                      <div className="flex size-10 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.05] text-[#d4af37]">
                        <Icon className="size-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-black text-white tracking-wide">{val.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{val.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="rounded-3xl border border-[#d4af37]/30 bg-gradient-to-r from-[#0c121e] via-[#141f36] to-[#0c121e] p-8 lg:p-12 shadow-2xl flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white">Ready to Discuss Your Elevator Project?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Contact our Bangalore headquarters for site surveys, CAD designs, and quotes.
              </p>
            </div>
            <CtaLink href="/contact" variant="primary">
              CONTACT OUR ENGINEERS
            </CtaLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
