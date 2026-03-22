import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { saveUploadedFile } from '@/lib/upload'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const folder = formData.get('folder') as 'blog' | 'team' | 'press' | null

  if (!file || !folder) {
    return NextResponse.json({ error: 'Missing file or folder' }, { status: 400 })
  }

  if (!['blog', 'team', 'press'].includes(folder)) {
    return NextResponse.json({ error: 'Invalid folder' }, { status: 400 })
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({
      error: 'BLOB_READ_WRITE_TOKEN is not configured. Please redeploy after connecting Blob Store.'
    }, { status: 500 })
  }

  try {
    const url = await saveUploadedFile(file, folder)
    return NextResponse.json({ url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed'
    const isClientError = message.includes('Invalid') || message.includes('too large') || message.includes('type')
    return NextResponse.json({ error: message }, { status: isClientError ? 400 : 500 })
  }
}
