import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "gold" | "secondary" | "cyan" | "ghost" | "danger";
};

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-6 text-sm font-bold tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
        (variant === "primary" || variant === "gold") &&
          "bg-gradient-to-r from-[#d4af37] via-[#f5e2a3] to-[#c59e33] text-[#06090e] font-black shadow-lg shadow-[#d4af37]/25 hover:brightness-110 hover:shadow-[#d4af37]/40 hover:-translate-y-0.5 active:translate-y-0",
        variant === "secondary" &&
          "border border-[#d4af37]/40 bg-white/[0.05] text-white hover:border-[#d4af37] hover:bg-white/[0.1] hover:text-[#f5e2a3] backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0",
        variant === "cyan" &&
          "bg-gradient-to-r from-[#00e5ff] to-[#0284c7] text-[#06090e] font-black shadow-lg shadow-[#00e5ff]/25 hover:brightness-110 hover:shadow-[#00e5ff]/40 hover:-translate-y-0.5 active:translate-y-0",
        variant === "ghost" &&
          "text-white/80 hover:text-white hover:bg-white/[0.08] active:bg-white/[0.12]",
        variant === "danger" &&
          "bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-lg shadow-red-600/20 hover:brightness-110",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function CtaLink({
  href,
  children,
  variant = "primary",
  className
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "cyan" | "ghost";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-6 text-sm font-bold tracking-wide transition-all duration-300",
        variant === "primary" &&
          "bg-gradient-to-r from-[#d4af37] via-[#f5e2a3] to-[#c59e33] text-[#06090e] font-black shadow-lg shadow-[#d4af37]/25 hover:brightness-110 hover:shadow-[#d4af37]/40 hover:-translate-y-0.5 active:translate-y-0",
        variant === "secondary" &&
          "border border-[#d4af37]/40 bg-white/[0.05] text-white hover:border-[#d4af37] hover:bg-white/[0.1] hover:text-[#f5e2a3] backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0",
        variant === "cyan" &&
          "bg-gradient-to-r from-[#00e5ff] to-[#0284c7] text-[#06090e] font-black shadow-lg shadow-[#00e5ff]/25 hover:brightness-110 hover:shadow-[#00e5ff]/40 hover:-translate-y-0.5 active:translate-y-0",
        variant === "ghost" &&
          "text-white/80 hover:text-white hover:bg-white/[0.08] active:bg-white/[0.12]",
        className
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
    </Link>
  );
}
