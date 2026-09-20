import { prisma } from "@/lib/db/prisma";
import { Users } from "lucide-react";

export default async function CustomersPage() {
  const users = process.env.DATABASE_URL
    ? await prisma.user.findMany({ include: { role: true }, orderBy: { createdAt: "desc" } }).catch(() => [])
    : [];

  return (
    <section className="grid gap-6">
      {/* Header */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#d4af37]">User Management</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-white">Customers</h1>
        <p className="mt-1 text-sm text-slate-500">{users.length} registered accounts</p>
      </div>

      <div className="overflow-auto rounded-2xl border border-white/[0.06] bg-[#0c121e]">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Name", "Email", "Role", "Created"].map((h) => (
                <th key={h} className="px-4 py-3.5 text-[10px] font-black uppercase tracking-wider text-slate-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {users.map((u) => (
              <tr key={u.id} className="transition hover:bg-white/[0.02]">
                <td className="px-4 py-3.5 font-bold text-white">{u.name || "—"}</td>
                <td className="px-4 py-3.5 text-slate-400">{u.email}</td>
                <td className="px-4 py-3.5">
                  <span className="rounded-lg border border-[#d4af37]/20 bg-[#d4af37]/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                    {(u as any).role?.name || "Customer"}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {!users.length && (
              <tr>
                <td colSpan={4} className="px-4 py-16 text-center">
                  <Users className="mx-auto mb-3 size-10 text-slate-700" />
                  <p className="text-sm font-bold text-slate-600">
                    No customers yet — running in local mode. Customer accounts appear here after registration.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
