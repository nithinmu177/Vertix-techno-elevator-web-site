import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  return NextResponse.json(await prisma.testimonial.findMany({ include: { photoMedia: true }, orderBy: { updatedAt: "desc" } }));
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await prisma.testimonial.create({ data: await request.json() }), { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { id, ...data } = body;
  return NextResponse.json(await prisma.testimonial.update({ where: { id }, data }));
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing testimonial id." }, { status: 400 });
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
