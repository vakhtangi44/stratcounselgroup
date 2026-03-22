import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  await db.newsletterSubscriber.upsert({
    where: { email },
    update: { active: true },
    create: { email },
  })

  return NextResponse.json({ ok: true })
}
