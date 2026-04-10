import { db } from '@/lib/db'
import AdvantagesReorderList from './AdvantagesReorderList'

export default async function AdminAdvantagesPage() {
  const advantages = await db.advantage.findMany({ orderBy: { order: 'asc' } })
  return <AdvantagesReorderList initialItems={advantages} />
}
