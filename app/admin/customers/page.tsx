import { prisma } from "@/lib/db/prisma";

export default async function CustomersPage() {
  const users = await prisma.user.findMany({ include: { role: true }, orderBy: { createdAt: "desc" } }).catch(() => []);
  return <section><h1 className="text-3xl font-black">Customers</h1><div className="mt-6 overflow-auto rounded-lg bg-white"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-[#102019] text-white"><tr><th className="p-3">Name</th><th>Email</th><th>Role</th><th>Created</th></tr></thead><tbody>{users.map(u=><tr className="border-t" key={u.id}><td className="p-3 font-bold">{u.name}</td><td>{u.email}</td><td>{u.role?.name}</td><td>{u.createdAt.toLocaleDateString()}</td></tr>)}</tbody></table></div></section>
}
