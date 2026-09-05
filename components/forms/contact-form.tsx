"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const body = Object.fromEntries(new FormData(form));
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setLoading(false);
    if (!response.ok) return setStatus("Please check the message details and try again.");
    form.reset();
    setStatus("Message sent and saved to the admin dashboard.");
  }
  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg bg-white p-5 text-[#121815] shadow-xl shadow-black/10">
      {["name", "email", "phone", "subject"].map((name) => (
        <label className="grid gap-2 text-sm font-bold" key={name}>
          {name[0].toUpperCase() + name.slice(1)}
          <input required={name !== "phone"} name={name} type={name === "email" ? "email" : "text"} className="min-h-11 rounded-lg border border-[#063f31]/15 px-3 font-normal" />
        </label>
      ))}
      <label className="grid gap-2 text-sm font-bold">
        Message
        <textarea required name="message" rows={5} className="rounded-lg border border-[#063f31]/15 p-3 font-normal" />
      </label>
      <Button disabled={loading}>{loading ? "Sending..." : "Send Message"}</Button>
      <p className="min-h-5 text-sm font-semibold text-[#063f31]" role="status">{status}</p>
    </form>
  );
}
