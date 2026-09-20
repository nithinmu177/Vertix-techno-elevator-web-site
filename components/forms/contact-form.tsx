"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, Mail, Send } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const result = await response.json().catch(() => ({}));
      setLoading(false);
      if (!response.ok) {
        return setStatus(result.error || "Please verify your message details and try again.");
      }
      form.reset();
      setSuccess(true);
    } catch {
      setLoading(false);
      setStatus("A network error occurred. Please try again or reach our 24/7 hotline.");
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center backdrop-blur-xl">
        <CheckCircle2 className="mx-auto size-12 text-emerald-400" />
        <h4 className="mt-3 text-2xl font-black text-white">Message Dispatched</h4>
        <p className="mt-2 text-sm text-slate-300 max-w-sm mx-auto">
          Your inquiry has been routed to the Vertix engineering communications desk. We respond to all technical queries within 4 business hours.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-5 text-xs font-bold uppercase tracking-wider text-[#d4af37] underline hover:text-white"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-4 rounded-2xl border border-white/[0.1] bg-[#0c121e]/90 p-6 lg:p-8 shadow-2xl backdrop-blur-xl"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Your Name *
          </label>
          <input
            required
            name="name"
            type="text"
            placeholder="e.g. Anand Mahindra"
            className="min-h-11 rounded-xl border border-white/[0.1] bg-[#080c14] px-3.5 text-xs font-semibold text-white placeholder:text-slate-600 outline-none transition focus:border-[#d4af37] focus:shadow-[0_0_12px_rgba(212,175,55,0.2)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Email Address *
          </label>
          <input
            required
            name="email"
            type="email"
            placeholder="name@domain.com"
            className="min-h-11 rounded-xl border border-white/[0.1] bg-[#080c14] px-3.5 text-xs font-semibold text-white placeholder:text-slate-600 outline-none transition focus:border-[#d4af37] focus:shadow-[0_0_12px_rgba(212,175,55,0.2)]"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Contact Number
          </label>
          <input
            name="phone"
            type="tel"
            placeholder="+91 98..."
            className="min-h-11 rounded-xl border border-white/[0.1] bg-[#080c14] px-3.5 text-xs font-semibold text-white placeholder:text-slate-600 outline-none transition focus:border-[#d4af37] focus:shadow-[0_0_12px_rgba(212,175,55,0.2)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Subject *
          </label>
          <input
            required
            name="subject"
            type="text"
            placeholder="e.g. AMC Inquiry / Villa Lift Specification"
            className="min-h-11 rounded-xl border border-white/[0.1] bg-[#080c14] px-3.5 text-xs font-semibold text-white placeholder:text-slate-600 outline-none transition focus:border-[#d4af37] focus:shadow-[0_0_12px_rgba(212,175,55,0.2)]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Message / Requirement Details *
        </label>
        <textarea
          required
          name="message"
          rows={4}
          placeholder="Please share details about your requirement, location, building type, or maintenance queries..."
          className="rounded-xl border border-white/[0.1] bg-[#080c14] p-3.5 text-xs font-semibold text-white placeholder:text-slate-600 outline-none transition focus:border-[#d4af37] focus:shadow-[0_0_12px_rgba(212,175,55,0.2)]"
        />
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="size-4 text-emerald-400" />
          <span>Strict privacy assured.</span>
        </div>
        <Button disabled={loading}>
          {loading ? "Sending..." : "Transmit Message"}
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
