import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/prisma";
import { getLocalSettings, saveLocalSettings } from "@/lib/local-store";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    const settings = await getLocalSettings();
    return NextResponse.json(Object.entries(settings).map(([key, value]) => ({ key, value })));
  }
  return NextResponse.json(await prisma.siteSetting.findMany({ include: { media: true } }));
}

import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  if (!process.env.DATABASE_URL) {
    const res = await saveLocalSettings(body);
    try { revalidatePath("/", "layout"); } catch {}
    return NextResponse.json(res);
  }
  const updates = await Promise.all(
    Object.entries(body).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: value as object },
        create: { key, value: value as object }
      })
    )
  );
  try { revalidatePath("/", "layout"); } catch {}
  return NextResponse.json(updates);
}
