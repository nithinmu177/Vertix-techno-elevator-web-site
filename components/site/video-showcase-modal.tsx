"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, ShieldCheck, Sparkles, Film } from "lucide-react";

export function VideoShowcaseModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-r from-[#0c121e] via-[#101828] to-[#0c121e] p-8 lg:p-12 shadow-2xl backdrop-blur-2xl">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#00e5ff]">
            <Film className="size-4" />
            <span>Field Engineering Footage</span>
          </div>
          <h3 className="mt-2 text-3xl font-black text-white lg:text-4xl leading-tight">
            See Vertix Elevators in Flawless Motion
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Watch real site execution: high-precision shaft rail alignment, whisper-quiet gearless PMSM motor operation, and high-end elevator cabin fitments delivered to leading architectural landmarks.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300">
            <span className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-1.5 border border-white/[0.08]">
              <ShieldCheck className="size-4 text-[#d4af37]" /> Dynamic Brake Tested
            </span>
            <span className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-1.5 border border-white/[0.08]">
              <Sparkles className="size-4 text-[#00e5ff]" /> &lt;45dB Cabin Acoustics
            </span>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#0284c7] px-6 py-3.5 text-sm font-black text-[#06090e] shadow-xl shadow-[#00e5ff]/25 hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              <Play className="size-4 fill-current" />
              <span>Watch Installation Walkthrough</span>
            </button>
          </div>
        </div>

        {/* Video Thumbnail with Play Badge */}
        <div
          onClick={() => setIsOpen(true)}
          className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.15] bg-[#080c14] shadow-2xl cursor-pointer"
        >
          <Image
            src="/images/brochure-extracts/extract-28.jpg"
            alt="Elevator shaft engineering work"
            fill
            className="object-cover transition duration-700 group-hover:scale-105 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Glowing Play Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex size-20 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#00e5ff] group-hover:text-[#00e5ff]">
              <Play className="size-8 fill-current ml-1" />
              <span className="absolute inset-0 rounded-full border border-[#00e5ff] animate-ping opacity-30" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-bold text-white">
            <span>Shaft Erection & Commissioning</span>
            <span className="rounded bg-black/60 px-2 py-0.5 font-mono text-[10px] text-slate-300">HD 1080p</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/[0.15] bg-[#0c121e] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-red-500 animate-pulse" />
                <h4 className="text-sm font-black uppercase tracking-wider text-white">
                  Vertix Engineering Site Video
                </h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/[0.1] hover:text-white transition"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src="/uploads/1789547309580-d2573b19337303eb.mp4"
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
