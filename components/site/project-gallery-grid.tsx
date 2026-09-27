"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, Film, Image as ImageIcon, Maximize2 } from "lucide-react";

interface MediaItem {
  id?: string;
  url: string;
  altText?: string | null;
  title?: string | null;
  type?: string;
  mimeType?: string;
}

interface ProjectGalleryGridProps {
  media: Array<{ role?: string; media?: MediaItem } | MediaItem>;
  projectName: string;
}

export function ProjectGalleryGrid({ media, projectName }: ProjectGalleryGridProps) {
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  const items: MediaItem[] = media
    .map((item: any) => item.media || item)
    .filter((m: any) => Boolean(m?.url));

  if (items.length <= 1) return null;

  return (
    <>
      <section className="container pb-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#d4af37]">
              Engineering Assets & Evidence
            </span>
            <h2 className="text-2xl font-black text-white uppercase tracking-wider mt-1">
              Project Gallery ({items.length} Items)
            </h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m, idx) => {
            const isVid = m.type === "VIDEO" || m.url?.endsWith(".mp4") || m.url?.endsWith(".webm");

            return (
              <div
                key={m.id || idx}
                onClick={() => setActiveMedia(m)}
                className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c121e] shadow-lg transition duration-300 hover:border-[#00e5ff]/50 hover:shadow-2xl hover:shadow-[#00e5ff]/10"
              >
                {isVid ? (
                  <div className="relative h-full w-full bg-slate-950">
                    {/* Video poster background */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="mb-3 flex size-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-xl backdrop-blur-md transition group-hover:scale-110 group-hover:border-[#00e5ff] group-hover:text-[#00e5ff]">
                        <Play className="size-6 fill-current ml-0.5" />
                      </div>
                      <span className="text-xs font-black tracking-wider text-slate-300 uppercase line-clamp-1">
                        {m.title || `Installation Video Clip #${idx + 1}`}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-bold">
                      <span className="inline-flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-[#00e5ff]">
                        <Film className="size-3" /> Video
                      </span>
                      <span className="rounded bg-black/60 px-2 py-0.5 text-slate-400 font-mono">
                        Tap to Play
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <Image
                      src={m.url}
                      alt={m.altText || m.title || `${projectName} asset ${idx + 1}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <div className="absolute bottom-3 right-3 rounded-full bg-black/60 p-2 text-white opacity-0 transition group-hover:opacity-100">
                      <Maximize2 className="size-4" />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox / Video Player Modal */}
      {activeMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/[0.15] bg-[#0c121e] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#00e5ff] animate-pulse" />
                <h4 className="text-sm font-black uppercase tracking-wider text-white line-clamp-1">
                  {activeMedia.title || activeMedia.altText || `${projectName} Media Viewer`}
                </h4>
              </div>
              <button
                onClick={() => setActiveMedia(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/[0.1] hover:text-white transition"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Media Content */}
            <div className="relative aspect-video w-full bg-black">
              {activeMedia.type === "VIDEO" || activeMedia.url?.endsWith(".mp4") || activeMedia.url?.endsWith(".webm") ? (
                <video
                  src={activeMedia.url}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="relative h-full w-full">
                  <Image
                    src={activeMedia.url}
                    alt={activeMedia.altText || projectName}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
