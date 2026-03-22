'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Props {
  folder: 'blog' | 'team' | 'press'
  value?: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageUpload({ folder, value, onChange, label = 'Image' }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    const data = await res.json()

    if (res.ok) {
      onChange(data.url)
    } else {
      setError(data.error || 'Upload failed')
    }
    setLoading(false)
  }

  return (
    <div>
      <label className="block text-sm text-secondary mb-1">{label}</label>
      {value && (
        <div className="mb-2 relative w-32 h-32">
          <Image src={value} alt="Preview" fill className="object-cover rounded" />
        </div>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        disabled={loading}
        className="text-sm"
      />
      {loading && <p className="text-sm text-secondary mt-1">Uploading...</p>}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}
