import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gauge, Layers, ShieldCheck, Wrench } from "lucide-react";
import { firstMedia } from "@/lib/data";

export function ProductCard({ product }: { product: any }) {
  const media = firstMedia(product, "MAIN");
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-violet-100 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7C3AED] hover:shadow-lg hover:shadow-violet-500/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-violet-50/50">
        <Image
          src={media.url}
          alt={media.altText || product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3.5 top-3.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white/95 px-3 py-1 text-xs font-bold text-[#7C3AED] shadow-xs backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-[#7C3AED]" />
            {product.category?.name ?? "Elevator Model"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-lg font-bold text-[#3B1F6E] transition-colors duration-200 group-hover:text-[#7C3AED]">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#4B5563]">
          {product.shortDescription}
        </p>

        {/* Quick Specs Badges */}
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-violet-50 pt-3 text-xs text-[#4B5563]">
          <div className="flex items-center gap-1.5">
            <Layers className="size-4 text-[#7C3AED]" />
            <span>Cap: {product.capacity || "Custom"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="size-4 text-[#10B981]" />
            <span>Speed: {product.speed || "Up to 2.5 m/s"}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-violet-50 pt-3.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
            View Details
          </span>
          <div className="flex size-7 items-center justify-center rounded-full bg-violet-50 text-[#7C3AED] transition-colors duration-200 group-hover:bg-[#7C3AED] group-hover:text-white">
            <ArrowRight className="size-3.5" />
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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-violet-100 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7C3AED] hover:shadow-lg hover:shadow-violet-500/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-violet-50/50">
        {media.type === "VIDEO" ? (
          <video
            src={media.url}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Image
            src={media.url}
            alt={media.altText || project.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute left-3.5 top-3.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white/95 px-3 py-1 text-xs font-bold text-[#7C3AED] shadow-xs backdrop-blur-md">
            {project.category?.name ?? project.elevatorType}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-lg font-bold text-[#3B1F6E] transition-colors duration-200 group-hover:text-[#7C3AED]">
          {project.name}
        </h3>
        <p className="mt-1 text-xs font-semibold text-[#4B5563]">
          {project.location}
        </p>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#4B5563]">
          {project.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-violet-50 pt-3 text-xs font-bold text-[#4B5563]">
          <span>{project.elevatorType}</span>
          <span className="text-[#7C3AED] transition-transform duration-200 group-hover:translate-x-1">
            View Case Study →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ServiceCard({ service }: { service: any }) {
  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7C3AED] hover:shadow-lg hover:shadow-violet-500/10">
      <div>
        <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-violet-50 text-[#7C3AED] border border-violet-100 transition-colors duration-300 group-hover:bg-[#7C3AED] group-hover:text-white">
          <Wrench className="size-5" />
        </div>
        <h3 className="text-lg font-bold text-[#3B1F6E] transition-colors duration-200 group-hover:text-[#7C3AED]">
          {service.name}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-[#4B5563]">
          {service.description}
        </p>
      </div>

      <div className="mt-6 border-t border-violet-50 pt-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#4B5563]">
          <ShieldCheck className="size-4 text-[#10B981]" />
          <span>Full Certified Safety & Warranty</span>
        </div>
      </div>
    </article>
  );
}
