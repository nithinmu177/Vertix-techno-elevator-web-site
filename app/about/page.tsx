import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";

export default function AboutPage() {
  const sections = ["Our Story", "Our Mission", "Our Vision", "Our Values", "Engineering Philosophy", "Why Vertix"];
  return <><Navbar /><main className="container py-16"><SectionHeading eyebrow="About" title="Premium elevator engineering with editable company content." text="This page avoids invented company history. Replace these sections with approved Vertix information from Site Settings or future page-content modules." /><div className="grid gap-5 md:grid-cols-2">{sections.map((s) => <section className="rounded-lg bg-white p-6" key={s}><h2 className="text-2xl font-black">{s}</h2><p className="mt-3 leading-7 text-[#56635d]">Editable content area for verified company information, media, philosophy and customer commitments.</p></section>)}</div></main><Footer /></>;
}
