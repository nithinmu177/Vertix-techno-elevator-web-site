import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { ContactForm } from "@/components/forms/contact-form";

export default function ContactPage() {
  return <><Navbar /><main className="bg-[#102019] text-white"><section className="container grid gap-10 py-16 lg:grid-cols-2"><div><SectionHeading eyebrow="Contact" title="Talk to Vertix Techno Elevator." text="Messages are saved to PostgreSQL and shown in Admin → Messages." /></div><ContactForm /></section></main><Footer /></>;
}
