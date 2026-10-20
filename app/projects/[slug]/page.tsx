import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaLink } from "@/components/ui/button";
import { firstMedia, getProject } from "@/lib/data";
import { MapPin, ArrowLeft, CheckCircle2, Award } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import { ProjectGalleryGrid } from "@/components/site/project-gallery-grid";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = await getProject((await params).slug);
  if (!project) return { title: "Elevator Project" };
  const firstImg = firstMedia(project.media, "IMAGE")?.url || "https://vertix-techno-elevator-web-site.onrender.com/images/vertix-logo.png";
  return {
    title: `${project.name} | Elevator Installation Project`,
    description: project.description || `Elevator installation project by VERTIX TECHNO ELEVATOR in Bengaluru, Karnataka.`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} | VERTIX TECHNO ELEVATOR`,
      description: project.description,
      url: `https://vertix-techno-elevator-web-site.onrender.com/projects/${project.slug}`,
      images: [{ url: firstImg, alt: project.name }]
    }
  };
}

export function generateStaticParams() {
  return [
    { slug: "elysium-residence-villa" },
    { slug: "skyline-prestige-tower" },
    { slug: "ns-elevators-live-installations" },
    { slug: "skyline-prestige-corporate-tower" },
    { slug: "the-elysium-luxury-villa-estate" },
    { slug: "apollo-multi-specialty-healthcare-wing" },
    { slug: "zenith-business-bay-atrium" }
  ];
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const cover = firstMedia(project, "COVER");
  const video = project.media?.find((m: any) => m.role === "VIDEO")?.media;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-[#475569]">
        {/* Project Hero Header */}
        <section className="relative min-h-[45vh] overflow-hidden border-b border-slate-200 bg-slate-900">
          {cover.type === "VIDEO" || cover.url?.endsWith(".mp4") || cover.url?.endsWith(".webm") ? (
            <video
              src={cover.url}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
          ) : (
            <Image
              src={cover.url}
              alt={cover.altText || project.name}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#172B4D]/90 via-[#172B4D]/40 to-transparent" />

          <div className="container relative flex min-h-[45vh] items-end pb-12 pt-20">
            <div className="max-w-3xl">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition mb-4"
              >
                <ArrowLeft className="size-4" />
                <span>Back to All Projects</span>
              </Link>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-300">
                <MapPin className="size-3.5 text-[#2563EB]" />
                <span>{project.location}</span>
                <span className="size-1 rounded-full bg-white/40" />
                <span>{project.category?.name ?? "Installation Case Study"}</span>
              </div>

              <h1 className="mt-3 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl tracking-tight">
                {project.name}
              </h1>
            </div>
          </div>
        </section>

        {/* Case Study Content Grid */}
        <section className="container grid gap-12 py-16 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-[#172B4D] uppercase tracking-wider mb-3">
                Project Overview
              </h2>
              <p className="text-base leading-relaxed text-[#475569]">
                {project.description}
              </p>
            </div>

            {project.challenge && (
              <div className="rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#172B4D] flex items-center gap-2">
                  <span className="text-[#2563EB] font-mono text-sm">[01]</span>
                  <span>Architectural Challenge</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  {project.challenge}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="rounded-3xl border border-green-200 bg-green-50/60 p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#172B4D] flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-[#16A34A]" />
                  <span>The Vertix Engineering Solution</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  {project.solution}
                </p>
              </div>
            )}

            {project.results && (
              <div className="rounded-3xl border border-blue-200 bg-blue-50/60 p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#172B4D] flex items-center gap-2">
                  <Award className="size-5 text-[#2563EB]" />
                  <span>Operational Results & Uptime</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  {project.results}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar Project Parameters */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-[#F3F6FA] p-6 lg:p-8 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-6">
                Technical Specifications
              </h3>

              <div className="space-y-4 text-xs">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-[#475569] uppercase font-bold text-[10px]">Elevator Typology</span>
                  <p className="mt-1 text-sm font-bold text-[#172B4D]">{project.elevatorType}</p>
                </div>

                <div className="border-b border-slate-200 pb-3">
                  <span className="text-[#475569] uppercase font-bold text-[10px]">Commissioning Timeline</span>
                  <p className="mt-1 text-sm font-bold text-[#172B4D]">{project.timeline || "Turnkey on schedule"}</p>
                </div>

                <div className="border-b border-slate-200 pb-3">
                  <span className="text-[#475569] uppercase font-bold text-[10px]">Safety & Code Compliance</span>
                  <p className="mt-1 text-sm font-bold text-[#16A34A]">EN 81-20/50 & IS 14665 Passed</p>
                </div>
              </div>

              <div className="mt-8">
                <CtaLink href={`/quote?projectType=${encodeURIComponent(project.name)}`} variant="primary" className="w-full">
                  Discuss Similar Project
                </CtaLink>
              </div>
            </div>
          </aside>
        </section>

        {/* Video if available */}
        {video && (
          <section className="container pb-16">
            <h2 className="text-xl font-bold text-[#172B4D] uppercase tracking-wider mb-6">
              Installation Video Walkthrough
            </h2>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-black">
              <video className="w-full aspect-video" controls preload="metadata" src={video.url} />
            </div>
          </section>
        )}

        {/* Project Gallery */}
        {project.media && project.media.length > 1 && (
          <ProjectGalleryGrid media={project.media} projectName={project.name} />
        )}
      </main>
      <Footer />
    </>
  );
}
