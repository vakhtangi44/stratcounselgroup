import { db } from '@/lib/db'
import SettingsEditor from './SettingsEditor'

export default async function AdminSettingsPage() {
  const settings = await db.siteSetting.findMany({ orderBy: { id: 'asc' } })

  const grouped: Record<string, typeof settings> = {}
  for (const s of settings) {
    if (!grouped[s.category]) grouped[s.category] = []
    grouped[s.category].push(s)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl text-dark">Site Settings</h1>
        <p className="text-secondary text-sm mt-1">Manage all text content displayed on the site in Georgian and English.</p>
      </div>
      <SettingsEditor grouped={grouped} />
    </div>
  )
}
