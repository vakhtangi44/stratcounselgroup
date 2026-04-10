import { db } from '@/lib/db'
import FaqReorderList from './FaqReorderList'

export default async function AdminFaqPage() {
  const faqs = await db.fAQ.findMany({ orderBy: { order: 'asc' } })
  return <FaqReorderList initialItems={faqs} />
}
