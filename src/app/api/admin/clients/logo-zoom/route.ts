import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

const KEY = 'clients.logoZoom'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const row = await db.siteSetting.findUnique({ where: { key: KEY } })
  // On by default when the setting has never been saved.
  return NextResponse.json({ enabled: (row?.valueEn ?? 'true') !== 'false' })
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { enabled } = (await req.json()) as { enabled?: boolean }
  const value = enabled ? 'true' : 'false'

  // Upsert so it works even if the row was never seeded.
  await db.siteSetting.upsert({
    where: { key: KEY },
    update: { valueKa: value, valueEn: value, category: 'clients' },
    create: { key: KEY, valueKa: value, valueEn: value, category: 'clients' },
  })

  return NextResponse.json({ ok: true, enabled: !!enabled })
}
