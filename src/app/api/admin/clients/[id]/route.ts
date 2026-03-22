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
  const { icon, labelKa, labelEn, order, active } = body
  if (!labelKa || !labelEn) {
    return NextResponse.json({ error: 'labelKa and labelEn required' }, { status: 400 })
  }
  const category = await db.clientCategory.update({
    where: { id: numericId },
    data: {
      icon: icon || '🏢',
      labelKa,
      labelEn,
      order: order ?? 0,
      active: active !== false,
    },
    include: { clients: { orderBy: { order: 'asc' } } },
  })
  return NextResponse.json(category)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numericId = parseId(id)
  if (!numericId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  await db.clientCategory.delete({ where: { id: numericId } })
  return NextResponse.json({ ok: true })
}
