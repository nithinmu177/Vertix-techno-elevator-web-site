"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { apiUrl } from "@/lib/api-url";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    const body = Object.fromEntries(new FormData(e.currentTarget));
    const result = await signIn("credentials", { ...body, redirect: false });
    setLoading(false);
    if (result?.error) return setStatus("Invalid admin login ID or password. Please try again.");
    router.push(params.get("callbackUrl") || "/admin");
  }

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[#172B4D]">
          Admin Login ID (Email)
        </label>
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          placeholder="admin@vertix.local"
          className="w-full rounded-xl border border-slate-200 bg-[#F3F6FA] px-4 py-3 text-[#172B4D] placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="grid gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[#172B4D]">
          Admin Password
        </label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-slate-200 bg-[#F3F6FA] px-4 py-3 text-[#172B4D] placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className="mt-2 w-full py-3 text-sm font-bold tracking-wider uppercase"
        disabled={loading}
      >
        {loading ? "Verifying Credentials…" : "Admin Log In"}
      </Button>

      {status && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
          {status}
        </p>
      )}
    </form>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    const body = Object.fromEntries(new FormData(e.currentTarget));
    const response = await fetch(apiUrl("/api/auth/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      setLoading(false);
      return setStatus("Registration failed. Use a valid email and 8+ character password.");
    }
    await signIn("credentials", { email: body.email, password: body.password, redirect: false });
    router.push("/profile");
  }

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[#172B4D]">
          Full Name
        </label>
        <input
          name="name"
          required
          placeholder="John Smith"
          className="w-full rounded-xl border border-slate-200 bg-[#F3F6FA] px-4 py-3 text-[#172B4D] placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="grid gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[#172B4D]">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-slate-200 bg-[#F3F6FA] px-4 py-3 text-[#172B4D] placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="grid gap-1.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[#172B4D]">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          placeholder="Min. 8 characters"
          className="w-full rounded-xl border border-slate-200 bg-[#F3F6FA] px-4 py-3 text-[#172B4D] placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#2563EB] focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className="mt-2 w-full py-3 text-sm font-bold tracking-wider uppercase"
        disabled={loading}
      >
        {loading ? "Creating Account…" : "Create Account"}
      </Button>

      {status && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
          {status}
        </p>
      )}
    </form>
  );
}
