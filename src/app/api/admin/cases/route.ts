import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const cases = await db.successfulCase.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(cases)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { textKa, textEn, icon, featured, order, active } = body
  if (!textKa) {
    return NextResponse.json({ error: 'textKa required' }, { status: 400 })
  }
  const created = await db.successfulCase.create({
    data: {
      textKa,
      textEn: textEn || '',
      icon: icon || 'scale',
      featured: !!featured,
      order: order ?? 0,
      active: active !== false,
    },
  })
  return NextResponse.json(created, { status: 201 })
}
