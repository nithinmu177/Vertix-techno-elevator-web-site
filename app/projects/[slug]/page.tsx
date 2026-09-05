import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaLink } from "@/components/ui/button";
import { firstMedia, getProject } from "@/lib/data";

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const cover = firstMedia(project, "COVER");
  const video = project.media?.find((m:any) => m.role === "VIDEO")?.media;
  return <><Navbar /><main><section className="relative min-h-[55vh] bg-[#101613] text-white"><Image src={cover.url} alt={cover.altText || project.name} fill className="object-cover opacity-55" /><div className="container relative flex min-h-[55vh] items-end pb-12"><div><p className="text-xs font-black uppercase text-[#c6a15b]">{project.category?.name} · {project.location}</p><h1 className="mt-3 text-5xl font-black">{project.name}</h1></div></div></section><section className="container grid gap-8 py-14 lg:grid-cols-3"><div className="lg:col-span-2"><p className="leading-8 text-[#56635d]">{project.description}</p><h2 className="mt-8 text-2xl font-black">Challenge</h2><p className="text-[#56635d]">{project.challenge}</p><h2 className="mt-8 text-2xl font-black">Solution</h2><p className="text-[#56635d]">{project.solution}</p></div><aside className="rounded-lg bg-white p-6"><p className="text-xs font-black uppercase text-[#c6a15b]">Elevator Type</p><strong>{project.elevatorType}</strong><p className="mt-5 text-xs font-black uppercase text-[#c6a15b]">Timeline</p><strong>{project.timeline || "Editable"}</strong><div className="mt-6"><CtaLink href="/quote">REQUEST A QUOTE</CtaLink></div></aside></section>{video && <section className="container pb-16"><video className="w-full rounded-lg" controls preload="metadata" src={video.url} /></section>}</main><Footer /></>;
}
