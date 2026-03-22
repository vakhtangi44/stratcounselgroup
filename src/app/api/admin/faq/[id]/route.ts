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
  const { questionKa, questionEn, answerKa, answerEn, practiceArea, order, active } = body
  if (!questionKa || !answerKa) {
    return NextResponse.json({ error: 'questionKa and answerKa required' }, { status: 400 })
  }
  const faq = await db.fAQ.update({
    where: { id: numericId },
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
  return NextResponse.json(faq)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numericId = parseId(id)
  if (!numericId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  await db.fAQ.delete({ where: { id: numericId } })
  return NextResponse.json({ ok: true })
}
