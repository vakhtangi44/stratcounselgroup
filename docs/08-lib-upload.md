# 08 — File Upload

**File:** `src/lib/upload.ts`

Handles image uploads to Vercel Blob storage. Validates both the file type (declared MIME) and the actual file content (magic bytes) to prevent malicious uploads.

---

## Full File with Line-by-Line Explanation

```typescript
import { put } from '@vercel/blob'
```
- `put` is the Vercel Blob upload function
- Uploads a file to Vercel's CDN and returns the public URL
- `@vercel/blob` is Vercel's first-party file storage service

```typescript
import { v4 as uuidv4 } from 'uuid'
```
- Imports the UUID v4 generator
- `v4` generates a random UUID like `550e8400-e29b-41d4-a716-446655440000`
- Used to generate unique filenames (prevents collisions and enumeration)

---

```typescript
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
```
- Whitelist of accepted image types
- Only JPEG, PNG, and WebP — no GIF (can contain animation), no SVG (can contain scripts), no TIFF

```typescript
const MAX_FILE_SIZE = 5 * 1024 * 1024
```
- Maximum file size: 5 MB
- `5 * 1024 * 1024` = 5,242,880 bytes
- Written as math expression for clarity (`5 * 1024 * 1024` is more readable than `5242880`)

---

```typescript
const MAGIC_BYTES: Record<string, number[][]> = {
  'image/jpeg': [[0xFF, 0xD8, 0xFF]],
  'image/png':  [[0x89, 0x50, 0x4E, 0x47]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]],
}
```
- **Magic bytes** are the first few bytes of a file that identify its true format
- Every file format starts with a known signature:
  - JPEG: `FF D8 FF` (first 3 bytes)
  - PNG: `89 50 4E 47` = `\x89PNG` (first 4 bytes)
  - WebP: `52 49 46 46` = `RIFF` (first 4 bytes — WebP is a RIFF container)
- The structure is `Record<mimeType, signatures[][]>` — a type can have multiple valid signatures (e.g., JPEG variants)
- `number[][]` — array of signatures, each signature is an array of byte values

**Why this matters:** A user could rename `malware.php` to `photo.jpg` and change its MIME type to `image/jpeg`. Without magic byte checking, the server would accept it. With magic byte checking, the actual file content is verified, not just the declared type.

---

```typescript
function detectMimeType(buffer: Buffer): string | null {
  for (const [mime, signatures] of Object.entries(MAGIC_BYTES)) {
    for (const sig of signatures) {
      if (sig.every((byte, i) => buffer[i] === byte)) return mime
    }
  }
  return null
}
```
- Reads the first few bytes of the file and matches against known signatures
- `Object.entries(MAGIC_BYTES)` — iterates over `['image/jpeg', [[0xFF, 0xD8, 0xFF]]]`, etc.
- `sig.every((byte, i) => buffer[i] === byte)` — checks that every byte in the signature matches the buffer at the same position
- If all bytes match: return the detected MIME type
- If nothing matches: return `null` (unknown or unsupported format)

---

```typescript
export async function saveUploadedFile(
  file: File,
  folder: 'blog' | 'team' | 'press'
): Promise<string> {
```
- Takes a `File` object (from the browser's FormData) and a folder name
- `folder` is a union type — only `'blog'`, `'team'`, or `'press'` are valid values
- Returns a Promise that resolves to the public URL of the uploaded file

```typescript
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WebP allowed.')
  }
```
- First check: the browser-declared MIME type (from `Content-Type` in the upload)
- This is a quick pre-check — fast to fail early without reading the file

```typescript
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large. Max 5MB.')
  }
```
- Size check before reading the file into memory
- Avoids loading a 100MB file into RAM just to reject it

```typescript
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
```
- Reads the entire file into memory as a `Buffer` (Node.js binary data)
- `arrayBuffer()` reads the file asynchronously
- `Buffer.from(bytes)` converts the `ArrayBuffer` to a Node.js `Buffer` for byte-level access

```typescript
  const detectedMime = detectMimeType(buffer)
  if (!detectedMime || !ALLOWED_MIME_TYPES.includes(detectedMime)) {
    throw new Error('File content does not match allowed image types.')
  }
```
- Second check: actual file content via magic bytes
- If the declared MIME is `image/jpeg` but the magic bytes say `RIFF` (WebP), this catches it
- If the magic bytes don't match any known format, also rejects

```typescript
  const ext = file.type === 'image/jpeg' ? 'jpg' : file.type === 'image/png' ? 'png' : 'webp'
```
- Determines the file extension from the declared MIME type
- Uses the standard extension for each type: `.jpg` (not `.jpeg`), `.png`, `.webp`
- This is a ternary chain: if jpeg → 'jpg', else if png → 'png', else 'webp'

```typescript
  const filename = `${folder}/${uuidv4()}.${ext}`
```
- Constructs the storage path: e.g., `blog/550e8400-e29b-41d4-a716-446655440000.jpg`
- The UUID ensures uniqueness — re-uploading the same file creates a new URL
- Organized by folder: `blog/`, `team/`, `press/`

```typescript
  const blob = await put(filename, buffer, {
    access: 'public',
    addRandomSuffix: false,
    contentType: file.type,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })
```
- Uploads the file to Vercel Blob
- `access: 'public'` — the file is publicly accessible via its URL (required for displaying images on the site)
- `addRandomSuffix: false` — don't add Vercel's own random suffix (we already have a UUID)
- `contentType: file.type` — sets the correct `Content-Type` header on the CDN
- `token` — the Vercel Blob API key from environment variables

```typescript
  return blob.url
}
```
- Returns the CDN URL like `https://njvzwzwuqw1rxuff.public.blob.vercel-storage.com/blog/uuid.jpg`
- This URL is stored in the database (`coverImage`, `photo`, `outletLogo` fields)

---

## Where Uploads Are Used

The `POST /api/upload` endpoint calls this function:

```typescript
// src/app/api/upload/route.ts
const url = await saveUploadedFile(file, folder)
return NextResponse.json({ url })
```

The admin's `ImageUpload` component posts a form to this endpoint and receives back the URL, which is then stored in the relevant field.

---

## Security Summary

| Check | What it catches |
|---|---|
| MIME type check | Wrong file type declared in browser |
| Size check | Large files (before reading into memory) |
| Magic bytes check | Files disguised with wrong extension |
| Folder whitelist | Arbitrary path injection |
| Auth check in route | Unauthenticated uploads |
| `BLOB_READ_WRITE_TOKEN` check | Missing config (returns clear error) |
