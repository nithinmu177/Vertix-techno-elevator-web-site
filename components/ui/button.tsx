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
        "focus-ring inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-6 text-sm font-bold tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
        (variant === "primary" || variant === "gold") &&
          "bg-[#7C3AED] text-white shadow-md shadow-violet-500/25 hover:bg-[#6D28D9] hover:-translate-y-0.5 active:translate-y-0",
        variant === "secondary" &&
          "border border-[#DDD6FE] bg-white text-[#3B1F6E] hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-[#F5F3FF] shadow-sm hover:-translate-y-0.5 active:translate-y-0",
        variant === "cyan" &&
          "bg-[#10B981] text-white shadow-md shadow-emerald-500/20 hover:bg-[#059669] hover:-translate-y-0.5 active:translate-y-0",
        variant === "ghost" &&
          "text-[#3B1F6E] hover:text-[#7C3AED] hover:bg-[#F5F3FF] active:bg-violet-100",
        variant === "danger" &&
          "bg-red-600 text-white shadow-sm hover:bg-red-700",
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
        "focus-ring group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl px-6 text-sm font-bold tracking-wide transition-all duration-200",
        variant === "primary" &&
          "bg-[#7C3AED] text-white shadow-md shadow-violet-500/25 hover:bg-[#6D28D9] hover:-translate-y-0.5 active:translate-y-0",
        variant === "secondary" &&
          "border border-[#DDD6FE] bg-white text-[#3B1F6E] hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-[#F5F3FF] shadow-sm hover:-translate-y-0.5 active:translate-y-0",
        variant === "cyan" &&
          "bg-[#10B981] text-white shadow-md shadow-emerald-500/20 hover:bg-[#059669] hover:-translate-y-0.5 active:translate-y-0",
        variant === "ghost" &&
          "text-[#3B1F6E] hover:text-[#7C3AED] hover:bg-[#F5F3FF] active:bg-violet-100",
        className
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}
