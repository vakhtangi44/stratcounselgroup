'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BilingualField from '@/components/admin/BilingualField'
import { ABOUT_VALUE_ICONS, AboutValueIcon } from '@/lib/about-value-icons'

interface AboutValue {
  id: number
  titleKa: string
  titleEn: string
  descriptionKa: string
  descriptionEn: string
  icon: string
  order: number
  active: boolean
}

export default function AboutValueForm({ value }: { value?: AboutValue }) {
  const router = useRouter()
  const [form, setForm] = useState({
    titleKa: value?.titleKa || '',
    titleEn: value?.titleEn || '',
    descriptionKa: value?.descriptionKa || '',
    descriptionEn: value?.descriptionEn || '',
    icon: value?.icon || 'scales',
    order: value?.order ?? 0,
    active: value?.active ?? true,
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const url = value ? `/api/admin/about-values/${value.id}` : '/api/admin/about-values'
    const method = value ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/about-values')
      router.refresh()
    } else {
      alert('Failed to save')
    }
    setLoading(false)
  }

  async function handleDelete() {
    if (!value) return
    if (!confirm('Delete this value?')) return
    setLoading(true)
    const res = await fetch(`/api/admin/about-values/${value.id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/admin/about-values')
      router.refresh()
    } else {
      alert('Failed to delete')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <BilingualField
        label="Title *"
        valueKa={form.titleKa}
        valueEn={form.titleEn}
        onChangeKa={(v) => setForm((f) => ({ ...f, titleKa: v }))}
        onChangeEn={(v) => setForm((f) => ({ ...f, titleEn: v }))}
        required
      />

      <BilingualField
        label="Description *"
        valueKa={form.descriptionKa}
        valueEn={form.descriptionEn}
        onChangeKa={(v) => setForm((f) => ({ ...f, descriptionKa: v }))}
        onChangeEn={(v) => setForm((f) => ({ ...f, descriptionEn: v }))}
        multiline
        rows={5}
        required
      />

      <div>
        <label className="block text-sm text-secondary mb-2">Icon</label>
        <div className="grid grid-cols-5 gap-2 max-w-xl">
          {ABOUT_VALUE_ICONS.map((opt) => (
            <button
              type="button"
              key={opt.key}
              onClick={() => setForm((f) => ({ ...f, icon: opt.key }))}
              className={`flex flex-col items-center gap-1 p-3 border rounded text-center transition-colors ${
                form.icon === opt.key
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-gray-200 text-secondary hover:border-gold/50'
              }`}
              title={opt.label}
            >
              <AboutValueIcon icon={opt.key} className="w-6 h-6" />
              <span className="text-[10px] leading-tight">{opt.label}</span>
            </button>
          ))}
        </div>
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
          {loading ? 'Saving...' : value ? 'Update Value' : 'Create Value'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 rounded border border-gray-200 text-secondary hover:bg-bg-alt"
        >
          Cancel
        </button>
        {value && (
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
