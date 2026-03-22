'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import BilingualField from '@/components/admin/BilingualField'
import RichTextEditor from '@/components/admin/RichTextEditor'
import ImageUpload from '@/components/admin/ImageUpload'
import { PRACTICE_AREAS } from '@/lib/practice-areas'
import { slugify } from '@/lib/utils'

interface Post {
  id: number
  slug: string
  titleKa: string
  titleEn: string
  contentKa: string
  contentEn: string
  excerptKa: string
  excerptEn: string
  coverImage: string | null
  status: string
  tags: { practiceArea: string }[]
  authorId?: number | null
}

export default function BlogForm({ post }: { post?: Post }) {
  const router = useRouter()
  const [form, setForm] = useState({
    slug: post?.slug || '',
    titleKa: post?.titleKa || '',
    titleEn: post?.titleEn || '',
    contentKa: post?.contentKa || '',
    contentEn: post?.contentEn || '',
    excerptKa: post?.excerptKa || '',
    excerptEn: post?.excerptEn || '',
    coverImage: post?.coverImage || '',
    status: post?.status || 'draft',
    tags: post?.tags.map((t) => t.practiceArea) || [],
  })
  const [loading, setLoading] = useState(false)

  function handleTitleKaChange(val: string) {
    setForm((f) => ({
      ...f,
      titleKa: val,
      slug: f.slug || slugify(val),
    }))
  }

  function toggleTag(slug: string) {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(slug) ? f.tags.filter((t) => t !== slug) : [...f.tags, slug],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const url = post ? `/api/admin/blog/${post.id}` : '/api/admin/blog'
    const method = post ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      router.push('/admin/blog')
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
        onChangeKa={handleTitleKaChange}
        onChangeEn={(v) => setForm((f) => ({ ...f, titleEn: v }))}
        required
      />

      <div>
        <label className="block text-sm text-secondary mb-1">Slug</label>
        <input
          value={form.slug}
          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          required
        />
      </div>

      <BilingualField
        label="Excerpt"
        valueKa={form.excerptKa}
        valueEn={form.excerptEn}
        onChangeKa={(v) => setForm((f) => ({ ...f, excerptKa: v }))}
        onChangeEn={(v) => setForm((f) => ({ ...f, excerptEn: v }))}
        multiline
        rows={3}
      />

      <div>
        <p className="text-sm text-secondary mb-2">Content (KA)</p>
        <RichTextEditor
          value={form.contentKa}
          onChange={(v) => setForm((f) => ({ ...f, contentKa: v }))}
        />
      </div>

      <div>
        <p className="text-sm text-secondary mb-2">Content (EN)</p>
        <RichTextEditor
          value={form.contentEn}
          onChange={(v) => setForm((f) => ({ ...f, contentEn: v }))}
        />
      </div>

      <ImageUpload
        folder="blog"
        value={form.coverImage}
        onChange={(url) => setForm((f) => ({ ...f, coverImage: url }))}
        label="Cover Image"
      />

      <div>
        <p className="text-sm text-secondary mb-2">Practice Areas</p>
        <div className="flex flex-wrap gap-2">
          {PRACTICE_AREAS.map((area) => (
            <button
              key={area.slug}
              type="button"
              onClick={() => toggleTag(area.slug)}
              className={`px-3 py-1 rounded text-xs border transition-colors ${
                form.tags.includes(area.slug)
                  ? 'bg-gold text-white border-gold'
                  : 'bg-white text-secondary border-gray-200 hover:border-gold'
              }`}
            >
              {area.nameEn}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm text-secondary mb-1">Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
          className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-gold text-white px-6 py-2 rounded hover:bg-gold-dark disabled:opacity-50"
        >
          {loading ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
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
