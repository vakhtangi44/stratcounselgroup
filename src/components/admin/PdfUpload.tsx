'use client'

import { useState } from 'react'

interface Props {
  value?: string
  onChange: (url: string) => void
  label?: string
}

export default function PdfUpload({ value, onChange, label = 'PDF' }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/admin/upload-pdf', { method: 'POST', body: formData })
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
        <div className="mb-2 flex items-center gap-3">
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gold hover:underline break-all"
          >
            📄 View uploaded PDF
          </a>
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-xs text-red-500 hover:text-red-600 hover:underline"
          >
            ✕ Remove
          </button>
        </div>
      )}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFile}
        disabled={loading}
        className="text-sm"
      />
      {loading && <p className="text-sm text-secondary mt-1">Uploading...</p>}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}
