# Strategic Counsel Group — Codebase Documentation

This folder contains line-by-line documentation for every file in the project.
Each doc explains **what** the code does, **why** it was written that way, and **what to watch out for**.

## Table of Contents

| File | What it covers |
|---|---|
| [01-architecture.md](01-architecture.md) | System overview, folder structure, request lifecycle |
| [02-database.md](02-database.md) | Every Prisma model, every field, every relationship |
| [03-migrations.md](03-migrations.md) | All migrations history + **migration safety rules** |
| [04-lib-auth.md](04-lib-auth.md) | `src/lib/auth.ts` — NextAuth configuration |
| [05-lib-db.md](05-lib-db.md) | `src/lib/db.ts` — Prisma client singleton |
| [06-lib-email.md](06-lib-email.md) | `src/lib/email.ts` — Nodemailer email functions |
| [07-lib-sanitize.md](07-lib-sanitize.md) | `src/lib/sanitize.ts` — HTML sanitization |
| [08-lib-upload.md](08-lib-upload.md) | `src/lib/upload.ts` — Vercel Blob file uploads |
| [09-lib-settings.md](09-lib-settings.md) | `src/lib/settings.ts` — DB-driven site copy |
| [10-lib-utils.md](10-lib-utils.md) | `src/lib/utils.ts` — Utility functions |
| [11-lib-practice-areas.md](11-lib-practice-areas.md) | `src/lib/practice-areas.ts` — Static areas list |
| [12-middleware.md](12-middleware.md) | `src/proxy.ts` — Auth + i18n routing |
| [13-i18n.md](13-i18n.md) | `src/i18n/` — Internationalization setup |
| [14-config.md](14-config.md) | `next.config.ts` — Next.js configuration |
| [15-layouts.md](15-layouts.md) | Root layout, locale layout, admin layout |
| [16-pages-public.md](16-pages-public.md) | All public-facing pages |
| [17-api-routes.md](17-api-routes.md) | All API endpoints |
| [18-admin.md](18-admin.md) | Admin panel pages and components |
| [19-components.md](19-components.md) | All reusable UI, layout, section components |
| [20-deployment.md](20-deployment.md) | Dockerfile, docker-compose, nginx, certbot, backup |

## Quick Reference

### Stack
- **Framework:** Next.js 16.2.1 (App Router)
- **React:** 19.2.4
- **Database:** PostgreSQL 16 via Prisma 7 + `@prisma/adapter-pg`
- **Auth:** NextAuth v5 beta (JWT strategy)
- **i18n:** next-intl v4 (Georgian + English)
- **Styling:** Tailwind CSS v4
- **Rich Text:** TipTap v3
- **File Storage:** Vercel Blob
- **Email:** Nodemailer (Gmail)
- **CAPTCHA:** Cloudflare Turnstile
- **Deployment:** Docker Compose + Nginx + Let's Encrypt

### Key Rules (read before touching anything)
1. **Never DROP a column or table** in a migration — see [03-migrations.md](03-migrations.md)
2. **Every content model is bilingual** — always add both `Ka` and `En` fields
3. **All site copy lives in `SiteSetting`** — never hardcode text in components
4. **Auth has two layers** — middleware + layout both check the session
5. **HTML from TipTap must be sanitized** before saving to DB
