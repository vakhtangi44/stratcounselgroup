import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY
  if (!secret) return true // skip in dev if not configured
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  })
  const data = await res.json() as { success: boolean }
  return data.success
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as {
      name?: string
      email?: string
      phone?: string
      subject?: string
      message?: string
      turnstileToken?: string
    }

    const { name, email, phone, subject, message, turnstileToken } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!turnstileToken || !(await verifyTurnstile(turnstileToken))) {
      return NextResponse.json({ error: 'CAPTCHA verification failed' }, { status: 400 })
    }

    await db.contactMessage.create({
      data: { name, email, phone: phone || null, subject, message },
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
