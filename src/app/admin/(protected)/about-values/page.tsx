import { db } from '@/lib/db'
import AboutValuesReorderList from './AboutValuesReorderList'

export default async function AdminAboutValuesPage() {
  const values = await db.aboutValue.findMany({ orderBy: { order: 'asc' } })
  return <AboutValuesReorderList initialItems={values} />
}
