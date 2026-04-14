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
  const { titleKa, titleEn, descriptionKa, descriptionEn, icon, order, active } = body
  if (!titleKa || !descriptionKa) {
    return NextResponse.json({ error: 'titleKa and descriptionKa required' }, { status: 400 })
  }
  const value = await db.aboutValue.update({
    where: { id: numericId },
    data: {
      titleKa,
      titleEn: titleEn || '',
      descriptionKa,
      descriptionEn: descriptionEn || '',
      icon: icon || 'scales',
      order: order ?? 0,
      active: active !== false,
    },
  })
  return NextResponse.json(value)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numericId = parseId(id)
  if (!numericId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  await db.aboutValue.delete({ where: { id: numericId } })
  return NextResponse.json({ ok: true })
}
