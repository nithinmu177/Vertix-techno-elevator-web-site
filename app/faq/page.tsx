import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { getFaqs } from "@/lib/data";

export default async function FaqPage() {
  const faqs = await getFaqs();
  return <><Navbar /><main className="container py-16"><SectionHeading eyebrow="FAQ" title="Questions managed from the admin dashboard." /><div className="grid gap-3">{faqs.map((faq: any) => <details className="rounded-lg bg-white p-5" key={faq.id}><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 text-[#56635d]">{faq.answer}</p></details>)}</div></main><Footer /></>;
}
