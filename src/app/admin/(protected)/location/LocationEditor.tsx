'use client'

import { useState } from 'react'
import LocationMapPicker from '@/components/admin/LocationMapPicker'
import type { SiteLocation } from '@/lib/location'

export default function LocationEditor({ initial }: { initial: SiteLocation }) {
  const [addressKa, setAddressKa] = useState(initial.addressKa)
  const [addressEn, setAddressEn] = useState(initial.addressEn)
  const [mapLink, setMapLink] = useState(initial.mapLink)
  const [lat, setLat] = useState(initial.lat)
  const [lng, setLng] = useState(initial.lng)

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/location', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addressKa, addressEn, mapLink, lat, lng }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Failed to save')
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20'
  const labelClass = 'block text-[11px] text-dark uppercase tracking-wider mb-1 font-medium'

  return (
    <div className="space-y-6">
      {/* Address */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-dark px-6 py-3">
          <h2 className="font-heading text-gold text-sm uppercase tracking-wider">Office Address</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Address — Georgian (KA)</label>
            <input
              type="text"
              value={addressKa}
              onChange={(e) => setAddressKa(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Address — English (EN)</label>
            <input
              type="text"
              value={addressEn}
              onChange={(e) => setAddressEn(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>&ldquo;View on Map&rdquo; link (Google Maps URL)</label>
            <input
              type="url"
              value={mapLink}
              onChange={(e) => setMapLink(e.target.value)}
              placeholder="https://maps.app.goo.gl/..."
              className={inputClass}
            />
            <p className="text-xs text-secondary mt-1">
              Opens when a visitor clicks &ldquo;View on Map&rdquo;. The pin shown on the site comes from the map below.
            </p>
          </div>
        </div>
      </div>

      {/* Map pin */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-dark px-6 py-3">
          <h2 className="font-heading text-gold text-sm uppercase tracking-wider">Map Pin</h2>
        </div>
        <div className="p-6 space-y-3">
          <p className="text-sm text-secondary">Click anywhere on the map or drag the pin to set the office location.</p>
          <LocationMapPicker
            lat={lat}
            lng={lng}
            onChange={(la, ln) => {
              setLat(la)
              setLng(ln)
            }}
          />
          <div className="flex flex-wrap gap-x-8 gap-y-1 text-sm text-dark font-mono">
            <span>Latitude: <strong>{lat.toFixed(6)}</strong></span>
            <span>Longitude: <strong>{lng.toFixed(6)}</strong></span>
          </div>
        </div>
      </div>

      {/* Save bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 px-6 -mx-6 flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-gold text-white px-8 py-2.5 rounded text-sm font-medium hover:bg-gold-dark disabled:opacity-50 transition-all duration-300"
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save'}
        </button>
        {saved && <span className="text-green-600 text-sm">Address &amp; map saved successfully.</span>}
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </div>
  )
}
