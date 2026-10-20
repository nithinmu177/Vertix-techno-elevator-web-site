import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { LoginForm } from "@/components/forms/auth-forms";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Admin Sign In | Vertix Operations",
  robots: { index: false, follow: false }
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen bg-[#F3F6FA] flex items-center justify-center px-4 py-16">
      <div className="relative z-10 w-full max-w-md">
        {/* Brand mark */}
        <div className="mb-8 text-center flex justify-center">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <Image
              src="/images/vertix-logo.png"
              alt="Vertix Techno Elevator"
              width={260}
              height={70}
              priority
              className="h-12 w-auto object-contain transition duration-200 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="mb-6 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              <span className="size-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span>Operations Portal</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-[#172B4D]">
              Admin Sign In
            </h1>
            <p className="mt-1 text-xs text-[#475569]">
              Enter your credentials to access the internal management portal.
            </p>
          </div>

          <Suspense fallback={<p className="text-sm text-[#475569]">Loading portal…</p>}>
            <LoginForm />
          </Suspense>

          <div className="mt-6 border-t border-slate-100 pt-4 text-center">
            <Link href="/" className="text-xs font-semibold text-[#2563EB] hover:underline">
              ← Return to Vertix Public Website
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
