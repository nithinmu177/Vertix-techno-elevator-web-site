"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, ShieldCheck, Sparkles, Film } from "lucide-react";

export function VideoShowcaseModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 lg:p-12 shadow-sm">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
            <Film className="size-4" />
            <span>Field Engineering Footage</span>
          </div>
          <h3 className="mt-2 text-2xl font-bold text-[#172B4D] lg:text-3xl leading-tight">
            See Vertix Elevators in Smooth Motion
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[#475569]">
            Watch real site execution: high-precision shaft rail alignment, whisper-quiet gearless PMSM motor operation, and high-quality elevator cabin fitments delivered to leading residential and commercial buildings.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#172B4D]">
            <span className="flex items-center gap-2 rounded-xl bg-[#F3F6FA] px-3.5 py-2 border border-slate-200">
              <ShieldCheck className="size-4 text-[#16A34A]" /> Dynamic Brake Tested
            </span>
            <span className="flex items-center gap-2 rounded-xl bg-[#F3F6FA] px-3.5 py-2 border border-slate-200">
              <Sparkles className="size-4 text-[#2563EB]" /> &lt;45dB Quiet Cabin Acoustics
            </span>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-3 rounded-xl bg-[#2563EB] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-[#1D4ED8] active:scale-95 transition cursor-pointer"
            >
              <Play className="size-4 fill-current" />
              <span>Watch Installation Walkthrough</span>
            </button>
          </div>
        </div>

        {/* Video Thumbnail with Play Badge */}
        <div
          onClick={() => setIsOpen(true)}
          className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-md cursor-pointer"
        >
          <Image
            src="/images/brochure-extracts/extract-28.jpg"
            alt="Elevator shaft engineering work"
            fill
            className="object-cover transition duration-500 group-hover:scale-105 opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Glowing Play Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex size-16 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1D4ED8]">
              <Play className="size-6 fill-current ml-0.5" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-semibold text-white">
            <span>Shaft Erection & Commissioning</span>
            <span className="rounded bg-black/60 px-2 py-0.5 font-mono text-[10px] text-slate-200">HD 1080p</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#16A34A] animate-pulse" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#172B4D]">
                  Vertix Engineering Site Video
                </h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-[#172B4D] transition cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src="https://res.cloudinary.com/tt4rgc2n/video/upload/v1790515714/vertix-elevators/1789547309580-d2573b19337303eb_i8pywy.mp4"
                controls
                autoPlay
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
