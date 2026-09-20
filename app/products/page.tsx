import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SectionHeading } from "@/components/site/section-heading";
import { ProductCard } from "@/components/site/cards";
import { getProducts } from "@/lib/data";
import { CtaLink } from "@/components/ui/button";
import { Award, Layers, ShieldCheck, Sparkles } from "lucide-react";

export const metadata = {
  title: "Elevator Products & Models",
  description: "Explore the Vertix lineup of precision passenger, home villa, panoramic, hospital, and freight elevators."
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#06090e] py-16 text-slate-100">
        <div className="container">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-[#0c121e] via-[#111a2c] to-[#0c121e] p-8 lg:p-12 shadow-2xl mb-14">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-[#d4af37] mb-3">
                <Sparkles className="size-4" />
                <span>Certified Engineering Portfolio</span>
              </div>
              <h1 className="display-type text-3xl font-black text-white md:text-5xl lg:text-6xl tracking-tight">
                Architectural Elevator Solutions
              </h1>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Every Vertix elevator model integrates synchronous permanent-magnet gearless drives, 32-bit closed-loop microprocessor leveling, and multi-redundant safety gears conforming to EN 81-20/50 and IS 14665.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-xs font-bold text-slate-300">
                <span className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2">
                  <ShieldCheck className="size-4 text-emerald-400" /> 10-Year Structural Warranty
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2">
                  <Award className="size-4 text-[#d4af37]" /> Class A+++ Energy Rating
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2">
                  <Layers className="size-4 text-[#00e5ff]" /> 100% Bespoke Finishes
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

          {/* Need Custom Dimensions Banner */}
          <div className="mt-20 rounded-3xl border border-[#d4af37]/30 bg-gradient-to-r from-[#0c121e] via-[#141f36] to-[#0c121e] p-8 lg:p-12 shadow-2xl flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-2xl font-black text-white">Require Non-Standard Pit or Custom Headroom?</h3>
              <p className="mt-2 text-sm text-slate-300">
                Our application engineering department develops tailor-made car dimensions, ultra-shallow pit solutions (from 250mm), and glass facade atriums.
              </p>
            </div>
            <CtaLink href="/quote" variant="primary">
              REQUEST CUSTOM APPLICATION DRAWING
            </CtaLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
