import type { Settings } from './settings'

/**
 * Single source of truth for the firm's office location.
 *
 * Stored in the `SiteSetting` table under the `location.*` keys and edited from
 * the `/admin/location` panel. The footer, contact page, and contact map all
 * read from here, so one save updates every place the address/map appears.
 *
 * Defaults below mirror the original hard-coded values so the site keeps working
 * even before the settings rows exist (e.g. a fresh database that hasn't been seeded).
 */
export const LOCATION_DEFAULTS = {
  addressKa: 'საქართველო, თბილისი, ვაკის რაიონი, ირაკლი აბაშიძის ქ. N3, ოფისი N7',
  addressEn: 'Georgia, Tbilisi, Vake District, Irakli Abashidze St. N3, Office N7',
  mapLink: 'https://maps.app.goo.gl/u8enJWpSmMdmJFhY7',
  lat: 41.71511,
  lng: 44.78269,
} as const

export interface SiteLocation {
  addressKa: string
  addressEn: string
  /** External "open in maps" link (Google Maps share URL). */
  mapLink: string
  lat: number
  lng: number
}

/** Parse a stored coordinate string, falling back to a default when missing/invalid. */
function toCoord(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback
  const n = Number(raw)
  return Number.isFinite(n) ? n : fallback
}

/** Read the office location out of an already-loaded settings map. */
export function getLocation(settings: Settings): SiteLocation {
  const address = settings.get('location.address')
  const mapLink = settings.get('location.mapLink')
  const lat = settings.get('location.lat')
  const lng = settings.get('location.lng')

  return {
    addressKa: address?.ka || LOCATION_DEFAULTS.addressKa,
    addressEn: address?.en || LOCATION_DEFAULTS.addressEn,
    mapLink: mapLink?.en || mapLink?.ka || LOCATION_DEFAULTS.mapLink,
    lat: toCoord(lat?.en, LOCATION_DEFAULTS.lat),
    lng: toCoord(lng?.en, LOCATION_DEFAULTS.lng),
  }
}

/** Localized address string for the given locale. */
export function localizedAddress(location: SiteLocation, locale: string): string {
  return locale === 'ka' ? location.addressKa : location.addressEn
}
