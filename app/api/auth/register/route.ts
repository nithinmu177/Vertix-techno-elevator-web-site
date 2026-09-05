import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { authSchema } from "@/lib/validations/schemas";

export async function POST(request: Request) {
  const parsed = authSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid registration details." }, { status: 400 });
  const role = await prisma.role.upsert({ where: { name: "CUSTOMER" }, update: {}, create: { name: "CUSTOMER" } });
  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      passwordHash: await bcrypt.hash(parsed.data.password, 12),
      roleId: role.id
    },
    select: { id: true, email: true, name: true }
  });
  return NextResponse.json(user, { status: 201 });
}
