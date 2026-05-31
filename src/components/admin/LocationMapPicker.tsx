'use client'

import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import { OSM_TILE_URL, OSM_ATTRIBUTION, goldPinIcon } from '@/components/ui/leaflet-utils'

interface Props {
  lat: number
  lng: number
  /** Called whenever the admin clicks the map or drags the pin to a new spot. */
  onChange: (lat: number, lng: number) => void
}

/**
 * Editable map for the admin "Address & Map" panel. Click anywhere to move the
 * pin, or drag the pin itself — either way the new coordinates are reported via
 * `onChange`. Leaflet is loaded dynamically in the browser only.
 */
export default function LocationMapPicker({ lat, lng, onChange }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<import('leaflet').Marker | null>(null)
  // Keep the latest onChange without re-running the init effect.
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    let map: import('leaflet').Map | null = null
    let cancelled = false

    import('leaflet').then((mod) => {
      const L = mod.default ?? mod
      if (cancelled || !containerRef.current || markerRef.current) return

      map = L.map(containerRef.current).setView([lat, lng], 16)
      L.tileLayer(OSM_TILE_URL, { attribution: OSM_ATTRIBUTION, maxZoom: 19 }).addTo(map)

      const marker = L.marker([lat, lng], {
        icon: goldPinIcon(L),
        draggable: true,
      }).addTo(map)
      markerRef.current = marker

      marker.on('dragend', () => {
        const { lat: la, lng: ln } = marker.getLatLng()
        onChangeRef.current(la, ln)
      })

      map.on('click', (e: import('leaflet').LeafletMouseEvent) => {
        marker.setLatLng(e.latlng)
        onChangeRef.current(e.latlng.lat, e.latlng.lng)
      })
    })

    return () => {
      cancelled = true
      markerRef.current = null
      map?.remove()
    }
    // Init once; subsequent lat/lng changes come from this map's own events.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-[360px] w-full rounded-lg overflow-hidden border border-gray-200 z-0"
    />
  )
}
