import Link from "next/link";
import { RegisterForm } from "@/components/forms/auth-forms";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06090e] flex items-center justify-center px-4 py-16">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#d4af37]/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#00e5ff]/5 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand mark */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-2 group">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d4af37]/30 bg-[#d4af37]/10 shadow-[0_0_40px_rgba(212,175,55,0.15)] transition-all duration-300 group-hover:shadow-[0_0_60px_rgba(212,175,55,0.3)]">
              <span className="text-2xl font-black tracking-tight text-[#d4af37]">V</span>
            </div>
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">
              Vertix Techno
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/[0.06] bg-[#0c121e]/90 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 px-4 py-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_6px_#d4af37]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                New Account
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-white">
              Create Account
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Join Vertix to track your orders and projects
            </p>
          </div>

          <RegisterForm />
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm">
          <Link
            href="/login"
            className="font-semibold text-slate-500 transition-colors hover:text-[#d4af37]"
          >
            Already have an account?
          </Link>
          <span className="text-slate-700">·</span>
          <Link
            href="/"
            className="font-semibold text-slate-500 transition-colors hover:text-[#d4af37]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
