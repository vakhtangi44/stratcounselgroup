'use client'

import { useState } from 'react'

interface SectorRow {
  slug: string
  defaultNameKa: string
  defaultNameEn: string
  image: string
  enabledSettingId: number | null
  enabled: boolean
  titleSettingId: number | null
  titleKa: string
  titleEn: string
  descriptionSettingId: number | null
  descriptionKa: string
  descriptionEn: string
}

interface Props {
  masterEnabledSettingId: number | null
  masterEnabled: boolean
  sectors: SectorRow[]
}

async function saveSettings(
  payload: { id: number; valueKa: string; valueEn: string }[],
) {
  return fetch('/api/admin/settings', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export default function SectorsManager({
  masterEnabledSettingId,
  masterEnabled: initialMasterEnabled,
  sectors: initialSectors,
}: Props) {
  const [masterEnabled, setMasterEnabled] = useState(initialMasterEnabled)
  const [sectors, setSectors] = useState(initialSectors)
  const [savingSlug, setSavingSlug] = useState<string | null>(null)
  const [savedSlug, setSavedSlug] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function toggleMaster() {
    if (!masterEnabledSettingId) return
    const next = !masterEnabled
    setMasterEnabled(next)
    const val = next ? 'true' : 'false'
    await saveSettings([{ id: masterEnabledSettingId, valueKa: val, valueEn: val }])
  }

  function updateSector(slug: string, patch: Partial<SectorRow>) {
    setSectors((prev) => prev.map((s) => (s.slug === slug ? { ...s, ...patch } : s)))
  }

  async function toggleSector(slug: string) {
    const sector = sectors.find((s) => s.slug === slug)
    if (!sector || !sector.enabledSettingId) return
    const next = !sector.enabled
    updateSector(slug, { enabled: next })
    const val = next ? 'true' : 'false'
    await saveSettings([{ id: sector.enabledSettingId, valueKa: val, valueEn: val }])
  }

  async function saveSectorText(slug: string) {
    const sector = sectors.find((s) => s.slug === slug)
    if (!sector) return
    setSavingSlug(slug)
    setError('')
    try {
      const payload: { id: number; valueKa: string; valueEn: string }[] = []
      if (sector.titleSettingId) {
        payload.push({
          id: sector.titleSettingId,
          valueKa: sector.titleKa,
          valueEn: sector.titleEn,
        })
      }
      if (sector.descriptionSettingId) {
        payload.push({
          id: sector.descriptionSettingId,
          valueKa: sector.descriptionKa,
          valueEn: sector.descriptionEn,
        })
      }
      if (payload.length > 0) await saveSettings(payload)
      setSavedSlug(slug)
      setTimeout(() => setSavedSlug(null), 2500)
    } catch {
      setError('Failed to save')
    } finally {
      setSavingSlug(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Master toggle */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl text-dark mb-1">Sectors</h1>
            <p className="text-xs text-secondary">
              Master switch: hide sectors from menu and disable navigation on the homepage.
            </p>
          </div>
          <button
            onClick={toggleMaster}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              masterEnabled ? 'bg-gold' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                masterEnabled ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        <p className={`mt-3 text-sm font-medium ${masterEnabled ? 'text-green-600' : 'text-red-500'}`}>
          {masterEnabled
            ? '✓ Sectors are visible in menu and clickable'
            : '✗ Sectors are hidden from menu and not clickable'}
        </p>
      </div>

      {/* Per-sector editors */}
      {sectors.map((sector) => {
        const isSaving = savingSlug === sector.slug
        const isSaved = savedSlug === sector.slug
        return (
          <div key={sector.slug} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start gap-4 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sector.image}
                alt={sector.defaultNameEn}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="font-heading text-lg text-dark">
                  {sector.defaultNameEn} <span className="text-secondary font-normal">· {sector.defaultNameKa}</span>
                </h2>
                <p className="text-xs text-secondary mt-1">slug: {sector.slug}</p>
              </div>
              <button
                onClick={() => toggleSector(sector.slug)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors flex-shrink-0 ${
                  sector.enabled ? 'bg-gold' : 'bg-gray-300'
                }`}
                title={sector.enabled ? 'Enabled — click to disable' : 'Disabled — click to enable'}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    sector.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-secondary mb-1 uppercase tracking-wider">
                  Title (Georgian)
                </label>
                <input
                  type="text"
                  value={sector.titleKa}
                  onChange={(e) => updateSector(sector.slug, { titleKa: e.target.value })}
                  placeholder={sector.defaultNameKa}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1 uppercase tracking-wider">
                  Title (English)
                </label>
                <input
                  type="text"
                  value={sector.titleEn}
                  onChange={(e) => updateSector(sector.slug, { titleEn: e.target.value })}
                  placeholder={sector.defaultNameEn}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1 uppercase tracking-wider">
                  Description (Georgian)
                </label>
                <textarea
                  value={sector.descriptionKa}
                  onChange={(e) => updateSector(sector.slug, { descriptionKa: e.target.value })}
                  rows={5}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm resize-y"
                />
              </div>
              <div>
                <label className="block text-xs text-secondary mb-1 uppercase tracking-wider">
                  Description (English)
                </label>
                <textarea
                  value={sector.descriptionEn}
                  onChange={(e) => updateSector(sector.slug, { descriptionEn: e.target.value })}
                  rows={5}
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm resize-y"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => saveSectorText(sector.slug)}
                disabled={isSaving}
                className={`px-5 py-2 rounded text-sm transition-all ${
                  isSaved
                    ? 'bg-green-100 text-green-700'
                    : 'bg-dark text-white hover:bg-navy disabled:opacity-50'
                }`}
              >
                {isSaving ? 'Saving…' : isSaved ? '✓ Saved' : 'Save'}
              </button>
            </div>
          </div>
        )
      })}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
