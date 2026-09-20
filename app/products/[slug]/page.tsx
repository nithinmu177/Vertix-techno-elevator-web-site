import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaLink } from "@/components/ui/button";
import { firstMedia, getProduct } from "@/lib/data";
import { Check, Gauge, Layers, ShieldCheck, Zap, ArrowLeft, Download, PhoneCall } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  return product ? { title: product.name, description: product.shortDescription, alternates: { canonical: `/products/${product.slug}` } } : { title: "Elevator Product" };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const media = firstMedia(product, "MAIN");
  const video = product.media?.find((m: any) => m.role === "VIDEO")?.media;

  const specs = [
    { label: "Rated Capacity", val: product.capacity || "Custom Engineered" },
    { label: "Rated Speed", val: product.speed || "Up to 2.5 m/s" },
    { label: "Maximum Floors / Travel", val: product.floors || "Custom Travel" },
    { label: "Door Opening System", val: product.doorType || "Automatic Center Opening" },
    { label: "Drive & Motor System", val: product.driveType || "Synchronous PMSM Gearless" },
    { label: "Energy Efficiency", val: product.energyEfficiency || "Class A+++ (VDI 4707)" }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#06090e] py-16 text-slate-100">
        <div className="container">
          {/* Back breadcrumb */}
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#d4af37] transition"
            >
              <ArrowLeft className="size-4" />
              <span>Back to Products Catalog</span>
            </Link>
          </div>

          {/* Hero details section */}
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/[0.1] bg-[#0c121e] shadow-2xl">
              <Image
                src={media.url}
                alt={media.altText || product.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06090e] via-transparent to-transparent" />
              <div className="absolute left-4 top-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/40 bg-[#06090e]/80 px-3.5 py-1 text-xs font-black uppercase text-[#f5e2a3] backdrop-blur-md">
                  {product.category?.name ?? "Elevator Model"}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37]">
                Precision Specification
              </span>
              <h1 className="mt-2 text-3xl font-black text-white md:text-5xl lg:text-5xl leading-tight">
                {product.name}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-slate-300">
                {product.fullDescription}
              </p>

              {/* Action CTAs */}
              <div className="mt-8 flex flex-wrap gap-4">
                <CtaLink href={`/quote?elevatorType=${encodeURIComponent(product.name)}`} variant="primary">
                  REQUEST OFFICIAL QUOTE
                </CtaLink>
                <a
                  href="tel:+916360598915"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-5 py-3 text-sm font-bold text-white hover:border-[#00e5ff] hover:text-[#00e5ff] transition"
                >
                  <PhoneCall className="size-4 text-[#00e5ff]" />
                  <span>Call Applications Desk</span>
                </a>
              </div>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="mt-20">
            <h2 className="text-xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Layers className="size-5 text-[#d4af37]" />
              <span>Engineering Specifications</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 p-5 backdrop-blur-xl"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]">
                    {s.label}
                  </span>
                  <p className="mt-2 text-base font-black text-white">{s.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Features */}
          {product.safetyFeatures && product.safetyFeatures.length > 0 && (
            <div className="mt-14 rounded-3xl border border-white/[0.08] bg-gradient-to-r from-[#0c121e] via-[#101828] to-[#0c121e] p-8 lg:p-10 shadow-2xl">
              <h3 className="text-lg font-black text-white flex items-center gap-2 mb-6">
                <ShieldCheck className="size-5 text-emerald-400" />
                <span>Integrated Safety & Compliance Modules</span>
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                {product.safetyFeatures.map((feat: string) => (
                  <div key={feat} className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs font-bold text-slate-300">
                    <Check className="size-4 text-[#d4af37] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Demonstration if attached */}
          {video && (
            <div className="mt-14">
              <h3 className="text-lg font-black text-white mb-4">Commissioning Footage</h3>
              <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-black">
                <video className="w-full aspect-video" controls preload="metadata" src={video.url} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
