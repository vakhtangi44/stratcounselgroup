# 20 — Deployment

The project is deployed with Docker Compose — a set of containers managed together. There is no CI/CD pipeline; deployment is manual.

---

## Dockerfile — Multi-Stage Build

**File:** `Dockerfile`

Multi-stage builds produce small final images by separating build tools from runtime.

### Stage 1: `deps`
```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci
```
- `node:20-alpine` — Node.js 20 on Alpine Linux (tiny ~5MB base image vs ~900MB for full Ubuntu)
- `AS base` and `AS deps` — named stages, referenced by later stages
- `COPY package*.json ./` — copies `package.json` AND `package-lock.json`
- `npm ci` — "clean install" — installs exact versions from `package-lock.json`, deletes `node_modules` first
  - Faster and more reliable than `npm install` for CI/Docker
  - Fails if `package-lock.json` is missing or out of sync

### Stage 2: `builder`
```dockerfile
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build
```
- `COPY --from=deps` — copies `node_modules` from the `deps` stage (reuses the npm install)
- `COPY . .` — copies all project files (respects `.dockerignore`)
- `npx prisma generate` — generates the Prisma TypeScript client from the schema
  - Must run before `next build` because the Next.js app imports from `@prisma/client`
- `npm run build` — runs `prisma generate && next build` (see `package.json`)
  - `next build` compiles TypeScript, bundles JavaScript, creates the standalone output

### Stage 3: `runner` (production image)
```dockerfile
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
```
- Starts fresh from the base image — no build tools, no source code, no full `node_modules`
- `NODE_ENV=production` — enables production optimizations in Node.js and React

```dockerfile
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
```
- Creates a non-root user `nextjs` in the `nodejs` group
- **Security best practice:** never run production processes as root
- `--system` — creates a system account (no home directory, no shell)
- `--gid 1001` / `--uid 1001` — fixed IDs for consistency

```dockerfile
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
```
- `public/` — static assets served by Next.js
- `.next/standalone` — the self-contained server (`server.js` + minimal `node_modules`)
- `.next/static` — compiled JS/CSS bundles (client-side assets)
- `prisma/` — schema and migrations (needed for `prisma migrate deploy` at startup)
- `node_modules/.prisma` — the generated Prisma client native binaries
- `--chown=nextjs:nodejs` — the nextjs user owns these files

```dockerfile
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```
- Switches to the non-root user
- `EXPOSE 3000` — documents that the container listens on port 3000 (doesn't actually open the port)
- `HOSTNAME="0.0.0.0"` — binds to all network interfaces (required in Docker)
- `node server.js` — starts the Next.js standalone server directly (no `npm`, no `next start`)

---

## docker-compose.yml — Service Orchestration

### Service: `postgres`
```yaml
image: postgres:16-alpine
environment:
  POSTGRES_USER: stratcounsel
  POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
  POSTGRES_DB: stratcounsel
volumes:
  - postgres_data:/var/lib/postgresql/data
networks:
  - internal
```
- Uses PostgreSQL 16 (Alpine variant — smaller)
- `postgres_data` is a named Docker volume — data persists when the container is stopped/restarted
- Only on the `internal` network — NOT accessible from outside Docker (only `app` and `backup` can reach it)

### Service: `app`
```yaml
build: .
env_file: .env
environment:
  DATABASE_URL: postgresql://stratcounsel:${POSTGRES_PASSWORD}@postgres:5432/stratcounsel
volumes:
  - ./uploads:/app/uploads
networks:
  - internal
  - web
```
- Built from the `Dockerfile` in the current directory
- `env_file: .env` — loads all variables from `.env` file
- `DATABASE_URL` is overridden to use the Docker service hostname `postgres` (not `localhost`)
- `./uploads:/app/uploads` — bind mount: the `./uploads` folder on the host is accessible inside the container
- On both networks: `internal` (to reach postgres) and `web` (to be reached by nginx)

### Service: `nginx`
```yaml
image: nginx:alpine
ports:
  - "80:80"
  - "443:443"
volumes:
  - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
  - certbot_www:/var/www/certbot
  - certbot_conf:/etc/letsencrypt
  - ./uploads:/app/uploads:ro
networks:
  - web
```
- The only service with publicly exposed ports (80 and 443)
- `:ro` — mounts are read-only inside the container (nginx can't modify the files)
- `certbot_www` — shared volume for ACME challenge files (Let's Encrypt verification)
- `certbot_conf` — shared volume for SSL certificates
- `./uploads:/app/uploads:ro` — serves uploaded images directly (bypasses Next.js)

### Service: `certbot`
```yaml
image: certbot/certbot
entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
```
- Automatically renews Let's Encrypt SSL certificates
- Runs `certbot renew` every 12 hours
- `trap exit TERM` — gracefully shuts down when Docker sends SIGTERM
- `sleep 12h & wait $${!}` — sleeps 12 hours, but the `& wait` allows it to wake on SIGTERM
- Certificates expire every 90 days; renewing every 12h means they're renewed well before expiry

### Service: `backup`
```yaml
entrypoint: >
  /bin/sh -c "
  while true; do
    sleep 86400;
    PGPASSWORD=$$POSTGRES_PASSWORD pg_dump -h postgres -U stratcounsel stratcounsel |
    gzip > /backups/backup-$$(date +%Y%m%d).sql.gz;
    find /backups -name '*.sql.gz' -mtime +7 -delete;
  done"
```
- Runs `pg_dump` every 24 hours (86400 seconds)
- `pg_dump` creates a complete database dump
- Pipes directly to `gzip` — compressed on-the-fly, no temp file
- Filename: `backup-20260322.sql.gz`
- Deletes backups older than 7 days (`-mtime +7`)
- Keeps 7 days of rolling backups on the host in `./backups/`

### Networks
```yaml
networks:
  internal:
    driver: bridge
  web:
    driver: bridge
```
- `internal` — postgres, app, backup (no internet access)
- `web` — nginx, app (internet-facing)
- PostgreSQL is only on `internal` — cannot be reached from outside Docker
- This is network segmentation: if nginx is compromised, the attacker can't directly hit postgres

---

## nginx.conf — Reverse Proxy

### HTTP Server (port 80)
```nginx
location /.well-known/acme-challenge/ {
    root /var/www/certbot;
}
location / {
    return 301 https://$host$request_uri;
}
```
- ACME challenge files are served for Let's Encrypt certificate issuance/renewal
- All other HTTP traffic is permanently redirected to HTTPS (301 redirect)

### HTTPS Server (port 443)
```nginx
ssl_certificate /etc/letsencrypt/live/stratcounselgroup.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/stratcounselgroup.com/privkey.pem;
```
- Let's Encrypt certificate files (managed by certbot service)

**Security Headers:**
```nginx
add_header X-Frame-Options "SAMEORIGIN";
```
- Prevents the site from being embedded in an `<iframe>` on other domains (clickjacking protection)
- `SAMEORIGIN` — allows iframes from the same origin (not used here, but safe)

```nginx
add_header X-Content-Type-Options "nosniff";
```
- Prevents browsers from guessing/sniffing the content type
- Without this, a browser might execute a JavaScript file if it looks like JS, even if served as text/plain

```nginx
add_header Referrer-Policy "strict-origin-when-cross-origin";
```
- Controls how much of the URL is sent in the `Referer` header
- Cross-origin requests: only the origin (domain), not the full path

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```
- HSTS: tells browsers to ALWAYS use HTTPS for this domain for 1 year
- Even if someone types `http://`, the browser automatically upgrades to `https://`
- `includeSubDomains` — applies to subdomains too
- `always` — send this header on all responses including error pages

**Rate Limiting:**
```nginx
limit_req_zone $binary_remote_addr zone=contact:10m rate=5r/m;
limit_req_zone $binary_remote_addr zone=newsletter:10m rate=10r/m;
limit_req_zone $binary_remote_addr zone=admin_login:10m rate=10r/m;
```
- Creates rate limit zones keyed by IP address (`$binary_remote_addr`)
- `zone=contact:10m` — 10MB of memory for the contact zone (stores ~160,000 IPs)
- `rate=5r/m` — max 5 requests per minute per IP

```nginx
location /api/contact {
    limit_req zone=contact burst=2 nodelay;
    ...
}
```
- Applies the rate limit to `/api/contact`
- `burst=2` — allows a burst of 2 extra requests before rate limiting kicks in
- `nodelay` — burst requests are processed immediately (not queued)

**Upload/static serving:**
```nginx
location /uploads/ {
    alias /app/uploads/;
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}
```
- Nginx serves uploaded files directly (bypasses the Node.js app entirely — faster)
- `expires 1y` + `Cache-Control: public, immutable` — CDN and browser cache forever
- `immutable` tells browsers never to revalidate (files are UUIDs — content never changes)
- `access_log off` — don't log static file requests (reduces log noise)

**Proxy to Next.js:**
```nginx
location / {
    proxy_pass http://app:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```
- Forwards all unmatched requests to the Next.js app
- `Host` — the original hostname (needed for Next.js redirects and canonical URLs)
- `X-Real-IP` — the real client IP (the app sees nginx's IP otherwise)
- `X-Forwarded-For` — chain of proxy IPs
- `X-Forwarded-Proto` — `https` or `http` (app needs to know TLS is handled by nginx)

---

## Deployment Commands

```bash
# First deployment (on the server):
git clone https://... stratcounselgroup
cd stratcounselgroup

# Create .env file with all required variables

# Get SSL certificate first (before starting nginx in HTTPS mode):
docker run -it --rm \
  -v ./certbot_conf:/etc/letsencrypt \
  -v ./certbot_www:/var/www/certbot \
  certbot/certbot certonly --webroot \
  --webroot-path /var/www/certbot \
  -d stratcounselgroup.com -d www.stratcounselgroup.com

# Start all services:
docker-compose up -d --build

# Run database migrations:
docker-compose exec app npx prisma migrate deploy

# Seed initial data (first time only):
docker-compose exec app npx ts-node prisma/seed.ts

# Update to latest code:
git pull
docker-compose up -d --build app
docker-compose exec app npx prisma migrate deploy
```

---

## Environment Variables on the Server

The `.env` file on the server (NOT in git) should contain:

```env
POSTGRES_PASSWORD=<strong-random-password>
DATABASE_URL=postgresql://stratcounsel:<password>@postgres:5432/stratcounsel
NEXTAUTH_SECRET=<32+-char-random-string>
NEXTAUTH_URL=https://stratcounselgroup.com
GMAIL_USER=info@stratcounselgroup.com
GMAIL_APP_PASSWORD=<16-char-app-password>
BLOB_READ_WRITE_TOKEN=<vercel-blob-token>
CLOUDFLARE_TURNSTILE_SECRET_KEY=<turnstile-secret>
NEXT_PUBLIC_TAWKTO_PROPERTY_ID=<tawkto-id>
```
