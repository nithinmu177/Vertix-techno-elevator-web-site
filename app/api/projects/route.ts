import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { demoProjects } from "@/lib/data";
import { projectSchema } from "@/lib/validations/schemas";
import { createLocalProject, deleteLocalProject, ensureLocalProjects, updateLocalProject } from "@/lib/local-store";

export async function GET() {
  if (!process.env.DATABASE_URL) return NextResponse.json(await ensureLocalProjects(demoProjects));
  return NextResponse.json(await prisma.project.findMany({ include: { category: true, media: { include: { media: true } } }, orderBy: { updatedAt: "desc" } }));
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    const errorMsg = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
    return NextResponse.json({ error: errorMsg }, { status: 400 });
  }
  if (!process.env.DATABASE_URL) {
    const project = await createLocalProject({ ...parsed.data, categoryId: parsed.data.categoryId || null, specifications: body.specifications ?? {} }, body.media);
    return NextResponse.json(project, { status: 201 });
  }
  const project = await prisma.project.create({ data: { ...parsed.data, categoryId: parsed.data.categoryId || null, specifications: body.specifications ?? {} } });
  if (body.media) await syncProjectMedia(project.id, body.media);
  return NextResponse.json(project, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (!body.id) return NextResponse.json({ error: "Missing project ID." }, { status: 400 });
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    const errorMsg = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
    return NextResponse.json({ error: errorMsg }, { status: 400 });
  }
  if (!process.env.DATABASE_URL) {
    const project = await updateLocalProject(body.id, { ...parsed.data, categoryId: parsed.data.categoryId || null, specifications: body.specifications ?? {} }, body.media);
    if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });
    return NextResponse.json(project);
  }
  const project = await prisma.project.update({ where: { id: body.id }, data: { ...parsed.data, categoryId: parsed.data.categoryId || null, specifications: body.specifications ?? {} } });
  if (Object.prototype.hasOwnProperty.call(body, "media")) await syncProjectMedia(project.id, body.media ?? {});
  return NextResponse.json(project);
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing project id." }, { status: 400 });
  if (!process.env.DATABASE_URL) {
    await deleteLocalProject(id);
    return NextResponse.json({ ok: true });
  }
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
