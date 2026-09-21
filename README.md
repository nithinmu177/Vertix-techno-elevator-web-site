# Vertix Techno Elevator

Full-stack Next.js website and admin dashboard for Vertix Techno Elevator.

## Features

- Premium responsive public website for products, services, projects, technology, safety, FAQ, blog, contact and quote requests.
- PostgreSQL database with Prisma models for users, roles, media, products, projects, services, quotes, messages, blog, FAQ, testimonials, orders and site settings.
- Auth.js credentials authentication with protected admin dashboard.
- Admin dashboard for products, projects, services, media library, quotes, messages, customers, blog, FAQ, testimonials and settings.
- Media library supports image/video upload, multi-upload, preview, search, type filters, copy reference and delete.
- Reusable media picker for assigning uploaded media to products, projects, services, blog posts and testimonials.
- Quote and contact forms validate input, save to the database and show user-facing status messages.
- Local media storage abstraction in `lib/storage/local.ts`, ready to swap for cloud storage later.
- SEO metadata, `robots.txt`, `sitemap.xml`, responsive layout and reduced-motion support.

## Tech Stack

Next.js, React, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion, Prisma, PostgreSQL, Auth.js, Zod, React Hook Form-ready architecture, Recharts-ready dashboard architecture.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
copy .env.example .env
```

3. Update `.env` with a real PostgreSQL connection:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vertix_techno_elevator?schema=public"
AUTH_SECRET="replace-with-a-secure-random-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000"
ADMIN_EMAIL="admin@vertix.local"
ADMIN_PASSWORD="set-a-strong-password-before-seeding"
STORAGE_PROVIDER="local"
```

4. Create the database, run migrations and seed demo content:

```bash
npm run db:migrate
npm run db:seed
```

5. Start development:

```bash
npm run dev
```

## Admin Access

The seed command creates the administrator using `ADMIN_EMAIL` and `ADMIN_PASSWORD` from the environment. Never commit those values.

## Media Workflow

1. Login as admin.
2. Open `/admin/media`.
3. Upload JPG, JPEG, PNG, WEBP, safe SVG, MP4 or WEBM files.
4. Open Products, Projects, Services, Blog or Testimonials.
5. Use `Select from Media Library`.
6. Save the content item.
7. Public pages automatically use the database media.

## Verification

These commands passed:

```bash
npm run typecheck
npm run lint
npm run build
```

The build was tested without a local `DATABASE_URL`, so public pages used demo fallback content and Prisma logged missing-env messages during static generation. Configure `.env` for full database-backed behavior.

## Production Notes

### Architecture

The repository now includes a copy-ready `backend/` service. Copy that folder into a separate private GitHub repository when you are ready to deploy the API independently. It contains the API routes, Auth.js, Prisma schema/client setup, database seed script, media storage, validation, CORS middleware, and its own deployment configuration.

For a split deployment, deploy `backend/` as the API host and set this frontend variable:

```env
NEXT_PUBLIC_API_URL="https://YOUR-BACKEND-DOMAIN"
```

Set `FRONTEND_URL` or `CORS_ALLOWED_ORIGINS` on the backend to the exact frontend origin. The frontend Auth.js route proxies `/api/auth/*` to the backend when `NEXT_PUBLIC_API_URL` is set, so login and admin API requests continue to use the same browser session. For local development, leave `NEXT_PUBLIC_API_URL` unset and the original same-origin routes remain active.

Prisma connects to PostgreSQL only on the backend server. No database credentials are exposed to browser code.

### Required production configuration

- Deploy the Next.js app to a host with HTTPS and set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL`, and `NEXTAUTH_URL` to `https://www.mydomain.com`.
- Set a long random `AUTH_SECRET`, `AUTH_TRUST_HOST=true`, `DATABASE_URL` with TLS enabled, and administrator credentials only in the host secret manager.
- Run `npx prisma migrate deploy`, then `npm run db:seed` with `ADMIN_EMAIL` and `ADMIN_PASSWORD` supplied securely.
- Use managed object storage for uploads in production. The current local upload adapter writes to the instance filesystem, which is not durable on serverless hosts.
- Keep the database on a private network or provider allowlist and do not expose its port publicly.
- The API is same-origin by default, so no wildcard CORS policy is needed. If the frontend and API are split later, configure an explicit allowlist at the API host and use secure cross-site cookie settings.

### Deployment checklist

1. Provision PostgreSQL and restrict network access to the backend host.
2. Configure the environment variables above in the hosting provider; do not upload `.env` files.
3. Deploy with `npm ci` and `npm run build`.
4. Run `npx prisma migrate deploy` and seed the administrator with a unique password.
5. Point `www` and the apex domain to the frontend host. Use `api` only if a separate API deployment is introduced later.
6. Confirm HTTPS redirects, `/robots.txt`, `/sitemap.xml`, public forms, login, logout, `/profile`, and `/admin` after deployment.
7. Add the canonical site URL and sitemap URL to Google Search Console.

### Security checks

- `.env` and `.env*.local` are ignored and no secret is referenced by `NEXT_PUBLIC_*` variables.
- Admin pages and mutating API routes verify the server-side `ADMIN` role.
- Public collection APIs return published records only; API and private routes send `noindex` headers.
- Production headers disable framework disclosure, MIME sniffing, framing by other origins, and downgrade referrers.
- Test that ordinary users cannot access admin pages or admin API methods, and that database credentials do not appear in `.next/static` browser bundles.

- Replace demo content with approved company copy.
- Replace demo testimonials with real approved testimonials.
- Add verified certificates only after company confirmation.
- Review privacy, terms and cookie pages with legal counsel.
- Configure email before enabling password reset and quote/contact email notifications.
- Razorpay environment variables are reserved for future payment integration.
