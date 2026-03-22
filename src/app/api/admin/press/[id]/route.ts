import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

function parseId(id: string) {
  const n = parseInt(id)
  return isNaN(n) ? null : n
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numericId = parseId(id)
  if (!numericId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  const body = await req.json()
  const { outletName, outletLogo, headlineKa, headlineEn, date, articleUrl, active } = body
  if (!outletName || !headlineKa || !articleUrl) {
    return NextResponse.json({ error: 'outletName, headlineKa, articleUrl required' }, { status: 400 })
  }
  const item = await db.pressItem.update({
    where: { id: numericId },
    data: {
      outletName,
      outletLogo: outletLogo || null,
      headlineKa,
      headlineEn: headlineEn || '',
      date: date ? new Date(date) : new Date(),
      articleUrl,
      active: active !== false,
    },
  })
  return NextResponse.json(item)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numericId = parseId(id)
  if (!numericId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  await db.pressItem.delete({ where: { id: numericId } })
  return NextResponse.json({ ok: true })
}
