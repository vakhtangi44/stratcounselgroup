# 07 — HTML Sanitization

**File:** `src/lib/sanitize.ts`

This file contains the HTML sanitizer used to clean blog post content before saving to the database. It prevents XSS (Cross-Site Scripting) attacks.

---

## What is XSS?

If a user (or attacker) submits HTML that gets rendered on the page without cleaning, they can inject malicious scripts:

```html
<script>document.cookie</script>
<img src="x" onerror="stealCookies()">
<a href="javascript:alert('hacked')">click me</a>
```

The sanitizer removes dangerous elements and attributes before the content reaches the database.

---

## Full File with Line-by-Line Explanation

```typescript
const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4',
  'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'hr', 'pre', 'code',
])
```
- Defines which HTML tags are permitted
- `Set` is used for O(1) lookups — `ALLOWED_TAGS.has('script')` is instant regardless of set size
- These tags cover all formatting TipTap can produce:
  - `p`, `br` — paragraphs and line breaks
  - `strong`, `em`, `u`, `s` — bold, italic, underline, strikethrough
  - `h1`–`h4` — headings
  - `ul`, `ol`, `li` — lists
  - `blockquote` — quotes
  - `a` — links
  - `img` — images
  - `hr` — horizontal rule
  - `pre`, `code` — code blocks
- Anything NOT in this list (e.g., `<script>`, `<style>`, `<iframe>`, `<object>`) is stripped

```typescript
const ALLOWED_ATTR = new Set(['href', 'src', 'alt', 'target', 'rel', 'class'])
```
- Defines which HTML attributes are permitted on any tag
- `href` — links (`<a href="...">`)
- `src` — images (`<img src="...">`)
- `alt` — image alt text (accessibility)
- `target` — link target (`_blank` for new tab)
- `rel` — link relationship (`noopener noreferrer` for security)
- `class` — CSS classes (for TipTap's styling)
- Anything else is stripped: `onclick`, `onerror`, `onload`, `style`, `id`, etc.

---

```typescript
export function sanitizeHtml(dirty: string): string {
```
- Takes potentially unsafe HTML, returns clean HTML
- Called `dirty` to make it obvious the input is untrusted

```typescript
  let clean = dirty
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
```
- First pass: removes entire `<script>...</script>` and `<style>...</style>` blocks including their content
- `\b` — word boundary (prevents matching `<scriptfoo>`)
- `[^>]*` — any characters except `>` (matches tag attributes)
- `[\s\S]*?` — any characters including newlines, non-greedy (stops at first `</script>`)
- `/gi` flags: `g` = replace all, `i` = case-insensitive (`<SCRIPT>` also matched)
- This is done FIRST before the general tag-stripping because these blocks can contain content that looks like valid tags

```typescript
  clean = clean.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/gi, (match, tag) => {
```
- Matches all HTML tags: opening (`<p>`), closing (`</p>`), and self-closing (`<br/>`)
- `<\/?>` — optional `/` for closing tags
- `([a-zA-Z][a-zA-Z0-9]*)` — captures the tag name (must start with a letter)
- `\b[^>]*` — any tag attributes
- For each match, runs the callback function with the full match and captured tag name

```typescript
    const lowerTag = tag.toLowerCase()
    if (!ALLOWED_TAGS.has(lowerTag)) return ''
```
- Normalizes tag name to lowercase (HTML is case-insensitive)
- If the tag is not in the allowed list, replace with empty string (completely removes the tag)

```typescript
    if (match.startsWith('</')) return `</${lowerTag}>`
```
- For closing tags like `</STRONG>`: return a clean lowercase version `</strong>`
- Closing tags have no attributes, so no further processing needed

```typescript
    const attrString = match.slice(match.indexOf(tag) + tag.length, match.endsWith('/>') ? -2 : -1)
```
- Extracts the attributes portion of the tag
- `match.indexOf(tag) + tag.length` — finds where the tag name ends
- `match.endsWith('/>') ? -2 : -1` — removes the closing `>` or `/>` from the end

```typescript
    const cleanAttrs: string[] = []

    const attrRegex = /([a-zA-Z-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g
    let attrMatch
    while ((attrMatch = attrRegex.exec(attrString)) !== null) {
```
- `attrRegex` matches HTML attributes in the form `name="value"` or `name='value'`
- `([a-zA-Z-]+)` — attribute name (letters and hyphens, e.g. `data-id`)
- `\s*=\s*` — equals sign with optional spaces
- `"([^"]*)"` — double-quoted value (captures content)
- `'([^']*)'` — single-quoted value (captures content)
- Loops through all attribute matches in the string

```typescript
      const attrName = attrMatch[1].toLowerCase()
      const attrValue = attrMatch[2] ?? attrMatch[3] ?? ''
```
- `attrMatch[1]` — the attribute name (group 1)
- `attrMatch[2]` — value from double quotes (group 2)
- `attrMatch[3]` — value from single quotes (group 3)
- `??` uses the first non-null/undefined value

```typescript
      if (!ALLOWED_ATTR.has(attrName)) continue
```
- Skip attributes not in the allowed list (drops `onclick`, `onerror`, etc.)

```typescript
      if ((attrName === 'href' || attrName === 'src') && attrValue.trim().toLowerCase().startsWith('javascript:')) continue
```
- Extra check: even if `href` and `src` are allowed, block `javascript:` URLs
- `<a href="javascript:stealCookies()">` would execute JavaScript when clicked
- `.trim()` handles `  javascript:` with leading spaces (a bypass technique)
- `.toLowerCase()` handles `JAVASCRIPT:` in uppercase

```typescript
      cleanAttrs.push(`${attrName}="${attrValue}"`)
    }
```
- Rebuild the allowed attribute as `name="value"` with consistent double quotes

```typescript
    const attrs = cleanAttrs.length > 0 ? ' ' + cleanAttrs.join(' ') : ''
    const selfClose = match.endsWith('/>') ? ' /' : ''
    return `<${lowerTag}${attrs}${selfClose}>`
  })

  return clean
}
```
- Reconstructs a clean opening tag with only the allowed attributes
- Preserves self-closing syntax (`<br />`) for proper HTML
- Returns the fully sanitized HTML string

---

## Where This is Used

```typescript
// In POST /api/admin/blog/route.ts (on create):
contentKa: sanitizeHtml(contentKa || ''),
contentEn: sanitizeHtml(contentEn || ''),

// In PUT /api/admin/blog/[id]/route.ts (on update):
contentKa: sanitizeHtml(contentKa || ''),
contentEn: sanitizeHtml(contentEn || ''),
```

The sanitizer runs **server-side at write time** — when the admin saves a post. The sanitized HTML is stored in the database. When the post is displayed to visitors, it is rendered with `dangerouslySetInnerHTML` — safe because it's already been cleaned.

---

## What is NOT sanitized

`SiteSetting` values (hero text, footer content, etc.) are rendered directly without sanitization:

```typescript
// src/components/ui/RichText.tsx
<div dangerouslySetInnerHTML={{ __html: value }} />
```

There is a comment in the code noting this is "admin-controlled trusted content." The assumption is that whoever has admin access is a trusted person. This is reasonable — only sanitize untrusted input.
