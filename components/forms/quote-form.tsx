"use client";

import { useState } from "react";
import { CheckCircle2, User, Phone, Mail, MapPin, Building, Wrench, AlertCircle, Loader2 } from "lucide-react";
import { apiUrl } from "@/lib/api-url";

export function QuoteForm() {
  const [status, setStatus] = useState("");
  const [quoteId, setQuoteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const form = event.currentTarget;
    const formData = new FormData(form);

    const body = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      location: String(formData.get("location") || "").trim(),
      buildingType: String(formData.get("buildingType") || "").trim(),
      projectType: String(formData.get("projectType") || "").trim(),
      message: String(formData.get("message") || "").trim()
    };

    if (!body.name || !body.phone || !body.email || !body.location || !body.projectType) {
      setLoading(false);
      setStatus("Please fill in all required fields (Name, Phone, Email, City, and Required Service).");
      return;
    }

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
      setStatus("A network error occurred. Please check your connection or contact our hotline directly.");
    }
  }

  if (quoteId) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto size-12 text-[#10B981]" />
        <h4 className="mt-3 text-2xl font-bold text-[#3B1F6E]">Quote Request Received</h4>
        <p className="mt-2 text-sm text-[#4B5563] max-w-md mx-auto">
          Thank you! Your reference code is <strong className="text-[#7C3AED] font-mono">{quoteId}</strong>. Our engineering team has logged your requirements and will get back to you with a detailed proposal and preliminary drawings.
        </p>
        <button
          onClick={() => setQuoteId(null)}
          className="mt-5 text-xs font-bold uppercase tracking-wider text-[#7C3AED] hover:text-[#6D28D9] underline cursor-pointer"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-5 rounded-2xl border border-violet-100 bg-white p-6 lg:p-8 shadow-sm"
    >
      <div className="border-b border-violet-50 pb-3">
        <h3 className="text-xl font-bold text-[#3B1F6E]">Customer Enquiry</h3>
        <p className="mt-1 text-xs text-[#4B5563]">
          Fill out this form to receive a prompt technical review and cost quotation.
        </p>
      </div>

      {status && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
          <AlertCircle className="size-4 shrink-0" />
          <span>{status}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#3B1F6E]">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 size-4 text-violet-300" />
            <input
              required
              name="name"
              type="text"
              placeholder="e.g. Ramesh Kumar"
              className="w-full min-h-11 rounded-xl border border-violet-100 bg-[#F5F3FF] pl-9 pr-3.5 text-sm font-medium text-[#3B1F6E] placeholder:text-slate-400 outline-none transition focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#3B1F6E]">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 size-4 text-violet-300" />
            <input
              required
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              className="w-full min-h-11 rounded-xl border border-violet-100 bg-[#F5F3FF] pl-9 pr-3.5 text-sm font-medium text-[#3B1F6E] placeholder:text-slate-400 outline-none transition focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
          </div>
        </div>

        {/* Email Address */}
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
              placeholder="name@example.com"
              className="w-full min-h-11 rounded-xl border border-violet-100 bg-[#F5F3FF] pl-9 pr-3.5 text-sm font-medium text-[#3B1F6E] placeholder:text-slate-400 outline-none transition focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
          </div>
        </div>

        {/* City */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#3B1F6E]">
            City <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 size-4 text-violet-300" />
            <input
              required
              name="location"
              type="text"
              placeholder="e.g. Bengaluru, Mysore"
              className="w-full min-h-11 rounded-xl border border-violet-100 bg-[#F5F3FF] pl-9 pr-3.5 text-sm font-medium text-[#3B1F6E] placeholder:text-slate-400 outline-none transition focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-violet-100"
            />
          </div>
        </div>

        {/* Building Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#3B1F6E]">
            Building Type
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-3 size-4 text-violet-300" />
            <select
              name="buildingType"
              defaultValue=""
              className="w-full min-h-11 rounded-xl border border-violet-100 bg-[#F5F3FF] pl-9 pr-3.5 text-sm font-medium text-[#3B1F6E] outline-none transition focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-violet-100"
            >
              <option value="" disabled>Select Building Type</option>
              <option value="Residential Apartment">Residential Apartment</option>
              <option value="Independent House / Villa">Independent House / Villa</option>
              <option value="Office Building">Office Building</option>
              <option value="Commercial Complex">Commercial Complex</option>
              <option value="Hotel / Hospitality">Hotel / Hospitality</option>
              <option value="Hospital / Healthcare">Hospital / Healthcare</option>
              <option value="Industrial / Factory">Industrial / Factory</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Required Service */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#3B1F6E]">
            Required Service <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Wrench className="absolute left-3 top-3 size-4 text-violet-300" />
            <select
              required
              name="projectType"
              defaultValue=""
              className="w-full min-h-11 rounded-xl border border-violet-100 bg-[#F5F3FF] pl-9 pr-3.5 text-sm font-medium text-[#3B1F6E] outline-none transition focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-violet-100"
            >
              <option value="" disabled>Select Required Service</option>
              <option value="Passenger Elevators">Passenger Elevators</option>
              <option value="Residential Elevators">Residential Elevators</option>
              <option value="Commercial Elevators">Commercial Elevators</option>
              <option value="Elevator Installation">Elevator Installation</option>
              <option value="Elevator Maintenance">Elevator Maintenance & AMC</option>
              <option value="Elevator Repair">Elevator Repair</option>
              <option value="Elevator Modernization">Elevator Modernization</option>
            </select>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-[#3B1F6E]">
          Message
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="Please share any specific details (number of floors, passenger capacity, shaft dimensions, or timeline)..."
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
              <span>Submitting Quote Request...</span>
            </>
          ) : (
            <span>Request a Free Quote</span>
          )}
        </button>
      </div>
    </form>
  );
}
