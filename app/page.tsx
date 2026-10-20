import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { ProductCard, ProjectCard } from "@/components/site/cards";
import { QuoteForm } from "@/components/forms/quote-form";
import { ElevatorConfigurator } from "@/components/site/elevator-configurator";
import { QuoteCalculator } from "@/components/site/quote-calculator";
import { VideoShowcaseModal } from "@/components/site/video-showcase-modal";
import { getFaqs, getProducts, getProjects, getSettings, getTestimonials } from "@/lib/data";
import {
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Clock,
  PhoneCall,
  Mail,
  MapPin,
  Sparkles,
  Award,
  Layers,
  Building2,
  Home,
  Briefcase,
  Hotel,
  MessageSquare,
  Cpu,
  Check,
  ArrowRight
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  // Page title: company name first so Google shows it on brand searches
  title: "VERTIX TECHNO ELEVATOR — Elevator Company in Bengaluru, Karnataka",
  description: "VERTIX TECHNO ELEVATOR offers elevator installation, annual maintenance (AMC), modernization, and repair in Bengaluru. Trusted by residential and commercial buildings across Karnataka. Call +91 63605 98915.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "VERTIX TECHNO ELEVATOR — Elevator Company in Bengaluru",
    description: "Trusted elevator installation, AMC maintenance, modernization and repair services in Bengaluru, Karnataka. Contact +91 63605 98915 for a free quote.",
    url: "https://vertix-techno-elevator-web-site.onrender.com/",
    type: "website",
    locale: "en_IN",
    siteName: "VERTIX TECHNO ELEVATOR",
    images: [
      {
        url: "https://vertix-techno-elevator-web-site.onrender.com/images/vertix-logo.png",
        width: 1024,
        height: 408,
        alt: "VERTIX TECHNO ELEVATOR — Elevator Company in Bengaluru"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "VERTIX TECHNO ELEVATOR | Elevator Company Bengaluru",
    description: "Elevator installation, maintenance & modernization in Bengaluru. Call +91 63605 98915.",
    images: ["https://vertix-techno-elevator-web-site.onrender.com/images/vertix-logo.png"]
  },
  keywords: [
    "Vertix Techno Elevator",
    "Vertix Techno Elevator Bangalore",
    "Vertix Techno Elevator Bengaluru",
    "Vertix Techno Elevator Peenya",
    "Vertix elevator company",
    "elevator company in Bangalore",
    "elevator company in Bengaluru",
    "lift company Bangalore",
    "lift installation Bengaluru",
    "elevator installation Bangalore",
    "elevator maintenance Bangalore",
    "elevator AMC Bengaluru",
    "elevator modernization Bangalore",
    "elevator repair Bengaluru",
    "passenger elevator Bangalore",
    "residential home lift Bangalore",
    "commercial elevator Bengaluru",
    "elevator service Peenya"
  ]
};

export default async function HomePage() {
  const [settings, products, projects, faqs, testimonials] = await Promise.all([
    getSettings(),
    getProducts(),
    getProjects(),
    getFaqs(),
    getTestimonials()
  ]);

  // FAQ structured data — displayed by Google as rich results under the search listing
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Vertix Techno Elevator offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VERTIX TECHNO ELEVATOR offers elevator installation, annual maintenance contracts (AMC), elevator modernization, emergency repair, and supply of passenger, residential, and commercial lifts in Bengaluru, Karnataka."
        }
      },
      {
        "@type": "Question",
        name: "Where is Vertix Techno Elevator located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VERTIX TECHNO ELEVATOR is located at Ground Floor, 3/3/2, Sarck Preci Tech, Rajagopal Nagar Main Road, 3rd Phase, 9th Cross Road, Peenya, Bengaluru, Karnataka 560058."
        }
      },
      {
        "@type": "Question",
        name: "How do I contact Vertix Techno Elevator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact VERTIX TECHNO ELEVATOR by calling +91 63605 98915 or emailing manthmint@gmail.com. We are available Monday to Saturday, 9 AM to 7 PM."
        }
      },
      {
        "@type": "Question",
        name: "Does Vertix Techno Elevator provide residential home lifts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. VERTIX TECHNO ELEVATOR supplies and installs compact residential home lifts and villa lifts that require minimal civil work and are suitable for independent houses and apartments in Bengaluru."
        }
      },
      {
        "@type": "Question",
        name: "Does Vertix Techno Elevator offer AMC for existing elevators?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We provide Annual Maintenance Contracts (AMC) for elevators of all brands, including preventive maintenance, routine inspections, and 24/7 breakdown support across Bengaluru and Karnataka."
        }
      }
    ]
  };

  const stats = (settings.statistics as Array<{ value: string; label: string }>) || [
    { value: "500+", label: "Lifts Installed" },
    { value: "99.8%", label: "System Uptime" },
    { value: "24/7", label: "Breakdown Support" },
    { value: "100%", label: "Safety Code Compliance" }
  ];

  // Specific 7 Services required by the prompt
  const coreServices = [
    {
      id: "passenger",
      name: "Passenger Elevators",
      description: "Smooth, energy-efficient passenger lifts for residential apartments and corporate towers.",
      icon: UsersIcon,
      href: "/products/passenger-lift"
    },
    {
      id: "residential",
      name: "Residential Elevators",
      description: "Quiet, elegant home and villa lifts with compact footprint and minimal civil shaft requirements.",
      icon: Home,
      href: "/products/home-lift"
    },
    {
      id: "commercial",
      name: "Commercial Elevators",
      description: "High-capacity, high-traffic elevators built for office complexes, tech parks, and commercial hubs.",
      icon: Briefcase,
      href: "/products/mrl-lift"
    },
    {
      id: "installation",
      name: "Elevator Installation",
      description: "Turnkey structural erection, rail alignment, and testing carried out by certified elevator engineers.",
      icon: Building2,
      href: "/services"
    },
    {
      id: "maintenance",
      name: "Elevator Maintenance",
      description: "Proactive preventive maintenance programs and 24/7 AMC support to maximize equipment lifespan.",
      icon: ShieldCheck,
      href: "/services"
    },
    {
      id: "repair",
      name: "Elevator Repair",
      description: "Fast-dispatch emergency repair service with genuine OEM spare parts and prompt breakdown resolution.",
      icon: Wrench,
      href: "/services"
    },
    {
      id: "modernization",
      name: "Elevator Modernization",
      description: "Upgrades for legacy elevator equipment with modern energy-saving PMSM drives and smart controllers.",
      icon: Cpu,
      href: "/services"
    }
  ];

  // Why Choose Us points required by prompt
  const whyChooseUsPoints = [
    {
      title: "Safety-Focused Solutions",
      desc: "Built to strict IS 14665 and EN 81-20/50 standards with multi-layer emergency brakes and infrared door curtains.",
      icon: ShieldCheck
    },
    {
      title: "Reliable Customer Support",
      desc: "Dedicated 24/7 emergency response hotline and prompt on-call technicians across Bengaluru and Karnataka.",
      icon: PhoneCall
    },
    {
      title: "Quality Products & Installation",
      desc: "High-grade components, gearless synchronous motors, and precision millimeter laser shaft alignment.",
      icon: Award
    },
    {
      title: "Professional Maintenance",
      desc: "Scheduled preventive maintenance contracts ensuring smooth operation, zero vibration, and high uptime.",
      icon: Wrench
    },
    {
      title: "Transparent Communication",
      desc: "Honest advice, straightforward pricing, clear project timelines, and regular updates throughout the process.",
      icon: MessageSquare
    },
    {
      title: "Solutions for Different Buildings",
      desc: "Tailored engineering for duplex villas, low-pit residences, high-rise apartments, and commercial complexes.",
      icon: Layers
    }
  ];

  // Project Gallery Categories
  const projectShowcase = [
    {
      title: "Residential Apartments",
      category: "Multi-Story Residential",
      image: "/images/brochure-extracts/extract-02.jpg",
      desc: "Modern passenger elevator installation in a contemporary Bengaluru apartment complex."
    },
    {
      title: "Independent Houses & Villas",
      category: "Luxury Villa",
      image: "/images/brochure-extracts/extract-15.jpg",
      desc: "Custom residential home lift with elegant acoustic timber interior and minimal pit depth."
    },
    {
      title: "Office Buildings",
      category: "Corporate Facility",
      image: "/images/brochure-extracts/extract-13.jpg",
      desc: "High-speed MRL elevator installation for an IT business park in Bengaluru."
    },
    {
      title: "Commercial Complexes",
      category: "Commercial Mall",
      image: "/images/brochure-extracts/extract-31.jpg",
      desc: "Designer stainless steel passenger elevator with high passenger dispatch capacity."
    },
    {
      title: "Hotels & Hospitality",
      category: "Hospitality Suite",
      image: "/images/brochure-extracts/extract-28.jpg",
      desc: "Whisper-quiet passenger elevator designed for hotel guest comfort and seamless ride quality."
    }
  ];

  return (
    <>
      {/* FAQ Structured Data for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      <main className="bg-white text-[#475569]">
        {/* =========================================================================
            1. HERO SECTION (Bright, clean, high-contrast, modern elevator photograph)
           ========================================================================= */}
        <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-[#F3F6FA] via-white to-white py-16 lg:py-24">
          <div className="container grid items-center gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7 max-w-2xl">
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-[#2563EB]">
                <span className="size-2 rounded-full bg-[#16A34A] animate-pulse" />
                <span>Elevator Company in Bengaluru, Karnataka</span>
              </div>

              {/* Exact Required Headline */}
              <h1 className="display-type text-4xl font-extrabold tracking-tight text-[#172B4D] sm:text-5xl md:text-6xl leading-[1.15]">
                Moving You Higher, Safely and Reliably.
              </h1>

              {/* Exact Required Supporting Text */}
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#475569]">
                Discover dependable elevator solutions designed for comfort, safety, and convenience in residential and commercial buildings.
              </p>

              {/* Two Prominent Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CtaLink href="/quote" variant="primary">
                  Get a Free Quote
                </CtaLink>
                <CtaLink href="/services" variant="secondary">
                  Explore Our Services
                </CtaLink>
              </div>

              {/* Quick Trust Indicators */}
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-200 pt-6 text-xs text-[#172B4D] font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#16A34A] shrink-0" />
                  <span>IS 14665 & EN 81 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#2563EB] shrink-0" />
                  <span>24/7 Emergency Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#16A34A] shrink-0" />
                  <span>Transparent Pricing</span>
                </div>
              </div>
            </div>

            {/* Right: Modern High-Quality Elevator Photograph */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-[1] overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-xl">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src="/images/brochure-extracts/extract-02.jpg"
                    alt="Modern elevator installation in contemporary building by Vertix Techno Elevator"
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#172B4D]/60 via-transparent to-transparent" />

                  {/* Floating Highlight Card */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 p-3.5 shadow-lg backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                          Contemporary Architecture
                        </span>
                        <h2 className="text-sm font-bold text-[#172B4D]">
                          Precision Gearless PMSM Elevators
                        </h2>
                      </div>
                      <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-bold text-[#16A34A] border border-green-200">
                        Energy Class A+++
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. KEY STATISTICS BAR (Light Gray section)
           ========================================================================= */}
        <section className="border-b border-slate-200/80 bg-[#F3F6FA] py-8">
          <div className="container grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l border-slate-200 pl-5 first:border-l-0">
                <strong className="block text-3xl font-extrabold text-[#172B4D] sm:text-4xl">
                  {stat.value}
                </strong>
                <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-[#475569]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            3. OUR SERVICES SECTION (White cards, subtle shadows, blue hover effect)
           ========================================================================= */}
        <section id="services" className="scroll-mt-20 py-20 bg-white">
          <div className="container">
            <SectionHeading
              centered
              eyebrow="What We Do"
              title="Our Services"
              text="Comprehensive vertical transportation solutions engineered for safety, ride comfort, and long-term durability."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {coreServices.map((srv) => {
                const IconComponent = srv.icon;
                return (
                  <Link
                    key={srv.id}
                    href={srv.href}
                    className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-lg"
                  >
                    <div>
                      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB] border border-blue-100 transition-colors duration-200 group-hover:bg-[#2563EB] group-hover:text-white">
                        <IconComponent className="size-6" />
                      </div>
                      <h3 className="text-lg font-bold text-[#172B4D] transition-colors duration-200 group-hover:text-[#2563EB]">
                        {srv.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                        {srv.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3.5 text-xs font-bold text-[#2563EB]">
                      <span>Learn More</span>
                      <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. ABOUT US SECTION (Light Gray section introducing Vertix)
           ========================================================================= */}
        <section id="about" className="py-20 bg-[#F3F6FA] border-y border-slate-200/80">
          <div className="container grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-md">
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/images/brochure-extracts/extract-15.jpg"
                    alt="Vertix Techno Elevator craftsmanship and engineering in Bengaluru"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 max-w-xl">
              <SectionHeading
                eyebrow="Who We Are"
                title="Elevator Solutions Engineered With Integrity."
              />
              <p className="text-base leading-relaxed text-[#475569]">
                Headquartered in Peenya Industrial Area, Bengaluru, <strong className="text-[#172B4D]">Vertix Techno Elevator</strong> provides high-quality passenger lifts, residential villa elevators, and commercial elevator systems across Karnataka.
              </p>
              <p className="mt-3 text-base leading-relaxed text-[#475569]">
                We partner with homeowners, builders, architects, and facility managers to design, install, and support elevator systems that deliver quiet ride quality, safety compliance, and energy savings.
              </p>

              {/* 5 Core Commitments Highlighted */}
              <div className="mt-6 space-y-2.5">
                {[
                  "Commitment to Safety and Reliability in every elevator installed",
                  "Quality Installation by experienced elevator engineers",
                  "Customer Satisfaction tailored to specific building requirements",
                  "Professional Service with transparent communication",
                  "Long-Term Maintenance Support with 24/7 emergency assistance"
                ].map((commitment) => (
                  <div key={commitment} className="flex items-center gap-2.5 text-sm font-semibold text-[#172B4D]">
                    <CheckCircle2 className="size-4 text-[#16A34A] shrink-0" />
                    <span>{commitment}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <CtaLink href="/about" variant="primary">
                  Learn More About Us
                </CtaLink>
                <CtaLink href="/about/safety" variant="secondary">
                  Safety Protocols
                </CtaLink>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. WHY CHOOSE US SECTION (White section with 6 key advantages)
           ========================================================================= */}
        <section id="why-choose-us" className="scroll-mt-20 py-20 bg-white">
          <div className="container">
            <SectionHeading
              centered
              eyebrow="Our Advantages"
              title="Why Choose Vertix Techno Elevator"
              text="We focus on dependable engineering, safety compliance, and attentive customer service."
            />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {whyChooseUsPoints.map((point) => {
                const IconComponent = point.icon;
                return (
                  <div
                    key={point.title}
                    className="rounded-2xl border border-slate-200 bg-[#F3F6FA] p-6 transition-all duration-200 hover:border-[#2563EB] hover:bg-white hover:shadow-md"
                  >
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-white text-[#2563EB] border border-slate-200 shadow-xs">
                      <IconComponent className="size-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#172B4D]">
                      {point.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                      {point.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. OUR PROJECTS GALLERY SECTION (White cards, large illustrative images)
           ========================================================================= */}
        <section id="projects" className="py-20 bg-[#F3F6FA] border-y border-slate-200/80">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <SectionHeading
                eyebrow="Real Installations & Applications"
                title="Our Projects & Applications"
                text="Explore modern elevator installations across diverse building types in Bengaluru and Karnataka."
              />
              <CtaLink href="/projects" variant="secondary" className="mb-10">
                View All Case Studies
              </CtaLink>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projectShowcase.map((proj) => (
                <div
                  key={proj.title}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3.5 top-3.5">
                      <span className="inline-flex rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#2563EB] shadow-xs">
                        {proj.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#172B4D] group-hover:text-[#2563EB] transition">
                      {proj.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#475569]">
                      {proj.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Existing dynamic project cards */}
            {projects.length > 0 && (
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {projects.slice(0, 2).map((project: any) => (
                  <ProjectCard project={project} key={project.id} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            7. CORE ELEVATOR MODELS (Products from database)
           ========================================================================= */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <SectionHeading
                eyebrow="Certified Elevator Models"
                title="Engineered for Modern Buildings"
                text="From compact villa elevators to high-speed passenger cars, explore our certified elevator models."
              />
              <CtaLink href="/products" variant="secondary" className="mb-10">
                View Full Catalog
              </CtaLink>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((product: any) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. INTERACTIVE 3D CABIN CONFIGURATOR STUDIO
           ========================================================================= */}
        <section id="configurator" className="scroll-mt-24 py-20 bg-[#F3F6FA] border-y border-slate-200/80">
          <div className="container">
            <SectionHeading
              centered
              eyebrow="Interactive Customization"
              title="Design Your Elevator Interior & Finish"
              text="Select cabin finishes, ceiling lighting, and application requirements to preview options in real time."
            />
            <ElevatorConfigurator />
          </div>
        </section>

        {/* =========================================================================
            9. FIELD ENGINEERING VIDEO FOOTAGE SHOWCASE
           ========================================================================= */}
        <section className="py-20 bg-white">
          <div className="container">
            <VideoShowcaseModal />
          </div>
        </section>

        {/* =========================================================================
            10. MULTI-LAYER SAFETY ARCHITECTURE
           ========================================================================= */}
        <section className="py-20 bg-[#F3F6FA] border-y border-slate-200/80">
          <div className="container">
            <SectionHeading
              eyebrow="Uncompromising Protection"
              title="Multi-Layer Elevator Safety Architecture"
              text="Every Vertix elevator incorporates redundant mechanical and electronic safety mechanisms conforming to EN 81-20/50 and IS 14665 standards."
            />

            <div className="grid gap-6 md:grid-cols-3 mt-8">
              {[
                {
                  title: "Automatic Rescue Device (ARD)",
                  desc: "Integrated emergency battery backup automatically maneuvers the cabin to the nearest floor and unlocks doors during mains power outages."
                },
                {
                  title: "Multi-Beam Infrared Light Curtain",
                  desc: "Full-height 128-beam optical sensor web prevents door closure if passengers, pets, or objects cross the doorway threshold."
                },
                {
                  title: "Overspeed Governor & Safety Gear",
                  desc: "Independent mechanical flyweight governor immediately locks the car to solid guide rails in the event of abnormal acceleration."
                }
              ].map((s) => (
                <div key={s.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-green-50 text-[#16A34A] mb-4">
                    <Check className="size-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#172B4D]">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#475569]">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
              <span className="text-xs font-semibold text-[#475569]">
                Fully compliant with IS 14665, EN 81-20/50, and ISO 9001:2015 quality standards.
              </span>
              <CtaLink href="/about/safety" variant="secondary">
                Read Safety Documentation
              </CtaLink>
            </div>
          </div>
        </section>

        {/* =========================================================================
            11. TURNKEY 5-PHASE PROCESS
           ========================================================================= */}
        <section className="py-20 bg-white">
          <div className="container">
            <SectionHeading
              centered
              eyebrow="Our Workflow"
              title="From Initial Survey to Ongoing Support"
              text="A disciplined engineering roadmap that ensures on-time delivery and millimeter-precise shaft alignment."
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mt-10">
              {[
                { step: "01", name: "Site Survey & CAD", desc: "Detailed pit, headroom and shaft plumb verification." },
                { step: "02", name: "Custom Fabrication", desc: "Precision laser cutting, drive calibration, and car assembly." },
                { step: "03", name: "Shaft Erection", desc: "Guide rails, counterweight, and motor rigging installation." },
                { step: "04", name: "Load Testing & Cert", desc: "Dynamic brake testing, ARD verification, and safety sign-off." },
                { step: "05", name: "24/7 AMC Support", desc: "Proactive monthly maintenance and prompt breakdown assistance." }
              ].map((p) => (
                <div key={p.step} className="rounded-2xl border border-slate-200 bg-[#F3F6FA] p-5">
                  <span className="font-mono text-2xl font-extrabold text-[#2563EB]">{p.step}</span>
                  <h3 className="mt-2.5 text-sm font-bold text-[#172B4D]">{p.name}</h3>
                  <p className="mt-1 text-xs text-[#475569] leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            12. INSTANT COST ESTIMATOR CALCULATOR
           ========================================================================= */}
        <section id="calculator" className="scroll-mt-24 py-20 bg-[#F3F6FA] border-y border-slate-200/80">
          <div className="container">
            <QuoteCalculator />
          </div>
        </section>

        {/* =========================================================================
            13. TESTIMONIALS & FAQ (White section)
           ========================================================================= */}
        <section className="py-20 bg-white">
          <div className="container">
            {/* Testimonials */}
            {testimonials.length > 0 && (
              <div className="mb-16">
                <SectionHeading
                  eyebrow="Customer Reviews"
                  title="Trusted by Homeowners, Builders & Architects"
                  text="Read genuine project experiences from clients who rely on Vertix elevators."
                />
                <div className="grid gap-6 md:grid-cols-2 mt-8">
                  {testimonials.map((t: any) => (
                    <blockquote
                      key={t.id}
                      className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-[#F3F6FA] p-6 shadow-sm"
                    >
                      <div>
                        <div className="flex items-center gap-1 text-[#2563EB] mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Sparkles key={i} className="size-4 fill-current" />
                          ))}
                        </div>
                        <p className="text-sm leading-relaxed text-[#475569] italic">
                          &quot;{t.quote}&quot;
                        </p>
                      </div>
                      <footer className="mt-6 border-t border-slate-200 pt-3">
                        <strong className="block text-sm font-bold text-[#172B4D]">{t.customerName}</strong>
                        <span className="block text-xs text-[#475569]">{t.designation} • {t.company}</span>
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            )}

            {/* Frequently Asked Questions */}
            <div className="mt-16">
              <SectionHeading
                eyebrow="Common Questions"
                title="Frequently Asked Questions"
                text="Find clear answers on elevator requirements, shaft dimensions, and maintenance support."
              />
              <div className="grid gap-3.5 mt-8 max-w-4xl">
                {faqs.slice(0, 6).map((faq: any) => (
                  <details
                    key={faq.id}
                    className="group rounded-2xl border border-slate-200 bg-[#F3F6FA] p-5 transition hover:border-[#2563EB]"
                  >
                    <summary className="flex cursor-pointer items-center justify-between text-sm font-bold text-[#172B4D]">
                      <span>{faq.question}</span>
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-xs text-[#2563EB] group-open:rotate-45 transition">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-xs leading-relaxed text-[#475569] border-t border-slate-200 pt-3">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            14. CUSTOMER ENQUIRY & CONTACT SECTION (Required by Prompt #8 & #9)
           ========================================================================= */}
        <section id="quote-section" className="py-20 bg-[#F3F6FA] border-t border-slate-200/80">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-12 items-start">
              {/* Contact Information & Team Support (#9) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-2">
                    <span className="inline-block size-2 rounded-full bg-[#2563EB]" />
                    <span>Contact Our Team</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-[#172B4D]">
                    Let&apos;s Discuss Your Elevator Project
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                    Whether you are planning an elevator for a new home, upgrading an existing building, or require preventive maintenance in Bengaluru, our engineering team is here to assist you.
                  </p>
                </div>

                {/* Verified Contact Details Cards */}
                <div className="space-y-3 pt-2">
                  {/* Phone */}
                  <div className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                      <PhoneCall className="size-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#475569]">Phone & Hotline</span>
                      <p className="text-base font-bold text-[#172B4D]">
                        <a href="tel:+916360598915" className="hover:text-[#2563EB] transition">
                          +91 63605 98915
                        </a>
                      </p>
                      <span className="text-xs text-[#475569]">Mon – Sat, 9:00 AM – 7:00 PM IST (24/7 Breakdown)</span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                      <Mail className="size-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#475569]">Email Inquiries</span>
                      <p className="text-base font-bold text-[#172B4D]">
                        <a href="mailto:manthmint@gmail.com" className="hover:text-[#2563EB] transition">
                          manthmint@gmail.com
                        </a>
                      </p>
                      <span className="text-xs text-[#475569]">We reply within 2 to 4 business hours</span>
                    </div>
                  </div>

                  {/* Business Address */}
                  <div className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
                      <MapPin className="size-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#475569]">Headquarters & Plant</span>
                      <p className="text-xs font-semibold text-[#172B4D] leading-relaxed mt-0.5">
                        Ground Floor, 3/3/2, Sarck Preci Tech, Rajagopal Nagar Main Road, 3rd Phase, 9th Cross Road, Beadie Kamadhenu Auto CNC Private Limited, Peenya, Bengaluru, Karnataka - 560058
                      </p>
                    </div>
                  </div>

                  {/* WhatsApp Option */}
                  <div className="flex items-center justify-between rounded-2xl border border-green-200 bg-green-50/70 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-[#16A34A] text-white">
                        <MessageSquare className="size-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#172B4D]">Quick WhatsApp Chat</span>
                        <p className="text-xs text-[#475569]">Chat with our technical desk</p>
                      </div>
                    </div>
                    <a
                      href="https://wa.me/916360598915?text=Hello%20Vertix%20Techno%20Elevator,%20I%20am%20interested%20in%20an%20elevator%20solution."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-[#16A34A] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#15803D] transition"
                    >
                      Open WhatsApp
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#172B4D] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2563EB] transition"
                  >
                    <span>Contact Our Team</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>

              {/* Customer Enquiry Form (#8) */}
              <div className="lg:col-span-7">
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// Helper icons
function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
