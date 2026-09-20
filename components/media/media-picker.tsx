"use client";

import { useState } from "react";
import { ImageIcon, X } from "lucide-react";
import { MediaLibrary } from "./media-library";

export function MediaPicker({ label, onSelect }: { label: string; onSelect: (media: any) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#d4af37]/25 bg-[#d4af37]/5 px-4 text-sm font-bold text-[#d4af37] hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 transition"
      >
        <ImageIcon className="size-4" /> {label}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/80 p-4 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl rounded-3xl border border-white/[0.08] bg-[#0c121e] p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#d4af37]">Asset Picker</p>
                <h2 className="text-lg font-black text-white">Select from Media Library</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-2 text-slate-400 hover:border-white/20 hover:text-white transition"
              >
                <X className="size-5" />
              </button>
            </div>
            <MediaLibrary
              picker
              onSelect={(media) => {
                onSelect(media);
                setOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
