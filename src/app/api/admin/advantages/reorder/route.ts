import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function PUT(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const items: { id: number; order: number }[] = await req.json()

  await Promise.all(
    items.map((item) =>
      db.advantage.update({
        where: { id: item.id },
        data: { order: item.order },
      })
    )
  )

  return NextResponse.json({ ok: true })
}
