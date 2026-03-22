import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const members = await db.teamMember.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(members)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const {
    slug, nameKa, nameEn, titleKa, titleEn, gbaNumber, photo,
    shortBioKa, shortBioEn, fullBioKa, fullBioEn,
    practiceAreas, isFeatured, order, active,
  } = body
  if (!slug || !nameKa || !nameEn) {
    return NextResponse.json({ error: 'slug, nameKa, nameEn required' }, { status: 400 })
  }
  const member = await db.teamMember.create({
    data: {
      slug, nameKa, nameEn,
      titleKa: titleKa || '', titleEn: titleEn || '',
      gbaNumber: gbaNumber || null,
      photo: photo || null,
      shortBioKa: shortBioKa || '', shortBioEn: shortBioEn || '',
      fullBioKa: fullBioKa || '', fullBioEn: fullBioEn || '',
      practiceAreas: practiceAreas || [],
      isFeatured: !!isFeatured,
      order: order ?? 0,
      active: active !== false,
    },
  })
  return NextResponse.json(member, { status: 201 })
}
