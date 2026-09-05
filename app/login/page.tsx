import Link from "next/link";
import { Suspense } from "react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { LoginForm } from "@/components/forms/auth-forms";

export default function LoginPage() {
  return <><Navbar /><main className="container max-w-md py-16"><h1 className="mb-6 text-4xl font-black">Admin / Customer Login</h1><Suspense><LoginForm /></Suspense><Link className="mt-4 block font-bold text-[#063f31]" href="/register">Create customer account</Link></main><Footer /></>;
}
