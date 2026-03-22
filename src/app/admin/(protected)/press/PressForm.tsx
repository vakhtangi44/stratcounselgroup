'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BilingualField from '@/components/admin/BilingualField'
import ImageUpload from '@/components/admin/ImageUpload'

interface PressItem {
  id: number
  outletName: string
  outletLogo: string | null
  headlineKa: string
  headlineEn: string
  date: Date
  articleUrl: string
  active: boolean
}

export default function PressForm({ item }: { item?: PressItem }) {
  const router = useRouter()
  const [form, setForm] = useState({
    outletName: item?.outletName || '',
    outletLogo: item?.outletLogo || '',
    headlineKa: item?.headlineKa || '',
    headlineEn: item?.headlineEn || '',
    date: item?.date
      ? new Date(item.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    articleUrl: item?.articleUrl || '',
    active: item?.active ?? true,
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const url = item ? `/api/admin/press/${item.id}` : '/api/admin/press'
    const method = item ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/press')
      router.refresh()
    } else {
      alert('Failed to save')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div>
        <label className="block text-sm text-secondary mb-1">Outlet Name *</label>
        <input
          value={form.outletName}
          onChange={(e) => setForm((f) => ({ ...f, outletName: e.target.value }))}
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          required
        />
      </div>

      <ImageUpload
        folder="press"
        value={form.outletLogo}
        onChange={(url) => setForm((f) => ({ ...f, outletLogo: url }))}
        label="Outlet Logo"
      />

      <BilingualField
        label="Headline *"
        valueKa={form.headlineKa}
        valueEn={form.headlineEn}
        onChangeKa={(v) => setForm((f) => ({ ...f, headlineKa: v }))}
        onChangeEn={(v) => setForm((f) => ({ ...f, headlineEn: v }))}
        required
      />

      <div>
        <label className="block text-sm text-secondary mb-1">Article URL *</label>
        <input
          type="url"
          value={form.articleUrl}
          onChange={(e) => setForm((f) => ({ ...f, articleUrl: e.target.value }))}
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-secondary mb-1">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          />
        </div>
        <div className="flex items-end gap-2 pb-2">
          <input
            type="checkbox"
            id="active"
            checked={form.active}
            onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
            className="accent-gold"
          />
          <label htmlFor="active" className="text-sm text-secondary">Active</label>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-gold text-white px-6 py-2 rounded hover:bg-gold-dark disabled:opacity-50"
        >
          {loading ? 'Saving...' : item ? 'Update Press Item' : 'Create Press Item'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 rounded border border-gray-200 text-secondary hover:bg-bg-alt"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
