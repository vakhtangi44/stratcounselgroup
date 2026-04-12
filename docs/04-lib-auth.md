# 04 — Authentication

**File:** `src/lib/auth.ts`

This file configures NextAuth v5, which handles admin login, session management, and the `auth()` helper used throughout the app.

---

## Full File with Line-by-Line Explanation

```typescript
import NextAuth from 'next-auth'
```
- Imports the NextAuth factory function
- NextAuth v5 exports a single function that you configure and call once

```typescript
import Credentials from 'next-auth/providers/credentials'
```
- `Credentials` is a NextAuth "provider" — it handles username/password login
- Other providers would be OAuth (Google, GitHub, etc.) — we don't use those here
- Using Credentials means WE are responsible for verifying the password

```typescript
import bcrypt from 'bcryptjs'
```
- `bcryptjs` is a pure-JavaScript bcrypt library
- bcrypt is a password hashing algorithm designed to be slow (to resist brute-force attacks)
- It hashes passwords one-way: you cannot reverse a bcrypt hash to get the original password
- Verification works by hashing the input and comparing to the stored hash

```typescript
import { db } from './db'
```
- Imports the shared Prisma client singleton
- Used to look up the admin user by email

---

```typescript
export const { handlers, auth, signIn, signOut } = NextAuth({
```
- Calls `NextAuth()` with a config object
- Destructures four exports from the result:
  - `handlers` — the `{ GET, POST }` route handlers for `api/auth/[...nextauth]`
  - `auth` — async function that returns the current session (usable anywhere — server components, API routes, middleware)
  - `signIn` — programmatic sign-in function
  - `signOut` — programmatic sign-out function

---

```typescript
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
```
- `credentials` describes the form fields NextAuth will expect
- `label` is displayed in NextAuth's built-in UI (we don't use the built-in UI, but it's good documentation)
- `type: 'email'` and `type: 'password'` are standard HTML input types

```typescript
      async authorize(credentials) {
```
- `authorize` is called when someone submits the login form
- `credentials` contains whatever was submitted in the form
- Must return a user object (to log in) or `null` (to reject)

```typescript
        if (!credentials?.email || !credentials?.password) return null
```
- Guard clause: if either field is empty/missing, immediately reject
- The `?.` optional chaining handles the case where `credentials` itself is undefined

```typescript
        const admin = await db.adminUser.findUnique({
          where: { email: credentials.email as string },
        })
```
- Looks up the admin by email in the database
- `findUnique` returns `null` if not found (no error thrown)
- `as string` type cast — Prisma expects a string, but NextAuth types credentials as `unknown`

```typescript
        if (!admin) return null
```
- If no admin with that email exists, reject the login
- We return `null` instead of throwing an error to avoid leaking information about which emails exist

```typescript
        const valid = await bcrypt.compare(
          credentials.password as string,
          admin.passwordHash
        )
```
- `bcrypt.compare(plaintext, hash)` — hashes the submitted password and compares it to the stored hash
- Returns `true` if they match, `false` if not
- This is the only correct way to verify a bcrypt password — never decrypt, always compare

```typescript
        if (!valid) return null
```
- Wrong password — reject the login

```typescript
        try {
          await db.adminUser.update({
            where: { id: admin.id },
            data: { lastLoginAt: new Date() },
          })
        } catch {
          // non-fatal: audit write failed, login still succeeds
        }
```
- Updates `lastLoginAt` so the admin can see when they last logged in
- Wrapped in `try/catch` because this is an audit log — if it fails (e.g., DB timeout), the login should still succeed
- Silencing this error is intentional: the comment explains why

```typescript
        return { id: String(admin.id), email: admin.email }
```
- Returns the user object — this gets encoded into the JWT
- `id` must be a string (NextAuth requirement)
- Only include what you need in the token — don't include `passwordHash`

---

```typescript
  pages: {
    signIn: '/admin/login',
  },
```
- Tells NextAuth to use our custom login page instead of its built-in one
- When NextAuth redirects to login, it goes to `/admin/login`

---

```typescript
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
```
- `strategy: 'jwt'` — session data is stored in a signed cookie (JWT), not in the database
  - Advantage: no database lookups on every request
  - The cookie is cryptographically signed with `NEXTAUTH_SECRET`, so it can't be tampered with
- `maxAge: 86400` — the session expires after 24 hours of inactivity
  - `24 * 60 * 60` is more readable than the magic number `86400`
  - After 24 hours, the admin must log in again

---

## How auth() is Used

```typescript
// In a server component (layout, page):
const session = await auth()
if (!session) redirect('/admin/login')

// In an API route:
const session = await auth()
if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
```

The `auth()` function reads the JWT from the cookie, verifies its signature, and returns the session object. If the cookie is missing or tampered with, it returns `null`.

---

## Security Notes

- **Passwords are never stored in plaintext** — only bcrypt hashes
- **Sessions are JWT** — stored in an httpOnly cookie (not accessible to JavaScript)
- **Double protection** — both middleware and the admin layout check the session
- **No public accounts** — this auth system is admin-only
- **CAPTCHA** is NOT used on the admin login page (it's rate-limited by Nginx instead — 10 req/min)
