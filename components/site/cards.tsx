import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { firstMedia } from "@/lib/data";

export function ProductCard({ product }: { product: any }) {
  const media = firstMedia(product, "MAIN");
  return (
    <Link href={`/products/${product.slug}`} className="group overflow-hidden rounded-lg border border-[#063f31]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8eadf]">
        <Image src={media.url} alt={media.altText || product.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <p className="text-xs font-black uppercase text-[#c6a15b]">{product.category?.name ?? "Elevator Solution"}</p>
        <h3 className="mt-2 text-xl font-black text-[#102019]">{product.name}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#56635d]">{product.shortDescription}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#063f31]">VIEW PRODUCT <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}

export function ProjectCard({ project }: { project: any }) {
  const media = firstMedia(project, "COVER");
  return (
    <Link href={`/projects/${project.slug}`} className="group overflow-hidden rounded-lg border border-[#063f31]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#e8eadf]">
        <Image src={media.url} alt={media.altText || project.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <p className="text-xs font-black uppercase text-[#c6a15b]">{project.category?.name ?? project.elevatorType}</p>
        <h3 className="mt-2 text-xl font-black text-[#102019]">{project.name}</h3>
        <p className="mt-2 text-sm font-semibold text-[#56635d]">{project.location}</p>
      </div>
    </Link>
  );
}

export function ServiceCard({ service }: { service: any }) {
  return (
    <article className="rounded-lg border border-[#063f31]/10 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-black text-[#102019]">{service.name}</h3>
      <p className="mt-3 text-sm leading-6 text-[#56635d]">{service.description}</p>
      <div className="mt-5 flex items-center gap-2 text-sm font-black text-[#063f31]"><Play className="size-4" /> Process managed from admin</div>
    </article>
  );
}
