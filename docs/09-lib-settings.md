# 09 — Site Settings

**File:** `src/lib/settings.ts`

This is the bridge between the `SiteSetting` database table and the pages that need text content. It allows every piece of site copy to be edited from the admin panel without touching the code.

---

## Full File with Line-by-Line Explanation

```typescript
import { db } from './db'
```
- Imports the Prisma client to query the database

---

```typescript
export type Settings = Map<string, { ka: string; en: string }>
```
- Defines a TypeScript type alias for the settings data structure
- `Map<string, { ka: string; en: string }>` — a key-value map where:
  - Key: the setting key string (e.g., `"hero.heading"`)
  - Value: an object with `ka` (Georgian) and `en` (English) text
- Using a `Map` (not a plain object) gives O(1) lookups by key

---

```typescript
export async function getSettings(): Promise<Settings> {
  const rows = await db.siteSetting.findMany()
```
- Fetches ALL rows from the `SiteSetting` table in one query
- No `where` filter — loads every setting at once
- This is intentional: pages typically need many settings, so fetching all once is faster than multiple targeted queries

```typescript
  const map = new Map<string, { ka: string; en: string }>()
  for (const row of rows) {
    map.set(row.key, { ka: row.valueKa, en: row.valueEn })
  }
  return map
}
```
- Converts the array of rows into a `Map` for fast lookups
- `row.key` becomes the map key (e.g., `"hero.heading"`)
- `{ ka: row.valueKa, en: row.valueEn }` stores both language values together

---

```typescript
export function s(settings: Settings, key: string, locale: string): string {
  const val = settings.get(key)
  if (!val) return key  // fallback to key name
  return locale === 'ka' ? val.ka : val.en
}
```
- `s` is a short helper for "get setting string"
- Takes the settings map, a key, and the current locale
- `settings.get(key)` — looks up the key in the map (O(1))
- If the key doesn't exist: returns the key itself as a fallback
  - This means a missing setting shows `"hero.heading"` on screen instead of blank text
  - Very useful during development — you can see exactly which key is missing
- Returns the Georgian value if `locale === 'ka'`, otherwise the English value

---

```typescript
export function hasHtml(str: string): boolean {
  return /<[a-z][\s\S]*>/i.test(str)
}
```
- Tests if a string contains HTML tags
- `/<[a-z][\s\S]*>/i` — regex that matches an opening HTML tag
- Used by the `RichText` component to decide whether to render with `dangerouslySetInnerHTML` or as plain text
- Example: `hasHtml('<strong>Hello</strong>')` → `true`
- Example: `hasHtml('Hello world')` → `false`

---

## Usage Pattern in Pages

```typescript
// In any server component page:
const settings = await getSettings()

// Get a single string:
const heading = s(settings, 'hero.heading', locale)
// → "სტრატეგიული ადვოკატების ჯგუფი" (if locale === 'ka')
// → "Strategic Counsel Group" (if locale === 'en')

// Pass to client component as prop:
const heroStrings = {
  heading: s(settings, 'hero.heading', locale),
  subtitle: s(settings, 'hero.subtitle', locale),
  cta1: s(settings, 'hero.cta1', locale),
}
<Hero strings={heroStrings} />
```

---

## Setting Key Conventions

Settings are organized with dot-notation keys and grouped by category:

| Category | Key prefix | Example key |
|---|---|---|
| `hero` | `hero.` | `hero.heading`, `hero.subtitle` |
| `sections` | `section.` | `section.ourTeam`, `section.testimonials` |
| `contact` | `contact.` | `contact.whatsapp`, `contact.phone` |
| `footer` | `footer.` | `footer.description` |
| `seo` | `seo.` | `seo.description` |

The `category` field in the database groups these for display in the admin settings editor.

---

## Admin Settings Editor

In `/admin/settings`, the `SettingsEditor` component:
1. Calls `GET /api/admin/settings` → returns settings grouped by category
2. Renders each setting as a pair of text inputs (Ka | En)
3. On save, calls `PUT /api/admin/settings` with the array of `{ id, valueKa, valueEn }` updates

The key and category are read-only in the admin — only the values can be changed. This prevents accidentally breaking the code that looks up settings by key.
