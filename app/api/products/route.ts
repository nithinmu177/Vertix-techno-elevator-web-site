import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { demoProducts } from "@/lib/data";
import { createLocalResource, deleteLocalResource, ensureLocalResource, updateLocalResource } from "@/lib/local-store";
import { productSchema } from "@/lib/validations/schemas";

export async function GET() {
  if (!process.env.DATABASE_URL) return NextResponse.json(await ensureLocalResource("products", demoProducts));
  return NextResponse.json(await prisma.product.findMany({ include: { category: true, media: { include: { media: true } } }, orderBy: { updatedAt: "desc" } }));
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid product details." }, { status: 400 });
  if (!process.env.DATABASE_URL) {
    const product = await createLocalResource("products", { ...parsed.data, categoryId: parsed.data.categoryId || null, safetyFeatures: body.safetyFeatures ?? [], finishes: body.finishes ?? [], applications: body.applications ?? [], specifications: body.specifications ?? {} }, { mediaMap: body.media });
    return NextResponse.json(product, { status: 201 });
  }
  const product = await prisma.product.create({ data: { ...parsed.data, categoryId: parsed.data.categoryId || null, safetyFeatures: body.safetyFeatures ?? [], finishes: body.finishes ?? [], applications: body.applications ?? [], specifications: body.specifications ?? {} } });
  if (body.media) await syncProductMedia(product.id, body.media);
  return NextResponse.json(product, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success || !body.id) return NextResponse.json({ error: "Invalid product details." }, { status: 400 });
  if (!process.env.DATABASE_URL) {
    const product = await updateLocalResource("products", body.id, { ...parsed.data, categoryId: parsed.data.categoryId || null, safetyFeatures: body.safetyFeatures ?? [], finishes: body.finishes ?? [], applications: body.applications ?? [], specifications: body.specifications ?? {} }, { mediaMap: Object.prototype.hasOwnProperty.call(body, "media") ? body.media ?? {} : undefined });
    if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });
    return NextResponse.json(product);
  }
  const product = await prisma.product.update({ where: { id: body.id }, data: { ...parsed.data, categoryId: parsed.data.categoryId || null, safetyFeatures: body.safetyFeatures ?? [], finishes: body.finishes ?? [], applications: body.applications ?? [], specifications: body.specifications ?? {} } });
  if (Object.prototype.hasOwnProperty.call(body, "media")) await syncProductMedia(product.id, body.media ?? {});
  return NextResponse.json(product);
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing product id." }, { status: 400 });
  if (!process.env.DATABASE_URL) {
    await deleteLocalResource("products", id);
    return NextResponse.json({ ok: true });
  }
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
