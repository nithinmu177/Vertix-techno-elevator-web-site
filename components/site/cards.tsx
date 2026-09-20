import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gauge, Layers, ShieldCheck, Wrench } from "lucide-react";
import { firstMedia } from "@/lib/data";

export function ProductCard({ product }: { product: any }) {
  const media = firstMedia(product, "MAIN");
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 p-1 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d4af37]/40 hover:shadow-[0_20px_50px_rgba(212,175,55,0.12)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#131b2e]">
        <Image
          src={media.url}
          alt={media.altText || product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-[#0c121e]/20 to-transparent" />
        <div className="absolute left-3.5 top-3.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/30 bg-[#06090e]/80 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#f5e2a3] backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-[#d4af37]" />
            {product.category?.name ?? "Elevator Model"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-black text-white transition duration-300 group-hover:text-[#f5e2a3]">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
          {product.shortDescription}
        </p>

        {/* Quick Specs Badges */}
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-3 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <Layers className="size-3.5 text-[#d4af37]" />
            <span>Cap: {product.capacity || "Bespoke"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="size-3.5 text-[#00e5ff]" />
            <span>Speed: {product.speed || "Up to 2.5m/s"}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <span className="text-xs font-black uppercase tracking-wider text-[#d4af37] group-hover:text-white transition">
            Explore Specifications
          </span>
          <div className="flex size-8 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-white transition-all duration-300 group-hover:border-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#06090e]">
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ProjectCard({ project }: { project: any }) {
  const media = firstMedia(project, "COVER");
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 p-1 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[#00e5ff]/40 hover:shadow-[0_20px_50px_rgba(0,229,255,0.12)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#131b2e]">
        {media.type === "VIDEO" ? (
          <video
            src={media.url}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <Image
            src={media.url}
            alt={media.altText || project.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c121e] via-transparent to-transparent" />
        <div className="absolute left-3.5 top-3.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00e5ff]/30 bg-[#06090e]/80 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#00e5ff] backdrop-blur-md">
            {project.category?.name ?? project.elevatorType}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-black text-white transition duration-300 group-hover:text-[#00e5ff]">
          {project.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-slate-400">
          {project.location}
        </p>
        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
          {project.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs font-bold text-slate-300">
          <span>{project.elevatorType}</span>
          <span className="text-[#d4af37] group-hover:translate-x-1 transition">Case Study →</span>
        </div>
      </div>
    </Link>
  );
}

export function ServiceCard({ service }: { service: any }) {
  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0c121e]/70 p-6 shadow-xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d4af37]/40 hover:bg-[#0f1728]/90">
      <div>
        <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/20 to-transparent text-[#d4af37]">
          <Wrench className="size-5" />
        </div>
        <h3 className="text-xl font-black text-white group-hover:text-[#f5e2a3] transition">
          {service.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          {service.description}
        </p>
      </div>

      <div className="mt-6 border-t border-white/[0.06] pt-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <ShieldCheck className="size-4 text-[#00e5ff]" />
          <span>Full Certified SLA & Warranty Included</span>
        </div>
      </div>
    </article>
  );
}
