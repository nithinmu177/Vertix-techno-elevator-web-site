"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Check as _Check, Gauge as _Gauge, ShieldCheck as _ShieldCheck, Zap as _Zap, ArrowRight, Sliders } from "lucide-react";

const buildingTypes = [
  {
    id: "passenger",
    name: "Passenger Lift (LMR / MRL)",
    capacity: "4P to 17P (272 - 1150 kg)",
    speed: "1.0 m/s - 2.5 m/s",
    power: "Montanari / Torin 5HP & 10HP Gearless",
    idealFor: "Residential towers, corporate hubs & tech parks"
  },
  {
    id: "home",
    name: "Home Lift (Villa Lift)",
    capacity: "320 - 450 kg (4-6 Persons)",
    speed: "0.4 m/s - 0.65 m/s",
    power: "Single Phase / 3-Phase Eco-Drive",
    idealFor: "Private residences, bungalows & duplexes (low pit 250mm)"
  },
  {
    id: "hospital",
    name: "Hospital Lift (Bed Cum Passenger)",
    capacity: "15P to 26P (1000 - 1800 kg Bed)",
    speed: "1.0 m/s - 1.75 m/s Smooth Ramp",
    power: "Emergency Backup UPS Ready",
    idealFor: "Multi-specialty hospitals, trauma centers & clinics"
  },
  {
    id: "hydraulic",
    name: "Hydraulic Lift (Low Overhead)",
    capacity: "300 - 3000 kg",
    speed: "0.35 m/s - 0.6 m/s",
    power: "Direct/Indirect Hydraulic Power Pack",
    idealFor: "Buildings with 10-12 feet restricted overhead"
  },
  {
    id: "goods",
    name: "Goods Lift (Goods Cum Passenger)",
    capacity: "11P to 74P (750 - 5000 kg)",
    speed: "0.35 m/s - 1.0 m/s Heavy Torque",
    power: "High-Torque Heavy Hoisting Machine",
    idealFor: "Industrial manufacturing, logistics hubs & retail"
  }
];

const cabinStyles = [
  {
    id: "ss-silver",
    name: "SS Silver Finish Designer Cabin",
    image: "/images/brochure-extracts/extract-15.jpg",
    description: "Vertix Lift Standard: Hairline stainless steel with precision acoustic dampening.",
    tag: "Standard Elite"
  },
  {
    id: "ms-powder",
    name: "MS Power-Coated Designer Cabin",
    image: "/images/brochure-extracts/extract-02.jpg",
    description: "Vertix Lift Standard: Electrostatic powder-coated high-durability finish.",
    tag: "Vibrant Contemporary"
  },
  {
    id: "ms-pre",
    name: "MS Pre-Coated Designer Cabin",
    image: "/images/brochure-extracts/extract-15.jpg",
    description: "Architectural dual-tone pre-coated steel with warm textured wall panels.",
    tag: "Modern Architectural"
  },
  {
    id: "gold",
    name: "Designer Gold (304 Grade)",
    image: "/images/brochure-extracts/extract-31.jpg",
    description: "Etched 0.8-1.2mm design: Mapple Gold, Checks Big Gold, Splendor, and Egyptian Gold.",
    tag: "304 Grade Luxury"
  },
  {
    id: "rose-gold",
    name: "Rose Gold & Wooden Gold Cabin",
    image: "/images/brochure-extracts/extract-31.jpg",
    description: "Premium cabin solution combining mirrored rose gold brass and hand-finished timber.",
    tag: "Presidential Villa"
  }
];

const ceilingStyles = [
  "Model 1: Spot LED & Central Louvre Array",
  "Model 2: Translucent Linear LED Panel",
  "Model 3: Quad Spotlights with Center Diffuser",
  "Model 4: Warm Grid Backlit Gold Chandelier",
  "Model 5: Multi-Spot Geometric Inset",
  "Model 6: Triple Recessed Halo LED",
  "Model 7: Star Spot Array",
  "Model 8: Dual-Tone Symmetrical Backlit"
];

const floorMaterials = [
  "Marble Flooring (Premium Polish)",
  "Wooden Flooring (Warm Acoustic Timber)",
  "Anti-Skid Heavy-Duty PVC Flooring"
];

export function ElevatorConfigurator() {
  const [selectedType, setSelectedType] = useState(buildingTypes[0]);
  const [selectedCabin, setSelectedCabin] = useState(cabinStyles[0]);
  const [selectedCeiling, setSelectedCeiling] = useState(ceilingStyles[0]);
  const [selectedFloor, setSelectedFloor] = useState(floorMaterials[0]);

  return (
    <div className="relative rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#0e1626] to-[#080c14] p-6 lg:p-10 shadow-2xl backdrop-blur-2xl">
      {/* Decorative Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#d4af37]">
            <Sliders className="size-4" />
            <span>Interactive 3D Studio</span>
          </div>
          <h3 className="mt-1 text-2xl font-black text-white lg:text-3xl">
            Vertix Cabin & Drive Configurator
          </h3>
          <p className="text-sm text-slate-400">
            Customize interior styling, drive telemetry, and dimensions in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-400">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Real-Time Engine Active</span>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1.1fr]">
        {/* Left: Dynamic Visual Preview */}
        <div className="flex flex-col">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0c121e] shadow-2xl">
            <Image
              src={selectedCabin.image}
              alt={selectedCabin.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-all duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06090e] via-transparent to-black/30" />

            {/* Floating Cabin Specs Badge */}
            <div className="absolute left-4 top-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d4af37]/40 bg-[#06090e]/80 px-3.5 py-1 text-xs font-black text-[#f5e2a3] shadow-lg backdrop-blur-md">
                <Sparkles className="size-3.5 text-[#d4af37]" />
                {selectedCabin.tag}
              </span>
            </div>

            {/* Bottom Overlay Info */}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h4 className="text-xl font-black text-white">{selectedCabin.name}</h4>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed max-w-md">
                {selectedCabin.description}
              </p>
            </div>
          </div>

          {/* Telemetry Summary Bar */}
          <div className="mt-4 grid grid-cols-3 gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Speed</span>
              <p className="mt-0.5 text-sm font-black text-[#00e5ff]">{selectedType.speed}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Load Rating</span>
              <p className="mt-0.5 text-sm font-black text-[#f5e2a3]">{selectedType.capacity}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Efficiency</span>
              <p className="mt-0.5 text-sm font-black text-emerald-400">A+++ VDI 4707</p>
            </div>
          </div>
        </div>

        {/* Right: Interactive Options Selector */}
        <div className="space-y-6">
          {/* Step 1: Building Archetype */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-[#d4af37]">
              1. Select Application Archetype
            </label>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              {buildingTypes.map((type) => {
                const active = selectedType.id === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type)}
                    className={`flex flex-col items-start rounded-xl p-3 text-left transition duration-200 cursor-pointer ${
                      active
                        ? "border border-[#d4af37] bg-[#d4af37]/10 shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                        : "border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.2]"
                    }`}
                  >
                    <span className="text-xs font-black text-white">{type.name}</span>
                    <span className="mt-1 text-[11px] text-slate-400">{type.capacity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Interior Cabin Finish */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-[#d4af37]">
              2. Choose Cabin Architecture & Walls
            </label>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              {cabinStyles.map((style) => {
                const active = selectedCabin.id === style.id;
                return (
                  <button
                    key={style.id}
                    onClick={() => setSelectedCabin(style)}
                    className={`flex items-center gap-2.5 rounded-xl p-3 text-left transition duration-200 cursor-pointer ${
                      active
                        ? "border border-[#00e5ff] bg-[#00e5ff]/10 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                        : "border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.2]"
                    }`}
                  >
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg">
                      <Image src={style.image} alt={style.name} fill className="object-cover" />
                    </div>
                    <span className="text-xs font-bold text-white line-clamp-2">{style.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Ceiling & Floor Selectors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-[#d4af37]">
                3. Ceiling Illumination
              </label>
              <select
                value={selectedCeiling}
                onChange={(e) => setSelectedCeiling(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/[0.1] bg-[#0c121e] px-3 py-2.5 text-xs font-semibold text-slate-200 focus:border-[#d4af37] outline-none"
              >
                {ceilingStyles.map((s) => (
                  <option key={s} value={s} className="bg-[#0c121e]">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-black uppercase tracking-wider text-[#d4af37]">
                4. Floor Material
              </label>
              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/[0.1] bg-[#0c121e] px-3 py-2.5 text-xs font-semibold text-slate-200 focus:border-[#d4af37] outline-none"
              >
                {floorMaterials.map((f) => (
                  <option key={f} value={f} className="bg-[#0c121e]">
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2">
            <Link
              href={`/quote?projectType=${encodeURIComponent(selectedType.name)}&elevatorType=${encodeURIComponent(selectedCabin.name)}`}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f5e2a3] to-[#c59e33] py-3.5 text-sm font-black uppercase tracking-wider text-[#06090e] shadow-xl shadow-[#d4af37]/25 transition hover:brightness-110 active:scale-[0.99]"
            >
              <span>Lock Configuration & Request Instant Quote</span>
              <ArrowRight className="size-4" />
            </Link>
            <p className="mt-2 text-center text-[11px] text-slate-400">
              Includes full structural CAD survey, manufacturing specifications & factory warranty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
