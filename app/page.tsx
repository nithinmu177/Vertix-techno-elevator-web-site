import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { ProductCard, ProjectCard, ServiceCard } from "@/components/site/cards";
import { QuoteForm } from "@/components/forms/quote-form";
import { VertixMotion } from "@/components/site/vertix-motion";
import { ElevatorConfigurator } from "@/components/site/elevator-configurator";
import { QuoteCalculator } from "@/components/site/quote-calculator";
import { VideoShowcaseModal } from "@/components/site/video-showcase-modal";
import { getFaqs, getPosts, getProducts, getProjects, getServices, getSettings, getTestimonials } from "@/lib/data";
import { ArrowDownRight, ArrowUpRight, Check, Gauge, ShieldCheck, Sparkles, Wrench, Cpu, Zap, Activity, Award } from "lucide-react";

export const metadata = {
  title: "Elevator Engineering, Installation & AMC",
  description: "Vertix Techno Elevator designs, installs and maintains safe, energy-efficient elevator systems for homes, commercial buildings and healthcare facilities.",
  alternates: { canonical: "/" }
};

export default async function HomePage() {
  const [settings, products, projects, services, faqs, posts, testimonials] = await Promise.all([
    getSettings(),
    getProducts(),
    getProjects(),
    getServices(),
    getFaqs(),
    getPosts(),
    getTestimonials()
  ]);

  const homepage = settings.homepage as any;
  const stats = settings.statistics as Array<{ value: string; label: string }>;
  const heroMedia = (homepage?.media as any)?.url || "/images/brochure-extracts/extract-02.jpg";

  const showcaseImages = [
    {
      src: "/images/brochure-extracts/extract-02.jpg",
      alt: "Modern elevator entrance with plants and marble wall finish",
      label: "Entrance Architecture",
      subtitle: "Book-matched Italian marble & brushed titanium framing"
    },
    {
      src: "/images/brochure-extracts/extract-31.jpg",
      alt: "Premium golden elevator cabin with decorative ceiling and floor",
      label: "Imperial Gold Cabin",
      subtitle: "Laser-etched champagne gold mirror finishes"
    },
    {
      src: "/images/brochure-extracts/extract-13.jpg",
      alt: "Panoramic glass elevator cabin with contemporary interior finish",
      label: "Panoramic Glass",
      subtitle: "360° architectural structural observation"
    },
    {
      src: "/images/brochure-extracts/extract-15.jpg",
      alt: "Wood finish elevator cabin with stainless steel wall panels",
      label: "Italian Timber Cabs",
      subtitle: "Hand-finished walnut paired with acoustic dampening"
    }
  ];

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden bg-[#06090e] text-slate-100">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-b from-[#d4af37]/10 via-[#00e5ff]/5 to-transparent blur-[120px]" />

        {/* 1. Grand Cinematic Hero Section */}
        <section className="relative min-h-[calc(100vh-80px)] overflow-hidden border-b border-white/[0.08] bg-[#070a12]">
          <Image
            src={heroMedia}
            alt="Vertix Techno Elevators Architectural Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06090e] via-[#06090e]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06090e] via-transparent to-[#06090e]/40" />

          {/* Architectural Grid Overlay */}
          <div className="absolute inset-0 architectural-grid opacity-60" />

          <div className="container relative z-10 grid min-h-[calc(100vh-80px)] items-center gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-3xl">
              {/* Telemetry pill */}
              <div className="mb-6 inline-flex flex-wrap items-center gap-3 rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#d4af37] backdrop-blur-md">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#00e5ff] animate-ping" />
                  <span>GERMAN & JAPANESE DRIVE ENGINEERING</span>
                </span>
                <span className="hidden sm:inline-block h-3 w-px bg-white/20" />
                <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-300">
                  <Gauge className="size-3.5 text-[#00e5ff]" /> 24/7 TELEMETRY
                </span>
              </div>

              <h1 className="display-type text-4xl font-black leading-[1.08] text-white sm:text-6xl md:text-7xl lg:text-8xl tracking-tight">
                {homepage.heroTitle || "THE PINNACLE OF VERTICAL MOBILITY."}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {homepage.heroSubtitle || "Precision permanent magnet gearless drives, whisper-quiet leveling, and bespoke architectural cabin finishes engineered for premier residences and commercial towers."}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CtaLink href="#configurator" variant="primary">
                  EXPLORE 3D CONFIGURATOR
                </CtaLink>
                <CtaLink href="#calculator" variant="secondary">
                  INSTANT COST ESTIMATOR
                </CtaLink>
              </div>

              {/* Bottom Quote & Arrow */}
              <div className="mt-14 flex items-center justify-between border-t border-white/[0.1] pt-6 text-xs font-bold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-2">
                  <Award className="size-4 text-[#d4af37]" /> Built for the moments between floors
                </span>
                <div className="flex items-center gap-1 text-[#d4af37]">
                  <span>Scroll to explore</span>
                  <ArrowDownRight className="size-4" />
                </div>
              </div>
            </div>

            {/* Right: Technical Spec Card */}
            <div className="glass-panel-luxury rounded-3xl p-6 lg:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]">Core Technology</span>
                  <h3 className="text-lg font-black text-white">Vertix Eco-Synchronous Architecture</h3>
                </div>
                <div className="flex size-9 items-center justify-center rounded-xl border border-[#00e5ff]/30 bg-[#00e5ff]/10 text-[#00e5ff]">
                  <Cpu className="size-5" />
                </div>
              </div>

              <div className="grid gap-3.5">
                {[
                  {
                    num: "01",
                    title: "Synchronous PMSM Eco-Drive",
                    text: "Permanent magnet gearless traction delivers up to 40% power conservation and vibration-free ride comfort."
                  },
                  {
                    num: "02",
                    title: "Millimeter Leveling Precision",
                    text: "Closed-loop 32-bit microprocessor vector controller guarantees seamless floor alignment with zero jerk."
                  },
                  {
                    num: "03",
                    title: "Automatic Rescue Device (ARD)",
                    text: "Instant emergency backup drives the cabin to the nearest floor and unlocks doors during power interruption."
                  }
                ].map((item) => (
                  <div key={item.num} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-[#d4af37]/30 hover:bg-white/[0.05]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black text-[#d4af37]">{item.num}</span>
                      <span className="size-1.5 rounded-full bg-[#00e5ff]" />
                    </div>
                    <h4 className="mt-2 text-sm font-black text-white">{item.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Live Key Statistics Bar */}
        <section className="relative z-20 border-b border-white/[0.08] bg-[#0c121e]/90 backdrop-blur-xl">
          <div className="container grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l border-white/[0.08] pl-5 first:border-l-0">
                <strong className="display-type block text-3xl font-black text-white lg:text-4xl">
                  <span className="gold-gradient-text">{stat.value}</span>
                </strong>
                <span className="mt-1 block text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Main Body with Futuristic Vertical Lift HUD Motion */}
        <div className="container flex gap-12 py-24">
          <VertixMotion />

          <div className="min-w-0 flex-1 space-y-28">
            {/* About Vertix Section */}
            <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0e1626] to-[#080c14] p-8 lg:p-14 shadow-2xl backdrop-blur-xl">
              <div className="relative z-10 max-w-3xl">
                <SectionHeading
                  eyebrow="Architectural Discipline"
                  title="REDEFINING VERTICAL MOBILITY WITH PASSION & PRECISION."
                  text="Vertix Techno Elevators combines precision engineering, clean architectural aesthetics, and proactive customer lifecycle management for luxury villas, commercial towers, healthcare facilities, and urban developments."
                />

                <div className="mt-8 flex flex-wrap gap-6 text-xs font-black uppercase tracking-[0.16em] text-slate-300">
                  <span className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5">
                    <ShieldCheck className="size-4 text-[#d4af37]" /> Built on Uncompromising Safety
                  </span>
                  <span className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5">
                    <Wrench className="size-4 text-[#00e5ff]" /> Factory Direct Commissioning
                  </span>
                </div>
              </div>
            </section>

            {/* Interactive 3D Cabin Configurator */}
            <section id="configurator" className="scroll-mt-24">
              <SectionHeading
                eyebrow="Interactive Customization Studio"
                title="Design Your Custom Elevator Interior & Drive."
                text="Experiment with luxury cabin finishes, application requirements, and illumination styles to see your vision materialize in real time."
              />
              <ElevatorConfigurator />
            </section>

            {/* Solutions Matrix */}
            <section>
              <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
                <SectionHeading
                  eyebrow="Core Elevator Models"
                  title="Engineered Systems for Every Structural Typology."
                  text="From luxury villa glass observation lifts to high-capacity industrial freights, explore certified elevator models designed for seamless building integration."
                />
                <CtaLink href="/products" variant="secondary" className="mb-10">
                  VIEW COMPLETE CATALOG
                </CtaLink>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {products.slice(0, 6).map((product: any) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </section>

            {/* Field Engineering Video Lightbox Showcase */}
            <section>
              <VideoShowcaseModal />
            </section>

            {/* Real Craftsmanship Gallery */}
            <section>
              <SectionHeading
                eyebrow="Architectural Portfolio"
                title="Craftsmanship Matched to Discerning Standards."
                text="Inspect entrance designs, luxury cabin interiors, structural glass atriums, and heavy industrial shaft installations."
              />
              <div className="grid auto-rows-[240px] gap-5 md:grid-cols-4">
                {showcaseImages.map((item, index) => (
                  <figure
                    key={item.src}
                    className={`group relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0c121e] shadow-2xl ${
                      index === 0 ? "md:col-span-2 md:row-span-2" : ""
                    }`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-5">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]">
                        {item.label}
                      </span>
                      <p className="mt-1 text-sm font-bold text-white leading-snug">
                        {item.subtitle}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>

            {/* High-Tech Safety & Compliance Blueprint */}
            <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0c121e] via-[#0f1728] to-[#080c14] p-8 lg:p-12 shadow-2xl">
              <SectionHeading
                eyebrow="Safety First"
                title="Uncompromising Multi-Layer Safety Architecture."
                text="Every Vertix installation integrates redundant mechanical and electronic safety backups conforming to EN 81-20/50 standards."
              />

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Automatic Rescue Device (ARD)",
                    desc: "Industrial emergency battery system automatically maneuvers cabin to nearest landing and opens doors during power outages."
                  },
                  {
                    title: "Multi-Beam Infrared Curtain",
                    desc: "Full-height 128-beam optical sensor web prevents door closure if passengers or objects break the threshold."
                  },
                  {
                    title: "Overspeed Governor & Bi-Directional Clamp",
                    desc: "Instant mechanical clamping locks car to guide rails in the event of abnormal downward or upward acceleration."
                  }
                ].map((s) => (
                  <div key={s.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-md">
                    <Check className="size-5 text-[#d4af37]" />
                    <h3 className="mt-3 text-base font-black text-white">{s.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{s.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs font-bold text-slate-400">
                  Full compliance with IS 14665, EN 81-20/50, and ISO 9001:2015 quality standards.
                </span>
                <CtaLink href="/about/safety" variant="secondary">
                  EXPLORE SAFETY PROTOCOLS
                </CtaLink>
              </div>
            </section>

            {/* 5-Phase Turnkey Process */}
            <section>
              <SectionHeading
                eyebrow="Execution Roadmap"
                title="From Structural Survey to 24/7 AMC Support."
                text="Our disciplined 5-phase engineering workflow ensures on-time delivery and millimeter-precise shaft alignment."
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  { step: "01", name: "Site Survey & 3D CAD", desc: "Detailed pit, headroom and shaft plumb verification." },
                  { step: "02", name: "Custom Fabrication", desc: "Precision CNC laser cutting, drive and car assembly." },
                  { step: "03", name: "Shaft Erection", desc: "Guide rails, counterweight and traction rigging installation." },
                  { step: "04", name: "Load Testing & Cert", desc: "Dynamic brake testing, ARD verification and inspection." },
                  { step: "05", name: "24/7 AMC Support", desc: "Proactive monthly maintenance and fast emergency rescue." }
                ].map((p) => (
                  <div key={p.step} className="rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 p-5 backdrop-blur-xl">
                    <span className="font-mono text-2xl font-black text-[#d4af37]">{p.step}</span>
                    <h3 className="mt-3 text-sm font-black text-white">{p.name}</h3>
                    <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Projects Showcase */}
            <section>
              <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
                <SectionHeading
                  eyebrow="Landmark Installations"
                  title="Completed Elevator Commissioning Stories."
                  text="See how Vertix solves complex structural constraints in corporate towers, private villa estates, and specialized healthcare centers."
                />
                <CtaLink href="/projects" variant="secondary" className="mb-10">
                  VIEW ALL PROJECTS
                </CtaLink>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {projects.slice(0, 4).map((project: any) => (
                  <ProjectCard project={project} key={project.id} />
                ))}
              </div>
            </section>

            {/* Interactive Live Instant Cost Estimator */}
            <section id="calculator" className="scroll-mt-24">
              <QuoteCalculator />
            </section>

            {/* Prestigious Client Testimonials */}
            <section>
              <SectionHeading
                eyebrow="Client Endorsements"
                title="Trusted by Architects, Developers & Homeowners."
                text="Read authentic project experiences from leading real estate infrastructure directors and architects."
              />
              <div className="grid gap-6 md:grid-cols-2">
                {testimonials.map((t: any) => (
                  <blockquote
                    key={t.id}
                    className="relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#0c121e]/80 p-8 shadow-xl backdrop-blur-xl"
                  >
                    <div>
                      <div className="flex items-center gap-1 text-[#d4af37] mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Sparkles key={i} className="size-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed text-slate-300 italic">
                        &quot;{t.quote}&quot;
                      </p>
                    </div>
                    <footer className="mt-6 border-t border-white/[0.08] pt-4">
                      <strong className="block text-sm font-black text-white">{t.customerName}</strong>
                      <span className="block text-xs text-[#d4af37]">{t.designation} • {t.company}</span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>

            {/* Technical FAQ */}
            <section>
              <SectionHeading
                eyebrow="Knowledge Base & FAQ"
                title="Common Elevator Engineering Questions."
                text="Clear answers regarding pit requirements, emergency rescue devices, AMC maintenance coverage, and fabrication timelines."
              />
              <div className="grid gap-3.5">
                {faqs.slice(0, 6).map((faq: any) => (
                  <details
                    key={faq.id}
                    className="group rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 p-5 shadow-lg backdrop-blur-xl transition hover:border-[#d4af37]/30"
                  >
                    <summary className="flex cursor-pointer items-center justify-between text-sm font-black text-white">
                      <span>{faq.question}</span>
                      <span className="size-6 shrink-0 rounded-full border border-white/[0.1] text-center text-xs leading-6 text-[#d4af37] transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-xs leading-relaxed text-slate-300 border-t border-white/[0.06] pt-3">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

            {/* Direct Engineering Quote Section */}
            <section id="quote-section" className="grid gap-8 rounded-3xl border border-[#d4af37]/25 bg-gradient-to-r from-[#0c121e] via-[#101828] to-[#0c121e] p-8 lg:p-12 shadow-2xl backdrop-blur-2xl lg:grid-cols-2 items-center">
              <div>
                <SectionHeading
                  eyebrow="Formal Technical Quote"
                  title="Plan Your Vertical Mobility System With Our Engineering Desk."
                  text="Share your site location and requirements to receive transparent factory pricing, preliminary CAD drawings, and load calculations."
                />
                <div className="space-y-3 text-xs text-slate-300 mt-6">
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-[#d4af37]" />
                    <span>Free architectural site feasibility review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-[#d4af37]" />
                    <span>Detailed power load & shaft dimension specifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-[#d4af37]" />
                    <span>Official formal quotation within 2 to 4 business hours</span>
                  </div>
                </div>
              </div>
              <QuoteForm />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
