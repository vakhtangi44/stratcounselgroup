import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const settings = await db.siteSetting.findMany({ orderBy: { id: 'asc' } })

  const grouped: Record<string, typeof settings> = {}
  for (const s of settings) {
    if (!grouped[s.category]) grouped[s.category] = []
    grouped[s.category].push(s)
  }

  return NextResponse.json(grouped)
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body: { id: number; valueKa: string; valueEn: string }[] = await req.json()

  for (const item of body) {
    await db.siteSetting.update({
      where: { id: item.id },
      data: { valueKa: item.valueKa, valueEn: item.valueEn },
    })
  }

  return NextResponse.json({ ok: true })
}
