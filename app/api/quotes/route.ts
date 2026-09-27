import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { quoteSchema } from "@/lib/validations/schemas";
import { auth } from "@/lib/auth/auth";
import { createLocalQuote, listLocalQuotes, updateLocalQuoteStatus } from "@/lib/local-store";

export async function GET() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json(await listLocalQuotes());
  return NextResponse.json(await prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" } }));
}

export async function POST(request: Request) {
  const parsed = quoteSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please check the quote form details." }, { status: 400 });
  if (!process.env.DATABASE_URL) {
    const quote = await createLocalQuote(parsed.data);
    return NextResponse.json({ ok: true, quoteId: quote.id }, { status: 201 });
  }
  const quote = await prisma.quoteRequest.create({ data: parsed.data });
  return NextResponse.json({ ok: true, quoteId: quote.id }, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (!process.env.DATABASE_URL) {
    const quote = await updateLocalQuoteStatus(body.id, body.status);
    if (!quote) return NextResponse.json({ error: "Quote not found." }, { status: 404 });
    return NextResponse.json(quote);
  }
  const quote = await prisma.quoteRequest.update({ where: { id: body.id }, data: { status: body.status } });
  return NextResponse.json(quote);
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const deleteAll = searchParams.get("all") === "true";

  if (!id && !deleteAll) {
    return NextResponse.json({ error: "Missing quote request id." }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    const { deleteLocalQuote, listLocalQuotes } = await import("@/lib/local-store");
    if (deleteAll) {
      const allQuotes = await listLocalQuotes();
      for (const q of allQuotes) await deleteLocalQuote(q.id);
      return NextResponse.json({ ok: true, count: allQuotes.length });
    }
    await deleteLocalQuote(id!);
    return NextResponse.json({ ok: true });
  }

  if (deleteAll) {
    const res = await prisma.quoteRequest.deleteMany({});
    return NextResponse.json({ ok: true, count: res.count });
  }

  await prisma.quoteRequest.delete({ where: { id: id! } });
  return NextResponse.json({ ok: true });
}
