# 02 — Database Schema

**File:** `prisma/schema.prisma`

Prisma is the ORM (Object-Relational Mapper). You write the schema in Prisma's own language and it generates:
1. The SQL migrations (the actual database tables)
2. A TypeScript client (`db.blogPost.findMany()`, etc.)

---

## Top of the file

```prisma
generator client {
  provider = "prisma-client-js"
}
```
- `generator client` — tells Prisma to generate a TypeScript/JavaScript client
- `provider = "prisma-client-js"` — the standard JS client (as opposed to Rust, Python, etc.)
- After any schema change you run `npx prisma generate` to rebuild the client

```prisma
datasource db {
  provider = "postgresql"
}
```
- `datasource db` — defines the database connection
- `provider = "postgresql"` — tells Prisma this is a PostgreSQL database
- The actual connection string comes from `DATABASE_URL` env var at runtime (not hardcoded here)

---

## Model: BlogPost

```prisma
model BlogPost {
  id          Int           @id @default(autoincrement())
```
- `Int` — integer type
- `@id` — this is the primary key
- `@default(autoincrement())` — PostgreSQL auto-assigns 1, 2, 3… on each INSERT

```prisma
  slug        String        @unique
```
- `String` — text type (maps to `TEXT` in PostgreSQL)
- `@unique` — no two posts can have the same slug. Prisma generates a unique index automatically.
- The slug is the URL-friendly identifier: `my-blog-post`

```prisma
  titleKa     String
  titleEn     String
```
- Two title fields — one per language (Georgian and English)
- Both are required (`NOT NULL` in SQL) — you cannot save a post without both titles

```prisma
  contentKa   String        @db.Text
  contentEn   String        @db.Text
```
- `@db.Text` — maps to PostgreSQL's `TEXT` type (unlimited length) instead of `VARCHAR`
- Without `@db.Text`, Prisma would use `VARCHAR` which has size limits
- Blog content can be very long, so `TEXT` is correct here

```prisma
  excerptKa   String
  excerptEn   String
```
- Short summary shown on the blog list page
- Plain `String` (no `@db.Text`) — shorter text, `VARCHAR` is fine

```prisma
  coverImage  String?
```
- `?` makes the field optional (nullable in SQL)
- Stores the URL of the cover image (from Vercel Blob)
- `null` means no image has been uploaded

```prisma
  status      String        @default("draft")
```
- Two possible values: `"draft"` (not visible on site) or `"published"` (visible)
- `@default("draft")` — new posts start as drafts, protecting against accidental publishing

```prisma
  publishedAt DateTime?
```
- Set to the current timestamp when status changes to `"published"`
- Nullable because drafts have no publish date yet
- Used for ordering posts (newest first)

```prisma
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
```
- `createdAt` — set once when the row is created, never changes
- `updatedAt` — automatically updated by Prisma whenever the row is modified
- These are audit fields — useful for debugging "when was this changed?"

```prisma
  authorId    Int?
  author      TeamMember?   @relation(fields: [authorId], references: [id], onDelete: SetNull)
```
- `authorId` — the foreign key column in the database (nullable — a post can have no author)
- `author` — the virtual relation field (not a DB column, used in queries like `include: { author: true }`)
- `onDelete: SetNull` — if the `TeamMember` is deleted, `authorId` becomes `null` instead of deleting the post

```prisma
  tags        BlogPostTag[]
```
- One-to-many relation: one post has many tags
- `BlogPostTag[]` — an array of related tag records

---

## Model: BlogPostTag

```prisma
model BlogPostTag {
  id           Int      @id @default(autoincrement())
  postId       Int
  post         BlogPost @relation(fields: [postId], references: [id], onDelete: Cascade)
  practiceArea String
}
```
- A join/tag table linking posts to practice areas
- `onDelete: Cascade` — when a BlogPost is deleted, all its tags are deleted automatically
- `practiceArea` — stores a slug string like `"corporate-law"` (matches the `PRACTICE_AREAS` constant)
- Why a separate table instead of an array? Because it allows indexed queries like "find all posts tagged with corporate-law"

---

## Model: TeamMember

```prisma
model TeamMember {
  id            Int        @id @default(autoincrement())
  slug          String     @unique
  nameKa        String
  nameEn        String
  titleKa       String     // Job title in Georgian
  titleEn       String     // Job title in English
  gbaNumber     String?    // Georgian Bar Association number (optional)
  photo         String?    // URL to profile photo
  linkedinUrl   String?    // LinkedIn profile URL (added in migration 2)
  shortBioKa    String     // Short bio shown on team list page
  shortBioEn    String
  fullBioKa     String     @db.Text   // Full bio shown on individual profile page
  fullBioEn     String     @db.Text
  practiceAreas String[]   // PostgreSQL array of practice area slugs
  isFeatured    Boolean    @default(false)  // Show on home page?
  order         Int        @default(0)      // Sort order in list
  active        Boolean    @default(true)   // Hidden from site if false
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  posts         BlogPost[] // All blog posts authored by this member
}
```

Key points:
- `practiceAreas String[]` — a native PostgreSQL array. Stores `["corporate-law", "tax-law"]` directly in the column. No join table needed because this is not queried/filtered — it's only displayed.
- `isFeatured` — controls which 3 members appear on the home page team section
- `order` — allows the admin to control the display order without renaming records

---

## Model: Testimonial

```prisma
model Testimonial {
  id           Int      @id @default(autoincrement())
  clientName   String
  quoteKa      String   @db.Text
  quoteEn      String   @db.Text
  rating       Int      @default(5)      // 1-5 stars
  practiceArea String?                   // Optional: which area this testimonial is about
  date         DateTime @default(now())
  active       Boolean  @default(true)
}
```

- `rating` — stored as an integer (1-5). The UI renders it as stars.
- `practiceArea` is nullable — not every testimonial relates to a specific practice area

---

## Model: FAQ

```prisma
model FAQ {
  id           Int      @id @default(autoincrement())
  questionKa   String
  questionEn   String
  answerKa     String   @db.Text
  answerEn     String   @db.Text
  practiceArea String            // Required — every FAQ belongs to a practice area
  order        Int      @default(0)
  active       Boolean  @default(true)
}
```

- Every FAQ must belong to a practice area (used to group FAQs on the FAQ page)
- `order` — within a practice area, FAQs can be sorted

---

## Model: Statistic

```prisma
model Statistic {
  id      Int    @id @default(autoincrement())
  key     String @unique   // e.g. "years_experience"
  labelKa String           // e.g. "გამოცდილების წლები"
  labelEn String           // e.g. "Years of Experience"
  value   String           // e.g. "20"
  suffix  String @default("+")  // e.g. "+" displayed after value
}
```

- `key` is unique — acts like a stable identifier for each stat
- `value` is a `String` not `Int` because it might be "20+" or "1,000" — storing it pre-formatted avoids formatting logic in code
- `suffix` defaults to "+" so stats display as "20+", "500+", etc.

---

## Model: PressItem

```prisma
model PressItem {
  id         Int      @id @default(autoincrement())
  outletName String            // e.g. "Forbes Georgia"
  outletLogo String?           // URL to outlet logo image
  headlineKa String
  headlineEn String
  articleUrl String            // Link to the actual article
  date       DateTime          // Publication date
  active     Boolean  @default(true)
}
```

- Represents a media mention / press coverage item
- `date` is required (not `@default(now())`) — the admin must enter the actual publication date

---

## Model: GlossaryTerm

```prisma
model GlossaryTerm {
  id           Int     @id @default(autoincrement())
  termKa       String
  termEn       String
  definitionKa String  @db.Text
  definitionEn String  @db.Text
  active       Boolean @default(true)
}
```

- Legal glossary — terms with bilingual definitions
- Sorted alphabetically by `termEn` when fetched (see `GET /api/glossary`)

---

## Model: NewsletterSubscriber

```prisma
model NewsletterSubscriber {
  id               Int      @id @default(autoincrement())
  email            String   @unique          // No duplicate subscriptions
  active           Boolean  @default(true)   // false = unsubscribed
  unsubscribeToken String   @unique @default(uuid())  // UUID in the unsubscribe link
  subscribedAt     DateTime @default(now())
}
```

- `unsubscribeToken` — a random UUID generated by PostgreSQL's `uuid()` function
- This token is embedded in every newsletter email: `?token=abc123`
- When someone clicks unsubscribe, the token is looked up and `active` is set to `false`
- Using a token (not an email) means the link works without the user being logged in, and cannot be guessed

---

## Model: SiteSetting

```prisma
model SiteSetting {
  id       Int    @id @default(autoincrement())
  key      String @unique   // e.g. "hero.heading"
  valueKa  String @db.Text  // Georgian value
  valueEn  String @db.Text  // English value
  category String @default("general")  // Groups settings in admin UI
}
```

- A key-value store for all editable site copy
- The admin panel shows these grouped by `category` (e.g. "hero", "contact", "footer")
- `@db.Text` because some values are long HTML strings (rich text heading, footer paragraph)
- The `getSettings()` helper loads all rows into a `Map<key, {ka, en}>` for fast lookups

---

## Model: ContactMessage

```prisma
model ContactMessage {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  phone     String?           // Optional
  subject   String
  message   String   @db.Text
  read      Boolean  @default(false)  // Unread messages show a badge in admin
  createdAt DateTime @default(now())
}
```

- Stores every contact form submission
- `read` allows the admin to track which messages they've seen
- The admin dashboard counts `{ read: false }` messages for the notification badge

---

## Model: AdminUser

```prisma
model AdminUser {
  id           Int       @id @default(autoincrement())
  email        String    @unique
  passwordHash String              // bcrypt hash — NEVER store plain text passwords
  lastLoginAt  DateTime?           // Updated on each login (non-fatal if it fails)
}
```

- Only admin accounts — no public user accounts in this system
- `passwordHash` — the password is hashed with bcrypt before storage. bcrypt is one-way: you can verify a password matches, but you cannot reverse the hash to get the original password.
- `lastLoginAt` is nullable because a newly created admin has never logged in

---

## Model: Advantage

```prisma
model Advantage {
  id            Int     @id @default(autoincrement())
  titleKa       String
  titleEn       String
  descriptionKa String? @db.Text   // Optional longer description
  descriptionEn String? @db.Text
  order         Int     @default(0)
  active        Boolean @default(true)
}
```

- "Why choose us" points shown on the About page
- Description is optional — a title alone is valid

---

## Model: ClientCategory + Client

```prisma
model ClientCategory {
  id       Int      @id @default(autoincrement())
  icon     String   @default("🏢")  // Emoji icon
  labelKa  String
  labelEn  String
  order    Int      @default(0)
  active   Boolean  @default(true)
  clients  Client[]
}

model Client {
  id         Int            @id @default(autoincrement())
  name       String                    // Legacy field (kept for backwards compatibility)
  nameKa     String         @default("")  // Added in migration 7
  nameEn     String         @default("")  // Added in migration 7
  categoryId Int
  category   ClientCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  order      Int            @default(0)
  active     Boolean        @default(true)
}
```

- Two-level structure: categories (e.g. "Government", "Private Sector") contain clients
- `onDelete: Cascade` — deleting a category deletes all its clients
- `name` is the original field. `nameKa`/`nameEn` were added later with safe defaults of `""`

---

## Model: Service + ServiceItem

```prisma
model Service {
  id            Int           @id @default(autoincrement())
  titleKa       String
  titleEn       String
  descriptionKa String        @db.Text
  descriptionEn String        @db.Text
  items         ServiceItem[]
  order         Int           @default(0)
  active        Boolean       @default(true)
}

model ServiceItem {
  id        Int     @id @default(autoincrement())
  textKa    String
  textEn    String
  serviceId Int
  service   Service @relation(fields: [serviceId], references: [id], onDelete: Cascade)
  order     Int     @default(0)
}
```

- Two-level structure: services have bullet-point items
- `onDelete: Cascade` — deleting a service deletes all its items
- `ServiceItem` has no `active` field — items are always visible if their parent service is active
