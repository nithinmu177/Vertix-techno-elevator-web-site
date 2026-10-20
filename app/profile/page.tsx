import { auth } from "@/lib/auth/auth";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile | Vertix Techno Elevator",
  robots: { index: false, follow: false }
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/login?callbackUrl=/profile");
  const quotes = session?.user?.email
    ? await prisma.quoteRequest.findMany({ where: { email: session.user.email }, orderBy: { createdAt: "desc" } }).catch(() => [])
    : [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16 text-[#475569]">
        <div className="container max-w-3xl">
          <div className="rounded-3xl border border-slate-200 bg-[#F3F6FA] p-8 lg:p-12 shadow-sm">
            <h1 className="text-3xl font-bold text-[#172B4D]">Customer Profile</h1>
            <p className="mt-3 text-sm font-semibold text-[#172B4D]">
              {session.user.name} • {session.user.email}
            </p>

            <h2 className="mt-8 text-xl font-bold text-[#172B4D]">Your Quote Inquiries</h2>
            <div className="mt-4 grid gap-3">
              {quotes.length === 0 ? (
                <p className="text-sm text-[#475569]">No quote inquiries on record yet.</p>
              ) : (
                quotes.map((q) => (
                  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs" key={q.id}>
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-bold text-[#172B4D]">{q.projectType}</strong>
                      <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
                        {q.status}
                      </span>
                    </div>
                    {q.message && <p className="mt-2 text-xs text-[#475569]">{q.message}</p>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
