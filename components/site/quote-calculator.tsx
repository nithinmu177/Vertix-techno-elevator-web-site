"use client";

import { useState } from "react";
import { Calculator, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/lib/api-url";

export function QuoteCalculator() {
  const [floors, setFloors] = useState(4);
  const [capacity, setCapacity] = useState("6 Persons (450 kg)");
  const [speed, _setSpeed] = useState("1.0 m/s");
  const [drive, setDrive] = useState("MRL (Machine Room-Less) PMSM");

  
  // Contact Details for submission
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Calculation estimate
  const baseCost = 650000;
  const floorCost = (floors - 2) * 65000;
  const capacityMultiplier = capacity.includes("13") ? 1.35 : capacity.includes("21") ? 1.6 : capacity.includes("8") ? 1.15 : 1.0;
  const minEstimated = Math.round((baseCost + floorCost) * capacityMultiplier);
  const maxEstimated = Math.round(minEstimated * 1.25);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(apiUrl("/api/quotes"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          location,
          projectType: "Online Instant Estimator",
          numberOfFloors: Number(floors),
          elevatorType: drive,
          requiredCapacity: capacity,
          message: `Estimated Speed: ${speed}. Calculated budget range: ₹${(minEstimated / 100000).toFixed(1)}L - ₹${(maxEstimated / 100000).toFixed(1)}L`
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Please verify your contact information and try again.");
      } else {
        setSubmittedId(data.quoteId || "VTX-" + Math.floor(100000 + Math.random() * 900000));
      }
    } catch {
      setError("Network issue. Please try again or call our 24/7 hotline.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/[0.1] bg-gradient-to-b from-[#0c121e] to-[#06090e] p-6 lg:p-10 shadow-2xl backdrop-blur-2xl">
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#d4af37]">
        <Calculator className="size-4" />
        <span>Live Cost & Specification Estimator</span>
      </div>
      <h3 className="mt-1 text-2xl font-black text-white lg:text-3xl">
        Estimate Your Elevator Investment
      </h3>
      <p className="mt-1 text-sm text-slate-400">
        Adjust parameters to view projected engineering requirements and direct factory pricing.
      </p>

      {submittedId ? (
        <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center backdrop-blur-md">
          <CheckCircle2 className="mx-auto size-12 text-emerald-400" />
          <h4 className="mt-3 text-2xl font-black text-white">Requirement Registered Successfully</h4>
          <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto">
            Your custom specification reference is <strong className="text-[#f5e2a3] font-mono">{submittedId}</strong>. A senior Vertix applications engineer will review the shaft CAD requirements and contact you within 2 business hours.
          </p>
          <div className="mt-6">
            <button
              onClick={() => {
                setSubmittedId(null);
                setName("");
                setEmail("");
                setPhone("");
                setLocation("");
              }}
              className="text-xs font-bold uppercase tracking-wider text-[#d4af37] underline hover:text-white"
            >
              Configure Another Estimate
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Controls */}
          <div className="space-y-6">
            {/* Floors */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="uppercase tracking-wider text-[#d4af37]">Number of Floors / Stops</span>
                <span className="rounded-lg bg-[#d4af37]/20 px-2 py-0.5 font-mono text-sm font-black text-[#f5e2a3]">
                  {floors} Stops
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={30}
                value={floors}
                onChange={(e) => setFloors(Number(e.target.value))}
                className="mt-3 w-full accent-[#d4af37] cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-[10px] text-slate-500">
                <span>G+1 (2 Stops)</span>
                <span>G+14 (15 Stops)</span>
                <span>High-Rise (30 Stops)</span>
              </div>
            </div>

            {/* Capacity */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                Passenger Load Capacity
              </label>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  "4 Persons (272 kg)",
                  "6 Persons (408 kg)",
                  "8 Persons (544 kg)",
                  "10 Persons (680 kg)",
                  "13 Persons (884 kg)",
                  "15 Persons (1020 kg Bed)"
                ].map((cap) => (
                  <button
                    type="button"
                    key={cap}
                    onClick={() => setCapacity(cap)}
                    className={`rounded-xl p-2.5 text-xs font-bold transition text-left cursor-pointer ${
                      capacity === cap
                        ? "border border-[#d4af37] bg-[#d4af37]/15 text-[#f5e2a3]"
                        : "border border-white/[0.08] bg-white/[0.02] text-slate-300 hover:bg-white/[0.05]"
                    }`}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>

            {/* Drive Technology */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                Machine & Traction Type
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  "MRL (Machine Room-Less) PMSM",
                  "LMR (Traction with Machine Room)",
                  "Hydraulic Lift (10-12ft Overhead)",
                  "Goods / Freight Heavy Duty"
                ].map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => setDrive(d)}
                    className={`rounded-xl p-2.5 text-xs font-bold transition text-left cursor-pointer ${
                      drive === d
                        ? "border border-[#00e5ff] bg-[#00e5ff]/15 text-[#00e5ff]"
                        : "border border-white/[0.08] bg-white/[0.02] text-slate-300 hover:bg-white/[0.05]"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Pricing Estimation Card */}
            <div className="rounded-2xl border border-[#d4af37]/30 bg-gradient-to-r from-[#d4af37]/10 to-transparent p-5">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#d4af37]">
                Estimated Budget Bracket
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">
                  ₹ {(minEstimated / 100000).toFixed(1)}L - ₹ {(maxEstimated / 100000).toFixed(1)}L*
                </span>
                <span className="text-xs text-slate-400">approx turnkey</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                *Subject to cabin architectural finishes, shaft civil structure, and optional ARD/glass upgrades.
              </p>
            </div>
          </div>

          {/* Contact Fields for direct submission */}
          <div className="space-y-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <h4 className="text-sm font-black uppercase tracking-wider text-white">
              Receive Official Engineered Proposal
            </h4>
            <p className="text-xs text-slate-400">
              Submit your project location to get architectural shaft dimensions and factory quote.
            </p>

            <div className="grid gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/[0.1] bg-[#080c14] px-3.5 py-2.5 text-xs font-semibold text-white placeholder:text-slate-600 focus:border-[#d4af37] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/[0.1] bg-[#080c14] px-3.5 py-2.5 text-xs font-semibold text-white placeholder:text-slate-600 focus:border-[#d4af37] outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/[0.1] bg-[#080c14] px-3.5 py-2.5 text-xs font-semibold text-white placeholder:text-slate-600 focus:border-[#d4af37] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400">Project Site City / Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bangalore, Whitefield"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/[0.1] bg-[#080c14] px-3.5 py-2.5 text-xs font-semibold text-white placeholder:text-slate-600 focus:border-[#d4af37] outline-none"
                />
              </div>
            </div>

            {error && <p className="text-xs font-bold text-rose-400">{error}</p>}

            <Button disabled={loading} className="w-full mt-2">
              {loading ? "Submitting Specification..." : "Get Formal Engineered Quote"}
            </Button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              <span>Strict NDA & confidentiality guaranteed. No spam.</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
