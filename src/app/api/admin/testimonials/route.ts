import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const testimonials = await db.testimonial.findMany({ orderBy: { date: 'desc' } })
  return NextResponse.json(testimonials)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { clientName, quoteKa, quoteEn, rating, practiceArea, date, active } = body
  if (!clientName || !quoteKa) {
    return NextResponse.json({ error: 'clientName and quoteKa required' }, { status: 400 })
  }
  const testimonial = await db.testimonial.create({
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
  return NextResponse.json(testimonial, { status: 201 })
}
