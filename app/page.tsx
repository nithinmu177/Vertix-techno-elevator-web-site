import Image from "next/image";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { ProductCard, ProjectCard, ServiceCard } from "@/components/site/cards";
import { QuoteForm } from "@/components/forms/quote-form";
import { VertixMotion } from "@/components/site/vertix-motion";
import { getFaqs, getPosts, getProducts, getProjects, getServices, getSettings, getTestimonials } from "@/lib/data";

export default async function HomePage() {
  const [settings, products, projects, services, faqs, posts, testimonials] = await Promise.all([getSettings(), getProducts(), getProjects(), getServices(), getFaqs(), getPosts(), getTestimonials()]);
  const homepage = settings.homepage as any;
  const stats = settings.statistics as Array<{ value: string; label: string }>;
  const heroMedia = (homepage?.media as any)?.url || "/images/demo-hero.svg";
  return (
    <>
      <Navbar />
      <main>
        <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#101613] text-white">
          <Image src={heroMedia} alt="Vertix hero media selected from admin settings" fill priority className="object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101613] via-[#101613]/70 to-transparent" />
          <div className="container relative flex min-h-[calc(100vh-80px)] items-end pb-16">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-black uppercase text-[#c6a15b]">VERTICAL + TECHNOLOGY + PRECISION</p>
              <h1 className="text-5xl font-black leading-none md:text-7xl">{homepage.heroTitle}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">{homepage.heroSubtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CtaLink href="/products">{homepage.heroButton}</CtaLink>
                <CtaLink href="/quote" variant="secondary">{homepage.quoteButton}</CtaLink>
              </div>
            </div>
          </div>
        </section>
        <section className="border-y border-[#063f31]/10 bg-white">
          <div className="container grid gap-px md:grid-cols-4">
            {stats.map((stat) => (
              <div className="py-8" key={stat.label}>
                <strong className="block text-3xl font-black text-[#063f31]">{stat.value}</strong>
                <span className="text-sm font-bold text-[#56635d]">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
        <div className="container flex gap-10 py-20">
          <VertixMotion />
          <div className="min-w-0 flex-1 space-y-24">
            <section><SectionHeading eyebrow="About Vertix" title="VERTICAL MOBILITY, REIMAGINED." text="Vertix Techno Elevator combines engineering discipline, clean design thinking and customer-focused service. Company history, values and claims are editable from admin settings so the live site can stay accurate." /></section>
            <section><SectionHeading eyebrow="Solutions" title="Elevator systems for precise building movement." /><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{services.slice(0, 4).map((s: any) => <ServiceCard service={s} key={s.id} />)}</div></section>
            <section><SectionHeading eyebrow="Featured Products" title="Database-driven product catalog." /><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{products.slice(0, 6).map((p: any) => <ProductCard product={p} key={p.id} />)}</div></section>
            <section className="rounded-lg bg-[#102019] p-8 text-white"><SectionHeading eyebrow="Technology" title="Smart controls, efficient drives and precision engineering." text="Use the media library to add elevator design diagrams, control panels, testing videos and technical visuals." /><CtaLink href="/about/technology" variant="secondary">DISCOVER TECHNOLOGY</CtaLink></section>
            <section><SectionHeading eyebrow="Safety" title="Safety claims stay editable and reviewable." text="The site avoids inventing certifications. Add certificates and safety details in admin when verified." /></section>
            <section><SectionHeading eyebrow="Installation Process" title="From consultation to maintenance support." /><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{["Consultation","Site Survey","Design & Engineering","Manufacturing","Installation","Testing & Commissioning","Maintenance & Support"].map((step, i) => <div className="rounded-lg border border-[#063f31]/10 bg-white p-5" key={step}><span className="text-xl font-black text-[#c6a15b]">{String(i+1).padStart(2,"0")}</span><h3 className="mt-2 font-black">{step}</h3></div>)}</div></section>
            <section><SectionHeading eyebrow="Featured Projects" title="Project media managed from the dashboard." /><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{projects.slice(0, 6).map((p: any) => <ProjectCard project={p} key={p.id} />)}</div></section>
            <section className="rounded-lg border border-[#063f31]/10 bg-white p-6"><SectionHeading eyebrow="See Vertix In Motion" title="Video showcase ready for uploaded elevator videos." text="Upload MP4 or WEBM files in Admin Media, then select them for hero, products, projects and showcase sections." /></section>
            <section><SectionHeading eyebrow="Testimonials" title="Demo testimonials until real approvals are added." /><div className="grid gap-5 md:grid-cols-2">{testimonials.map((t:any) => <blockquote className="rounded-lg bg-white p-6" key={t.id}><p className="text-[#56635d]">“{t.quote}”</p><footer className="mt-4 text-sm font-black">{t.customerName} {t.isDemo ? "(Demo)" : ""}</footer></blockquote>)}</div></section>
            <section><SectionHeading eyebrow="FAQ" title="Common questions, editable from admin." /><div className="grid gap-3">{faqs.slice(0, 6).map((faq: any) => <details className="rounded-lg bg-white p-5" key={faq.id}><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 text-[#56635d]">{faq.answer}</p></details>)}</div></section>
            <section className="grid gap-8 rounded-lg bg-[#102019] p-6 text-white lg:grid-cols-2"><div><SectionHeading eyebrow="Quote CTA" title="Plan your vertical mobility system." text="Submit a quote request and it appears immediately in Admin → Quotes." /></div><QuoteForm /></section>
            <section><SectionHeading eyebrow="Blog" title="Latest editable articles." /><div className="grid gap-5 md:grid-cols-3">{posts.slice(0,3).map((post:any) => <a href={`/blog/${post.slug}`} className="rounded-lg bg-white p-5" key={post.id}><h3 className="font-black">{post.title}</h3><p className="mt-2 text-sm text-[#56635d]">{post.excerpt}</p></a>)}</div></section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
