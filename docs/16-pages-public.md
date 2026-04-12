# 16 — Public Pages

All public pages live in `src/app/[locale]/`. They are all Server Components by default — they fetch data from the database and render HTML on the server.

---

## Home Page — `src/app/[locale]/page.tsx`

The most data-heavy page — loads 7 database queries in parallel.

### Metadata
```typescript
export async function generateMetadata({ params }) {
  const { locale } = await params
  return {
    title: locale === 'ka' ? 'Strategic Counsel Group | ხედვა...' : 'Strategic Counsel Group | Insight...',
    description: ...,
    openGraph: { title: ..., description: ... },
    alternates: {
      canonical: locale === 'ka' ? 'https://stratcounselgroup.com' : 'https://stratcounselgroup.com/en',
      languages: { 'ka': 'https://...', 'en': 'https://.../en' },
    },
  }
}
```
- `generateMetadata` is an async function — can fetch data before returning metadata
- `alternates.canonical` — tells Google which URL is the "real" URL (avoids duplicate content penalties)
- `alternates.languages` — hreflang links — tells Google about the bilingual versions for international SEO

### Data Fetching
```typescript
const [stats, teamMembers, testimonials, blogPosts, pressItems, clientCategories, services] =
  await Promise.all([...7 queries...])
```
- All 7 queries run simultaneously — total time = slowest single query

### Rendering
```typescript
return (
  <>
    <Hero locale={locale} strings={heroStrings} />
    <PracticeAreasGrid locale={locale} strings={...} />
    {services.length > 0 && <ServicesPreview services={services} locale={locale} />}
    <StatsSection stats={stats} locale={locale} />
    <TeamPreview members={teamMembers} locale={locale} strings={...} />
    <TrustedBy locale={locale} categories={clientCategories} strings={...} />
    <TestimonialsCarousel testimonials={testimonials} locale={locale} strings={...} />
    <BlogPreview posts={blogPosts} locale={locale} strings={...} />
    <PressStrip items={pressItems} asSeenIn={...} />
  </>
)
```
- Each section is a separate component
- All string values are pre-resolved from settings before passing as props
- This way, client components (like TestimonialsCarousel) receive plain strings, not the settings map

---

## Blog List Page — `src/app/[locale]/blog/page.tsx`

Supports search and filtering.

### Search & Filter via URL Params
```typescript
const { searchParams } = request  // or via props
const q = searchParams?.q || ''           // search query
const area = searchParams?.area || ''     // practice area filter
```
- Search state is in the URL (e.g., `/blog?q=corporate&area=tax-law`)
- URL-based state means the page is shareable and bookmarkable
- No client-side state needed — the server handles filtering

### Pagination
- Shows 9 posts per page
- `skip: (page - 1) * 9` — offset calculation
- `take: 9` — limit to 9 posts
- Total count fetched separately to calculate page count

---

## Blog Post Page — `src/app/[locale]/blog/[slug]/page.tsx`

```typescript
import { unstable_noStore as noStore } from 'next/cache'
noStore()
```
- `noStore()` opts this page out of Next.js caching
- Without this, Next.js might cache the rendered HTML and serve stale content
- Blog posts can be updated at any time by the admin, so fresh data is always needed

### Related Posts
```typescript
const tags = post.tags.map((t) => t.practiceArea)
const related = await db.blogPost.findMany({
  where: {
    status: 'published',
    id: { not: post.id },
    tags: { some: { practiceArea: { in: tags } } },
  },
  take: 3,
})
```
- Finds posts tagged with the same practice areas
- Excludes the current post
- Limits to 3 related posts

### HTML Rendering
```typescript
<div dangerouslySetInnerHTML={{ __html: post.contentKa }} />
```
- Renders the sanitized HTML directly
- Safe because the content was sanitized with `sanitizeHtml()` when saved

---

## Team List Page — `src/app/[locale]/team/page.tsx`

```typescript
const members = await db.teamMember.findMany({
  where: { active: true },
  orderBy: { order: 'asc' },
})
```
- Fetches all active team members sorted by their `order` field
- Inactive members (deleted or hidden) are excluded

---

## Team Member Page — `src/app/[locale]/team/[slug]/page.tsx`

```typescript
const member = await db.teamMember.findUnique({ where: { slug } })
if (!member) notFound()
```
- If the slug doesn't match any member, shows 404
- `notFound()` from next/navigation throws internally and renders the 404 page

### Practice Areas Display
```typescript
const areas = member.practiceAreas
  .map((slug) => getPracticeArea(slug))
  .filter(Boolean)
```
- Maps slug strings to full practice area objects
- `.filter(Boolean)` removes undefined results (in case a slug is stale)

---

## Practice Areas List — `src/app/[locale]/practice-areas/page.tsx`

```typescript
import { PRACTICE_AREAS } from '@/lib/practice-areas'
```
- No database query — the list is the static `PRACTICE_AREAS` constant
- This page is pure rendering, zero DB cost

---

## Practice Area Detail — `src/app/[locale]/practice-areas/[slug]/page.tsx`

```typescript
if (!isPracticeAreaSlug(slug)) notFound()

const [faqs, posts] = await Promise.all([
  db.fAQ.findMany({ where: { practiceArea: slug, active: true }, orderBy: { order: 'asc' } }),
  db.blogPost.findMany({ where: { status: 'published', tags: { some: { practiceArea: slug } } }, take: 5 }),
])
```
- Validates the slug first (404 for unknown areas)
- Loads related FAQs and blog posts for this practice area in parallel

---

## Contact Page — `src/app/[locale]/contact/page.tsx` + `ContactPageClient.tsx`

### Server Component (page.tsx)
```typescript
const settings = await getSettings()
// Resolves all string values from DB
const strings = {
  heading: s(settings, 'contact.heading', locale),
  phone: s(settings, 'contact.phone', locale),
  email: s(settings, 'contact.email', locale),
  address: s(settings, 'contact.address', locale),
  // ...
}
return <ContactPageClient locale={locale} strings={strings} />
```
- Fetches settings on the server (can access DB directly)
- Passes pre-resolved strings to the client component

### Client Component (ContactPageClient.tsx)
- Handles form state: name, email, phone, subject, message
- Integrates Cloudflare Turnstile CAPTCHA
- On submit: `POST /api/contact` with form data + Turnstile token
- Shows success/error feedback to the user

---

## Glossary Page — `src/app/[locale]/glossary/page.tsx` + `GlossaryPageClient.tsx`

### Server Component
```typescript
const settings = await getSettings()
return <GlossaryPageClient locale={locale} strings={...} />
```

### Client Component
```typescript
const [terms, setTerms] = useState([])
const [letter, setLetter] = useState('')

useEffect(() => {
  fetch('/api/glossary').then(res => res.json()).then(setTerms)
}, [])
```
- Fetches terms client-side via the public API
- Why client-side fetch instead of server-side? Enables instant alphabetical filtering without a page reload
- The alphabet buttons filter `terms` in memory — no server round-trips per letter click

---

## FAQ Page — `src/app/[locale]/faq/page.tsx`

```typescript
const faqs = await db.fAQ.findMany({
  where: { active: true },
  orderBy: [{ practiceArea: 'asc' }, { order: 'asc' }],
})

// Group by practice area:
const grouped = faqs.reduce((acc, faq) => {
  if (!acc[faq.practiceArea]) acc[faq.practiceArea] = []
  acc[faq.practiceArea].push(faq)
  return acc
}, {})
```
- Fetches all FAQs and groups them by practice area
- Sorted first by practice area (alphabetically), then by the `order` field within each group

---

## Newsletter Unsubscribe — `src/app/[locale]/newsletter/unsubscribe/page.tsx`

```typescript
const token = searchParams?.token
if (!token) { /* show error */ }

const subscriber = await db.newsletterSubscriber.findUnique({
  where: { unsubscribeToken: token }
})

if (!subscriber) { /* show "already unsubscribed" */ }

await db.newsletterSubscriber.update({
  where: { unsubscribeToken: token },
  data: { active: false }
})
```
- Token-based unsubscribe — no login required
- Sets `active: false` (doesn't delete the record — keeps the email in DB so re-subscribe works)
- If the token is invalid or already used: shows an appropriate message
