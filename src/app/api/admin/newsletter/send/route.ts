import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { sendNewsletterEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { subjectKa, subjectEn, bodyKa, bodyEn, preview } = await req.json()

  if (!subjectKa || !bodyKa) {
    return NextResponse.json({ error: 'Subject and body (ka) required' }, { status: 400 })
  }

  if (preview) {
    const admin = await db.adminUser.findFirst()
    if (admin) {
      await sendNewsletterEmail({
        to: admin.email,
        subjectKa, subjectEn: subjectEn || subjectKa,
        bodyKa, bodyEn: bodyEn || bodyKa,
        unsubscribeToken: 'preview',
      })
    }
    return NextResponse.json({ ok: true, sent: 1 })
  }

  const subscribers = await db.newsletterSubscriber.findMany({ where: { active: true } })

  let sent = 0
  for (const subscriber of subscribers) {
    try {
      await sendNewsletterEmail({
        to: subscriber.email,
        subjectKa, subjectEn: subjectEn || subjectKa,
        bodyKa, bodyEn: bodyEn || bodyKa,
        unsubscribeToken: subscriber.unsubscribeToken,
      })
      sent++
    } catch {
      // Continue on individual send failure
    }
  }

  return NextResponse.json({ ok: true, sent, total: subscribers.length })
}
