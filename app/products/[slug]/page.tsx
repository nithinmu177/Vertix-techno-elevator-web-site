import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaLink } from "@/components/ui/button";
import { firstMedia, getProduct } from "@/lib/data";

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const media = firstMedia(product, "MAIN");
  const video = product.media?.find((m:any) => m.role === "VIDEO")?.media;
  return <><Navbar /><main><section className="container grid gap-10 py-14 lg:grid-cols-2"><div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#e8eadf]"><Image src={media.url} alt={media.altText || product.name} fill className="object-cover" /></div><div><p className="text-xs font-black uppercase text-[#c6a15b]">{product.category?.name}</p><h1 className="mt-3 text-4xl font-black text-[#102019] md:text-6xl">{product.name}</h1><p className="mt-5 leading-8 text-[#56635d]">{product.fullDescription}</p><div className="mt-7 flex flex-wrap gap-3"><CtaLink href="/quote">REQUEST A QUOTE</CtaLink><CtaLink href="/contact" variant="secondary">DOWNLOAD BROCHURE</CtaLink></div></div></section><section className="container grid gap-5 pb-16 md:grid-cols-3">{["capacity","speed","floors","doorType","driveType","energyEfficiency"].map((k) => <div className="rounded-lg bg-white p-5" key={k}><p className="text-xs font-black uppercase text-[#c6a15b]">{k}</p><strong>{String((product as any)[k] || "Editable")}</strong></div>)}</section>{video && <section className="container pb-16"><video className="w-full rounded-lg" controls preload="metadata" src={video.url} /></section>}</main><Footer /></>;
}
