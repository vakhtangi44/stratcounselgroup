'use client'

import { useState, useRef, useCallback } from 'react'

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

function rgbToHex(rgb: string): string {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  if (!match) return '#000000'
  const r = parseInt(match[1]).toString(16).padStart(2, '0')
  const g = parseInt(match[2]).toString(16).padStart(2, '0')
  const b = parseInt(match[3]).toString(16).padStart(2, '0')
  return `#${r}${g}${b}`
}

function getSelectionColor(): string | null {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return null
  const node = sel.anchorNode
  if (!node) return null
  const el = node.nodeType === 3 ? node.parentElement : (node as HTMLElement)
  if (!el) return null
  const color = window.getComputedStyle(el).color
  if (color.startsWith('rgb')) return rgbToHex(color)
  return color
}

function MiniToolbar({ editorRef }: { editorRef: React.RefObject<HTMLDivElement | null> }) {
  const applyCommand = useCallback((cmd: string, value?: string) => {
    const el = editorRef.current
    if (!el) return
    el.focus()
    // execCommand is used here within a trusted admin-only contentEditable context
    // for formatting text (bold, italic, color). This is standard for WYSIWYG editors.
    document.execCommand(cmd, false, value)
  }, [editorRef])

  const colorInputRef = useRef<HTMLInputElement>(null)
  const [pickedColor, setPickedColor] = useState('#b1976b')

  // Update color picker to match selected text color
  const syncColor = useCallback(() => {
    const color = getSelectionColor()
    if (color) setPickedColor(color)
  }, [])

  const handleColorPick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value
    setPickedColor(color)
    applyCommand('foreColor', color)
  }, [applyCommand])

  return (
    <div className="flex items-center gap-0.5 mb-1 border border-gray-200 rounded-t px-1 py-0.5 bg-gray-50">
      <button type="button" onClick={() => applyCommand('bold')} className="w-7 h-7 flex items-center justify-center text-xs font-bold hover:bg-gray-200 rounded" title="Bold">B</button>
      <button type="button" onClick={() => applyCommand('italic')} className="w-7 h-7 flex items-center justify-center text-xs italic hover:bg-gray-200 rounded" title="Italic">I</button>
      <button type="button" onClick={() => applyCommand('underline')} className="w-7 h-7 flex items-center justify-center text-xs underline hover:bg-gray-200 rounded" title="Underline">U</button>
      <div className="w-px h-5 bg-gray-300 mx-1" />
      <button
        type="button"
        onClick={() => { syncColor(); colorInputRef.current?.click() }}
        className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded relative"
        title="Pick text color"
      >
        <span className="w-5 h-5 rounded-full border-2 border-gray-300" style={{ background: pickedColor }} />
        <input
          ref={colorInputRef}
          type="color"
          value={pickedColor}
          onChange={handleColorPick}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </button>
      <div className="w-px h-5 bg-gray-300 mx-1" />
      <button type="button" onClick={() => applyCommand('removeFormat')} className="w-7 h-7 flex items-center justify-center text-[10px] hover:bg-gray-200 rounded text-red-500" title="Clear formatting">&#x2715;</button>
    </div>
  )
}

function RichTextInput({
  value,
  onChange,
  label,
}: {
  value: string
  onChange: (val: string) => void
  label: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div>
      <label className="block text-[11px] text-dark uppercase tracking-wider mb-1 font-medium">
        {label}
      </label>
      <MiniToolbar editorRef={ref} />
      {/* Content is admin-only (authenticated), not user-generated. The admin edits site text
          via this contentEditable field; the HTML is stored in the database and rendered on the
          public site. Only authenticated admins can edit these values. */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: value }}
        onBlur={() => {
          if (ref.current) onChange(ref.current.innerHTML)
        }}
        className="w-full border border-gray-200 border-t-0 rounded-b px-3 py-2 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 min-h-[3rem] max-h-[10rem] overflow-y-auto"
      />
    </div>
  )
}

export default function SettingsEditor({ grouped }: Props) {
  const [values, setValues] = useState<Record<number, { valueKa: string; valueEn: string }>>(
    () => {
      const map: Record<number, { valueKa: string; valueEn: string }> = {}
      for (const settings of Object.values(grouped)) {
        for (const item of settings) {
          map[item.id] = { valueKa: item.valueKa, valueEn: item.valueEn }
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
                  <RichTextInput
                    label="Georgian (KA)"
                    value={values[setting.id]?.valueKa || ''}
                    onChange={(val) => updateValue(setting.id, 'valueKa', val)}
                  />
                  <RichTextInput
                    label="English (EN)"
                    value={values[setting.id]?.valueEn || ''}
                    onChange={(val) => updateValue(setting.id, 'valueEn', val)}
                  />
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
