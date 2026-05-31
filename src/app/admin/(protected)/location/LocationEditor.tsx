'use client'

import { useState } from 'react'
import type { SiteLocation } from '@/lib/location'

/** Mirror of the server's embed handling so the preview matches what will be saved. */
function previewSrc(mapEmbed: string, address: string): string {
  const match = mapEmbed.trim().match(/src=["']([^"']+)["']/i)
  const embed = (match ? match[1] : mapEmbed).trim()
  if (embed) return embed
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`
}

export default function LocationEditor({ initial }: { initial: SiteLocation }) {
  const [footerAddressKa, setFooterAddressKa] = useState(initial.footerAddressKa)
  const [footerAddressEn, setFooterAddressEn] = useState(initial.footerAddressEn)
  const [contactAddressKa, setContactAddressKa] = useState(initial.contactAddressKa)
  const [contactAddressEn, setContactAddressEn] = useState(initial.contactAddressEn)
  const [mapLink, setMapLink] = useState(initial.mapLink)
  const [mapEmbed, setMapEmbed] = useState(initial.mapEmbed)

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
        body: JSON.stringify({
          footerAddressKa,
          footerAddressEn,
          contactAddressKa,
          contactAddressEn,
          mapLink,
          mapEmbed,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Failed to save')
      }
      const data = await res.json().catch(() => null)
      // Reflect the normalized embed (e.g. src pulled out of a pasted iframe).
      if (data && typeof data.mapEmbed === 'string') setMapEmbed(data.mapEmbed)
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
      {/* Footer address */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-dark px-6 py-3">
          <h2 className="font-heading text-gold text-sm uppercase tracking-wider">Footer Address</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Georgian (KA)</label>
            <input type="text" value={footerAddressKa} onChange={(e) => setFooterAddressKa(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>English (EN)</label>
            <input type="text" value={footerAddressEn} onChange={(e) => setFooterAddressEn(e.target.value)} className={inputClass} />
          </div>
          <p className="md:col-span-2 text-xs text-secondary">Shown in the site footer, under the logo column.</p>
        </div>
      </div>

      {/* Contact address */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-dark px-6 py-3">
          <h2 className="font-heading text-gold text-sm uppercase tracking-wider">Contact Page Address</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Georgian (KA)</label>
            <input type="text" value={contactAddressKa} onChange={(e) => setContactAddressKa(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>English (EN)</label>
            <input type="text" value={contactAddressEn} onChange={(e) => setContactAddressEn(e.target.value)} className={inputClass} />
          </div>
          <p className="md:col-span-2 text-xs text-secondary">Shown on the contact page (under the &ldquo;Address&rdquo; heading) and on the map overlay.</p>
        </div>
      </div>

      {/* Shared map */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-dark px-6 py-3">
          <h2 className="font-heading text-gold text-sm uppercase tracking-wider">Map (from Google)</h2>
        </div>
        <div className="p-6 space-y-3">
          <div>
            <label className={labelClass}>&ldquo;View on Map&rdquo; link (Google Maps URL)</label>
            <input
              type="url"
              value={mapLink}
              onChange={(e) => setMapLink(e.target.value)}
              placeholder="https://maps.app.goo.gl/..."
              className={inputClass}
            />
            <p className="text-xs text-secondary mt-1">Opens when a visitor clicks the address or &ldquo;View on Map&rdquo;.</p>
          </div>

          <div>
            <label className={labelClass}>Google Maps embed link (optional)</label>
            <input
              type="text"
              value={mapEmbed}
              onChange={(e) => setMapEmbed(e.target.value)}
              placeholder="Leave blank to show the map automatically from the contact address"
              className={inputClass}
            />
            <p className="text-xs text-secondary mt-1">
              For an exact spot: open Google Maps → <strong>Share</strong> → <strong>Embed a map</strong> → copy the
              HTML and paste it here (the link is extracted automatically). Leave blank to generate the map from the
              contact address — no manual pin needed.
            </p>
          </div>

          <div>
            <p className={labelClass}>Preview</p>
            <iframe
              key={previewSrc(mapEmbed, contactAddressEn)}
              src={previewSrc(mapEmbed, contactAddressEn)}
              className="w-full h-[320px] rounded-lg border border-gray-200"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map preview"
            />
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
