'use client'

import { useState } from 'react'

interface Setting {
  id: number
  key: string
  valueKa: string
  valueEn: string
  category: string
}

interface Props {
  grouped: Record<string, Setting[]>
}

const categoryLabels: Record<string, string> = {
  hero: 'Hero Section',
  sections: 'Homepage Sections',
  about: 'About Page',
  contact: 'Contact Page',
  footer: 'Footer',
  pages: 'Page Titles',
  general: 'General',
}

export default function SettingsEditor({ grouped }: Props) {
  const [values, setValues] = useState<Record<number, { valueKa: string; valueEn: string }>>(
    () => {
      const map: Record<number, { valueKa: string; valueEn: string }> = {}
      for (const settings of Object.values(grouped)) {
        for (const s of settings) {
          map[s.id] = { valueKa: s.valueKa, valueEn: s.valueEn }
        }
      }
      return map
    }
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function handleSaveAll() {
    setSaving(true)
    const payload = Object.entries(values).map(([id, val]) => ({
      id: Number(id),
      valueKa: val.valueKa,
      valueEn: val.valueEn,
    }))

    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setSaving(false)
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } else {
      alert('Failed to save settings')
    }
  }

  function updateValue(id: number, field: 'valueKa' | 'valueEn', val: string) {
    setValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: val },
    }))
  }

  const categories = Object.keys(grouped)

  return (
    <div className="space-y-8">
      {categories.map((cat) => (
        <div key={cat} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-dark px-6 py-3">
            <h2 className="font-heading text-gold text-sm uppercase tracking-wider">
              {categoryLabels[cat] || cat}
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {grouped[cat].map((setting) => (
              <div key={setting.id} className="px-6 py-4">
                <p className="text-xs text-secondary mb-2 font-mono">{setting.key}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-dark uppercase tracking-wider mb-1 font-medium">
                      Georgian (KA)
                    </label>
                    <textarea
                      value={values[setting.id]?.valueKa || ''}
                      onChange={(e) => updateValue(setting.id, 'valueKa', e.target.value)}
                      rows={2}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-dark uppercase tracking-wider mb-1 font-medium">
                      English (EN)
                    </label>
                    <textarea
                      value={values[setting.id]?.valueEn || ''}
                      onChange={(e) => updateValue(setting.id, 'valueEn', e.target.value)}
                      rows={2}
                      className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 px-6 -mx-6 flex items-center gap-4">
        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="bg-gold text-white px-8 py-2.5 rounded text-sm font-medium hover:bg-gold-dark disabled:opacity-50 transition-all duration-300"
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save All'}
        </button>
        {saved && <span className="text-green-600 text-sm">All settings saved successfully.</span>}
      </div>
    </div>
  )
}
