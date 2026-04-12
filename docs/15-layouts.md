# 15 — Layouts

Layouts are shared UI wrappers that wrap all pages in a section. In Next.js App Router, a `layout.tsx` file wraps all pages in its folder and all subfolders.

---

## Root Layout — `src/app/layout.tsx`

The outermost HTML wrapper. Every page on the site — public AND admin — is wrapped by this.

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
```
- `Metadata` — Next.js type for the `metadata` export
- `Geist`, `Geist_Mono` — Vercel's Geist font family, loaded from Google Fonts
- `globals.css` — Tailwind CSS base styles, applied globally

```typescript
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
```
- `variable: "--font-geist-sans"` — creates a CSS custom property. The font is referenced in CSS as `var(--font-geist-sans)`
- `subsets: ["latin"]` — only loads Latin characters (not Cyrillic, Arabic, etc.) — smaller bundle
- ⚠️ Georgian script is NOT in the `latin` subset. The Georgian text falls back to the browser's system font.

```typescript
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```
- Monospace variant for code blocks (`<pre>`, `<code>` elements)

```typescript
export const metadata: Metadata = {
  title: "Strategic Counsel Group | Insight. Strategy. Impact.",
  description: "...",
};
```
- Default metadata — overridden by individual pages via their own `generateMetadata` or `metadata` exports
- This is the fallback for pages that don't set their own title

```typescript
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
```
- `lang="en"` — ⚠️ This should ideally be dynamic based on the current locale. It's hardcoded as "en" which is incorrect for Georgian pages. Screen readers use this attribute.
- `${geistSans.variable} ${geistMono.variable}` — injects the CSS custom properties onto `<html>` so all child components can reference the fonts
- `h-full` — sets height to 100% (enables full-height layouts)
- `antialiased` — Tailwind class for font antialiasing (smoother text rendering)

```typescript
      <body className="min-h-full flex flex-col">{children}</body>
```
- `min-h-full` — body fills at least the full viewport height
- `flex flex-col` — enables the footer-at-bottom layout: header + main stretch + footer
- `{children}` — the locale layout (or admin layout) gets rendered here

---

## Locale Layout — `src/app/[locale]/layout.tsx`

Wraps all public-facing pages. Adds Header, Footer, chat widgets, and the i18n provider.

```typescript
export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
```
- `async` server component — can `await` things
- `params` is a Promise in Next.js 16 — must be awaited to access `locale`

```typescript
  if (!routing.locales.includes(locale as 'ka' | 'en')) notFound()
```
- Validates the locale parameter — if someone visits `/xx/about`, this returns a 404
- `notFound()` from Next.js throws a special error that renders the 404 page

```typescript
  const [messages, settings] = await Promise.all([getMessages(), getSettings()])
```
- Fetches both translation messages and site settings in parallel
- `getMessages()` — next-intl function, loads the JSON file for the current locale
- `getSettings()` — loads all SiteSetting rows from the database

```typescript
  const whatsapp = s(settings, 'contact.whatsapp', locale)
```
- Gets the WhatsApp number from settings — used for the floating WhatsApp button

```typescript
  return (
    <NextIntlClientProvider messages={messages}>
```
- Wraps the entire page tree in next-intl's context provider
- Makes translations available to all client components via `useTranslations()`
- Without this, client components couldn't call `t('nav.about')` etc.

```typescript
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
```
- Fixed layout: Header → page content → Footer
- `<main>` is semantic HTML — tells screen readers this is the main content area

```typescript
      {process.env.NEXT_PUBLIC_TAWKTO_PROPERTY_ID && (
        <Script id="tawkto" strategy="lazyOnload">{`
          var Tawk_API=...
        `}</Script>
      )}
```
- Conditionally injects the Tawk.to live chat script
- Only if `NEXT_PUBLIC_TAWKTO_PROPERTY_ID` is configured
- `NEXT_PUBLIC_` prefix — Next.js exposes this env var to the client (browser)
- `strategy="lazyOnload"` — Next.js Script strategy: loads after the page is interactive (doesn't block rendering)
- The script is plain JavaScript using Tawk.to's standard embed code

```typescript
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a href={`https://wa.me/${whatsapp}`} ...>
          {/* WhatsApp SVG icon */}
        </a>
        <a href="https://t.me/stratcounselgroup" ...>
          {/* Telegram SVG icon */}
        </a>
      </div>
```
- Two floating contact buttons in the bottom-right corner
- `fixed bottom-6 right-6` — positioned 24px from bottom and right edges
- `z-50` — appears above all other content (z-index 50)
- WhatsApp number comes from the DB via `SiteSetting` — admin can update it
- Telegram handle is hardcoded — would need a code change to update

---

## Admin Layout — `src/app/admin/(protected)/layout.tsx`

Wraps all admin panel pages. The `(protected)` route group means this layout applies without adding a URL segment.

```typescript
export default async function AdminLayout({ children }) {
  const session = await auth()
  if (!session) redirect('/admin/login')
```
- Server-side auth check — the second layer of protection after the middleware
- `auth()` from NextAuth — reads and verifies the JWT session cookie
- If no session: redirects to login (Next.js `redirect()` throws an exception internally)

```typescript
  return (
    <div className="flex min-h-screen bg-bg-alt">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
```
- `flex min-h-screen` — full-height side-by-side layout
- `bg-bg-alt` — light grey background (the admin panel background)
- `AdminSidebar` — the left navigation (client component)
- `flex-1` — main content takes all remaining width after the sidebar
- `p-8` — 32px padding inside the content area
- `overflow-auto` — scrollable if content is taller than viewport

---

## Layout Nesting

```
RootLayout (app/layout.tsx)
  └── LocaleLayout (app/[locale]/layout.tsx)      ← public pages
        └── page content (HomePage, AboutPage, etc.)

RootLayout (app/layout.tsx)
  └── AdminLayout (app/admin/(protected)/layout.tsx)  ← admin pages
        └── admin page content (Dashboard, BlogList, etc.)
```

The `(protected)` group is a Next.js route group — it creates a layout scope without adding to the URL. `/admin/blog` is rendered by `AdminLayout` even though the folder is `admin/(protected)/blog/`.
