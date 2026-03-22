import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { sanitizeHtml } from '@/lib/sanitize'

function parseId(id: string) {
  const n = parseInt(id)
  return isNaN(n) ? null : n
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numericId = parseId(id)
  if (!numericId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })

  const post = await db.blogPost.findUnique({
    where: { id: numericId },
    include: { tags: true },
  })
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numericId = parseId(id)
  if (!numericId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })

  const body = await req.json()
  const {
    slug, titleKa, titleEn, contentKa, contentEn,
    excerptKa, excerptEn, coverImage, status, authorId, publishedAt, tags,
  } = body

  if (!slug || !titleKa || !titleEn) {
    return NextResponse.json({ error: 'slug, titleKa, and titleEn are required' }, { status: 400 })
  }

  const post = await db.blogPost.update({
    where: { id: numericId },
    data: {
      slug,
      titleKa,
      titleEn,
      contentKa: sanitizeHtml(contentKa || ''),
      contentEn: sanitizeHtml(contentEn || ''),
      excerptKa: excerptKa || '',
      excerptEn: excerptEn || '',
      coverImage: coverImage || null,
      status: status || 'draft',
      authorId: authorId ? Number(authorId) : null,
      publishedAt: status === 'published' ? (publishedAt ?? new Date()) : null,
      tags: {
        deleteMany: {},
        create: ((tags as string[]) || []).map((practiceArea) => ({ practiceArea })),
      },
    },
  })
  return NextResponse.json(post)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numericId = parseId(id)
  if (!numericId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })

  await db.blogPost.delete({ where: { id: numericId } })
  return NextResponse.json({ ok: true })
}
