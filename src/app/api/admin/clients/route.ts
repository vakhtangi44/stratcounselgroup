import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const categories = await db.clientCategory.findMany({
    orderBy: { order: 'asc' },
    include: { clients: { orderBy: { order: 'asc' } } },
  })
  return NextResponse.json(categories)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { icon, labelKa, labelEn, order, active } = body
  if (!labelKa || !labelEn) {
    return NextResponse.json({ error: 'labelKa and labelEn required' }, { status: 400 })
  }
  const category = await db.clientCategory.create({
    data: {
      icon: icon || '🏢',
      labelKa,
      labelEn,
      order: order ?? 0,
      active: active !== false,
    },
    include: { clients: true },
  })
  return NextResponse.json(category, { status: 201 })
}
