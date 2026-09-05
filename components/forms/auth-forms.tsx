"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.currentTarget));
    const result = await signIn("credentials", { ...body, redirect: false });
    if (result?.error) return setStatus("Invalid email or password.");
    router.push(params.get("callbackUrl") || "/admin");
  }
  return <form onSubmit={submit} className="grid gap-4 rounded-lg bg-white p-6 shadow-xl"><input name="email" type="email" required placeholder="Email" className="rounded-lg border p-3" /><input name="password" type="password" required placeholder="Password" className="rounded-lg border p-3" /><Button>Login</Button><p className="text-sm font-bold text-red-700">{status}</p></form>;
}

export function RegisterForm() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(e.currentTarget));
    const response = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!response.ok) return setStatus("Registration failed. Use a valid email and 8+ character password.");
    await signIn("credentials", { email: body.email, password: body.password, redirect: false });
    router.push("/profile");
  }
  return <form onSubmit={submit} className="grid gap-4 rounded-lg bg-white p-6 shadow-xl"><input name="name" required placeholder="Name" className="rounded-lg border p-3" /><input name="email" type="email" required placeholder="Email" className="rounded-lg border p-3" /><input name="password" type="password" required placeholder="Password" className="rounded-lg border p-3" /><Button>Create Account</Button><p className="text-sm font-bold text-red-700">{status}</p></form>;
}
