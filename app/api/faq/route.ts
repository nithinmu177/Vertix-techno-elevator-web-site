import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  return NextResponse.json(await prisma.fAQ.findMany({ orderBy: [{ category: "asc" }, { sortOrder: "asc" }] }));
}

import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const res = await prisma.fAQ.create({ data: await request.json() });
  try { revalidatePath("/", "layout"); } catch {}
  return NextResponse.json(res, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { id, ...data } = body;
  const res = await prisma.fAQ.update({ where: { id }, data });
  try { revalidatePath("/", "layout"); } catch {}
  return NextResponse.json(res);
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing FAQ id." }, { status: 400 });
  await prisma.fAQ.delete({ where: { id } });
  try { revalidatePath("/", "layout"); } catch {}
  return NextResponse.json({ ok: true });
}
