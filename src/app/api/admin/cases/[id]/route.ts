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
  const { textKa, textEn, icon, featured, order, active } = body
  if (!textKa) {
    return NextResponse.json({ error: 'textKa required' }, { status: 400 })
  }
  const updated = await db.successfulCase.update({
    where: { id: numericId },
    data: {
      textKa,
      textEn: textEn || '',
      icon: icon || 'scale',
      featured: !!featured,
      order: order ?? 0,
      active: active !== false,
    },
  })
  return NextResponse.json(updated)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numericId = parseId(id)
  if (!numericId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  await db.successfulCase.delete({ where: { id: numericId } })
  return NextResponse.json({ ok: true })
}
