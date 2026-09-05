import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { ServiceCard } from "@/components/site/cards";
import { getServices } from "@/lib/data";

export default async function ServicesPage() {
  const services = await getServices();
  return <><Navbar /><main className="container py-16"><SectionHeading eyebrow="Services" title="Installation, maintenance, modernization and support." /><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{services.map((s: any) => <ServiceCard service={s} key={s.id} />)}</div></main><Footer /></>;
}
