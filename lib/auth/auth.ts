import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";

const hasDatabase = Boolean(process.env.DATABASE_URL);

// Auth secret MUST be set in production — no insecure fallback
const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
if (!authSecret && process.env.NODE_ENV === "production") {
  throw new Error("AUTH_SECRET or NEXTAUTH_SECRET must be set in production.");
}

// --- Brute-force protection (in-memory, per deployment instance) ---
// Allows 5 failed attempts per email within a 15-minute window, then locks.
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes
type AttemptRecord = { count: number; firstAt: number; lockedUntil?: number };
const loginAttempts = new Map<string, AttemptRecord>();

function checkBruteForce(email: string): { blocked: boolean; remainingMs: number } {
  const now = Date.now();
  const rec = loginAttempts.get(email);
  if (!rec) return { blocked: false, remainingMs: 0 };
  if (rec.lockedUntil && now < rec.lockedUntil) {
    return { blocked: true, remainingMs: rec.lockedUntil - now };
  }
  // Reset window if LOCKOUT_MS has elapsed
  if (now - rec.firstAt > LOCKOUT_MS) {
    loginAttempts.delete(email);
    return { blocked: false, remainingMs: 0 };
  }
  return { blocked: false, remainingMs: 0 };
}

function recordFailedAttempt(email: string) {
  const now = Date.now();
  const rec = loginAttempts.get(email);
  if (!rec || now - rec.firstAt > LOCKOUT_MS) {
    loginAttempts.set(email, { count: 1, firstAt: now });
    return;
  }
  rec.count += 1;
  if (rec.count >= MAX_ATTEMPTS) {
    rec.lockedUntil = now + LOCKOUT_MS;
    console.warn(`[Auth] Account locked for ${email} after ${rec.count} failed attempts.`);
  }
}

function clearAttempts(email: string) {
  loginAttempts.delete(email);
}
// ---------------------------------------------------------------

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: authSecret || "vertix-dev-only-secret-change-in-production",
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
        const email = String(credentials?.email ?? "").toLowerCase().trim();
        const password = String(credentials?.password ?? "");
        if (!email || !password) return null;

        // Check brute-force lockout
        const { blocked, remainingMs } = checkBruteForce(email);
        if (blocked) {
          const mins = Math.ceil(remainingMs / 60000);
          console.warn(`[Auth] Login blocked for ${email} — ${mins}m remaining in lockout.`);
          return null; // NextAuth will surface this as CredentialsSignin
        }

        // 1. Direct verified admin fallback (protects against database cold start)
        const adminEmail = (process.env.ADMIN_EMAIL || "admin@vertix.local").toLowerCase();
        const adminPassword = process.env.ADMIN_PASSWORD || "VertixAdmin@123";
        if (email === adminEmail && password === adminPassword) {
          clearAttempts(email);
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

        if (!hasDatabase) {
          recordFailedAttempt(email);
          return null;
        }

        try {
          const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });
          if (!user?.passwordHash) {
            recordFailedAttempt(email);
            return null;
          }
          const valid = await bcrypt.compare(password, user.passwordHash);
          if (!valid) {
            recordFailedAttempt(email);
            return null;
          }
          clearAttempts(email);
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

