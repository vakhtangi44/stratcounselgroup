'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BilingualField from '@/components/admin/BilingualField'
import { PRACTICE_AREAS } from '@/lib/practice-areas'

interface Testimonial {
  id: number
  clientName: string
  quoteKa: string
  quoteEn: string
  rating: number
  practiceArea: string | null
  date: Date
  active: boolean
}

export default function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const router = useRouter()
  const [form, setForm] = useState({
    clientName: testimonial?.clientName || '',
    quoteKa: testimonial?.quoteKa || '',
    quoteEn: testimonial?.quoteEn || '',
    rating: testimonial?.rating ?? 5,
    practiceArea: testimonial?.practiceArea || '',
    date: testimonial?.date
      ? new Date(testimonial.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    active: testimonial?.active ?? true,
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const url = testimonial ? `/api/admin/testimonials/${testimonial.id}` : '/api/admin/testimonials'
    const method = testimonial ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/testimonials')
      router.refresh()
    } else {
      alert('Failed to save')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div>
        <label className="block text-sm text-secondary mb-1">Client Name *</label>
        <input
          value={form.clientName}
          onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))}
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          required
        />
      </div>

      <BilingualField
        label="Quote *"
        valueKa={form.quoteKa}
        valueEn={form.quoteEn}
        onChangeKa={(v) => setForm((f) => ({ ...f, quoteKa: v }))}
        onChangeEn={(v) => setForm((f) => ({ ...f, quoteEn: v }))}
        multiline
        rows={4}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-secondary mb-1">Rating (1–5)</label>
          <select
            value={form.rating}
            onChange={(e) => setForm((f) => ({ ...f, rating: parseInt(e.target.value) }))}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>{r} star{r > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-secondary mb-1">Practice Area</label>
          <select
            value={form.practiceArea}
            onChange={(e) => setForm((f) => ({ ...f, practiceArea: e.target.value }))}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          >
            <option value="">— None —</option>
            {PRACTICE_AREAS.map((a) => (
              <option key={a.slug} value={a.slug}>{a.nameEn}</option>
            ))}
          </select>
        </div>
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
          {loading ? 'Saving...' : testimonial ? 'Update Testimonial' : 'Create Testimonial'}
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
