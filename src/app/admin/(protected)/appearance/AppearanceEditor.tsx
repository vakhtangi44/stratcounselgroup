'use client'

import { useState } from 'react'
import Image from 'next/image'

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
      {/* Logo Upload */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-dark px-6 py-3">
          <h2 className="font-heading text-gold text-sm uppercase tracking-wider">Logo</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-6">
            <div className="w-40 h-40 bg-dark rounded flex items-center justify-center overflow-hidden">
              {values['appearance.logo.url'] && (
                <Image
                  src={values['appearance.logo.url']}
                  alt="Current logo"
                  width={160}
                  height={160}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div>
              <p className="text-sm text-dark font-medium mb-2">Upload New Logo</p>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  const formData = new FormData()
                  formData.append('file', file)
                  formData.append('folder', 'logo')
                  const res = await fetch('/api/upload', { method: 'POST', body: formData })
                  if (res.ok) {
                    const data = await res.json()
                    update('appearance.logo.url', data.url)
                  } else {
                    alert('Upload failed')
                  }
                }}
                className="text-sm"
              />
              <p className="text-xs text-secondary mt-2">PNG, JPG, or WebP. Max 5MB.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Position & Visibility */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-dark px-6 py-3">
          <h2 className="font-heading text-gold text-sm uppercase tracking-wider">Logo Position & Visibility</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Header Logo */}
            <div>
              <h3 className="text-sm font-medium text-dark mb-3">Header Logo</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-secondary mb-1">Position</label>
                  <div className="flex gap-2">
                    {['left', 'center', 'right'].map((pos) => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => update('appearance.logo.headerPosition', pos)}
                        className={`px-4 py-2 text-xs rounded capitalize ${
                          (values['appearance.logo.headerPosition'] || 'left') === pos
                            ? 'bg-gold text-white'
                            : 'bg-gray-100 text-secondary hover:bg-gray-200'
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-secondary mb-1">Horizontal Offset (px)</label>
                  <div className="flex items-center gap-2">
                    <input type="range" min="-200" max="200" value={values['appearance.logo.headerOffsetX'] || '0'} onChange={(e) => update('appearance.logo.headerOffsetX', e.target.value)} className="flex-1" />
                    <input type="number" value={values['appearance.logo.headerOffsetX'] || '0'} onChange={(e) => update('appearance.logo.headerOffsetX', e.target.value)} className="w-16 border rounded px-2 py-1 text-sm text-center" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-secondary mb-1">Vertical Offset (px)</label>
                  <div className="flex items-center gap-2">
                    <input type="range" min="-100" max="100" value={values['appearance.logo.headerOffsetY'] || '0'} onChange={(e) => update('appearance.logo.headerOffsetY', e.target.value)} className="flex-1" />
                    <input type="number" value={values['appearance.logo.headerOffsetY'] || '0'} onChange={(e) => update('appearance.logo.headerOffsetY', e.target.value)} className="w-16 border rounded px-2 py-1 text-sm text-center" />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={(values['appearance.logo.headerVisible'] || 'true') === 'true'}
                    onChange={(e) => update('appearance.logo.headerVisible', e.target.checked ? 'true' : 'false')}
                  />
                  Show logo in header
                </label>
              </div>
            </div>
            {/* Footer Logo */}
            <div>
              <h3 className="text-sm font-medium text-dark mb-3">Footer Logo</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-secondary mb-1">Position</label>
                  <div className="flex gap-2">
                    {['left', 'center', 'right'].map((pos) => (
                      <button
                        key={pos}
                        type="button"
                        onClick={() => update('appearance.logo.footerPosition', pos)}
                        className={`px-4 py-2 text-xs rounded capitalize ${
                          (values['appearance.logo.footerPosition'] || 'left') === pos
                            ? 'bg-gold text-white'
                            : 'bg-gray-100 text-secondary hover:bg-gray-200'
                        }`}
                      >
                        {pos}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-secondary mb-1">Horizontal Offset (px)</label>
                  <div className="flex items-center gap-2">
                    <input type="range" min="-200" max="200" value={values['appearance.logo.footerOffsetX'] || '0'} onChange={(e) => update('appearance.logo.footerOffsetX', e.target.value)} className="flex-1" />
                    <input type="number" value={values['appearance.logo.footerOffsetX'] || '0'} onChange={(e) => update('appearance.logo.footerOffsetX', e.target.value)} className="w-16 border rounded px-2 py-1 text-sm text-center" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-secondary mb-1">Vertical Offset (px)</label>
                  <div className="flex items-center gap-2">
                    <input type="range" min="-100" max="100" value={values['appearance.logo.footerOffsetY'] || '0'} onChange={(e) => update('appearance.logo.footerOffsetY', e.target.value)} className="flex-1" />
                    <input type="number" value={values['appearance.logo.footerOffsetY'] || '0'} onChange={(e) => update('appearance.logo.footerOffsetY', e.target.value)} className="w-16 border rounded px-2 py-1 text-sm text-center" />
                  </div>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={(values['appearance.logo.footerVisible'] || 'true') === 'true'}
                    onChange={(e) => update('appearance.logo.footerVisible', e.target.checked ? 'true' : 'false')}
                  />
                  Show logo in footer
                </label>
              </div>
            </div>
          </div>

          {/* Mobile Logo */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-dark mb-4">Mobile Logo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs text-secondary mb-1">Height (px)</label>
                <div className="flex items-center gap-2">
                  <input type="range" min="30" max="150" value={values['appearance.logo.mobileHeight'] || '92'} onChange={(e) => update('appearance.logo.mobileHeight', e.target.value)} className="flex-1" />
                  <input type="number" value={values['appearance.logo.mobileHeight'] || '92'} onChange={(e) => update('appearance.logo.mobileHeight', e.target.value)} className="w-16 border rounded px-2 py-1 text-sm text-center" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Horizontal Offset (px)</label>
                <div className="flex items-center gap-2">
                  <input type="range" min="-100" max="100" value={values['appearance.logo.mobileOffsetX'] || '0'} onChange={(e) => update('appearance.logo.mobileOffsetX', e.target.value)} className="flex-1" />
                  <input type="number" value={values['appearance.logo.mobileOffsetX'] || '0'} onChange={(e) => update('appearance.logo.mobileOffsetX', e.target.value)} className="w-16 border rounded px-2 py-1 text-sm text-center" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1">Vertical Offset (px)</label>
                <div className="flex items-center gap-2">
                  <input type="range" min="-50" max="50" value={values['appearance.logo.mobileOffsetY'] || '0'} onChange={(e) => update('appearance.logo.mobileOffsetY', e.target.value)} className="flex-1" />
                  <input type="number" value={values['appearance.logo.mobileOffsetY'] || '0'} onChange={(e) => update('appearance.logo.mobileOffsetY', e.target.value)} className="w-16 border rounded px-2 py-1 text-sm text-center" />
                </div>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm mt-3">
              <input
                type="checkbox"
                checked={(values['appearance.logo.mobileVisible'] || 'true') === 'true'}
                onChange={(e) => update('appearance.logo.mobileVisible', e.target.checked ? 'true' : 'false')}
              />
              Show logo on mobile
            </label>
          </div>
        </div>
      </div>

      {/* Logo Size */}
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

      {/* Card Hover Scale */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-dark px-6 py-3">
          <h2 className="font-heading text-gold text-sm uppercase tracking-wider">Card Hover Effect</h2>
        </div>
        <div className="p-6">
          <label className="block text-sm text-dark font-medium mb-2">
            Scale on Hover ({((Number(values['appearance.cardScale'] || '1.10') - 1) * 100).toFixed(0)}%)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1.0"
              max="1.5"
              step="0.01"
              value={values['appearance.cardScale'] || '1.10'}
              onChange={(e) => update('appearance.cardScale', e.target.value)}
              className="flex-1"
            />
            <input
              type="number"
              step="0.01"
              value={values['appearance.cardScale'] || '1.10'}
              onChange={(e) => update('appearance.cardScale', e.target.value)}
              className="w-20 border rounded px-2 py-1 text-sm text-center"
            />
          </div>
          <p className="text-xs text-secondary mt-2">1.0 = no effect, 1.1 = 10% bigger, 1.2 = 20% bigger</p>
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
            <ColorPicker
              label="Dots/Dashes"
              value={values['appearance.color.dots'] || '#d88551'}
              onChange={(v) => update('appearance.color.dots', v)}
            />
            <ColorPicker
              label="Header"
              value={values['appearance.color.header'] || '#1C122C'}
              onChange={(v) => update('appearance.color.header', v)}
            />
            <ColorPicker
              label="Footer"
              value={values['appearance.color.footer'] || '#1C122C'}
              onChange={(v) => update('appearance.color.footer', v)}
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
