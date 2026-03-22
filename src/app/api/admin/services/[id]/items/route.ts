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
  const serviceId = parseId(id)
  if (!serviceId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  const body = await req.json()
  const { textKa, textEn, order } = body
  if (!textKa || !textEn) {
    return NextResponse.json({ error: 'textKa and textEn required' }, { status: 400 })
  }
  const item = await db.serviceItem.create({
    data: {
      textKa,
      textEn,
      serviceId,
      order: order ?? 0,
    },
  })
  return NextResponse.json(item, { status: 201 })
}
