import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const terms = await db.glossaryTerm.findMany({ orderBy: { termEn: 'asc' } })
  return NextResponse.json(terms)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { termKa, termEn, definitionKa, definitionEn, active } = body
  if (!termKa || !termEn) {
    return NextResponse.json({ error: 'termKa and termEn required' }, { status: 400 })
  }
  const term = await db.glossaryTerm.create({
    data: {
      termKa,
      termEn,
      definitionKa: definitionKa || '',
      definitionEn: definitionEn || '',
      active: active !== false,
    },
  })
  return NextResponse.json(term, { status: 201 })
}
