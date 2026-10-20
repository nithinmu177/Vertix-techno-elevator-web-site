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
          "bg-[#2563EB] text-white shadow-md shadow-blue-500/20 hover:bg-[#1D4ED8] hover:-translate-y-0.5 active:translate-y-0",
        variant === "secondary" &&
          "border border-slate-200 bg-white text-[#172B4D] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#F3F6FA] shadow-sm hover:-translate-y-0.5 active:translate-y-0",
        variant === "cyan" &&
          "bg-[#16A34A] text-white shadow-md shadow-green-600/20 hover:bg-[#15803D] hover:-translate-y-0.5 active:translate-y-0",
        variant === "ghost" &&
          "text-[#172B4D] hover:text-[#2563EB] hover:bg-[#F3F6FA] active:bg-slate-100",
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
          "bg-[#2563EB] text-white shadow-md shadow-blue-500/20 hover:bg-[#1D4ED8] hover:-translate-y-0.5 active:translate-y-0",
        variant === "secondary" &&
          "border border-slate-200 bg-white text-[#172B4D] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#F3F6FA] shadow-sm hover:-translate-y-0.5 active:translate-y-0",
        variant === "cyan" &&
          "bg-[#16A34A] text-white shadow-md shadow-green-600/20 hover:bg-[#15803D] hover:-translate-y-0.5 active:translate-y-0",
        variant === "ghost" &&
          "text-[#172B4D] hover:text-[#2563EB] hover:bg-[#F3F6FA] active:bg-slate-100",
        className
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}
