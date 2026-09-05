import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { quoteSchema } from "@/lib/validations/schemas";
import { auth } from "@/lib/auth/auth";

export async function GET() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" } }));
}

export async function POST(request: Request) {
  const parsed = quoteSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please check the quote form details." }, { status: 400 });
  const quote = await prisma.quoteRequest.create({ data: parsed.data });
  return NextResponse.json({ ok: true, quoteId: quote.id }, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const quote = await prisma.quoteRequest.update({ where: { id: body.id }, data: { status: body.status } });
  return NextResponse.json(quote);
}
