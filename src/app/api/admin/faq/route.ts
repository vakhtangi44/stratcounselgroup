import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const faqs = await db.fAQ.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(faqs)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { questionKa, questionEn, answerKa, answerEn, practiceArea, order, active } = body
  if (!questionKa || !answerKa) {
    return NextResponse.json({ error: 'questionKa and answerKa required' }, { status: 400 })
  }
  const faq = await db.fAQ.create({
    data: {
      questionKa,
      questionEn: questionEn || '',
      answerKa,
      answerEn: answerEn || '',
      practiceArea: practiceArea || '',
      order: order ?? 0,
      active: active !== false,
    },
  })
  return NextResponse.json(faq, { status: 201 })
}
