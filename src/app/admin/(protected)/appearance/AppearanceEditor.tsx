'use client'

import { useState } from 'react'

interface SettingEntry {
  id: number
  value: string
}

interface Props {
  settings: Record<string, SettingEntry>
}

export default function AppearanceEditor({ settings }: Props) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {}
    for (const [key, entry] of Object.entries(settings)) {
      map[key] = entry.value
    }
    return map
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function update(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    const payload = Object.entries(settings).map(([key, entry]) => ({
      id: entry.id,
      valueKa: values[key] || entry.value,
      valueEn: values[key] || entry.value,
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
      alert('Failed to save')
    }
  }

  return (
    <div className="space-y-8">
      {/* Logo Settings */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-dark px-6 py-3">
          <h2 className="font-heading text-gold text-sm uppercase tracking-wider">Logo Size</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-dark font-medium mb-2">
                Desktop Height (px)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="100"
                  max="400"
                  value={values['appearance.logo.height'] || '232'}
                  onChange={(e) => update('appearance.logo.height', e.target.value)}
                  className="flex-1"
                />
                <input
                  type="number"
                  value={values['appearance.logo.height'] || '232'}
                  onChange={(e) => update('appearance.logo.height', e.target.value)}
                  className="w-20 border rounded px-2 py-1 text-sm text-center"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-dark font-medium mb-2">
                Mobile Height (px)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="40"
                  max="200"
                  value={values['appearance.logo.heightMobile'] || '105'}
                  onChange={(e) => update('appearance.logo.heightMobile', e.target.value)}
                  className="flex-1"
                />
                <input
                  type="number"
                  value={values['appearance.logo.heightMobile'] || '105'}
                  onChange={(e) => update('appearance.logo.heightMobile', e.target.value)}
                  className="w-20 border rounded px-2 py-1 text-sm text-center"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-dark font-medium mb-2">
                Width Scale
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.01"
                  value={values['appearance.logo.widthScale'] || '1.42'}
                  onChange={(e) => update('appearance.logo.widthScale', e.target.value)}
                  className="flex-1"
                />
                <input
                  type="number"
                  step="0.01"
                  value={values['appearance.logo.widthScale'] || '1.42'}
                  onChange={(e) => update('appearance.logo.widthScale', e.target.value)}
                  className="w-20 border rounded px-2 py-1 text-sm text-center"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded p-4 flex items-center justify-center">
            <div
              className="border border-dashed border-gray-300 flex items-center justify-center bg-dark rounded"
              style={{
                height: `${Math.min(Number(values['appearance.logo.height'] || 232), 200)}px`,
                width: `${Math.min(Number(values['appearance.logo.height'] || 232), 200) * Number(values['appearance.logo.widthScale'] || 1.42)}px`,
              }}
            >
              <span className="text-white/50 text-xs">Preview</span>
            </div>
          </div>
        </div>
      </div>

      {/* Color Settings */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-dark px-6 py-3">
          <h2 className="font-heading text-gold text-sm uppercase tracking-wider">Colors</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <ColorPicker
              label="Primary"
              value={values['appearance.color.primary'] || '#668CCE'}
              onChange={(v) => update('appearance.color.primary', v)}
            />
            <ColorPicker
              label="Primary Dark"
              value={values['appearance.color.primaryDark'] || '#5478B8'}
              onChange={(v) => update('appearance.color.primaryDark', v)}
            />
            <ColorPicker
              label="Primary Light"
              value={values['appearance.color.primaryLight'] || '#8AAAE0'}
              onChange={(v) => update('appearance.color.primaryLight', v)}
            />
            <ColorPicker
              label="Accent (Icons)"
              value={values['appearance.color.accent'] || '#d88551'}
              onChange={(v) => update('appearance.color.accent', v)}
            />
            <ColorPicker
              label="Background"
              value={values['appearance.color.background'] || '#1C122C'}
              onChange={(v) => update('appearance.color.background', v)}
            />
          </div>

          {/* Color Preview */}
          <div className="mt-6 rounded overflow-hidden">
            <div
              className="p-6 flex items-center gap-4"
              style={{ background: values['appearance.color.background'] || '#1C122C' }}
            >
              <div className="w-20 h-8 rounded" style={{ background: values['appearance.color.primary'] || '#668CCE' }} />
              <div className="w-20 h-8 rounded" style={{ background: values['appearance.color.primaryDark'] || '#5478B8' }} />
              <div className="w-20 h-8 rounded" style={{ background: values['appearance.color.primaryLight'] || '#8AAAE0' }} />
              <div className="w-20 h-8 rounded" style={{ background: values['appearance.color.accent'] || '#d88551' }} />
              <span style={{ color: values['appearance.color.primary'] || '#668CCE' }} className="text-sm font-medium ml-auto">
                Sample Text
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 px-6 -mx-6 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gold text-white px-8 py-2.5 rounded text-sm font-medium hover:bg-gold-dark disabled:opacity-50 transition-all duration-300"
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
        {saved && <span className="text-green-600 text-sm">Appearance settings saved. Reload the site to see changes.</span>}
      </div>
    </div>
  )
}

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm text-dark font-medium mb-2">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded border border-gray-200 cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 border rounded px-2 py-1.5 text-sm font-mono"
        />
      </div>
    </div>
  )
}
