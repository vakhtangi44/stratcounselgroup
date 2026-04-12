# 11 — Practice Areas

**File:** `src/lib/practice-areas.ts`

A static list of all 22 practice areas the firm offers. This is hardcoded (not from the database) because practice areas are part of the site's URL structure and core navigation — changing them requires a developer, not just an admin.

---

## Full File with Line-by-Line Explanation

```typescript
export const PRACTICE_AREAS = [
  { slug: 'corporate-law', nameKa: 'საკორპორაციო სამართალი', nameEn: 'Corporate Law', icon: '🏢' },
  { slug: 'tax-law', nameKa: 'საგადასახადო სამართალი', nameEn: 'Tax Law', icon: '📊' },
  // ... 20 more
] as const
```
- An array of objects, each representing one practice area
- Each object has four fields:
  - `slug` — URL-safe identifier used in routes: `/practice-areas/corporate-law`
  - `nameKa` — Georgian name displayed on the site
  - `nameEn` — English name displayed on the site
  - `icon` — emoji shown in the practice areas grid and navigation dropdown
- `as const` — TypeScript "const assertion":
  - Makes the array and all values deeply readonly (immutable)
  - Narrows the type of `slug` from `string` to a union of literal values: `'corporate-law' | 'tax-law' | ...`
  - This means `PRACTICE_AREAS[0].slug` has type `'corporate-law'`, not `string`
  - Enables TypeScript to catch typos: `getPracticeArea('corprate-law')` would be a type error

---

```typescript
export type PracticeAreaSlug = typeof PRACTICE_AREAS[number]['slug']
```
- Derives a TypeScript type from the data itself
- `typeof PRACTICE_AREAS` — the type of the array
- `[number]` — access the type of any element (i.e., `{ slug: ..., nameKa: ..., ... }`)
- `['slug']` — access the type of the `slug` field
- Result: `'corporate-law' | 'tax-law' | 'contract-law' | ...` (a union of all 22 slugs)
- By deriving from the data, you never need to manually keep a type in sync with the list

---

```typescript
export function getPracticeArea(slug: string) {
  return PRACTICE_AREAS.find((a) => a.slug === slug)
}
```
- Looks up a practice area by slug
- Returns the full object `{ slug, nameKa, nameEn, icon }` or `undefined` if not found
- Used when rendering an individual practice area page to get its display names

---

```typescript
export function isPracticeAreaSlug(slug: string): slug is PracticeAreaSlug {
  return PRACTICE_AREAS.some((a) => a.slug === slug)
}
```
- A **type guard** function — tells TypeScript that after this check, `slug` is definitely a `PracticeAreaSlug`
- `slug is PracticeAreaSlug` — the return type is a "type predicate"
- Usage:
  ```typescript
  const { slug } = params  // type: string
  if (!isPracticeAreaSlug(slug)) notFound()  // return 404 for unknown slugs
  // After this line, TypeScript knows slug is PracticeAreaSlug
  ```
- This validates URL parameters at runtime: visiting `/practice-areas/fake-area` returns 404

---

## Why Not Store This in the Database?

Practice areas are used in:
- URL routing (`/practice-areas/[slug]`)
- Navigation dropdown (Header component)
- BlogPostTag (tagging posts with a practice area)
- FAQ grouping (each FAQ has a practice area)
- TeamMember.practiceAreas (array of slugs)

If they were in the database, any change would require:
- Running database migrations
- Potentially updating hundreds of related records
- Worrying about stale slugs in URLs

By being static constants, they are:
- Type-safe (TypeScript catches invalid slugs at compile time)
- Predictable (never changes unexpectedly)
- Fast (no database query needed)
- Version-controlled (changes are tracked in git)

---

## The 22 Practice Areas

| Slug | English Name |
|---|---|
| `corporate-law` | Corporate Law |
| `tax-law` | Tax Law |
| `contract-law` | Contract Law |
| `labor-law` | Labor Law |
| `administrative-law` | Administrative Law |
| `criminal-law` | Criminal Law |
| `civil-law` | Civil Law |
| `healthcare-law` | Healthcare Law |
| `construction-law` | Construction Law |
| `energy-law` | Energy Law |
| `infrastructure-law` | Infrastructure Law |
| `telecommunications-law` | Telecommunications Law |
| `transportation-law` | Transportation Law |
| `cybercrime-law` | Cybercrime & Cybersecurity Law |
| `financial-crimes` | Financial & Anti-Corruption Crimes |
| `public-procurement` | Public Procurement |
| `litigation` | Litigation & Court Representation |
| `risk-management` | Legal Risk Management |
| `compliance` | Legal Compliance |
| `financial-audit` | Financial Audit & Control |
| `project-management` | Project Management |
| `commercial-law` | Commercial Law |
