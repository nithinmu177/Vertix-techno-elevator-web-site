import { auth } from "@/lib/auth/auth";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Profile",
  robots: { index: false, follow: false }
};

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/login?callbackUrl=/profile");
  const quotes = session?.user?.email ? await prisma.quoteRequest.findMany({ where: { email: session.user.email }, orderBy: { createdAt: "desc" } }).catch(() => []) : [];
  return <><Navbar /><main className="container py-16"><h1 className="text-4xl font-black">Profile</h1>{!session ? <p className="mt-4">Please login to view your profile.</p> : <><p className="mt-4 font-bold">{session.user.name} · {session.user.email}</p><h2 className="mt-8 text-2xl font-black">Quote Requests</h2><div className="mt-4 grid gap-3">{quotes.map(q=><div className="rounded-lg bg-white p-4" key={q.id}><strong>{q.projectType}</strong><p>{q.status}</p></div>)}</div></>}</main><Footer /></>;
}
