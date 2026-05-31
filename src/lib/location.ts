import type { Settings } from './settings'

/**
 * Single source of truth for the firm's office location.
 *
 * Stored in the `SiteSetting` table under the `location.*` keys and edited from
 * the `/admin/location` panel. The footer and contact page each have their own
 * address field (so they can differ), while the map link/embed are shared.
 *
 * The map comes straight from Google Maps (no manual pin placement): either a
 * pasted Google "Embed a map" URL, or — when that's left blank — an automatic
 * embed generated from the contact address itself.
 *
 * Defaults below mirror the original hard-coded values so the site keeps working
 * even before the settings rows exist (e.g. a fresh database that hasn't been seeded).
 */
const ADDRESS_KA = 'საქართველო, თბილისი, ვაკის რაიონი, ირაკლი აბაშიძის ქ. N3, ოფისი N7'
const ADDRESS_EN = 'Georgia, Tbilisi, Vake District, Irakli Abashidze St. N3, Office N7'

export const LOCATION_DEFAULTS = {
  footerAddressKa: ADDRESS_KA,
  footerAddressEn: ADDRESS_EN,
  contactAddressKa: ADDRESS_KA,
  contactAddressEn: ADDRESS_EN,
  /** External "open in maps" link (Google Maps share URL) used by the clickable address. */
  mapLink: 'https://maps.app.goo.gl/u8enJWpSmMdmJFhY7',
  /** Google Maps embed URL (the `src` from Google's "Share → Embed a map"). */
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.5!2d44.7827!3d41.7151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQyJzU0LjQiTiA0NMKwNDYnNTcuNyJF!5e0!3m2!1sen!2sge!4v1',
} as const

export interface SiteLocation {
  footerAddressKa: string
  footerAddressEn: string
  contactAddressKa: string
  contactAddressEn: string
  mapLink: string
  /** When empty, the map is auto-generated from the contact address (see {@link mapEmbedSrc}). */
  mapEmbed: string
}

/** Read the office location out of an already-loaded settings map. */
export function getLocation(settings: Settings): SiteLocation {
  const footer = settings.get('location.footerAddress')
  const contact = settings.get('location.contactAddress')
  const mapLink = settings.get('location.mapLink')
  const mapEmbed = settings.get('location.mapEmbed')

  return {
    footerAddressKa: footer?.ka || LOCATION_DEFAULTS.footerAddressKa,
    footerAddressEn: footer?.en || LOCATION_DEFAULTS.footerAddressEn,
    contactAddressKa: contact?.ka || LOCATION_DEFAULTS.contactAddressKa,
    contactAddressEn: contact?.en || LOCATION_DEFAULTS.contactAddressEn,
    mapLink: mapLink?.en || mapLink?.ka || LOCATION_DEFAULTS.mapLink,
    mapEmbed: mapEmbed?.en || mapEmbed?.ka || LOCATION_DEFAULTS.mapEmbed,
  }
}

/** Localized footer address. */
export function footerAddress(location: SiteLocation, locale: string): string {
  return locale === 'ka' ? location.footerAddressKa : location.footerAddressEn
}

/** Localized contact-page address. */
export function contactAddress(location: SiteLocation, locale: string): string {
  return locale === 'ka' ? location.contactAddressKa : location.contactAddressEn
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
