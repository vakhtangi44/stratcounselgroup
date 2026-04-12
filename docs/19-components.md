# 19 — Components

All reusable components live in `src/components/`, split into three folders: `layout/`, `sections/`, and `ui/`.

---

## Layout Components — `src/components/layout/`

### Header — `Header.tsx`

**Type:** Client Component (`'use client'`)
**Why client:** Scroll detection (changes header style), dropdown state

```typescript
const [scrolled, setScrolled] = useState(false)
const isHome = pathname === '/' || pathname === '/en'
const isTransparent = isHome && !scrolled
```
- On the home page, the header is transparent over the hero
- After scrolling 50px, it becomes opaque with backdrop blur
- On all other pages, it's always opaque

```typescript
useEffect(() => {
  const handler = () => setScrolled(window.scrollY > 50)
  window.addEventListener('scroll', handler, { passive: true })
  return () => window.removeEventListener('scroll', handler)
}, [])
```
- Listens to scroll events
- `{ passive: true }` — tells the browser this listener won't call `preventDefault()`, allowing scroll optimization
- Cleanup: removes listener when component unmounts (prevents memory leaks)

**DropdownMenu component (internal):**
```typescript
const timeout = useRef<NodeJS.Timeout | null>(null)

function handleEnter() {
  if (timeout.current) clearTimeout(timeout.current)
  setOpen(true)
}
function handleLeave() {
  timeout.current = setTimeout(() => setOpen(false), 200)
}
```
- 200ms delay before closing — prevents the dropdown from closing when moving from button to the dropdown
- `clearTimeout` on enter cancels any pending close

**Practice areas dropdown:**
```typescript
const half = Math.ceil(PRACTICE_AREAS.length / 2)
const col1 = PRACTICE_AREAS.slice(0, half)
const col2 = PRACTICE_AREAS.slice(half)
```
- 22 areas split into two equal columns
- `Math.ceil` ensures the first column gets the extra one if the total is odd (22/2 = 11 each, even split)

**Logo behavior:**
```typescript
className={`... ${isTransparent ? 'brightness-0 invert' : ''}`}
```
- `brightness-0` makes the logo black; `invert` makes black → white
- Transparent header (over dark hero image) = white logo
- Opaque header (white background) = normal/dark logo

---

### Footer — `Footer.tsx`

**Type:** Server Component
- Fetches all settings from DB for footer text, contact details, social links
- Contains `NewsletterForm` (client component) as a child
- No interactivity needed at the footer level itself

---

### LanguageToggle — `LanguageToggle.tsx`

**Type:** Client Component

```typescript
function switchLocale(newLocale: string) {
  document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`
  const newPath = newLocale === 'en'
    ? '/en' + pathname.replace(/^\/en/, '')
    : pathname.replace(/^\/en/, '')
  window.location.href = newPath
}
```
- Sets the `NEXT_LOCALE` cookie (1 year) — next-intl reads this cookie to remember language preference
- Calculates the new URL: adds/removes `/en` prefix
- `window.location.href = newPath` — full page reload (not client navigation)
- Full reload is necessary so the server renders with the new locale

---

### MobileMenu — `MobileMenu.tsx`

**Type:** Client Component — manages open/close state

```typescript
const [open, setOpen] = useState(false)

// Lock body scroll when menu is open
useEffect(() => {
  document.body.style.overflow = open ? 'hidden' : ''
  return () => { document.body.style.overflow = '' }
}, [open])
```
- Prevents background scrolling when the mobile menu overlay is open
- Cleanup removes the style on unmount

---

### NewsletterForm — `NewsletterForm.tsx`

**Type:** Client Component — handles form submission

```typescript
const res = await fetch('/api/newsletter/subscribe', {
  method: 'POST',
  body: JSON.stringify({ email }),
})
```
- Submits to the public subscribe API
- Shows success message on 200, error message on failure

---

## Section Components — `src/components/sections/`

These render the major sections of the home page.

### Hero — `Hero.tsx`

**Type:** Server Component (but renders CSS animations)

```typescript
interface Props {
  locale: string
  strings: { heading: string; subtitle: string; cta1: string; cta2: string }
}
```
- Receives pre-resolved strings from the home page server component
- Does not fetch any data itself

**Animated heading:**
```typescript
{words.map((word, i) => (
  <span
    key={i}
    className="inline-block animate-slide-up-elegant"
    style={{ animationDelay: `${i * 0.08}s` }}
  >
    {word}&nbsp;
  </span>
))}
```
- Splits the heading into individual words
- Each word gets a staggered CSS animation delay (0ms, 80ms, 160ms, ...)
- `animate-slide-up-elegant` — custom Tailwind animation defined in `globals.css`

---

### StatsSection — `StatsSection.tsx`

Contains the `AnimatedCounter` client component for counting animations.

---

### AnimatedCounter — `src/components/ui/AnimatedCounter.tsx`

**Type:** Client Component

```typescript
const ref = useRef<HTMLSpanElement>(null)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        startAnimation()
        observer.disconnect()
      }
    },
    { threshold: 0.5 }
  )
  if (ref.current) observer.observe(ref.current)
  return () => observer.disconnect()
}, [])
```
- `IntersectionObserver` — fires when the element enters the viewport
- `threshold: 0.5` — fires when 50% of the element is visible
- Starts counting animation when visible (not immediately on page load)
- `observer.disconnect()` after firing — animation only plays once

```typescript
function startAnimation() {
  const duration = 2000
  const steps = 60
  const increment = target / steps
  let current = 0
  const timer = setInterval(() => {
    current = Math.min(current + increment, target)
    if (ref.current) ref.current.textContent = Math.round(current).toString()
    if (current >= target) clearInterval(timer)
  }, duration / steps)
}
```
- Animates from 0 to `target` over 2 seconds
- 60 steps = 60fps smooth animation
- `Math.min(..., target)` — clamps so it never exceeds the target

---

### TestimonialsCarousel — `TestimonialsCarousel.tsx`

**Type:** Client Component

```typescript
const [current, setCurrent] = useState(0)

useEffect(() => {
  const timer = setInterval(() => {
    setCurrent(prev => (prev + 1) % testimonials.length)
  }, 6000)
  return () => clearInterval(timer)
}, [testimonials.length])
```
- Auto-advances every 6 seconds
- `% testimonials.length` — wraps around (after last → back to first)
- Cleanup clears the interval on unmount (prevents memory leaks)

---

## UI Components — `src/components/ui/`

### ScrollReveal — `ScrollReveal.tsx`

**Type:** Client Component

```typescript
useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setVisible(true)
      observer.disconnect()
    }
  })
  if (ref.current) observer.observe(ref.current)
}, [])

return (
  <div
    ref={ref}
    className={`transition-all duration-700 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}
  >
    {children}
  </div>
)
```
- Wraps any content in a fade-in + slide-up animation
- Content starts invisible and 32px below its final position
- Transitions to visible when it enters the viewport
- `duration-700` — 700ms transition (smooth but not slow)

---

### RichText — `RichText.tsx`

```typescript
export function RichText({ value, className }: { value: string; className?: string }) {
  if (hasHtml(value)) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />
  }
  return <p className={className}>{value}</p>
}
```
- If the value contains HTML tags: renders with `dangerouslySetInnerHTML`
- If plain text: renders as a simple `<p>` tag
- `hasHtml()` from `@/lib/settings` detects whether HTML is present
- **Important:** This is for admin-controlled content (SiteSetting values) — trusted, not sanitized

---

### GoldDivider — `GoldDivider.tsx`

Simple decorative SVG divider in the brand gold color. Used between sections.

---

## Component Best Practices Used

1. **Cleanup in useEffect:** Every `addEventListener`, `setInterval`, and `IntersectionObserver` has a cleanup function in its `useEffect` return. This prevents memory leaks.

2. **Passive event listeners:** Scroll listeners use `{ passive: true }` for better scroll performance.

3. **IntersectionObserver for animations:** Animations only play when visible (not off-screen). Uses `observer.disconnect()` after triggering so the observer doesn't keep running.

4. **Props typing:** All components have TypeScript interfaces for their props.

5. **cn() for class merging:** All conditional class names use the `cn()` utility to prevent Tailwind conflicts.
