import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ProductCard } from "@/components/site/cards";
import { getProducts } from "@/lib/data";
import { CtaLink } from "@/components/ui/button";
import { Award, Layers, ShieldCheck, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Elevator Models | Passenger, Home & Goods Lifts Bengaluru",
  description: "Explore elevator models by VERTIX TECHNO ELEVATOR in Bengaluru: passenger elevators, residential home lifts, hospital lifts, goods elevators, and MRL lifts.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Elevator Models & Systems | VERTIX TECHNO ELEVATOR Bengaluru",
    description: "Explore certified elevator models by VERTIX TECHNO ELEVATOR: passenger elevators, residential villa lifts, goods lifts, and commercial high-speed lifts.",
    url: "https://vertix-techno-elevator-web-site.onrender.com/products"
  }
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <div className="container">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-12 shadow-sm mb-14">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3">
                <Sparkles className="size-4" />
                <span>Elevator Company in Bengaluru • Certified Portfolio</span>
              </div>
              <h1 className="display-type text-3xl font-extrabold text-[#172B4D] md:text-5xl lg:text-6xl tracking-tight">
                Elevator Models & Systems
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                Every elevator model engineered by VERTIX TECHNO ELEVATOR integrates synchronous permanent-magnet gearless drives, 32-bit closed-loop microprocessor leveling, and multi-redundant safety gears conforming to EN 81-20/50 and IS 14665 standards.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold text-[#172B4D]">
                <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-xs">
                  <ShieldCheck className="size-4 text-[#16A34A]" /> 10-Year Structural Warranty
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-xs">
                  <Award className="size-4 text-[#2563EB]" /> Class A+++ Energy Rating
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-xs">
                  <Layers className="size-4 text-[#2563EB]" /> 100% Bespoke Finishes
                </span>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p: any) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>

          {/* Custom Dimensions Banner */}
          <div className="mt-20 rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-12 shadow-sm flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold text-[#172B4D]">Require Non-Standard Pit or Custom Headroom in Bengaluru?</h3>
              <p className="mt-2 text-sm text-[#475569]">
                Our application engineering department develops tailor-made car dimensions, ultra-shallow pit solutions (from 250mm), and glass facade atriums.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <CtaLink href="/quote" variant="primary">
                Request Custom Drawings & Quote
              </CtaLink>
              <CtaLink href="/contact" variant="secondary">
                Talk to an Engineer
              </CtaLink>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
