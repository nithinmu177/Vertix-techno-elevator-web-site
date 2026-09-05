import { NextResponse } from "next/server";
import { MediaCategory } from "@prisma/client";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { deleteLocalMedia, saveLocalMedia } from "@/lib/storage/local";
import { mediaUpdateSchema } from "@/lib/validations/schemas";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const type = searchParams.get("type") ?? undefined;
  const media = await prisma.media.findMany({
    where: {
      AND: [
        q ? { OR: [{ originalName: { contains: q, mode: "insensitive" } }, { title: { contains: q, mode: "insensitive" } }] } : {},
        type && type !== "ALL" ? { type: type as never } : {}
      ]
    },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(media);
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const formData = await request.formData();
  const files = formData.getAll("files").filter((file): file is File => file instanceof File);
  const category = (String(formData.get("category") ?? "GENERAL") || "GENERAL") as MediaCategory;
  const saved = [];
  for (const file of files) {
    const payload = await saveLocalMedia(file, category);
    saved.push(await prisma.media.create({ data: { ...payload, uploadedById: session.user.id, title: file.name, altText: file.name.replace(/\.[^.]+$/, "") } }));
  }
  return NextResponse.json(saved, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const parsed = mediaUpdateSchema.safeParse(body);
  if (!parsed.success || !body.id) return NextResponse.json({ error: "Invalid media metadata." }, { status: 400 });
  return NextResponse.json(await prisma.media.update({ where: { id: body.id }, data: parsed.data }));
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing media id." }, { status: 400 });
  const media = await prisma.media.delete({ where: { id } });
  await deleteLocalMedia(media.url);
  return NextResponse.json({ ok: true });
}
