import { put } from '@vercel/blob'
import { v4 as uuidv4 } from 'uuid'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 5 * 1024 * 1024

const MAGIC_BYTES: Record<string, number[][]> = {
  'image/jpeg': [[0xFF, 0xD8, 0xFF]],
  'image/png':  [[0x89, 0x50, 0x4E, 0x47]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]],
}

function detectMimeType(buffer: Buffer): string | null {
  for (const [mime, signatures] of Object.entries(MAGIC_BYTES)) {
    for (const sig of signatures) {
      if (sig.every((byte, i) => buffer[i] === byte)) return mime
    }
  }
  return null
}

export async function saveUploadedFile(
  file: File,
  folder: 'blog' | 'team' | 'press' | 'services' | 'logo'
): Promise<string> {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only JPEG, PNG, WebP allowed.')
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large. Max 5MB.')
  }
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const detectedMime = detectMimeType(buffer)
  if (!detectedMime || !ALLOWED_MIME_TYPES.includes(detectedMime)) {
    throw new Error('File content does not match allowed image types.')
  }
  const ext = file.type === 'image/jpeg' ? 'jpg' : file.type === 'image/png' ? 'png' : 'webp'
  const filename = `${folder}/${uuidv4()}.${ext}`

  const blob = await put(filename, buffer, {
    access: 'public',
    addRandomSuffix: false,
    contentType: file.type,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })

  return blob.url
}

const MAX_PDF_SIZE = 20 * 1024 * 1024 // 20MB

/** Upload a PDF document to Vercel Blob. Admin-only. Validates the %PDF magic header. */
export async function saveUploadedPdf(file: File): Promise<string> {
  if (file.type !== 'application/pdf') {
    throw new Error('Invalid file type. Only PDF allowed.')
  }
  if (file.size > MAX_PDF_SIZE) {
    throw new Error('File too large. Max 20MB.')
  }
  const buffer = Buffer.from(await file.arrayBuffer())
  // PDF files start with "%PDF"
  const isPdf = buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46
  if (!isPdf) {
    throw new Error('File content does not match a valid PDF.')
  }
  const filename = `blog-pdf/${uuidv4()}.pdf`

  const blob = await put(filename, buffer, {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/pdf',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })

  return blob.url
}

const ALLOWED_VIDEO_TYPES: Record<string, string> = {
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/ogg': 'ogv',
  'video/quicktime': 'mov',
}
const MAX_VIDEO_SIZE = 100 * 1024 * 1024 // 100MB — larger videos should be linked (YouTube/Vimeo)

/** Upload a blog video file to Vercel Blob. Admin-only; very large videos should be linked instead. */
export async function saveUploadedVideo(file: File): Promise<string> {
  const ext = ALLOWED_VIDEO_TYPES[file.type]
  if (!ext) {
    throw new Error('Invalid video type. Allowed: MP4, WebM, OGG, MOV. For large videos, paste a YouTube/Vimeo link instead.')
  }
  if (file.size > MAX_VIDEO_SIZE) {
    throw new Error('Video too large. Max 100MB. For larger videos, paste a YouTube/Vimeo link instead.')
  }
  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = `blog-video/${uuidv4()}.${ext}`

  const blob = await put(filename, buffer, {
    access: 'public',
    addRandomSuffix: false,
    contentType: file.type,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })

  return blob.url
}
