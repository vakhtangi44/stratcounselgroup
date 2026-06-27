import { db } from '@/lib/db'
import AppearanceEditor from './AppearanceEditor'

export default async function AppearancePage() {
  const settings = await db.siteSetting.findMany({
    where: { category: 'appearance' },
    orderBy: { id: 'asc' },
  })

  const mapped: Record<string, { id: number; value: string }> = {}
  for (const s of settings) {
    mapped[s.key] = { id: s.id, value: s.valueKa }
  }

  return (
    <div>
      <h1 className="font-heading text-2xl text-dark mb-8">Appearance</h1>
      <AppearanceEditor settings={mapped} />
    </div>
  )
}
