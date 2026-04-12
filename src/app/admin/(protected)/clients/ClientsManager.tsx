'use client'

import { useState, useRef } from 'react'

interface Client {
  id: number
  name: string
  nameKa: string
  nameEn: string
  logoKa: string | null
  logoEn: string | null
  categoryId: number
  order: number
  active: boolean
}

interface Props {
  initialClients: Client[]
}

export default function ClientsManager({ initialClients }: Props) {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [loading, setLoading] = useState(false)
  const [savingOrder, setSavingOrder] = useState(false)
  const [savedOrder, setSavedOrder] = useState(false)
  const [error, setError] = useState('')
  const [uploadingId, setUploadingId] = useState<number | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [newNameEn, setNewNameEn] = useState('')
  const [newNameKa, setNewNameKa] = useState('')
  const [newLogoFile, setNewLogoFile] = useState<File | null>(null)
  const [newUploading, setNewUploading] = useState(false)

  const dragIndex = useRef<number | null>(null)
  const fileInputs = useRef<Record<number, HTMLInputElement | null>>({})

  async function reload() {
    const res = await fetch('/api/admin/clients')
    if (res.ok) {
      const cats = await res.json()
      const flat: Client[] = cats
        .flatMap((c: { clients: Client[] }) => c.clients)
        .sort((a: Client, b: Client) => a.order - b.order)
      setClients(flat)
    }
  }

  async function uploadLogoForClient(clientId: number, file: File) {
    setUploadingId(clientId)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      if (!uploadRes.ok) throw new Error('Upload failed')
      const { url } = await uploadRes.json()

      const client = clients.find((c) => c.id === clientId)
      if (!client) return

      const saveRes = await fetch(`/api/admin/clients/client/${clientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: client.name,
          nameKa: client.nameKa,
          nameEn: client.nameEn,
          logoKa: url,
          logoEn: url,
          order: client.order,
          active: client.active,
        }),
      })
      if (!saveRes.ok) throw new Error('Failed to save logo')
      await reload()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploadingId(null)
    }
  }

  async function handleDeleteClient(id: number) {
    if (!confirm('Delete this client?')) return
    setLoading(true)
    await fetch(`/api/admin/clients/client/${id}`, { method: 'DELETE' })
    await reload()
    setLoading(false)
  }

  async function handleCreateClient() {
    if (!newNameEn) return
    setNewUploading(true)
    setError('')
    try {
      let logoUrl: string | null = null
      if (newLogoFile) {
        const fd = new FormData()
        fd.append('file', newLogoFile)
        const up = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (!up.ok) throw new Error('Upload failed')
        const r = await up.json()
        logoUrl = r.url
      }

      const res = await fetch('/api/admin/clients/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newNameEn,
          nameEn: newNameEn,
          nameKa: newNameKa || newNameEn,
          logoEn: logoUrl,
          logoKa: logoUrl,
        }),
      })
      if (!res.ok) throw new Error('Failed to create client')

      setShowNew(false)
      setNewNameEn('')
      setNewNameKa('')
      setNewLogoFile(null)
      await reload()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Create failed')
    } finally {
      setNewUploading(false)
    }
  }

  function moveUp(index: number) {
    if (index === 0) return
    const updated = [...clients]
    ;[updated[index - 1], updated[index]] = [updated[index], updated[index - 1]]
    setClients(updated)
  }

  function moveDown(index: number) {
    if (index >= clients.length - 1) return
    const updated = [...clients]
    ;[updated[index], updated[index + 1]] = [updated[index + 1], updated[index]]
    setClients(updated)
  }

  // Drag & drop reorder
  function onDragStart(index: number) {
    dragIndex.current = index
  }

  function onDragOver(e: React.DragEvent, index: number) {
    e.preventDefault()
    const from = dragIndex.current
    if (from === null || from === index) return
    const updated = [...clients]
    const [moved] = updated.splice(from, 1)
    updated.splice(index, 0, moved)
    dragIndex.current = index
    setClients(updated)
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    dragIndex.current = null
  }

  async function saveOrder() {
    setSavingOrder(true)
    await fetch('/api/admin/clients/reorder', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clients.map((c, i) => ({ id: c.id, order: i }))),
    })
    setSavingOrder(false)
    setSavedOrder(true)
    setTimeout(() => setSavedOrder(false), 2500)
  }

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-secondary">
          Drag rows to reorder, then click Save Order. Click the logo area to upload a new logo.
        </p>
        <div className="flex gap-3">
          <button
            onClick={saveOrder}
            disabled={savingOrder}
            className={`px-4 py-2 rounded text-sm transition-all ${
              savedOrder
                ? 'bg-green-100 text-green-700'
                : 'bg-dark text-white hover:bg-navy disabled:opacity-50'
            }`}
          >
            {savingOrder ? 'Saving…' : savedOrder ? '✓ Order Saved' : 'Save Order'}
          </button>
          <button
            onClick={() => setShowNew(true)}
            className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark"
          >
            + New Client
          </button>
        </div>
      </div>

      {/* New client form */}
      {showNew && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gold/30">
          <h3 className="font-heading text-lg text-dark mb-4">New Client</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-secondary mb-1 uppercase tracking-wider">
                Name (English)
              </label>
              <input
                value={newNameEn}
                onChange={(e) => setNewNameEn(e.target.value)}
                placeholder="Rico Group"
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-secondary mb-1 uppercase tracking-wider">
                Name (Georgian)
              </label>
              <input
                value={newNameKa}
                onChange={(e) => setNewNameKa(e.target.value)}
                placeholder="რიკო ჯგუფი"
                className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs text-secondary mb-1 uppercase tracking-wider">
              Logo Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewLogoFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
            />
            {newLogoFile && (
              <p className="text-xs text-secondary mt-1">Selected: {newLogoFile.name}</p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCreateClient}
              disabled={newUploading || !newNameEn}
              className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark disabled:opacity-50"
            >
              {newUploading ? 'Creating…' : 'Create Client'}
            </button>
            <button
              onClick={() => {
                setShowNew(false)
                setNewNameEn('')
                setNewNameKa('')
                setNewLogoFile(null)
              }}
              className="border px-4 py-2 rounded text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Clients list */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {clients.length === 0 ? (
          <p className="text-center text-secondary py-12 text-sm">
            No clients yet. Click "+ New Client" to add one.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {clients.map((client, i) => {
              const logoUrl = client.logoEn || client.logoKa
              const isUploading = uploadingId === client.id
              return (
                <div
                  key={client.id}
                  draggable
                  onDragStart={() => onDragStart(i)}
                  onDragOver={(e) => onDragOver(e, i)}
                  onDrop={onDrop}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-bg-alt/50 cursor-grab active:cursor-grabbing"
                >
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => moveUp(i)}
                      disabled={i === 0}
                      className="text-secondary hover:text-gold disabled:opacity-20 transition-colors"
                      title="Move up"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveDown(i)}
                      disabled={i === clients.length - 1}
                      className="text-secondary hover:text-gold disabled:opacity-20 transition-colors"
                      title="Move down"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                  </div>
                  <span className="text-secondary text-lg select-none">⠿</span>

                  {/* Logo preview / upload zone */}
                  <div
                    onClick={() => fileInputs.current[client.id]?.click()}
                    className="relative w-20 h-20 border border-gray-200 rounded bg-bg-alt flex items-center justify-center flex-shrink-0 cursor-pointer hover:border-gold transition-colors overflow-hidden"
                    title="Click to upload new logo"
                  >
                    <input
                      ref={(el) => {
                        fileInputs.current[client.id] = el
                      }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) uploadLogoForClient(client.id, file)
                      }}
                    />
                    {isUploading ? (
                      <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                    ) : logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={logoUrl} alt={client.nameEn} className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-[10px] text-secondary text-center px-1">
                        Click to
                        <br />
                        upload
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-dark truncate">{client.nameEn}</p>
                    <p className="text-xs text-secondary truncate">{client.nameKa}</p>
                  </div>

                  {/* Order badge */}
                  <span className="text-xs text-secondary">#{i + 1}</span>

                  {/* Active badge */}
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      client.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {client.active ? 'Active' : 'Inactive'}
                  </span>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDeleteClient(client.id)}
                    disabled={loading}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Delete
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
