import { NextResponse } from "next/server";
import { MediaCategory } from "@prisma/client";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { deleteMedia, saveMedia } from "@/lib/storage";
import { mediaUpdateSchema } from "@/lib/validations/schemas";
import { createLocalMedia, createLocalMediaBatch, deleteLocalMediaRecord, listLocalMedia, updateLocalMedia } from "@/lib/local-store";

export async function GET(request: Request) {
  if (!process.env.DATABASE_URL) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.toLowerCase() ?? "";
    const type = searchParams.get("type") ?? "ALL";
    const media = await listLocalMedia();
    return NextResponse.json(
      media.filter((item) => {
        const matchesQuery = !q || item.originalName.toLowerCase().includes(q) || item.title?.toLowerCase().includes(q);
        const matchesType = type === "ALL" || item.type === type;
        return matchesQuery && matchesType;
      })
    );
  }

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

import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized. Please log in as Admin." }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll("files").filter((file): file is File => file instanceof File);
    if (!files.length) {
      return NextResponse.json({ error: "No files provided for upload." }, { status: 400 });
    }

    const category = (String(formData.get("category") ?? "GENERAL") || "GENERAL") as MediaCategory;

    // Verify if session user actually exists in the User table for foreign key safety
    let validUserId: string | null = null;
    if (process.env.DATABASE_URL && session?.user?.id) {
      try {
        const dbUser = await prisma.user.findUnique({
          where: { id: session.user.id },
          select: { id: true }
        });
        if (dbUser) validUserId = dbUser.id;
      } catch (err) {
        console.warn("[Media upload user verification warning]:", err);
      }
    }

    if (!process.env.DATABASE_URL) {
      const payloads = [];
      for (const file of files) {
        const payload = await saveMedia(file, category);
        payloads.push({ ...payload, title: file.name, altText: file.name.replace(/\.[^.]+$/, "") });
      }
      const saved = await createLocalMediaBatch(payloads);
      try { revalidatePath("/", "layout"); } catch {}
      return NextResponse.json(saved, { status: 201 });
    }

    const saved = [];
    for (const file of files) {
      const payload = await saveMedia(file, category);
      const record = await prisma.media.create({
        data: {
          ...payload,
          uploadedById: validUserId,
          title: file.name,
          altText: file.name.replace(/\.[^.]+$/, "")
        }
      });
      saved.push(record);
    }

    try { revalidatePath("/", "layout"); } catch {}
    return NextResponse.json(saved, { status: 201 });
  } catch (err: any) {
    console.error("[Media Upload API Error]:", err);
    return NextResponse.json({ error: err?.message || "Failed to upload file." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const parsed = mediaUpdateSchema.safeParse(body);
  if (!parsed.success || !body.id) return NextResponse.json({ error: "Invalid media metadata." }, { status: 400 });
  if (!process.env.DATABASE_URL) {
    const media = await updateLocalMedia(body.id, parsed.data);
    if (!media) return NextResponse.json({ error: "Media not found." }, { status: 404 });
    try { revalidatePath("/", "layout"); } catch {}
    return NextResponse.json(media);
  }
  const updated = await prisma.media.update({ where: { id: body.id }, data: parsed.data });
  try { revalidatePath("/", "layout"); } catch {}
  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    let ids: string[] = [];
    let deleteAll = searchParams.get("all") === "true";

    // 1. Try reading ids from query params (?id=123 or ?ids=123,456)
    const singleId = searchParams.get("id");
    if (singleId) ids.push(singleId);

    const commaIds = searchParams.get("ids");
    if (commaIds) {
      ids.push(...commaIds.split(",").map((s) => s.trim()).filter(Boolean));
    }

    // 2. Try reading ids or all from JSON body
    if (!ids.length && !deleteAll) {
      try {
        const body = await request.json().catch(() => null);
        if (body?.all) deleteAll = true;
        if (Array.isArray(body?.ids)) ids.push(...body.ids);
      } catch {}
    }

    if (!ids.length && !deleteAll) {
      return NextResponse.json({ error: "No media id(s) specified for deletion." }, { status: 400 });
    }

    // Deduplicate
    ids = Array.from(new Set(ids));

    if (!process.env.DATABASE_URL) {
      if (deleteAll) {
        const allMedia = await listLocalMedia();
        for (const item of allMedia) {
          await deleteLocalMediaRecord(item.id);
          await deleteMedia(item.url);
        }
        try { revalidatePath("/", "layout"); } catch {}
        return NextResponse.json({ ok: true, count: allMedia.length });
      }

      for (const id of ids) {
        const media = await deleteLocalMediaRecord(id);
        if (media) await deleteMedia(media.url);
      }
      try { revalidatePath("/", "layout"); } catch {}
      return NextResponse.json({ ok: true, count: ids.length });
    }

    // Neon Database Deletion
    const mediaToDelete = await prisma.media.findMany({
      where: deleteAll ? {} : { id: { in: ids } },
      select: { id: true, url: true }
    });

    if (!mediaToDelete.length) {
      return NextResponse.json({ ok: true, count: 0, message: "No matching media found." });
    }

    const targetIds = mediaToDelete.map((m) => m.id);

    // Nullify foreign keys referencing Media before deleting to prevent constraint errors
    await prisma.blogPost.updateMany({
      where: { coverMediaId: { in: targetIds } },
      data: { coverMediaId: null }
    }).catch(() => null);

    await prisma.testimonial.updateMany({
      where: { photoMediaId: { in: targetIds } },
      data: { photoMediaId: null }
    }).catch(() => null);

    await prisma.siteSetting.updateMany({
      where: { mediaId: { in: targetIds } },
      data: { mediaId: null }
    }).catch(() => null);

    // Delete relation join tables
    await prisma.productMedia.deleteMany({ where: { mediaId: { in: targetIds } } }).catch(() => null);
    await prisma.projectMedia.deleteMany({ where: { mediaId: { in: targetIds } } }).catch(() => null);
    await prisma.serviceMedia.deleteMany({ where: { mediaId: { in: targetIds } } }).catch(() => null);

    // Delete Media records
    await prisma.media.deleteMany({
      where: { id: { in: targetIds } }
    });

    // Delete Cloudinary / Storage files in background
    Promise.allSettled(mediaToDelete.map((m) => deleteMedia(m.url))).catch((err) => {
      console.warn("[Media storage cleanup warning]:", err);
    });

    try { revalidatePath("/", "layout"); } catch {}
    return NextResponse.json({ ok: true, count: targetIds.length });
  } catch (err: any) {
    console.error("[Media Delete API Error]:", err);
    return NextResponse.json({ error: err?.message || "Failed to delete media." }, { status: 500 });
  }
}
