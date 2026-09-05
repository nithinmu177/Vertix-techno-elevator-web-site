"use client";

import { useState } from "react";
import { ImageIcon, X } from "lucide-react";
import { MediaLibrary } from "./media-library";

export function MediaPicker({ label, onSelect }: { label: string; onSelect: (media: any) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[#063f31]/20 px-4 text-sm font-bold text-[#063f31]">
        <ImageIcon className="size-4" /> {label}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black/60 p-4">
          <div className="mx-auto max-w-6xl rounded-lg bg-[#eef1e8] p-5">
            <div className="mb-4 flex justify-end">
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg bg-white p-2"><X /></button>
            </div>
            <MediaLibrary picker onSelect={(media) => { onSelect(media); setOpen(false); }} />
          </div>
        </div>
      )}
    </div>
  );
}
