import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { saveUploadedPdf } from '@/lib/upload'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'BLOB_READ_WRITE_TOKEN is not configured.' },
      { status: 500 },
    )
  }

  try {
    const url = await saveUploadedPdf(file)
    return NextResponse.json({ url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed'
    const isClientError = message.includes('Invalid') || message.includes('too large')
    return NextResponse.json({ error: message }, { status: isClientError ? 400 : 500 })
  }
}
