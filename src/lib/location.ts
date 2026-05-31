import type { Settings } from './settings'

/**
 * Single source of truth for the firm's office location.
 *
 * Stored in the `SiteSetting` table under the `location.*` keys and edited from
 * the `/admin/location` panel. The footer, contact page, and contact map all
 * read from here, so one save updates every place the address/map appears.
 *
 * The map comes straight from Google Maps (no manual pin placement): either a
 * pasted Google "Embed a map" URL, or — when that's left blank — an automatic
 * embed generated from the address itself.
 *
 * Defaults below mirror the original hard-coded values so the site keeps working
 * even before the settings rows exist (e.g. a fresh database that hasn't been seeded).
 */
export const LOCATION_DEFAULTS = {
  addressKa: 'საქართველო, თბილისი, ვაკის რაიონი, ირაკლი აბაშიძის ქ. N3, ოფისი N7',
  addressEn: 'Georgia, Tbilisi, Vake District, Irakli Abashidze St. N3, Office N7',
  /** External "open in maps" link (Google Maps share URL) used by the clickable address. */
  mapLink: 'https://maps.app.goo.gl/u8enJWpSmMdmJFhY7',
  /** Google Maps embed URL (the `src` from Google's "Share → Embed a map"). */
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.5!2d44.7827!3d41.7151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQyJzU0LjQiTiA0NMKwNDYnNTcuNyJF!5e0!3m2!1sen!2sge!4v1',
} as const

export interface SiteLocation {
  addressKa: string
  addressEn: string
  mapLink: string
  /** When empty, the map is auto-generated from the address (see {@link mapEmbedSrc}). */
  mapEmbed: string
}

/** Read the office location out of an already-loaded settings map. */
export function getLocation(settings: Settings): SiteLocation {
  const address = settings.get('location.address')
  const mapLink = settings.get('location.mapLink')
  const mapEmbed = settings.get('location.mapEmbed')

  return {
    addressKa: address?.ka || LOCATION_DEFAULTS.addressKa,
    addressEn: address?.en || LOCATION_DEFAULTS.addressEn,
    mapLink: mapLink?.en || mapLink?.ka || LOCATION_DEFAULTS.mapLink,
    mapEmbed: mapEmbed?.en || mapEmbed?.ka || LOCATION_DEFAULTS.mapEmbed,
  }
}

/** Localized address string for the given locale. */
export function localizedAddress(location: SiteLocation, locale: string): string {
  return locale === 'ka' ? location.addressKa : location.addressEn
}

/**
 * The `src` for the contact-page map iframe.
 *
 * Prefers the explicit Google embed URL. If it's blank, falls back to a keyless
 * Google Maps embed built from the address, so a pin always shows automatically
 * without anyone placing it by hand.
 */
export function mapEmbedSrc(location: SiteLocation, address: string): string {
  const embed = location.mapEmbed.trim()
  if (embed) return embed
  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`
}
