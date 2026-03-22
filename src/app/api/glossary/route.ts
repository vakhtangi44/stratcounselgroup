import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const terms = await db.glossaryTerm.findMany({
    where: { active: true },
    orderBy: { termEn: 'asc' },
  })
  return NextResponse.json(terms)
}
