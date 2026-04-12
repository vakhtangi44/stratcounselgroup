# 03 — Migrations

**Folder:** `prisma/migrations/`

Migrations are the **version history of the database schema**. Each migration is a SQL file that transforms the database from one state to the next. Prisma generates them automatically when you change `schema.prisma`.

---

## ⚠️ THE GOLDEN RULE

> **New migrations must NEVER delete, overwrite, or change data entered by the admin panel.**

Admin-entered data (blog posts, team members, settings, testimonials, etc.) is **live production content**. A migration that drops a column or changes a type could silently destroy data that took hours to enter.

### What is SAFE in a migration

```sql
-- ✅ Adding a new table
CREATE TABLE "NewFeature" (...);

-- ✅ Adding a nullable column (existing rows get NULL, no data lost)
ALTER TABLE "BlogPost" ADD COLUMN "viewCount" INTEGER;

-- ✅ Adding a column with a DEFAULT (existing rows get the default, no data lost)
ALTER TABLE "Client" ADD COLUMN "nameKa" TEXT NOT NULL DEFAULT '';

-- ✅ Adding an index
CREATE INDEX "BlogPost_status_idx" ON "BlogPost"("status");

-- ✅ Adding a unique constraint (only safe if data is already unique)
CREATE UNIQUE INDEX "Statistic_key_key" ON "Statistic"("key");
```

### What is DANGEROUS — never do this

```sql
-- ❌ Drops the column and ALL its data permanently
ALTER TABLE "BlogPost" DROP COLUMN "titleKa";

-- ❌ Drops the table and ALL rows
DROP TABLE "BlogPost";

-- ❌ Changes the type — can fail or silently truncate data
ALTER TABLE "BlogPost" ALTER COLUMN "status" TYPE BOOLEAN;

-- ❌ Deletes rows
DELETE FROM "BlogPost" WHERE status = 'draft';

-- ❌ Overwrites existing values
UPDATE "TeamMember" SET "linkedinUrl" = '' WHERE "linkedinUrl" IS NULL;
```

### The rename problem

You cannot rename a column safely in a single migration. The right approach is:

**Phase 1 (migration):** Add the new column with the old data as default
```sql
ALTER TABLE "BlogPost" ADD COLUMN "titleGeorgian" TEXT NOT NULL DEFAULT '';
```

**Phase 2 (script, NOT migration):** Copy data from old to new
```sql
UPDATE "BlogPost" SET "titleGeorgian" = "titleKa";
```

**Phase 3 (later migration, after verifying):** Drop old column only after confirming
```sql
-- Only do this after the app no longer reads from the old column
ALTER TABLE "BlogPost" DROP COLUMN "titleKa";
```

---

## Migration History

### Migration 1: `20260322095146_init`

The initial migration — creates the entire base schema.

**Tables created:**
- `BlogPost` — with all bilingual fields, status, publishedAt, authorId
- `BlogPostTag` — foreign key to BlogPost with CASCADE delete
- `TeamMember` — full lawyer profile
- `Testimonial` — client quotes with rating
- `FAQ` — questions and answers
- `Statistic` — key-value stats
- `PressItem` — media mentions
- `GlossaryTerm` — legal glossary
- `NewsletterSubscriber` — email list with unsubscribe token
- `ContactMessage` — contact form submissions
- `AdminUser` — admin accounts

**Indexes created:**
- `BlogPost_slug_key` — unique index on slug (fast URL lookups)
- `TeamMember_slug_key` — unique index on slug
- `Statistic_key_key` — unique index on key
- `NewsletterSubscriber_email_key` — unique index on email
- `NewsletterSubscriber_unsubscribeToken_key` — unique index on token
- `AdminUser_email_key` — unique index on email

**Foreign keys:**
- `BlogPost.authorId → TeamMember.id` with `ON DELETE SET NULL`
- `BlogPostTag.postId → BlogPost.id` with `ON DELETE CASCADE`

**Safety rating: ✅ Safe** — This is the initial migration; no existing data to protect.

---

### Migration 2: `20260322160257_add_linkedin_to_team_member`

```sql
ALTER TABLE "TeamMember" ADD COLUMN "linkedinUrl" TEXT;
```

- Adds `linkedinUrl` to `TeamMember`
- It's `TEXT` (nullable) — existing rows get `NULL`, which is fine
- No existing data is changed

**Safety rating: ✅ Safe** — Additive nullable column.

---

### Migration 3: `20260322161824_add_advantage_model`

```sql
CREATE TABLE "Advantage" (
    "id" SERIAL NOT NULL,
    "titleKa" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionKa" TEXT,
    "descriptionEn" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "Advantage_pkey" PRIMARY KEY ("id")
);
```

- Adds a brand new table
- No existing tables or data are touched

**Safety rating: ✅ Safe** — New table only.

---

### Migration 4: `20260322162504_add_client_models`

```sql
CREATE TABLE "ClientCategory" (...);
CREATE TABLE "Client" (...);
ALTER TABLE "Client" ADD CONSTRAINT "Client_categoryId_fkey"
  FOREIGN KEY ("categoryId") REFERENCES "ClientCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

- Adds two new tables: `ClientCategory` and `Client`
- Establishes the foreign key relationship

**Safety rating: ✅ Safe** — New tables only.

---

### Migration 5: `20260322163222_add_site_settings`

```sql
CREATE TABLE "SiteSetting" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "valueKa" TEXT NOT NULL,
    "valueEn" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'general',
    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "SiteSetting_key_key" ON "SiteSetting"("key");
```

- Adds the settings table
- Unique index on `key` ensures no duplicate setting keys

**Safety rating: ✅ Safe** — New table only.

---

### Migration 6: `20260322191639_add_services`

```sql
CREATE TABLE "Service" (...);
CREATE TABLE "ServiceItem" (...);
ALTER TABLE "ServiceItem" ADD CONSTRAINT "ServiceItem_serviceId_fkey"
  FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

- Adds `Service` and `ServiceItem` tables

**Safety rating: ✅ Safe** — New tables only.

---

### Migration 7: `20260322203143_add_bilingual_client_names`

```sql
ALTER TABLE "Client"
  ADD COLUMN "nameEn" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "nameKa" TEXT NOT NULL DEFAULT '';
```

- Adds bilingual name fields to existing `Client` rows
- `DEFAULT ''` means existing clients get empty strings — not null, not deleted
- The original `name` column is kept untouched

**Safety rating: ✅ Safe** — Additive columns with safe defaults.

---

## How to Create a New Migration

1. **Edit `prisma/schema.prisma`** — add your new field or table
2. **Run:** `npx prisma migrate dev --name describe_your_change`
3. **Review the generated SQL** in `prisma/migrations/[timestamp]_[name]/migration.sql`
4. **Check it against the safety rules above** before committing

If the generated SQL contains a `DROP` or `DELETE`, stop and reconsider your approach.

---

## Useful Prisma Commands

```bash
# Generate TypeScript client (after schema change)
npx prisma generate

# Create a new migration (development)
npx prisma migrate dev --name my_change

# Apply pending migrations (production)
npx prisma migrate deploy

# Open Prisma Studio (visual DB browser)
npx prisma studio

# Reset and reseed DB (DANGER: wipes all data — dev only)
npx prisma migrate reset
```

---

## Migration Lock File

`prisma/migrations/migration_lock.toml` records which database provider is in use:

```toml
provider = "postgresql"
```

This prevents accidentally running PostgreSQL migrations against a SQLite database (or vice versa).
