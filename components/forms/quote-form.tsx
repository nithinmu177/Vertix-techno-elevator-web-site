"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const fields = [
  ["name", "Name", "text"],
  ["company", "Company", "text"],
  ["email", "Email", "email"],
  ["phone", "Phone", "tel"],
  ["projectType", "Project Type", "text"],
  ["location", "Location", "text"],
  ["buildingType", "Building Type", "text"],
  ["numberOfFloors", "Number of Floors", "number"],
  ["elevatorType", "Elevator Type", "text"],
  ["requiredCapacity", "Required Capacity", "text"]
];

export function QuoteForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    const response = await fetch("/api/quotes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setLoading(false);
    if (!response.ok) return setStatus("Please check the required details and try again.");
    form.reset();
    setStatus("Quote request submitted. The Vertix admin team can now view it in the dashboard.");
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-[#063f31]/10 bg-white p-5 shadow-xl shadow-black/5">
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map(([name, label, type]) => (
          <label className="grid gap-2 text-sm font-bold text-[#29332f]" key={name}>
            {label}
            <input required={["name", "email", "phone", "projectType", "location"].includes(name)} className="min-h-11 rounded-lg border border-[#063f31]/15 px-3 font-normal outline-none focus:border-[#c6a15b]" name={name} type={type} />
          </label>
        ))}
      </div>
      <label className="grid gap-2 text-sm font-bold text-[#29332f]">
        Message
        <textarea name="message" rows={4} className="rounded-lg border border-[#063f31]/15 p-3 font-normal outline-none focus:border-[#c6a15b]" />
      </label>
      <Button disabled={loading}>{loading ? "Submitting..." : "Submit Quote Request"}</Button>
      <p className="min-h-5 text-sm font-semibold text-[#063f31]" role="status">{status}</p>
    </form>
  );
}
