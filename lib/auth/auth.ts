import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

const hasDatabase = Boolean(process.env.DATABASE_URL);
const authSecret = process.env.AUTH_SECRET;

if (process.env.NODE_ENV === "production" && !authSecret) {
  throw new Error("AUTH_SECRET must be configured in production.");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...(hasDatabase ? { adapter: PrismaAdapter(prisma) } : {}),
  secret: authSecret || "local-development-only-secret",
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login"
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        if (!hasDatabase) return null;

        const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });
        if (!user?.passwordHash) return null;
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role?.name ?? "CUSTOMER" };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role ?? "CUSTOMER";
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = String(token.role ?? "CUSTOMER");
      }
      return session;
    }
  }
});
