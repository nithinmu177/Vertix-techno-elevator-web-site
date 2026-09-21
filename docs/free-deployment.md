# Free Deployment Plan

This repository is currently a full-stack Next.js 15 app with Prisma, Auth.js, API routes, public pages, admin pages, media upload, robots and sitemap routes. It is not currently split into a static frontend repository plus a private API repository.

## What can be deployed now without redesigning

Use this repo as the private backend/full-stack repository on Render Free Web Service:

- Build command: `npm ci && npm run build`
- Start command: `npm run start`
- Runtime: Node.js
- Environment: production
- Public URL example: `https://vertix-techno-elevator-api.onrender.com`

For this single-service deployment, set:

```env
NEXT_PUBLIC_SITE_URL="https://vertix-techno-elevator-api.onrender.com"
NEXT_PUBLIC_API_URL="https://vertix-techno-elevator-api.onrender.com"
NEXTAUTH_URL="https://vertix-techno-elevator-api.onrender.com"
FRONTEND_URL="https://vertix-techno-elevator-api.onrender.com"
AUTH_TRUST_HOST="true"
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
AUTH_SECRET="generate-a-long-random-secret"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="use-a-strong-password"
STORAGE_PROVIDER="local"
API_RATE_LIMIT_PER_MINUTE=120
```

This keeps database credentials on the server only. It does not put secrets in browser code.

## Exact split architecture requested

To get a public frontend repository plus private backend repository, do this as a second step:

1. Keep this repository private and deploy it to Render as the backend/API.
2. Create a new public frontend repository after extracting the public pages and client components.
3. Configure the public frontend build with only public variables:

```env
NEXT_PUBLIC_SITE_URL="https://YOUR-GITHUB-USER.github.io/YOUR-FRONTEND-REPO"
NEXT_PUBLIC_API_URL="https://vertix-techno-elevator-api.onrender.com"
```

4. Configure the private backend with exact CORS origins:

```env
FRONTEND_URL="https://YOUR-GITHUB-USER.github.io/YOUR-FRONTEND-REPO"
CORS_ALLOWED_ORIGINS=""
NEXTAUTH_URL="https://vertix-techno-elevator-api.onrender.com"
```

Do not copy `.env`, Prisma credentials, Auth secrets, admin credentials, or private config into the public frontend repository.

## Files already configured

- `.gitignore`: ignores `.env`, `.env*.local`, build output, logs and local uploads.
- `.env.example`: contains placeholder variables only.
- `middleware.ts`: sets API CORS from exact configured origins, blocks unknown origins, rate-limits API requests and sends `X-Robots-Tag` for API/private pages.
- `app/robots.ts`: allows public pages and disallows admin, profile, auth and API paths.
- `app/sitemap.ts`: generates public static, product, project and blog URLs.
- `app/layout.tsx`: sets SEO metadata, canonical base, Open Graph, Twitter card and crawler defaults.
- `next.config.ts`: removes the powered-by header and adds security headers.
- `package.json`: includes Render-compatible `build` and `start` scripts.

## Database

Use a private managed PostgreSQL database. Free options change over time; Render Free Postgres is usable for trials but has expiry limits, so Neon or Supabase free Postgres is usually better for a longer-lived free site.

After setting `DATABASE_URL` on Render:

```bash
npx prisma migrate deploy
npm run db:seed
```

Run those from Render Shell or a local terminal that has the production environment variables loaded. Never commit the production `.env`.

## Google Search Console

After the public frontend URL is live:

1. Open Google Search Console.
2. Add the frontend URL property.
3. Verify ownership with the method Google provides.
4. Submit `https://YOUR-FRONTEND-DOMAIN/sitemap.xml`.
5. Use URL Inspection for the homepage and key public pages.

Google decides when and whether pages are indexed.

## Final tests

Test these URLs after deployment:

- `/`
- `/robots.txt`
- `/sitemap.xml`
- `/products`
- `/projects`
- `/contact`
- `/quote`
- `/login`
- `/admin`
- `/api/products`
- `/api/contact`
- `/api/quotes`

Also test that:

- Browser bundles do not contain `DATABASE_URL`, database username/password, `AUTH_SECRET` or admin password.
- API responses include `X-Robots-Tag: noindex, nofollow, noarchive`.
- CORS accepts the configured frontend origin and rejects a random origin.
- Public pages are indexable, while `/admin`, `/profile`, auth pages and `/api/*` are not.
