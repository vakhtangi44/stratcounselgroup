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
  folder: 'blog' | 'team' | 'press'
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
