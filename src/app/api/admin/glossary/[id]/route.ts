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
  const { termKa, termEn, definitionKa, definitionEn, active } = body
  if (!termKa || !termEn) {
    return NextResponse.json({ error: 'termKa and termEn required' }, { status: 400 })
  }
  const term = await db.glossaryTerm.update({
    where: { id: numericId },
    data: {
      termKa,
      termEn,
      definitionKa: definitionKa || '',
      definitionEn: definitionEn || '',
      active: active !== false,
    },
  })
  return NextResponse.json(term)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numericId = parseId(id)
  if (!numericId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  await db.glossaryTerm.delete({ where: { id: numericId } })
  return NextResponse.json({ ok: true })
}
