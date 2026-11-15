"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, Film, Maximize2 } from "lucide-react";

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
      <section className="container pb-16">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#7C3AED]">
              Project Media & Gallery
            </span>
            <h2 className="text-2xl font-bold text-[#3B1F6E] tracking-tight mt-1">
              Project Gallery ({items.length} Photos & Clips)
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
                className="group relative aspect-video cursor-pointer overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm transition duration-300 hover:border-[#7C3AED] hover:shadow-md hover:shadow-violet-500/10"
              >
                {isVid ? (
                  <div className="relative h-full w-full bg-slate-900">
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-[#7C3AED] text-white shadow-lg transition group-hover:scale-110 group-hover:bg-[#6D28D9]">
                        <Play className="size-5 fill-current ml-0.5" />
                      </div>
                      <span className="text-xs font-semibold tracking-wider text-slate-200 uppercase line-clamp-1">
                        {m.title || `Installation Video Clip #${idx + 1}`}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-bold">
                      <span className="inline-flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-violet-300">
                        <Film className="size-3" /> Video
                      </span>
                      <span className="rounded bg-black/60 px-2 py-0.5 text-slate-300 font-mono">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="size-5" />
            </button>

            {activeMedia.type === "VIDEO" || activeMedia.url?.endsWith(".mp4") || activeMedia.url?.endsWith(".webm") ? (
              <video
                src={activeMedia.url}
                controls
                autoPlay
                className="max-h-[80vh] w-full rounded-xl bg-black object-contain"
              />
            ) : (
              <div className="relative aspect-[16/10] max-h-[80vh] w-full">
                <Image
                  src={activeMedia.url}
                  alt={activeMedia.altText || projectName}
                  fill
                  className="rounded-xl object-contain"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
