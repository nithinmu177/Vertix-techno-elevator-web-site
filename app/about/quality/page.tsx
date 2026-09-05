import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";

export default function QualityPage() {
  return <><Navbar /><main className="container py-16"><SectionHeading eyebrow="Quality" title="Engineering quality, material quality and testing records." text="Admin can upload certificates, documents, quality images and testing videos through the Media Library." /><div className="grid gap-5 md:grid-cols-3">{["Engineering Quality","Material Quality","Testing","Inspection","Installation Standards","Maintenance"].map((item) => <div className="rounded-lg bg-white p-6" key={item}><h2 className="font-black">{item}</h2></div>)}</div></main><Footer /></>;
}
