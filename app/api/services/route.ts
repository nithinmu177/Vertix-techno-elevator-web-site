import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { serviceSchema } from "@/lib/validations/schemas";

export async function GET() {
  return NextResponse.json(await prisma.service.findMany({ include: { media: { include: { media: true } } }, orderBy: { updatedAt: "desc" } }));
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid service details." }, { status: 400 });
  const service = await prisma.service.create({ data: parsed.data });
  await syncServiceMedia(service.id, body.media ?? {});
  return NextResponse.json(service, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success || !body.id) return NextResponse.json({ error: "Invalid service details." }, { status: 400 });
  const service = await prisma.service.update({ where: { id: body.id }, data: parsed.data });
  await syncServiceMedia(service.id, body.media ?? {});
  return NextResponse.json(service);
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing service id." }, { status: 400 });
  await prisma.service.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

async function syncServiceMedia(serviceId: string, media: Record<string, string | string[]>) {
  await prisma.serviceMedia.deleteMany({ where: { serviceId } });
  for (const [role, value] of Object.entries(media)) {
    const ids = Array.isArray(value) ? value : value ? [value] : [];
    await Promise.all(ids.map((mediaId, sortOrder) => prisma.serviceMedia.create({ data: { serviceId, mediaId, role, sortOrder } })));
  }
}
