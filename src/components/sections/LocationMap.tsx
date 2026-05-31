'use client'

import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import { OSM_TILE_URL, OSM_ATTRIBUTION, goldPinIcon } from '@/components/ui/leaflet-utils'

interface Props {
  lat: number
  lng: number
  address: string
  /** External "open in Google Maps" link. */
  mapLink: string
  /** Localized "View on Map" label. */
  viewLabel: string
  title: string
}

/**
 * Public, interactive OpenStreetMap shown on the contact page. Pan/zoom enabled,
 * a single gold pin at the office, and an overlay with the address + a link out
 * to the full map. Coordinates and address come from the admin-managed location
 * settings, so the pin always matches what's saved in the panel.
 */
export default function LocationMap({ lat, lng, address, mapLink, viewLabel, title }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<import('leaflet').Map | null>(null)

  useEffect(() => {
    let cancelled = false

    import('leaflet').then((mod) => {
      const L = mod.default ?? mod
      if (cancelled || !containerRef.current || mapRef.current) return

      const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView([lat, lng], 16)
      mapRef.current = map
      L.tileLayer(OSM_TILE_URL, { attribution: OSM_ATTRIBUTION, maxZoom: 19 }).addTo(map)

      L.marker([lat, lng], { icon: goldPinIcon(L) })
        .addTo(map)
        .bindPopup(`<strong>${title}</strong><br/>${address}`)
    })

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [lat, lng, address, title])

  return (
    <div className="relative">
      <div ref={containerRef} className="h-[450px] w-full z-0" />

      {/* Address overlay — non-interactive except the outbound link so the map stays draggable */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[400] bg-gradient-to-t from-dark/80 to-transparent p-8">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <div className="text-white">
            <p className="font-heading text-lg mb-1">{title}</p>
            <p className="text-white/70 text-sm font-light">{address}</p>
          </div>
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto hidden md:flex items-center gap-2 text-gold text-sm font-medium hover:gap-3 transition-all duration-300"
          >
            {viewLabel}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
