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
  const { name, nameKa, nameEn, logoKa, logoEn, order, active } = body
  const client = await db.client.update({
    where: { id: numericId },
    data: {
      name: name || nameEn || '',
      nameKa: nameKa || '',
      nameEn: nameEn || '',
      logoKa: logoKa ?? undefined,
      logoEn: logoEn ?? undefined,
      order: order ?? 0,
      active: active !== false,
    },
  })
  return NextResponse.json(client)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numericId = parseId(id)
  if (!numericId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  await db.client.delete({ where: { id: numericId } })
  return NextResponse.json({ ok: true })
}
