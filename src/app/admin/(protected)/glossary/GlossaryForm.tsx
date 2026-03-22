'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BilingualField from '@/components/admin/BilingualField'

interface GlossaryTerm {
  id: number
  termKa: string
  termEn: string
  definitionKa: string
  definitionEn: string
  active: boolean
}

export default function GlossaryForm({ term }: { term?: GlossaryTerm }) {
  const router = useRouter()
  const [form, setForm] = useState({
    termKa: term?.termKa || '',
    termEn: term?.termEn || '',
    definitionKa: term?.definitionKa || '',
    definitionEn: term?.definitionEn || '',
    active: term?.active ?? true,
  })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const url = term ? `/api/admin/glossary/${term.id}` : '/api/admin/glossary'
    const method = term ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/glossary')
      router.refresh()
    } else {
      alert('Failed to save')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <BilingualField
        label="Term *"
        valueKa={form.termKa}
        valueEn={form.termEn}
        onChangeKa={(v) => setForm((f) => ({ ...f, termKa: v }))}
        onChangeEn={(v) => setForm((f) => ({ ...f, termEn: v }))}
        required
      />

      <BilingualField
        label="Definition"
        valueKa={form.definitionKa}
        valueEn={form.definitionEn}
        onChangeKa={(v) => setForm((f) => ({ ...f, definitionKa: v }))}
        onChangeEn={(v) => setForm((f) => ({ ...f, definitionEn: v }))}
        multiline
        rows={4}
      />

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
          {loading ? 'Saving...' : term ? 'Update Term' : 'Create Term'}
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
