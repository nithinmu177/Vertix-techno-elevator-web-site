import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { projectSchema } from "@/lib/validations/schemas";

export async function GET() {
  return NextResponse.json(await prisma.project.findMany({ include: { category: true, media: { include: { media: true } } }, orderBy: { updatedAt: "desc" } }));
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid project details." }, { status: 400 });
  const project = await prisma.project.create({ data: { ...parsed.data, categoryId: parsed.data.categoryId || null, specifications: body.specifications ?? {} } });
  await syncProjectMedia(project.id, body.media ?? {});
  return NextResponse.json(project, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success || !body.id) return NextResponse.json({ error: "Invalid project details." }, { status: 400 });
  const project = await prisma.project.update({ where: { id: body.id }, data: { ...parsed.data, categoryId: parsed.data.categoryId || null, specifications: body.specifications ?? {} } });
  await syncProjectMedia(project.id, body.media ?? {});
  return NextResponse.json(project);
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing project id." }, { status: 400 });
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

async function syncProjectMedia(projectId: string, media: Record<string, string | string[]>) {
  await prisma.projectMedia.deleteMany({ where: { projectId } });
  for (const [role, value] of Object.entries(media)) {
    const ids = Array.isArray(value) ? value : value ? [value] : [];
    await Promise.all(ids.map((mediaId, sortOrder) => prisma.projectMedia.create({ data: { projectId, mediaId, role, sortOrder } })));
  }
}
