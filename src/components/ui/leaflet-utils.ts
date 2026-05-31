// Type-only import — erased at compile time, so this module never pulls Leaflet
// onto the server bundle. The runtime Leaflet instance is passed in by callers
// that have already dynamically imported it in the browser.
import type * as Leaflet from 'leaflet'

export const OSM_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

/**
 * A brand-gold teardrop pin built as a Leaflet `divIcon`.
 *
 * Using a divIcon (inline SVG) instead of the default marker sidesteps the
 * well-known bundler problem where Leaflet's default PNG marker images resolve
 * to broken paths under webpack/Turbopack.
 */
export function goldPinIcon(L: typeof Leaflet): Leaflet.DivIcon {
  return L.divIcon({
    className: 'scg-map-pin',
    html: `
      <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M15 0C6.716 0 0 6.716 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.716 23.284 0 15 0z"
              fill="#C4A35A" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="15" cy="15" r="5.5" fill="#ffffff"/>
      </svg>`,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -36],
  })
}
