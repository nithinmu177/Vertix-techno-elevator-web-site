import { prisma } from "../lib/db/prisma";

async function main() {
  const users = await prisma.user.findMany({ include: { role: true } });
  console.log("Users in DB:", users.map(u => ({ id: u.id, email: u.email, role: u.role?.name })));
}

main().finally(() => prisma.$disconnect());
