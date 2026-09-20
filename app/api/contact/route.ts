import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { contactSchema } from "@/lib/validations/schemas";
import { auth } from "@/lib/auth/auth";
import { createLocalMessage, listLocalMessages, updateLocalMessageStatus } from "@/lib/local-store";

export async function GET() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json(await listLocalMessages());
  return NextResponse.json(await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }));
}

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please check the contact form details." }, { status: 400 });
  if (!process.env.DATABASE_URL) {
    const message = await createLocalMessage(parsed.data);
    return NextResponse.json({ ok: true, messageId: message.id }, { status: 201 });
  }
  const message = await prisma.contactMessage.create({ data: parsed.data });
  return NextResponse.json({ ok: true, messageId: message.id }, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (!process.env.DATABASE_URL) {
    const message = await updateLocalMessageStatus(body.id, body.status);
    if (!message) return NextResponse.json({ error: "Message not found." }, { status: 404 });
    return NextResponse.json(message);
  }
  return NextResponse.json(await prisma.contactMessage.update({ where: { id: body.id }, data: { status: body.status } }));
}
