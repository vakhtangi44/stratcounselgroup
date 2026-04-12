# 10 — Utility Functions

**File:** `src/lib/utils.ts`

Four general-purpose helper functions used across the project.

---

## Full File with Line-by-Line Explanation

```typescript
import { clsx, type ClassValue } from 'clsx'
```
- `clsx` merges class name strings conditionally
- Example: `clsx('px-4', isActive && 'bg-gold', !isActive && 'bg-gray')` → `'px-4 bg-gold'`
- `ClassValue` is the TypeScript type for anything `clsx` can accept: strings, arrays, objects

```typescript
import { twMerge } from 'tailwind-merge'
```
- `tailwind-merge` resolves conflicting Tailwind classes
- Example: `twMerge('px-4 px-6')` → `'px-6'` (last one wins, no duplicate)
- Without this, `className="px-4 px-6"` would apply both and the result depends on CSS specificity

---

```typescript
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
- `cn` is the standard pattern for Tailwind class merging in React projects
- First `clsx` handles conditional/array class names, then `twMerge` deduplicates Tailwind conflicts
- `...inputs` — rest parameter, accepts any number of arguments
- Usage:
  ```typescript
  cn('text-sm font-medium', isActive && 'text-gold', className)
  ```
- The `className` prop from the parent is merged correctly — parent overrides are preserved

---

```typescript
export function slugify(text: string): string {
  return text
    .toLowerCase()
```
- Converts to lowercase: `"Corporate Law"` → `"corporate law"`

```typescript
    .replace(/[^\w\s-]/g, '')
```
- Removes all characters that are NOT word characters (`\w` = a-z, 0-9, _), whitespace (`\s`), or hyphens
- Strips punctuation, accents, special characters: `"M&A / Legal"` → `"MA  Legal"`

```typescript
    .replace(/\s+/g, '-')
```
- Replaces one or more whitespace characters with a single hyphen
- `"corporate   law"` → `"corporate-law"`

```typescript
    .replace(/--+/g, '-')
```
- Collapses multiple consecutive hyphens into one
- `"m--a"` → `"m-a"` (can happen after the previous replacement)

```typescript
    .trim()
```
- Removes leading/trailing whitespace (before the regex replacements create edge-case hyphens)
- Returns the final slug: `"Corporate Law & Finance"` → `"corporate-law--finance"` → `"corporate-law-finance"`

---

```typescript
export function readTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '')
```
- Strips all HTML tags to get plain text
- `<[^>]*>` — matches any HTML tag (opening or closing)
- After stripping: `"<p>Hello <strong>world</strong></p>"` → `"Hello world"`

```typescript
  const words = text.trim().split(/\s+/).length
```
- `trim()` removes leading/trailing whitespace
- `split(/\s+/)` — splits on one or more whitespace characters (spaces, newlines, tabs)
- `.length` — count of words

```typescript
  return Math.max(1, Math.ceil(words / 200))
}
```
- Average reading speed is ~200 words per minute
- `Math.ceil` rounds up: 350 words → 2 minutes (not 1.75)
- `Math.max(1, ...)` ensures minimum of 1 minute (a 10-word post would return 0 otherwise)
- Returns an integer: the estimated reading time in minutes

---

```typescript
export function formatDate(date: Date | string, locale: string): string {
  return new Date(date).toLocaleDateString(locale === 'ka' ? 'ka-GE' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
```
- Formats a date for display, respecting the current locale
- `new Date(date)` — handles both `Date` objects and ISO strings (`"2026-03-22T00:00:00.000Z"`)
- `locale === 'ka' ? 'ka-GE' : 'en-US'` — Georgian locale vs US English
- `{ year: 'numeric', month: 'long', day: 'numeric' }` — format options:
  - `en-US` result: `"March 22, 2026"`
  - `ka-GE` result: `"22 მარტი, 2026"` (Georgian month names)
- Uses the browser/Node.js built-in `Intl.DateTimeFormat` under the hood — no external library needed
