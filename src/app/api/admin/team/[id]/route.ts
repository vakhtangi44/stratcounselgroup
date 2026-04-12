import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

function parseId(id: string) {
  const n = parseInt(id)
  return isNaN(n) ? null : n
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numericId = parseId(id)
  if (!numericId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  const body = await req.json()
  const {
    slug, nameKa, nameEn, titleKa, titleEn, gbaNumber, linkedinUrl, photo,
    shortBioKa, shortBioEn, fullBioKa, fullBioEn,
    practiceAreas, isFeatured, order, active,
  } = body
  if (!slug || !nameKa || !nameEn) {
    return NextResponse.json({ error: 'slug, nameKa, nameEn required' }, { status: 400 })
  }
  const member = await db.teamMember.update({
    where: { id: numericId },
    data: {
      slug, nameKa, nameEn,
      titleKa: titleKa || '', titleEn: titleEn || '',
      gbaNumber: gbaNumber || null,
      linkedinUrl: linkedinUrl || null,
      photo: photo || null,
      shortBioKa: shortBioKa || '', shortBioEn: shortBioEn || '',
      fullBioKa: fullBioKa || '', fullBioEn: fullBioEn || '',
      practiceAreas: practiceAreas || [],
      isFeatured: !!isFeatured,
      order: order ?? 0,
      active: active !== false,
    },
  })
  return NextResponse.json(member)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const numericId = parseId(id)
  if (!numericId) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  await db.teamMember.delete({ where: { id: numericId } })
  return NextResponse.json({ ok: true })
}
