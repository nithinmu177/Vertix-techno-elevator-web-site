import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";
  return NextResponse.json(await prisma.blogPost.findMany({ where: isAdmin ? undefined : { status: "PUBLISHED" }, include: { category: true, coverMedia: true }, orderBy: { updatedAt: "desc" } }));
}

import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const res = await prisma.blogPost.create({ data: body });
  try { revalidatePath("/", "layout"); } catch {}
  return NextResponse.json(res, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { id, ...data } = body;
  const res = await prisma.blogPost.update({ where: { id }, data });
  try { revalidatePath("/", "layout"); } catch {}
  return NextResponse.json(res);
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing post id." }, { status: 400 });
  await prisma.blogPost.delete({ where: { id } });
  try { revalidatePath("/", "layout"); } catch {}
  return NextResponse.json({ ok: true });
}
