import { db } from '@/lib/db'
import CasesReorderList from './CasesReorderList'

export default async function AdminCasesPage() {
  const cases = await db.successfulCase.findMany({ orderBy: { order: 'asc' } })
  return <CasesReorderList initialItems={cases} />
}
