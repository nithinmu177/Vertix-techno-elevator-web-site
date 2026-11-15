"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Send, Phone, User, MessageSquare, AlertCircle, Loader2 } from "lucide-react";
import { apiUrl } from "@/lib/api-url";

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
      const response = await fetch(apiUrl("/api/contact"), {
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
      setStatus("A network error occurred. Please try again or reach our hotline directly.");
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto size-12 text-[#10B981]" />
        <h4 className="mt-3 text-2xl font-bold text-[#3B1F6E]">Message Sent Successfully</h4>
        <p className="mt-2 text-sm text-[#4B5563] max-w-sm mx-auto">
          Thank you for contacting Vertix Techno Elevator. Our customer service and engineering team will respond to your query shortly.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-5 text-xs font-bold uppercase tracking-wider text-[#7C3AED] hover:text-[#6D28D9] underline cursor-pointer"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-4 rounded-2xl border border-violet-100 bg-white p-6 lg:p-8 shadow-sm"
    >
      <div className="border-b border-violet-50 pb-3">
        <h3 className="text-xl font-bold text-[#3B1F6E]">Send Us a Message</h3>
        <p className="mt-1 text-xs text-[#4B5563]">
          Our customer service and technical team is ready to answer any queries.
        </p>
      </div>

      {status && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
          <AlertCircle className="size-4 shrink-0" />
          <span>{status}</span>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#3B1F6E]">
            Your Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 size-4 text-violet-300" />
            <input
              required
              name="name"
              type="text"
              placeholder="e.g. Anand Sharma"
              className="w-full min-h-11 rounded-xl border border-violet-100 bg-[#F5F3FF] pl-9 pr-3.5 text-sm font-medium text-[#3B1F6E] placeholder:text-slate-400 outline-none transition focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#3B1F6E]">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 size-4 text-violet-300" />
            <input
              required
              name="email"
              type="email"
              placeholder="name@domain.com"
              className="w-full min-h-11 rounded-xl border border-violet-100 bg-[#F5F3FF] pl-9 pr-3.5 text-sm font-medium text-[#3B1F6E] placeholder:text-slate-400 outline-none transition focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#3B1F6E]">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 size-4 text-violet-300" />
            <input
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              className="w-full min-h-11 rounded-xl border border-violet-100 bg-[#F5F3FF] pl-9 pr-3.5 text-sm font-medium text-[#3B1F6E] placeholder:text-slate-400 outline-none transition focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#3B1F6E]">
            Subject <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 size-4 text-violet-300" />
            <input
              required
              name="subject"
              type="text"
              placeholder="e.g. Elevator Maintenance Inquiry"
              className="w-full min-h-11 rounded-xl border border-violet-100 bg-[#F5F3FF] pl-9 pr-3.5 text-sm font-medium text-[#3B1F6E] placeholder:text-slate-400 outline-none transition focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-[#3B1F6E]">
          Your Message <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          name="message"
          rows={4}
          placeholder="How can we assist you with your elevator requirements?"
          className="rounded-xl border border-violet-100 bg-[#F5F3FF] p-3.5 text-sm font-medium text-[#3B1F6E] placeholder:text-slate-400 outline-none transition focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-violet-100"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="focus-ring inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-6 text-sm font-bold tracking-wide text-white shadow-md shadow-violet-500/25 transition hover:bg-[#6D28D9] disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <Send className="size-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
