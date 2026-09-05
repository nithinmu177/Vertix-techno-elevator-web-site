import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";

export default function SafetyPage() {
  return <><Navbar /><main className="container py-16"><SectionHeading eyebrow="Safety" title="Safety information without unverified certification claims." text="Add verified certificates, inspection practices and safety documentation from admin before launch." /><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{["Safety First","Advanced Safety Systems","Emergency Features","Testing","Inspection","Preventive Maintenance"].map((item) => <article className="rounded-lg bg-white p-6" key={item}><h2 className="font-black">{item}</h2><p className="mt-3 text-[#56635d]">Editable reviewed safety content.</p></article>)}</div></main><Footer /></>;
}
