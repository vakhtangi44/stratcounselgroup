'use client'

import { useState, useRef } from 'react'

interface Props {
  settingId: number | null
  currentImage: string
}

export default function AboutPhotoUploader({ settingId, currentImage }: Props) {
  const [preview, setPreview] = useState(currentImage || '')
  const [uploading, setUploading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function uploadFile(file: File) {
    setUploading(true)
    setError('')

    try {
      // 1. Upload file to blob storage
      const formData = new FormData()
      formData.append('file', file)
      const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      if (!uploadRes.ok) throw new Error('Upload failed')
      const { url } = await uploadRes.json()

      // 2. Save URL to both KA and EN settings
      if (!settingId) throw new Error('Setting not found in database')
      const saveRes = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([
          { id: settingId, valueKa: url, valueEn: url },
        ]),
      })
      if (!saveRes.ok) throw new Error('Failed to save setting')

      setPreview(url)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setUploading(false)
    }
  }

  async function removePhoto() {
    setUploading(true)
    setError('')
    try {
      if (!settingId) throw new Error('Setting not found in database')
      await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([
          { id: settingId, valueKa: '', valueEn: '' },
        ]),
      })
      setPreview('')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError('Failed to remove photo')
    } finally {
      setUploading(false)
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) uploadFile(file)
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="font-heading text-2xl text-dark mb-6">About Section Photo</h1>

      {/* Current preview */}
      {preview ? (
        <div className="mb-6">
          <p className="text-xs text-secondary mb-2 uppercase tracking-wider">Current Photo</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="About section"
            className="w-full max-w-lg h-64 object-cover rounded border border-gray-100"
          />
          <button
            onClick={removePhoto}
            disabled={uploading}
            className="mt-3 text-sm text-red-500 hover:text-red-700 hover:underline disabled:opacity-50"
          >
            Remove photo
          </button>
        </div>
      ) : (
        <p className="text-secondary text-sm mb-6">No photo set — upload one below.</p>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300 ${
          dragging
            ? 'border-gold bg-gold/5'
            : 'border-gray-200 hover:border-gold/50 hover:bg-gray-50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />

        {uploading ? (
          <div className="space-y-2">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-secondary text-sm">Uploading…</p>
          </div>
        ) : (
          <div className="space-y-2">
            <svg className="w-10 h-10 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-dark font-medium text-sm">Drag & drop a photo here</p>
            <p className="text-secondary text-xs">or click to browse — JPG, PNG, WebP</p>
          </div>
        )}
      </div>

      {/* Status messages */}
      {saved && (
        <p className="mt-4 text-green-600 text-sm font-medium">✓ Photo saved successfully</p>
      )}
      {error && (
        <p className="mt-4 text-red-500 text-sm">{error}</p>
      )}
    </div>
  )
}
