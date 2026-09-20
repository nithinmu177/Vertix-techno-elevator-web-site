import { AdminShell } from "@/components/admin/admin-shell";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false }
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/login?callbackUrl=/admin");
  return <AdminShell>{children}</AdminShell>;
}
