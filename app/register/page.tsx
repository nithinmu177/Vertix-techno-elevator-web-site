import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { RegisterForm } from "@/components/forms/auth-forms";

export default function RegisterPage() {
  return <><Navbar /><main className="container max-w-md py-16"><h1 className="mb-6 text-4xl font-black">Create Account</h1><RegisterForm /></main><Footer /></>;
}
