import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

/** POST a new client to the default "Our Clients" category, creating it if needed. */
export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { name, nameKa, nameEn, logoKa, logoEn } = body

  if (!name && !nameEn) {
    return NextResponse.json({ error: 'name required' }, { status: 400 })
  }

  // Find or create the default category
  let category = await db.clientCategory.findFirst({ where: { labelEn: 'Our Clients' } })
  if (!category) {
    category = await db.clientCategory.create({
      data: { labelEn: 'Our Clients', labelKa: 'ჩვენი კლიენტები', icon: '🏢', order: 0, active: true },
    })
  }

  // Place at the end
  const maxOrder = await db.client.aggregate({
    where: { categoryId: category.id },
    _max: { order: true },
  })
  const nextOrder = (maxOrder._max.order ?? -1) + 1

  const client = await db.client.create({
    data: {
      name: name || nameEn || '',
      nameKa: nameKa || '',
      nameEn: nameEn || name || '',
      logoKa: logoKa || null,
      logoEn: logoEn || null,
      categoryId: category.id,
      order: nextOrder,
      active: true,
    },
  })

  return NextResponse.json(client, { status: 201 })
}
