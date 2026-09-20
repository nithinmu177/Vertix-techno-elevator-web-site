import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

const hasDatabase = Boolean(process.env.DATABASE_URL);

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...(hasDatabase ? { adapter: PrismaAdapter(prisma) } : {}),
  secret: process.env.AUTH_SECRET || "vertix-local-development-secret-change-before-production",
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

        if (!hasDatabase) {
          if (email === "admin@vertix.local" && password === "VertixAdmin@123") {
            return { id: "local-admin", email, name: "Vertix Admin", role: "ADMIN" };
          }
          return null;
        }

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
