"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, ShieldCheck, Sparkles, Film } from "lucide-react";

export function VideoShowcaseModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-violet-100 bg-white p-8 lg:p-12 shadow-sm">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#7C3AED]">
            <Film className="size-4" />
            <span>Field Engineering Footage</span>
          </div>
          <h3 className="mt-2 text-2xl font-bold text-[#3B1F6E] lg:text-3xl leading-tight">
            See Vertix Elevators in Smooth Motion
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-[#4B5563]">
            Watch real site execution: high-precision shaft rail alignment, whisper-quiet gearless PMSM motor operation, and high-quality elevator cabin fitments delivered to leading residential and commercial buildings.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#3B1F6E]">
            <span className="flex items-center gap-2 rounded-xl bg-[#F5F3FF] px-3.5 py-2 border border-violet-100">
              <ShieldCheck className="size-4 text-[#10B981]" /> Dynamic Brake Tested
            </span>
            <span className="flex items-center gap-2 rounded-xl bg-[#F5F3FF] px-3.5 py-2 border border-violet-100">
              <Sparkles className="size-4 text-[#7C3AED]" /> &lt;45dB Quiet Cabin Acoustics
            </span>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-3 rounded-xl bg-[#7C3AED] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-violet-500/25 hover:bg-[#6D28D9] active:scale-95 transition cursor-pointer"
            >
              <Play className="size-4 fill-current" />
              <span>Watch Installation Walkthrough</span>
            </button>
          </div>
        </div>

        {/* Video Thumbnail with Play Badge */}
        <div
          onClick={() => setIsOpen(true)}
          className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-violet-100 bg-slate-900 shadow-md cursor-pointer"
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
            <div className="relative flex size-16 items-center justify-center rounded-full bg-[#7C3AED] text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#6D28D9]">
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
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-violet-100 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#10B981] animate-pulse" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#3B1F6E]">
                  Vertix Engineering Site Video
                </h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-violet-50 hover:text-[#3B1F6E] transition cursor-pointer"
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
