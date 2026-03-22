import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const services = await db.service.findMany({
    orderBy: { order: 'asc' },
    include: { items: { orderBy: { order: 'asc' } } },
  })
  return NextResponse.json(services)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { titleKa, titleEn, descriptionKa, descriptionEn, order, active } = body
  if (!titleKa || !titleEn || !descriptionKa || !descriptionEn) {
    return NextResponse.json({ error: 'All title and description fields required' }, { status: 400 })
  }
  const service = await db.service.create({
    data: {
      titleKa,
      titleEn,
      descriptionKa,
      descriptionEn,
      order: order ?? 0,
      active: active !== false,
    },
    include: { items: true },
  })
  return NextResponse.json(service, { status: 201 })
}
