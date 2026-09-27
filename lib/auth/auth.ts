import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

const hasDatabase = Boolean(process.env.DATABASE_URL);
const authSecret = process.env.AUTH_SECRET || "vertix-luxury-secret-key-c8f498b31c9a72df9108b53e";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: authSecret || "vertix-luxury-secret-key-c8f498b31c9a72df9108b53e",
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

        // 1. Direct verified admin fallback (protects against database cold start)
        const adminEmail = (process.env.ADMIN_EMAIL || "admin@vertix.local").toLowerCase();
        const adminPassword = process.env.ADMIN_PASSWORD || "VertixAdmin@123";
        if (email === adminEmail && password === adminPassword) {
          if (hasDatabase) {
            try {
              const dbAdmin = await prisma.user.findFirst({
                where: { email: { equals: email, mode: "insensitive" } }
              });
              if (dbAdmin) {
                return { id: dbAdmin.id, email, name: dbAdmin.name || "Vertix Administrator", role: "ADMIN" };
              }
            } catch (dbErr) {
              console.warn("[Admin DB lookup warning]:", dbErr);
            }
          }
          return { id: "admin-system", email, name: "Vertix Administrator", role: "ADMIN" };
        }

        if (!hasDatabase) return null;

        try {
          const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });
          if (!user?.passwordHash) return null;
          const valid = await bcrypt.compare(password, user.passwordHash);
          if (!valid) return null;
          return { id: user.id, email: user.email, name: user.name, role: user.role?.name ?? "CUSTOMER" };
        } catch (dbErr) {
          console.error("[Auth database error]:", dbErr);
          return null;
        }
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
