import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { productSchema } from "@/lib/validations/schemas";

export async function GET() {
  return NextResponse.json(await prisma.product.findMany({ include: { category: true, media: { include: { media: true } } }, orderBy: { updatedAt: "desc" } }));
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid product details." }, { status: 400 });
  const product = await prisma.product.create({ data: { ...parsed.data, categoryId: parsed.data.categoryId || null, safetyFeatures: body.safetyFeatures ?? [], finishes: body.finishes ?? [], applications: body.applications ?? [], specifications: body.specifications ?? {} } });
  await syncProductMedia(product.id, body.media ?? {});
  return NextResponse.json(product, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success || !body.id) return NextResponse.json({ error: "Invalid product details." }, { status: 400 });
  const product = await prisma.product.update({ where: { id: body.id }, data: { ...parsed.data, categoryId: parsed.data.categoryId || null, safetyFeatures: body.safetyFeatures ?? [], finishes: body.finishes ?? [], applications: body.applications ?? [], specifications: body.specifications ?? {} } });
  await syncProductMedia(product.id, body.media ?? {});
  return NextResponse.json(product);
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing product id." }, { status: 400 });
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

async function syncProductMedia(productId: string, media: Record<string, string | string[]>) {
  await prisma.productMedia.deleteMany({ where: { productId } });
  for (const [role, value] of Object.entries(media)) {
    const ids = Array.isArray(value) ? value : value ? [value] : [];
    await Promise.all(ids.map((mediaId, sortOrder) => prisma.productMedia.create({ data: { productId, mediaId, role, sortOrder } })));
  }
}
