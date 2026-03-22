import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

function parseId(id: string) {
  const n = parseInt(id)
  return isNaN(n) ? null : n
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const categoryId = parseId(id)
  if (!categoryId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  const body = await req.json()
  const { name, order, active } = body
  if (!name) {
    return NextResponse.json({ error: 'name required' }, { status: 400 })
  }
  const client = await db.client.create({
    data: {
      name,
      categoryId,
      order: order ?? 0,
      active: active !== false,
    },
  })
  return NextResponse.json(client, { status: 201 })
}
