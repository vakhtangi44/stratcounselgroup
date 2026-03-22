'use client'

import { useState } from 'react'

interface Stat {
  id: number
  key: string
  labelKa: string
  labelEn: string
  value: string
  suffix: string
}

export default function StatsEditor({ stats }: { stats: Stat[] }) {
  const [values, setValues] = useState<Record<number, string>>(
    Object.fromEntries(stats.map((s) => [s.id, s.value]))
  )
  const [saving, setSaving] = useState<number | null>(null)
  const [saved, setSaved] = useState<number | null>(null)

  async function handleSave(id: number) {
    setSaving(id)
    const res = await fetch(`/api/admin/stats/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: values[id] }),
    })
    setSaving(null)
    if (res.ok) {
      setSaved(id)
      setTimeout(() => setSaved(null), 2000)
    } else {
      alert('Failed to save')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-100 max-w-2xl">
      {stats.map((stat) => (
        <div key={stat.id} className="px-6 py-4 flex items-center gap-4">
          <div className="flex-1">
            <p className="font-medium text-dark">{stat.labelEn}</p>
            <p className="text-xs text-secondary">{stat.labelKa} · key: {stat.key}</p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={values[stat.id]}
              onChange={(e) =>
                setValues((v) => ({ ...v, [stat.id]: e.target.value }))
              }
              className="w-28 border border-gray-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-gold text-right"
            />
            {stat.suffix && (
              <span className="text-secondary text-sm">{stat.suffix}</span>
            )}
            <button
              onClick={() => handleSave(stat.id)}
              disabled={saving === stat.id}
              className="bg-gold text-white px-4 py-1.5 rounded text-sm hover:bg-gold-dark disabled:opacity-50 min-w-[64px]"
            >
              {saving === stat.id ? '...' : saved === stat.id ? 'Saved!' : 'Save'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
