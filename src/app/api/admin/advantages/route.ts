import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const advantages = await db.advantage.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(advantages)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { titleKa, titleEn, descriptionKa, descriptionEn, order, active } = body
  if (!titleKa) {
    return NextResponse.json({ error: 'titleKa required' }, { status: 400 })
  }
  const advantage = await db.advantage.create({
    data: {
      titleKa,
      titleEn: titleEn || '',
      descriptionKa: descriptionKa || null,
      descriptionEn: descriptionEn || null,
      order: order ?? 0,
      active: active !== false,
    },
  })
  return NextResponse.json(advantage, { status: 201 })
}
