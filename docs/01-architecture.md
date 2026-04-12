# 01 — System Architecture

## What This Project Is

Strategic Counsel Group is a bilingual (Georgian/English) law firm website with:
- A **public website** for visitors (home, about, blog, team, services, etc.)
- An **admin panel** (CMS) for staff to manage all content
- A **REST API** that the admin panel calls

---

## Folder Structure

```
stratcounselgroup-main/
├── src/
│   ├── app/                  ← Next.js App Router (pages + API)
│   │   ├── layout.tsx        ← Root HTML shell (fonts, global CSS)
│   │   ├── page.tsx          ← Root redirect (handled by middleware)
│   │   ├── globals.css       ← Global Tailwind CSS
│   │   ├── [locale]/         ← All public pages, parameterized by locale
│   │   │   ├── layout.tsx    ← Locale layout (Header, Footer, chat widgets)
│   │   │   ├── page.tsx      ← Home page
│   │   │   ├── about/
│   │   │   ├── blog/
│   │   │   ├── contact/
│   │   │   ├── faq/
│   │   │   ├── glossary/
│   │   │   ├── practice-areas/
│   │   │   ├── press/
│   │   │   ├── services/
│   │   │   ├── team/
│   │   │   └── newsletter/
│   │   ├── admin/
│   │   │   ├── login/        ← Public login page
│   │   │   └── (protected)/  ← Route group — all pages require auth
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx  ← Dashboard
│   │   │       └── blog, team, faq, glossary, ...
│   │   └── api/
│   │       ├── auth/[...nextauth]/  ← NextAuth handler
│   │       ├── contact/
│   │       ├── glossary/
│   │       ├── newsletter/
│   │       ├── upload/
│   │       └── admin/        ← Protected CRUD endpoints
│   ├── components/
│   │   ├── admin/            ← Admin-only components (sidebar, editor)
│   │   ├── layout/           ← Header, Footer, LanguageToggle, etc.
│   │   ├── sections/         ← Homepage sections (Hero, Stats, Team, etc.)
│   │   └── ui/               ← Small reusable components (ScrollReveal, etc.)
│   ├── lib/
│   │   ├── auth.ts           ← NextAuth config
│   │   ├── db.ts             ← Prisma client singleton
│   │   ├── email.ts          ← Nodemailer helpers
│   │   ├── sanitize.ts       ← HTML sanitizer
│   │   ├── upload.ts         ← Vercel Blob uploader
│   │   ├── settings.ts       ← SiteSetting DB helper
│   │   ├── utils.ts          ← cn(), slugify(), readTime(), formatDate()
│   │   └── practice-areas.ts ← Static list of 22 practice areas
│   ├── i18n/
│   │   ├── routing.ts        ← Locale list + prefix strategy
│   │   ├── request.ts        ← Per-request locale + message loading
│   │   └── navigation.ts     ← Locale-aware Link, redirect, useRouter
│   ├── messages/
│   │   ├── en.json           ← English UI strings
│   │   └── ka.json           ← Georgian UI strings
│   ├── types/
│   │   └── index.ts          ← Shared TypeScript types
│   └── proxy.ts              ← Middleware (auth + i18n routing)
├── prisma/
│   ├── schema.prisma         ← Database schema
│   ├── migrations/           ← SQL migration history
│   ├── seed.ts               ← Initial data seeder
│   ├── seed-settings.ts      ← SiteSetting seeder
│   └── reset-password.ts     ← Admin password reset script
├── public/                   ← Static files (logo, images)
├── Dockerfile                ← Multi-stage Docker build
├── docker-compose.yml        ← 5-service deployment stack
├── nginx.conf                ← Reverse proxy + TLS + rate limiting
├── next.config.ts            ← Next.js configuration
├── prisma.config.ts          ← Prisma config (dotenv)
├── tsconfig.json             ← TypeScript config
└── eslint.config.mjs         ← ESLint config
```

---

## Request Lifecycle

### Public Page Request (e.g. `/about` in Georgian)

```
Browser → Nginx (80/443)
       → proxy_pass http://app:3000
       → src/proxy.ts (middleware)
          → pathname does NOT start with /admin
          → handleI18n(request)         ← next-intl middleware
             → detects locale from URL or cookie
             → rewrites internally to /[locale]/about
       → src/app/[locale]/layout.tsx    ← Server Component
          → validates locale
          → fetches messages + settings in parallel
          → renders Header + main + Footer
       → src/app/[locale]/about/page.tsx ← Server Component
          → fetches data from PostgreSQL via Prisma
          → renders HTML
       → Response streams back to browser
```

### English page request (e.g. `/en/about`)

The `/en/` prefix is detected by next-intl middleware, which sets `locale = 'en'` and rewrites the path. Everything else is identical.

### Admin Page Request (e.g. `/admin/blog`)

```
Browser → Nginx → src/proxy.ts
       → pathname starts with /admin
       → handleAuth(request)            ← NextAuth auth middleware
          → checks JWT cookie
          → if no valid session:
             → redirect to /admin/login?callbackUrl=/admin/blog
          → if valid session:
             → NextResponse.next()
       → src/app/admin/(protected)/layout.tsx ← Server Component
          → calls auth() AGAIN (second check, belt-and-suspenders)
          → if no session: redirect('/admin/login')
          → renders AdminSidebar + main
       → src/app/admin/(protected)/blog/page.tsx
          → fetches blog posts from DB
          → renders admin UI
```

### API Request (e.g. `POST /api/admin/blog`)

```
Browser → Nginx → src/proxy.ts
       → matcher excludes /api paths → middleware NOT run
       → Next.js routes directly to handler
       → src/app/api/admin/blog/route.ts
          → calls auth() to verify session
          → if no session: 401 Unauthorized
          → reads body, validates, writes to DB
          → returns JSON
```

---

## Server vs Client Components

Next.js App Router defaults everything to **Server Components** — they run on the server and ship zero JavaScript to the browser.

**Client Components** (`'use client'` directive) are needed when you use:
- Browser APIs (`window`, `document`, `localStorage`)
- React hooks with side effects (`useState`, `useEffect`)
- Event listeners

In this project:

| Type | Component | Why client |
|---|---|---|
| Server | All page files | Data fetching only |
| Server | Footer, Hero, BlogPreview, etc. | No interactivity |
| Client | Header | Scroll listener + dropdown state |
| Client | LanguageToggle | Sets cookie, triggers navigation |
| Client | MobileMenu | Open/close drawer state |
| Client | TestimonialsCarousel | Auto-advance timer |
| Client | AnimatedCounter | IntersectionObserver |
| Client | ScrollReveal | IntersectionObserver |
| Client | RichTextEditor | TipTap (DOM-heavy) |
| Client | AdminSidebar | Active link state via usePathname |
| Client | Login page | Form state + signIn() call |

---

## Data Flow Pattern: Server Shell + Client Leaf

Several pages use this pattern to keep data fetching on the server while still supporting interactivity:

```
page.tsx (Server Component)
  ↓ fetches data from DB
  ↓ resolves settings strings
  ↓ passes everything as props
ContactPageClient.tsx (Client Component)
  ↓ handles form state, submission, error display
```

This is better than making the whole page a client component because:
- The server component can access the DB directly (no extra API call)
- The initial HTML is fully rendered (good for SEO)
- Only the interactive part ships JavaScript to the browser

---

## Parallel Data Fetching

The home page fetches 7 database queries simultaneously:

```typescript
const [stats, teamMembers, testimonials, blogPosts, pressItems, clientCategories, services] =
  await Promise.all([
    db.statistic.findMany(),
    db.teamMember.findMany({ where: { active: true, isFeatured: true }, take: 3 }),
    db.testimonial.findMany({ where: { active: true } }),
    db.blogPost.findMany({ where: { status: 'published' }, take: 3 }),
    db.pressItem.findMany({ where: { active: true } }),
    db.clientCategory.findMany({ include: { clients: true } }),
    db.service.findMany({ include: { items: true } }),
  ])
```

`Promise.all` runs all queries at the same time. Total time = slowest single query, not sum of all queries.

---

## Bilingual Content Pattern

Every content model has `Ka` (Georgian) and `En` (English) variants of text fields:

```prisma
model BlogPost {
  titleKa  String   // Georgian title
  titleEn  String   // English title
  contentKa String  @db.Text
  contentEn String  @db.Text
  ...
}
```

At render time, the locale determines which field to use:

```typescript
const title = locale === 'ka' ? post.titleKa : post.titleEn
```

This is simpler than a separate translations table and works well for a two-language site.

---

## SiteSetting Pattern

All editable site copy (hero heading, section titles, contact info, footer text) lives in the `SiteSetting` table rather than being hardcoded. This means the admin can change any text without a code deployment.

```typescript
// In page.tsx:
const settings = await getSettings()  // loads all rows into a Map
const heading = s(settings, 'hero.heading', locale)  // picks ka or en value
```

If a key doesn't exist in the DB, `s()` returns the key name itself as a fallback — so missing settings are visible rather than silent.
