"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Sliders } from "lucide-react";

const buildingTypes = [
  {
    id: "passenger",
    name: "Passenger Lift (LMR / MRL)",
    capacity: "4P to 17P (272 - 1150 kg)",
    speed: "1.0 m/s - 2.5 m/s",
    power: "Gearless PMSM Energy-Saving Drive",
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
    power: "Emergency Backup ARD Ready",
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
    description: "Hairline stainless steel with precision acoustic dampening and mirror accents.",
    tag: "Standard Clean"
  },
  {
    id: "ms-powder",
    name: "MS Powder-Coated Contemporary Cabin",
    image: "/images/brochure-extracts/extract-02.jpg",
    description: "Electrostatic powder-coated high-durability finish with modern styling.",
    tag: "Modern Clean"
  },
  {
    id: "ms-pre",
    name: "Architectural Pre-Coated Cabin",
    image: "/images/brochure-extracts/extract-15.jpg",
    description: "Dual-tone pre-coated steel with warm textured wall panels and LED diffuse lighting.",
    tag: "Architectural"
  },
  {
    id: "gold",
    name: "Designer Stainless Steel (304 Grade)",
    image: "/images/brochure-extracts/extract-31.jpg",
    description: "Etched 304 grade premium stainless steel with luxury geometric ceiling.",
    tag: "Premium 304 Grade"
  },
  {
    id: "rose-gold",
    name: "Executive Luxury Glass & Wood Cabin",
    image: "/images/brochure-extracts/extract-31.jpg",
    description: "Premium finish combining mirrored accents and acoustic timber wall panels.",
    tag: "Executive Villa"
  }
];

const ceilingStyles = [
  "Model 1: Spot LED & Central Louvre Array",
  "Model 2: Translucent Linear LED Panel",
  "Model 3: Quad Spotlights with Center Diffuser",
  "Model 4: Warm Grid Backlit Ceiling",
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
    <div className="relative rounded-3xl border border-slate-200 bg-white p-6 lg:p-10 shadow-sm">
      {/* Decorative Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB]">
            <Sliders className="size-4" />
            <span>Interactive Selection Studio</span>
          </div>
          <h3 className="mt-1 text-2xl font-bold text-[#172B4D] lg:text-3xl">
            Cabin & Drive Configurator
          </h3>
          <p className="text-sm text-[#475569]">
            Select cabin finishes, application requirements, and styling in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5 text-xs font-bold text-[#16A34A]">
          <span className="size-2 rounded-full bg-[#16A34A] animate-pulse" />
          <span>Interactive Studio Ready</span>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1.1fr]">
        {/* Left: Dynamic Visual Preview */}
        <div className="flex flex-col">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
            <Image
              src={selectedCabin.image}
              alt={selectedCabin.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-all duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#172B4D]/80 via-transparent to-transparent" />

            {/* Floating Cabin Specs Badge */}
            <div className="absolute left-4 top-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white/95 px-3.5 py-1 text-xs font-bold text-[#2563EB] shadow-sm backdrop-blur-md">
                <Sparkles className="size-3.5 text-[#2563EB]" />
                {selectedCabin.tag}
              </span>
            </div>

            {/* Bottom Overlay Info */}
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <h4 className="text-xl font-bold">{selectedCabin.name}</h4>
              <p className="mt-1 text-xs text-slate-200 leading-relaxed max-w-md">
                {selectedCabin.description}
              </p>
            </div>
          </div>

          {/* Telemetry Summary Bar */}
          <div className="mt-4 grid grid-cols-3 gap-3 rounded-2xl border border-slate-200 bg-[#F3F6FA] p-4 text-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Target Speed</span>
              <p className="mt-0.5 text-sm font-bold text-[#2563EB]">{selectedType.speed}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Load Rating</span>
              <p className="mt-0.5 text-sm font-bold text-[#172B4D]">{selectedType.capacity}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]">Efficiency</span>
              <p className="mt-0.5 text-sm font-bold text-[#16A34A]">A+++ VDI 4707</p>
            </div>
          </div>
        </div>

        {/* Right: Interactive Options Selector */}
        <div className="space-y-6">
          {/* Step 1: Building Archetype */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#172B4D]">
              1. Select Application Archetype
            </label>
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {buildingTypes.map((type) => {
                const active = selectedType.id === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type)}
                    className={`flex flex-col items-start rounded-xl p-3 text-left transition duration-200 cursor-pointer ${
                      active
                        ? "border-2 border-[#2563EB] bg-blue-50 text-[#2563EB]"
                        : "border border-slate-200 bg-[#F3F6FA] hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xs font-bold text-[#172B4D]">{type.name}</span>
                    <span className="mt-0.5 text-[11px] text-[#475569]">{type.capacity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Interior Cabin Finish */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#172B4D]">
              2. Choose Cabin Architecture & Walls
            </label>
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {cabinStyles.map((style) => {
                const active = selectedCabin.id === style.id;
                return (
                  <button
                    key={style.id}
                    onClick={() => setSelectedCabin(style)}
                    className={`flex items-center gap-2.5 rounded-xl p-3 text-left transition duration-200 cursor-pointer ${
                      active
                        ? "border-2 border-[#2563EB] bg-blue-50 text-[#2563EB]"
                        : "border border-slate-200 bg-[#F3F6FA] hover:bg-slate-100 hover:border-slate-300"
                    }`}
                  >
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                      <Image src={style.image} alt={style.name} fill className="object-cover" />
                    </div>
                    <span className="text-xs font-bold text-[#172B4D] line-clamp-2">{style.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Ceiling & Floor Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#172B4D]">
                3. Ceiling Illumination
              </label>
              <select
                value={selectedCeiling}
                onChange={(e) => setSelectedCeiling(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-[#F3F6FA] px-3 py-2.5 text-xs font-medium text-[#172B4D] focus:border-[#2563EB] focus:bg-white outline-none"
              >
                {ceilingStyles.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#172B4D]">
                4. Floor Material
              </label>
              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-[#F3F6FA] px-3 py-2.5 text-xs font-medium text-[#172B4D] focus:border-[#2563EB] focus:bg-white outline-none"
              >
                {floorMaterials.map((f) => (
                  <option key={f} value={f}>
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
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition hover:bg-[#1D4ED8]"
            >
              <span>Request Quote for This Configuration</span>
              <ArrowRight className="size-4" />
            </Link>
            <p className="mt-2 text-center text-[11px] text-[#475569]">
              Includes full structural CAD survey, manufacturing specifications & warranty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
