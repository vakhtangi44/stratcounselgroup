'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BilingualField from '@/components/admin/BilingualField'
import { CASE_ICONS, CaseIcon } from '@/lib/case-icons'

interface Case {
  id: number
  textKa: string
  textEn: string
  icon: string
  featured: boolean
  order: number
  active: boolean
}

export default function CaseForm({ caseItem }: { caseItem?: Case }) {
  const router = useRouter()
  const [form, setForm] = useState({
    textKa: caseItem?.textKa || '',
    textEn: caseItem?.textEn || '',
    icon: caseItem?.icon || 'scale',
    featured: caseItem?.featured ?? false,
    order: caseItem?.order ?? 0,
    active: caseItem?.active ?? true,
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const url = caseItem ? `/api/admin/cases/${caseItem.id}` : '/api/admin/cases'
    const method = caseItem ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/cases')
      router.refresh()
    } else {
      alert('Failed to save')
    }
    setLoading(false)
  }

  async function handleDelete() {
    if (!caseItem) return
    if (!confirm('Delete this case?')) return
    setLoading(true)
    const res = await fetch(`/api/admin/cases/${caseItem.id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/admin/cases')
      router.refresh()
    } else {
      alert('Failed to delete')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <BilingualField
        label="Case Text *"
        valueKa={form.textKa}
        valueEn={form.textEn}
        onChangeKa={(v) => setForm((f) => ({ ...f, textKa: v }))}
        onChangeEn={(v) => setForm((f) => ({ ...f, textEn: v }))}
        multiline
        rows={6}
        required
      />

      <div>
        <label className="block text-sm text-secondary mb-2">Icon</label>
        <div className="grid grid-cols-7 gap-2">
          {CASE_ICONS.map((opt) => (
            <button
              type="button"
              key={opt.key}
              onClick={() => setForm((f) => ({ ...f, icon: opt.key }))}
              className={`flex flex-col items-center gap-1 p-2 border rounded text-center transition-colors ${
                form.icon === opt.key
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-gray-200 text-secondary hover:border-gold/50'
              }`}
              title={opt.label}
            >
              <CaseIcon icon={opt.key} className="w-5 h-5" />
              <span className="text-[9px] leading-tight">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
            className="accent-gold"
          />
          <span className="text-secondary">Featured (shows in "Successful Cases" section)</span>
        </label>
      </div>

      <div>
        <label className="block text-sm text-secondary mb-1">Order</label>
        <input
          type="number"
          value={form.order}
          onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value) || 0 }))}
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold max-w-[200px]"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="active"
          checked={form.active}
          onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
          className="accent-gold"
        />
        <label htmlFor="active" className="text-sm text-secondary">Active</label>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-gold text-white px-6 py-2 rounded hover:bg-gold-dark disabled:opacity-50"
        >
          {loading ? 'Saving...' : caseItem ? 'Update Case' : 'Create Case'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 rounded border border-gray-200 text-secondary hover:bg-bg-alt"
        >
          Cancel
        </button>
        {caseItem && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="ml-auto px-6 py-2 rounded border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  )
}
