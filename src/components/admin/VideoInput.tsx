'use client'

import { useState } from 'react'

interface Props {
  value?: string
  onChange: (url: string) => void
  label?: string
}

/**
 * Blog video input: paste a YouTube/Vimeo/MP4 link, OR upload a video file.
 * Either way the result is a single URL stored on the post (`videoUrl`).
 */
export default function VideoInput({ value, onChange, label = 'Video' }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/admin/upload-video', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok) onChange(data.url)
      else setError(data.error || 'Upload failed')
    } catch {
      setError('Upload failed')
    } finally {
      setLoading(false)
    }
  }

  const isFileUrl = !!value && /\.(mp4|webm|ogv|mov)$/i.test(value)

  return (
    <div>
      <label className="block text-sm text-secondary mb-1">{label}</label>

      <input
        type="url"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste a YouTube / Vimeo / MP4 link"
        className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
      />

      <div className="flex items-center gap-3 mt-2">
        <span className="text-xs text-secondary">or upload a file:</span>
        <input
          type="file"
          accept="video/mp4,video/webm,video/ogg,video/quicktime"
          onChange={handleFile}
          disabled={loading}
          className="text-sm"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-xs text-red-500 hover:underline"
          >
            Remove
          </button>
        )}
      </div>

      <p className="text-xs text-secondary mt-1">
        Tip: for large videos, paste a YouTube/Vimeo link (no upload needed). Uploaded files: max 100MB.
      </p>

      {loading && <p className="text-sm text-secondary mt-1">Uploading…</p>}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      {isFileUrl && (
        <video src={value} controls className="mt-2 w-full max-w-sm rounded border border-gray-200" />
      )}
    </div>
  )
}
