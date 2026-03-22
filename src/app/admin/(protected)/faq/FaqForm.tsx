'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BilingualField from '@/components/admin/BilingualField'
import { PRACTICE_AREAS } from '@/lib/practice-areas'

interface FAQ {
  id: number
  questionKa: string
  questionEn: string
  answerKa: string
  answerEn: string
  practiceArea: string
  order: number
  active: boolean
}

export default function FaqForm({ faq }: { faq?: FAQ }) {
  const router = useRouter()
  const [form, setForm] = useState({
    questionKa: faq?.questionKa || '',
    questionEn: faq?.questionEn || '',
    answerKa: faq?.answerKa || '',
    answerEn: faq?.answerEn || '',
    practiceArea: faq?.practiceArea || '',
    order: faq?.order ?? 0,
    active: faq?.active ?? true,
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const url = faq ? `/api/admin/faq/${faq.id}` : '/api/admin/faq'
    const method = faq ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/faq')
      router.refresh()
    } else {
      alert('Failed to save')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <BilingualField
        label="Question *"
        valueKa={form.questionKa}
        valueEn={form.questionEn}
        onChangeKa={(v) => setForm((f) => ({ ...f, questionKa: v }))}
        onChangeEn={(v) => setForm((f) => ({ ...f, questionEn: v }))}
        required
      />

      <BilingualField
        label="Answer *"
        valueKa={form.answerKa}
        valueEn={form.answerEn}
        onChangeKa={(v) => setForm((f) => ({ ...f, answerKa: v }))}
        onChangeEn={(v) => setForm((f) => ({ ...f, answerEn: v }))}
        multiline
        rows={5}
      />

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
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
        <div>
          <label className="block text-sm text-secondary mb-1">Order</label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value) || 0 }))}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          />
        </div>
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
          {loading ? 'Saving...' : faq ? 'Update FAQ' : 'Create FAQ'}
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
