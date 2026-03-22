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
  const { clientName, quoteKa, quoteEn, rating, practiceArea, date, active } = body
  if (!clientName || !quoteKa) {
    return NextResponse.json({ error: 'clientName and quoteKa required' }, { status: 400 })
  }
  const testimonial = await db.testimonial.update({
    where: { id: numericId },
    data: {
      clientName,
      quoteKa,
      quoteEn: quoteEn || '',
      rating: rating ? parseInt(rating) : 5,
      practiceArea: practiceArea || null,
      date: date ? new Date(date) : new Date(),
      active: active !== false,
    },
  })
  return NextResponse.json(testimonial)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numericId = parseId(id)
  if (!numericId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  await db.testimonial.delete({ where: { id: numericId } })
  return NextResponse.json({ ok: true })
}
