import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export function Button({ className, variant = "primary", children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold transition",
        variant === "primary" && "bg-[#063f31] text-white hover:bg-[#092b24]",
        variant === "secondary" && "border border-[#c6a15b]/50 bg-white/10 text-inherit hover:border-[#c6a15b]",
        variant === "ghost" && "text-[#063f31] hover:bg-[#063f31]/10",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function CtaLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "ghost" }) {
  return (
    <Link
      href={href}
      className={cn(
        "focus-ring group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold transition",
        variant === "primary" && "bg-[#063f31] text-white hover:bg-[#092b24]",
        variant === "secondary" && "border border-[#c6a15b]/50 bg-white/10 text-inherit hover:border-[#c6a15b]",
        variant === "ghost" && "text-[#063f31] hover:bg-[#063f31]/10"
      )}
    >
      {children}
      <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}
