import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const values = await db.aboutValue.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(values)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { titleKa, titleEn, descriptionKa, descriptionEn, icon, order, active } = body
  if (!titleKa || !descriptionKa) {
    return NextResponse.json({ error: 'titleKa and descriptionKa required' }, { status: 400 })
  }
  const value = await db.aboutValue.create({
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
  return NextResponse.json(value, { status: 201 })
}
