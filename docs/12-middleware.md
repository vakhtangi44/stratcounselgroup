# 12 — Middleware (Routing Proxy)

**File:** `src/proxy.ts`

This is the Next.js middleware — code that runs on every request BEFORE it reaches any page or API route. It handles two jobs: protecting the admin area and setting the locale.

> **Note:** The file is named `proxy.ts` and exports `proxy` (not the conventional `middleware.ts` / `export default middleware`). This works because `next.config.ts` or the runtime picks it up via the exported function name.

---

## Full File with Line-by-Line Explanation

```typescript
import { NextResponse } from 'next/server'
```
- `NextResponse` — used to create HTTP responses from middleware
- Key methods: `NextResponse.next()` (continue), `NextResponse.redirect(url)` (redirect)

```typescript
import type { NextRequest } from 'next/server'
```
- `NextRequest` — the type of the incoming request object
- `import type` — TypeScript-only import (zero runtime cost, just for types)

```typescript
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
```
- `createMiddleware` from next-intl handles locale detection and URL rewriting
- `routing` contains the locale config (which locales exist, which is default, prefix strategy)

```typescript
import { auth } from './lib/auth'
```
- NextAuth's `auth` function — when used as middleware, it wraps a handler and provides `req.auth`

---

```typescript
const handleI18n = createMiddleware(routing)
```
- Creates the i18n middleware configured with the routing settings
- This middleware:
  1. Detects the user's preferred locale from URL, cookie, or Accept-Language header
  2. Rewrites the URL internally: `/about` → `/ka/about`, `/en/about` → `/en/about`
  3. Sets the `NEXT_LOCALE` cookie

---

```typescript
const handleAuth = auth((req) => {
```
- Wraps a handler function with NextAuth's session checking
- `req.auth` is added to the request — it's the session object or `null`

```typescript
  const { pathname } = req.nextUrl
```
- Extracts the pathname from the request URL
- `req.nextUrl` is Next.js's extended URL object (has locale info, etc.)

```typescript
  if (pathname === '/admin/login' || pathname.endsWith('/admin/login')) {
    return NextResponse.next()
  }
```
- The login page must be accessible without a session — otherwise nobody could log in
- Two checks because the URL might be `/admin/login` or something ending in `/admin/login`
- `NextResponse.next()` means "continue normally, don't redirect"

```typescript
  if (!req.auth) {
    const loginUrl = new URL('/admin/login', req.url)
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }
```
- `req.auth` is `null` if no valid session exists
- Creates a redirect URL: `/admin/login?callbackUrl=/admin/blog`
- `callbackUrl` — after successful login, NextAuth redirects back to this URL
- This gives a smooth UX: visiting `/admin/blog` while logged out → logs in → lands on `/admin/blog`

```typescript
  return NextResponse.next()
})
```
- Session is valid: continue to the page normally

---

```typescript
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    return handleAuth(request, {} as never)
  }

  return handleI18n(request)
}
```
- This is the main middleware function exported as `proxy`
- **Admin routes** (`/admin/*`): run the auth check
- **Everything else**: run the i18n middleware
- Clean separation — auth and i18n never interfere with each other
- `{} as never` — TypeScript workaround for the `handleAuth` call signature (second param type mismatch)

---

```typescript
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
```
- `matcher` tells Next.js which URLs this middleware runs on
- This regex EXCLUDES:
  - `api` — API routes don't need locale detection or auth middleware (they handle auth themselves)
  - `_next` — Next.js internal routes (static files, hot reload, etc.)
  - `_vercel` — Vercel internal routes
  - `.*\\..*` — any path with a file extension (`.js`, `.css`, `.png`, etc.) — static files
- Everything else: the middleware runs on every page request

---

## Request Flow Diagram

```
Request comes in
    │
    ▼
Does pathname match middleware? (not api, _next, static)
    │ Yes
    ▼
Does pathname start with /admin?
    ├── Yes → handleAuth
    │           ├── pathname === /admin/login? → NextResponse.next()
    │           ├── no session? → redirect /admin/login?callbackUrl=...
    │           └── has session? → NextResponse.next()
    └── No  → handleI18n
                ├── detect locale from URL/cookie/headers
                ├── rewrite URL internally
                └── set NEXT_LOCALE cookie
```

---

## Why Two Auth Checks?

The middleware checks the session, AND the admin layout ALSO checks the session:

```typescript
// middleware (src/proxy.ts) — fast, runs before the page
if (!req.auth) redirect to login

// layout (src/app/admin/(protected)/layout.tsx) — server-side, runs during rendering
const session = await auth()
if (!session) redirect('/admin/login')
```

This is belt-and-suspenders security. The middleware is the primary guard. The layout is the fallback in case:
- The middleware is misconfigured
- A new admin route is added that somehow bypasses the matcher
- A future Next.js update changes middleware behavior

Having both means a security regression in one layer doesn't expose the admin.
