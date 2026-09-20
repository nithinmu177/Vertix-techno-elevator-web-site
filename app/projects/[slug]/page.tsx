import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaLink } from "@/components/ui/button";
import { firstMedia, getProject } from "@/lib/data";
import { MapPin, Clock, ArrowLeft, CheckCircle2, Award } from "lucide-react";
import Link from "next/link";

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const cover = firstMedia(project, "COVER");
  const video = project.media?.find((m: any) => m.role === "VIDEO")?.media;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#06090e] text-slate-100">
        {/* Project Hero Header */}
        <section className="relative min-h-[50vh] overflow-hidden border-b border-white/[0.08] bg-[#070a12]">
          {cover.type === "VIDEO" || cover.url?.endsWith(".mp4") || cover.url?.endsWith(".webm") ? (
            <video
              src={cover.url}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
          ) : (
            <Image
              src={cover.url}
              alt={cover.altText || project.name}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-45"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06090e] via-[#06090e]/60 to-transparent" />

          <div className="container relative flex min-h-[50vh] items-end pb-12 pt-24">
            <div className="max-w-3xl">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#d4af37] transition mb-4"
              >
                <ArrowLeft className="size-4" />
                <span>Back to All Projects</span>
              </Link>

              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#d4af37]">
                <MapPin className="size-3.5 text-[#00e5ff]" />
                <span>{project.location}</span>
                <span className="size-1 rounded-full bg-white/40" />
                <span>{project.category?.name ?? "Commissioned Installation"}</span>
              </div>

              <h1 className="mt-3 text-3xl font-black text-white md:text-5xl lg:text-6xl tracking-tight">
                {project.name}
              </h1>
            </div>
          </div>
        </section>

        {/* Case Study Content Grid */}
        <section className="container grid gap-12 py-16 lg:grid-cols-[1.5fr_0.8fr]">
          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wider mb-4">
                Project Overview
              </h2>
              <p className="text-base leading-relaxed text-slate-300">
                {project.description}
              </p>
            </div>

            {project.challenge && (
              <div className="rounded-3xl border border-white/[0.08] bg-[#0c121e]/80 p-8 shadow-xl backdrop-blur-xl">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <span className="text-rose-400 font-mono text-sm">[01]</span>
                  <span>Architectural Challenge</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {project.challenge}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/10 p-8 shadow-xl backdrop-blur-xl">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-emerald-400" />
                  <span>The Vertix Engineering Solution</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {project.solution}
                </p>
              </div>
            )}

            {project.results && (
              <div className="rounded-3xl border border-[#d4af37]/30 bg-[#d4af37]/5 p-8 shadow-xl backdrop-blur-xl">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Award className="size-5 text-[#d4af37]" />
                  <span>Operational Results & Uptime</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {project.results}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar Project Parameters */}
          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/[0.1] bg-[#0c121e] p-6 lg:p-8 shadow-2xl">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#d4af37] mb-6">
                Technical Blueprint Specs
              </h3>

              <div className="space-y-4 text-xs">
                <div className="border-b border-white/[0.06] pb-3">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Elevator Typology</span>
                  <p className="mt-1 text-sm font-black text-white">{project.elevatorType}</p>
                </div>

                <div className="border-b border-white/[0.06] pb-3">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Commissioning Timeline</span>
                  <p className="mt-1 text-sm font-black text-white">{project.timeline || "Turnkey on schedule"}</p>
                </div>

                <div className="border-b border-white/[0.06] pb-3">
                  <span className="text-slate-400 uppercase font-bold text-[10px]">Safety & Code Compliance</span>
                  <p className="mt-1 text-sm font-black text-emerald-400">EN 81-20/50 & IS 14665 Passed</p>
                </div>
              </div>

              <div className="mt-8">
                <CtaLink href={`/quote?projectType=${encodeURIComponent(project.name)}`} variant="primary" className="w-full">
                  DISCUSS SIMILAR PROJECT
                </CtaLink>
              </div>
            </div>
          </aside>
        </section>

        {/* Video if available */}
        {video && (
          <section className="container pb-16">
            <h2 className="text-xl font-black text-white uppercase tracking-wider mb-6">
              Installation Video Walkthrough
            </h2>
            <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-black">
              <video className="w-full aspect-video" controls preload="metadata" src={video.url} />
            </div>
          </section>
        )}

        {/* Project Gallery */}
        {project.media && project.media.length > 1 && (
          <section className="container pb-20">
            <div className="mb-8">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#d4af37]">Installation Assets</span>
              <h2 className="text-2xl font-black text-white uppercase tracking-wider mt-1">
                Project Gallery ({project.media.length} Items)
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {project.media.map((item: any, idx: number) => {
                const m = item.media || item;
                const isVid = m.type === "VIDEO" || m.url?.endsWith(".mp4") || m.url?.endsWith(".webm");
                return (
                  <div key={idx} className="group relative aspect-video overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c121e]">
                    {isVid ? (
                      <video src={m.url} controls preload="metadata" className="h-full w-full object-cover" />
                    ) : (
                      <Image
                        src={m.url}
                        alt={m.altText || m.title || `Project asset ${idx + 1}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, 50vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
