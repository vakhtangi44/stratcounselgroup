'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BilingualField from '@/components/admin/BilingualField'
import ImageUpload from '@/components/admin/ImageUpload'
import { PRACTICE_AREAS } from '@/lib/practice-areas'

interface TeamMember {
  id: number
  slug: string
  nameKa: string
  nameEn: string
  titleKa: string
  titleEn: string
  gbaNumber: string | null
  linkedinUrl: string | null
  photo: string | null
  shortBioKa: string
  shortBioEn: string
  fullBioKa: string
  fullBioEn: string
  practiceAreas: string[]
  isFeatured: boolean
  order: number
  active: boolean
}

export default function TeamForm({ member }: { member?: TeamMember }) {
  const router = useRouter()
  const [form, setForm] = useState({
    slug: member?.slug || '',
    nameKa: member?.nameKa || '',
    nameEn: member?.nameEn || '',
    titleKa: member?.titleKa || '',
    titleEn: member?.titleEn || '',
    gbaNumber: member?.gbaNumber || '',
    linkedinUrl: member?.linkedinUrl || '',
    photo: member?.photo || '',
    shortBioKa: member?.shortBioKa || '',
    shortBioEn: member?.shortBioEn || '',
    fullBioKa: member?.fullBioKa || '',
    fullBioEn: member?.fullBioEn || '',
    practiceAreas: member?.practiceAreas || [] as string[],
    isFeatured: member?.isFeatured ?? false,
    order: member?.order ?? 0,
    active: member?.active ?? true,
  })
  const [loading, setLoading] = useState(false)

  function toggleArea(slug: string) {
    setForm((f) => ({
      ...f,
      practiceAreas: f.practiceAreas.includes(slug)
        ? f.practiceAreas.filter((a) => a !== slug)
        : [...f.practiceAreas, slug],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const url = member ? `/api/admin/team/${member.id}` : '/api/admin/team'
    const method = member ? 'PUT' : 'POST'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/team')
      router.refresh()
    } else {
      alert('Failed to save')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <BilingualField
        label="Name *"
        valueKa={form.nameKa}
        valueEn={form.nameEn}
        onChangeKa={(v) => setForm((f) => ({ ...f, nameKa: v }))}
        onChangeEn={(v) => setForm((f) => ({ ...f, nameEn: v }))}
        required
      />

      <div>
        <label className="block text-sm text-secondary mb-1">Slug *</label>
        <input
          value={form.slug}
          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          required
        />
      </div>

      <BilingualField
        label="Title / Position"
        valueKa={form.titleKa}
        valueEn={form.titleEn}
        onChangeKa={(v) => setForm((f) => ({ ...f, titleKa: v }))}
        onChangeEn={(v) => setForm((f) => ({ ...f, titleEn: v }))}
      />

      <div>
        <label className="block text-sm text-secondary mb-1">GBA Number</label>
        <input
          value={form.gbaNumber}
          onChange={(e) => setForm((f) => ({ ...f, gbaNumber: e.target.value }))}
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          placeholder="e.g. 1234"
        />
      </div>

      <div>
        <label className="block text-sm text-secondary mb-1">LinkedIn URL</label>
        <input
          value={form.linkedinUrl}
          onChange={(e) => setForm((f) => ({ ...f, linkedinUrl: e.target.value }))}
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          placeholder="https://linkedin.com/in/username"
        />
      </div>

      <ImageUpload
        folder="team"
        value={form.photo}
        onChange={(url) => setForm((f) => ({ ...f, photo: url }))}
        label="Photo"
      />

      <BilingualField
        label="Short Bio"
        valueKa={form.shortBioKa}
        valueEn={form.shortBioEn}
        onChangeKa={(v) => setForm((f) => ({ ...f, shortBioKa: v }))}
        onChangeEn={(v) => setForm((f) => ({ ...f, shortBioEn: v }))}
        multiline
        rows={3}
      />

      <BilingualField
        label="Full Bio"
        valueKa={form.fullBioKa}
        valueEn={form.fullBioEn}
        onChangeKa={(v) => setForm((f) => ({ ...f, fullBioKa: v }))}
        onChangeEn={(v) => setForm((f) => ({ ...f, fullBioEn: v }))}
        multiline
        rows={6}
      />

      <div>
        <p className="text-sm text-secondary mb-2">Practice Areas</p>
        <div className="flex flex-wrap gap-2">
          {PRACTICE_AREAS.map((area) => (
            <button
              key={area.slug}
              type="button"
              onClick={() => toggleArea(area.slug)}
              className={`px-3 py-1 rounded text-xs border transition-colors ${
                form.practiceAreas.includes(area.slug)
                  ? 'bg-gold text-white border-gold'
                  : 'bg-white text-secondary border-gray-200 hover:border-gold'
              }`}
            >
              {area.nameEn}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-secondary mb-1">Order</label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value) || 0 }))}
            className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          />
        </div>
        <div className="flex items-end gap-2 pb-2">
          <input
            type="checkbox"
            id="isFeatured"
            checked={form.isFeatured}
            onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
            className="accent-gold"
          />
          <label htmlFor="isFeatured" className="text-sm text-secondary">Featured</label>
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
          {loading ? 'Saving...' : member ? 'Update Member' : 'Create Member'}
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
