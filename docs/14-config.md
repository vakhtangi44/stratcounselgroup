# 14 — Next.js Configuration

**File:** `next.config.ts`

---

## Full File with Line-by-Line Explanation

```typescript
import createNextIntlPlugin from 'next-intl/plugin'
```
- Imports next-intl's Next.js plugin
- This plugin wires up next-intl into the Next.js build pipeline
- It registers the `src/i18n/request.ts` config file so next-intl knows how to resolve locales per request

```typescript
import type { NextConfig } from 'next'
```
- TypeScript type for the Next.js config object — provides autocompletion and type safety

```typescript
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
```
- Creates the next-intl plugin, pointing to the request config file
- This wraps the Next.js config (applied at the bottom)

---

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
```
- Tells Next.js to build a **standalone output** — a self-contained directory with only the files needed to run the app
- Includes: `server.js`, only the used `node_modules`, static assets
- Critical for Docker: the standalone build is much smaller than the full `node_modules`
- The Dockerfile copies `.next/standalone` as the production image — not the entire project

```typescript
  typescript: {
    ignoreBuildErrors: true,
  },
```
- Allows the Docker build to succeed even if there are TypeScript errors
- This is a common pragmatic choice for production deployments — you don't want a minor type error to block a deployment
- ⚠️ **Best practice note:** TypeScript errors should be fixed, not ignored. Consider removing this once the codebase is clean. CI should run `tsc --noEmit` to catch type errors before deployment.

```typescript
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'njvzwzwuqw1rxuff.public.blob.vercel-storage.com',
      },
    ],
  },
```
- Next.js's `<Image>` component only loads images from approved domains (security measure)
- This whitelists the Vercel Blob CDN hostname where uploaded images are stored
- Without this, Next.js would refuse to optimize and serve Blob images
- `protocol: 'https'` — only HTTPS (not HTTP) is allowed

```typescript
  experimental: {},
```
- Empty experimental options object — placeholder for future experimental features
- Currently unused; could be removed without effect

```typescript
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/api/uploads/:path*',
      },
    ]
  },
```
- Rewrites `/uploads/some-file.jpg` to `/api/uploads/some-file.jpg`
- **Note:** This rewrite is likely a leftover from before Vercel Blob was integrated. In the current deployment, Nginx serves `/uploads/` directly from the bind-mounted folder (`./uploads:/app/uploads:ro`), so this rewrite is never actually triggered (Nginx handles the path first).
- Could be removed without affecting production behavior

```typescript
}

export default withNextIntl(nextConfig)
```
- Wraps the config with the next-intl plugin
- `withNextIntl` adds next-intl's internal webpack/turbopack plugins and the i18n routing configuration

---

## `prisma.config.ts`

```typescript
import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  // ...
})
```
- Loads `.env` file variables via `dotenv/config` — used when running Prisma CLI commands
- Prisma CLI needs `DATABASE_URL` to run migrations, generate client, etc.
- This is only used by CLI tools (`npx prisma migrate dev`), not at application runtime

---

## `tsconfig.json` Key Settings

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
- `@/` is an alias for `src/` — used everywhere in the codebase
- `import { db } from '@/lib/db'` instead of `import { db } from '../../../lib/db'`
- Much cleaner and refactoring-safe (moving a file doesn't break all its imports)
