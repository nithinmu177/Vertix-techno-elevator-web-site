import { prisma } from "@/lib/db/prisma";

export default async function AdminDashboard() {
  let counts = { products: 0, projects: 0, quotes: 0, messages: 0, customers: 0 };
  try {
    const [products, projects, quotes, messages, customers] = await Promise.all([prisma.product.count(), prisma.project.count(), prisma.quoteRequest.count(), prisma.contactMessage.count(), prisma.user.count()]);
    counts = { products, projects, quotes, messages, customers };
  } catch {}
  return <section><h1 className="text-3xl font-black">Dashboard</h1><div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-5">{Object.entries(counts).map(([label, value]) => <div className="rounded-lg bg-white p-6" key={label}><p className="text-sm font-black uppercase text-[#c6a15b]">{label}</p><strong className="mt-3 block text-4xl">{value}</strong></div>)}</div><div className="mt-6 rounded-lg bg-white p-6"><h2 className="font-black">Notifications</h2><p className="mt-2 text-[#56635d]">New quote requests, contact messages and customer registrations appear in their respective admin sections.</p></div></section>;
}
