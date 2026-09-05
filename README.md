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

After seeding:

- URL: `/admin`
- Email: `admin@vertix.local`
- Password: `VertixAdmin@123`

Change this password before production.

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

- Provide a real PostgreSQL database.
- Set a strong `AUTH_SECRET`.
- Replace demo content with approved company copy.
- Replace demo testimonials with real approved testimonials.
- Add verified certificates only after company confirmation.
- Review privacy, terms and cookie pages with legal counsel.
- Configure email before enabling password reset and quote/contact email notifications.
- Razorpay environment variables are reserved for future payment integration.
