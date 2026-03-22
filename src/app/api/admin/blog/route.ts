import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { sanitizeHtml } from '@/lib/sanitize'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const posts = await db.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { nameEn: true } }, tags: true },
  })
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const {
    slug, titleKa, titleEn, contentKa, contentEn,
    excerptKa, excerptEn, coverImage, status, authorId, tags,
  } = body

  if (!slug || !titleKa || !titleEn) {
    return NextResponse.json({ error: 'slug, titleKa, and titleEn are required' }, { status: 400 })
  }

  const post = await db.blogPost.create({
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
      publishedAt: status === 'published' ? new Date() : null,
      tags: {
        create: ((tags as string[]) || []).map((practiceArea) => ({ practiceArea })),
      },
    },
  })
  return NextResponse.json(post, { status: 201 })
}
