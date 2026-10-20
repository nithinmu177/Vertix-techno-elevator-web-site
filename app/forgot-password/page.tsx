import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <div className="container max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-[#F3F6FA] p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-[#172B4D]">Forgot Password</h1>
            <p className="mt-4 text-sm leading-relaxed text-[#475569]">
              Password reset service is handled securely through the Vertix administration team. Please reach out to your system administrator for access recovery.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
