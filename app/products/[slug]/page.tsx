import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaLink } from "@/components/ui/button";
import { firstMedia, getProduct } from "@/lib/data";
import { Check, Layers, ShieldCheck, ArrowLeft, PhoneCall } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { ProjectGalleryGrid } from "@/components/site/project-gallery-grid";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return { title: "Elevator Model" };
  const firstImg = firstMedia(product.media, "IMAGE")?.url || "https://vertix-techno-elevator-web-site.onrender.com/images/vertix-logo.png";
  return {
    title: `${product.name} | Elevators in Bengaluru`,
    description: product.shortDescription || `${product.name} engineered and installed by VERTIX TECHNO ELEVATOR in Bengaluru, Karnataka.`,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | VERTIX TECHNO ELEVATOR`,
      description: product.shortDescription,
      url: `https://vertix-techno-elevator-web-site.onrender.com/products/${product.slug}`,
      images: [{ url: firstImg, alt: product.name }]
    }
  };
}

export function generateStaticParams() {
  return [
    { slug: "passenger-lift" },
    { slug: "home-lift" },
    { slug: "hospital-lift" },
    { slug: "hydraulic-lift" },
    { slug: "goods-lift" },
    { slug: "mrl-lift" }
  ];
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
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <div className="container">
          {/* Back breadcrumb */}
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#475569] hover:text-[#2563EB] transition"
            >
              <ArrowLeft className="size-4" />
              <span>Back to Products Catalog</span>
            </Link>
          </div>

          {/* Hero details section */}
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-md">
              <Image
                src={media.url}
                alt={media.altText || product.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute left-4 top-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white/95 px-3.5 py-1 text-xs font-bold text-[#2563EB] shadow-xs backdrop-blur-md">
                  {product.category?.name ?? "Elevator Model"}
                </span>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
                Precision Specification
              </span>
              <h1 className="mt-2 text-3xl font-extrabold text-[#172B4D] md:text-5xl lg:text-5xl leading-tight">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                {product.fullDescription}
              </p>

              {/* Action CTAs */}
              <div className="mt-8 flex flex-wrap gap-4">
                <CtaLink href={`/quote?elevatorType=${encodeURIComponent(product.name)}`} variant="primary">
                  Request Official Quote
                </CtaLink>
                <a
                  href="tel:+916360598915"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-[#F3F6FA] px-5 py-3 text-sm font-bold text-[#172B4D] hover:border-[#2563EB] hover:text-[#2563EB] transition"
                >
                  <PhoneCall className="size-4 text-[#2563EB]" />
                  <span>Call Applications Desk</span>
                </a>
              </div>
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div className="mt-20">
            <h2 className="text-xl font-bold text-[#172B4D] uppercase tracking-wider mb-6 flex items-center gap-2">
              <Layers className="size-5 text-[#2563EB]" />
              <span>Engineering Specifications</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-200 bg-[#F3F6FA] p-5 shadow-xs"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#475569]">
                    {s.label}
                  </span>
                  <p className="mt-1.5 text-base font-bold text-[#172B4D]">{s.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Features */}
          {product.safetyFeatures && product.safetyFeatures.length > 0 && (
            <div className="mt-14 rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-10 shadow-sm">
              <h3 className="text-lg font-bold text-[#172B4D] flex items-center gap-2 mb-6">
                <ShieldCheck className="size-5 text-[#16A34A]" />
                <span>Integrated Safety & Compliance Modules</span>
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                {product.safetyFeatures.map((feat: string) => (
                  <div key={feat} className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-[#172B4D] shadow-xs">
                    <Check className="size-4 text-[#16A34A] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Demonstration if attached */}
          {video && (
            <div className="mt-14">
              <h3 className="text-lg font-bold text-[#172B4D] mb-4">Commissioning Footage</h3>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-black">
                <video className="w-full aspect-video" controls preload="metadata" src={video.url} />
              </div>
            </div>
          )}

          {/* Product Photo Gallery */}
          {product.media && product.media.length > 1 && (
            <div className="mt-14">
              <ProjectGalleryGrid media={product.media} projectName={product.name} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
