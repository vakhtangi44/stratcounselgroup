import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const items = await db.pressItem.findMany({ orderBy: { date: 'desc' } })
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { outletName, outletLogo, headlineKa, headlineEn, date, articleUrl, active } = body
  if (!outletName || !headlineKa || !articleUrl) {
    return NextResponse.json({ error: 'outletName, headlineKa, articleUrl required' }, { status: 400 })
  }
  const item = await db.pressItem.create({
    data: {
      outletName,
      outletLogo: outletLogo || null,
      headlineKa,
      headlineEn: headlineEn || '',
      date: date ? new Date(date) : new Date(),
      articleUrl,
      active: active !== false,
    },
  })
  return NextResponse.json(item, { status: 201 })
}
