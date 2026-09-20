"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, Sparkles, Building, MapPin, Phone, Mail, User } from "lucide-react";
import { apiUrl } from "@/lib/api-url";

const fields = [
  { name: "name", label: "Full Name *", type: "text", placeholder: "e.g. Vikram Singhania", icon: User, required: true },
  { name: "company", label: "Company / Firm", type: "text", placeholder: "e.g. Prestige Projects", icon: Building, required: false },
  { name: "email", label: "Email Address *", type: "email", placeholder: "vikram@example.com", icon: Mail, required: true },
  { name: "phone", label: "Phone Number *", type: "tel", placeholder: "+91 63605...", icon: Phone, required: true },
  { name: "projectType", label: "Project Category *", type: "text", placeholder: "e.g. Commercial / Villa / Hospital", required: true },
  { name: "location", label: "City & Site Location *", type: "text", placeholder: "e.g. Bangalore, Indiranagar", icon: MapPin, required: true },
  { name: "buildingType", label: "Building Structure", type: "text", placeholder: "e.g. G+4 Duplex / 20-Story Tower", required: false },
  { name: "numberOfFloors", label: "Number of Floors", type: "number", placeholder: "e.g. 5", required: false },
  { name: "elevatorType", label: "Preferred Drive / Model", type: "text", placeholder: "e.g. MRL PMSM / Panoramic", required: false },
  { name: "requiredCapacity", label: "Estimated Capacity", type: "text", placeholder: "e.g. 8 Persons (544 kg)", required: false }
];

export function QuoteForm() {
  const [status, setStatus] = useState("");
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch(apiUrl("/api/quotes"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      setLoading(false);
      if (!response.ok) {
        return setStatus(data.error || "Please verify the form details and try again.");
      }
      form.reset();
      setQuoteId(data.quoteId || "VTX-" + Math.floor(100000 + Math.random() * 900000));
    } catch {
      setLoading(false);
      setStatus("A network error occurred. Please try again or reach out on our hotline.");
    }
  }

  if (quoteId) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center backdrop-blur-xl">
        <CheckCircle2 className="mx-auto size-12 text-emerald-400" />
        <h4 className="mt-3 text-2xl font-black text-white">Quote Request Received</h4>
        <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto">
          Reference Code: <strong className="text-[#f5e2a3] font-mono">{quoteId}</strong>. Our engineering applications team has logged your site parameters and will contact you with preliminary CAD fitments shortly.
        </p>
        <button
          onClick={() => setQuoteId(null)}
          className="mt-5 text-xs font-bold uppercase tracking-wider text-[#d4af37] underline hover:text-white"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-5 rounded-2xl border border-white/[0.1] bg-[#0c121e]/90 p-6 lg:p-8 shadow-2xl backdrop-blur-xl"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              {f.label}
            </label>
            <input
              required={f.required}
              name={f.name}
              type={f.type}
              placeholder={f.placeholder}
              className="min-h-11 rounded-xl border border-white/[0.1] bg-[#080c14] px-3.5 text-xs font-semibold text-white placeholder:text-slate-600 outline-none transition focus:border-[#d4af37] focus:shadow-[0_0_12px_rgba(212,175,55,0.2)]"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Specific Shaft Dimensions, Architectural Finish or Project Notes
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="Specify any custom pit depth constraints, door opening width, glass cabin desires, or delivery target dates..."
          className="rounded-xl border border-white/[0.1] bg-[#080c14] p-3.5 text-xs font-semibold text-white placeholder:text-slate-600 outline-none transition focus:border-[#d4af37] focus:shadow-[0_0_12px_rgba(212,175,55,0.2)]"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="size-4 text-emerald-400" />
          <span>Includes preliminary shaft drawings & technical load schedule.</span>
        </div>
        <Button disabled={loading} className="w-full sm:w-auto">
          {loading ? "Registering Request..." : "Submit Technical Specification"}
        </Button>
      </div>

      {status && (
        <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs font-bold text-rose-300" role="status">
          {status}
        </p>
      )}
    </form>
  );
}
