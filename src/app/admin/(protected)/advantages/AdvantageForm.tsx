'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BilingualField from '@/components/admin/BilingualField'

interface Advantage {
  id: number
  titleKa: string
  titleEn: string
  descriptionKa: string | null
  descriptionEn: string | null
  order: number
  active: boolean
}

export default function AdvantageForm({ advantage }: { advantage?: Advantage }) {
  const router = useRouter()
  const [form, setForm] = useState({
    titleKa: advantage?.titleKa || '',
    titleEn: advantage?.titleEn || '',
    descriptionKa: advantage?.descriptionKa || '',
    descriptionEn: advantage?.descriptionEn || '',
    order: advantage?.order ?? 0,
    active: advantage?.active ?? true,
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const url = advantage ? `/api/admin/advantages/${advantage.id}` : '/api/admin/advantages'
    const method = advantage ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/advantages')
      router.refresh()
    } else {
      alert('Failed to save')
    }
    setLoading(false)
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
        label="Description"
        valueKa={form.descriptionKa}
        valueEn={form.descriptionEn}
        onChangeKa={(v) => setForm((f) => ({ ...f, descriptionKa: v }))}
        onChangeEn={(v) => setForm((f) => ({ ...f, descriptionEn: v }))}
        multiline
        rows={4}
      />

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
          {loading ? 'Saving...' : advantage ? 'Update Advantage' : 'Create Advantage'}
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
