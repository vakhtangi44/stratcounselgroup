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
  const { value } = body
  if (value === undefined || value === null) {
    return NextResponse.json({ error: 'value required' }, { status: 400 })
  }
  const stat = await db.statistic.update({
    where: { id: numericId },
    data: { value: String(value) },
  })
  return NextResponse.json(stat)
}
