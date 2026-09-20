"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

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
    if (result?.error) return setStatus("Invalid email or password. Please try again.");
    router.push(params.get("callbackUrl") || "/admin");
  }

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid gap-1.5">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-white/[0.08] bg-[#080c14] px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20"
        />
      </div>

      <div className="grid gap-1.5">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          placeholder="••••••••"
          className="w-full rounded-xl border border-white/[0.08] bg-[#080c14] px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20"
        />
      </div>

      <Button
        type="submit"
        variant="gold"
        className="mt-2 w-full py-3 text-base font-bold tracking-widest"
        disabled={loading}
      >
        {loading ? "Authenticating…" : "Sign In"}
      </Button>

      {status && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm font-medium text-red-400">
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
    const response = await fetch("/api/auth/register", {
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
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Full Name
        </label>
        <input
          name="name"
          required
          placeholder="John Smith"
          className="w-full rounded-xl border border-white/[0.08] bg-[#080c14] px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20"
        />
      </div>

      <div className="grid gap-1.5">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-white/[0.08] bg-[#080c14] px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20"
        />
      </div>

      <div className="grid gap-1.5">
        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          placeholder="Min. 8 characters"
          className="w-full rounded-xl border border-white/[0.08] bg-[#080c14] px-4 py-3 text-white placeholder:text-slate-600 outline-none transition-all duration-200 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20"
        />
      </div>

      <Button
        type="submit"
        variant="gold"
        className="mt-2 w-full py-3 text-base font-bold tracking-widest"
        disabled={loading}
      >
        {loading ? "Creating Account…" : "Create Account"}
      </Button>

      {status && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-center text-sm font-medium text-red-400">
          {status}
        </p>
      )}
    </form>
  );
}
