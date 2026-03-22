import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const subscribers = await db.newsletterSubscriber.findMany({ orderBy: { subscribedAt: 'desc' } })
  return NextResponse.json(subscribers)
}
