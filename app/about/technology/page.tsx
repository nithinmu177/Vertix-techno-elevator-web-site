import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";

export default function TechnologyPage() {
  return <><Navbar /><main className="architectural-grid"><section className="container py-16"><SectionHeading eyebrow="Technology" title="Smart controls, modern drives and precision engineering." text="Upload elevator design images and control videos in the Media Library and assign them to technology content." /><div className="grid gap-4 md:grid-cols-3">{["Smart Controls","Energy Efficiency","Modern Drive Systems","Precision Engineering","Remote Monitoring","Predictive Maintenance"].map((item) => <div className="rounded-lg border border-[#063f31]/10 bg-white/90 p-6" key={item}><h2 className="font-black">{item}</h2><div className="mt-5 h-32 rounded-lg bg-[#063f31] opacity-90" /></div>)}</div></section></main><Footer /></>;
}
