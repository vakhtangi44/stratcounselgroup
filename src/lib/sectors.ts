import type { Settings } from '@/lib/settings'
import { s as getSetting } from '@/lib/settings'

export const SECTORS = [
  {
    slug: 'transportation-logistics',
    nameKa: 'გადაზიდვები',
    nameEn: 'Transportation & Logistics',
    image: '/images/sectors/transport.jpg',
    descriptionKa:
      'სატრანსპორტო და ლოჯისტიკის სექტორში ვუზრუნველყოფთ კომპლექსურ სამართლებრივ მხარდაჭერას — სატრანსპორტო ხელშეკრულებების სტრუქტურირებიდან საერთაშორისო გადაზიდვების რეგულირებამდე.',
    descriptionEn:
      'In the transportation and logistics sector we provide comprehensive legal support — from structuring transportation contracts to regulating international freight.',
  },
  {
    slug: 'energy',
    nameKa: 'ენერგეტიკა',
    nameEn: 'Energy',
    image: '/images/sectors/energy.jpg',
    descriptionKa:
      'ენერგეტიკის სექტორში ვემსახურებით კომპანიებს განახლებადი ენერგიის პროექტებში, ინფრასტრუქტურის განვითარებაში, სახელმწიფო შესყიდვებსა და რეგულაციურ საკითხებში.',
    descriptionEn:
      'In the energy sector we serve companies in renewable energy projects, infrastructure development, public procurement, and regulatory matters.',
  },
  {
    slug: 'infrastructure',
    nameKa: 'მშენებლობა და ინფრასტრუქტურა',
    nameEn: 'Construction & Infrastructure',
    image: '/images/sectors/infrastructure.jpg',
    descriptionKa:
      'ინფრასტრუქტურული პროექტები მოითხოვს მრავალფეროვან სამართლებრივ ექსპერტიზას. ჩვენ ვეხმარებით კლიენტებს ხელშეკრულებების შედგენაში, რისკების შეფასებაში და დავების გადაწყვეტაში.',
    descriptionEn:
      'Infrastructure projects require diverse legal expertise. We help clients with contract drafting, risk assessment, and dispute resolution.',
  },
  {
    slug: 'medicine-healthcare',
    nameKa: 'მედიცინა',
    nameEn: 'Medicine & Healthcare',
    image: '/images/sectors/medicine.jpg',
    descriptionKa:
      'სამედიცინო სექტორის წარმომადგენლებს ვთავაზობთ სამართლებრივ მხარდაჭერას ლიცენზირების, შესაბამისობის, ადმინისტრაციული ზედამხედველობისა და პაციენტის უფლებების საკითხებში.',
    descriptionEn:
      'We offer legal support to medical sector representatives in licensing, compliance, administrative oversight, and patient rights matters.',
  },
  {
    slug: 'construction',
    nameKa: 'მშენებლობა',
    nameEn: 'Construction',
    image: '/images/sectors/construction.jpg',
    descriptionKa:
      'სამშენებლო სექტორში ვეხმარებით კომპანიებს ნებართვების მიღებაში, კონტრაქტების სტრუქტურირებაში, საპროექტო დოკუმენტაციაში და სახელმწიფო ზედამხედველობასთან დაკავშირებულ საკითხებში.',
    descriptionEn:
      'In the construction sector we help companies with permitting, contract structuring, project documentation, and matters related to state oversight.',
  },
] as const

export type SectorSlug = (typeof SECTORS)[number]['slug']

export interface SectorData {
  slug: string
  name: string
  description: string
  image: string
  enabled: boolean
}

export function getSector(slug: string) {
  return SECTORS.find((s) => s.slug === slug)
}

/** Builds SectorData for a single raw sector, merging admin overrides. */
function buildSectorData(
  sector: (typeof SECTORS)[number],
  settings: Settings,
  locale: string,
): SectorData {
  const defaultName = locale === 'ka' ? sector.nameKa : sector.nameEn
  const defaultDesc = locale === 'ka' ? sector.descriptionKa : sector.descriptionEn

  const enabledVal = getSetting(settings, `sector.${sector.slug}.enabled`, locale)
  const enabled = enabledVal !== 'false'

  const titleKey = `sector.${sector.slug}.title`
  const titleVal = getSetting(settings, titleKey, locale)
  const name = !titleVal || titleVal === titleKey ? defaultName : titleVal

  const descKey = `sector.${sector.slug}.description`
  const descVal = getSetting(settings, descKey, locale)
  const description = !descVal || descVal === descKey ? defaultDesc : descVal

  return {
    slug: sector.slug,
    name,
    description,
    image: sector.image,
    enabled,
  }
}

/** Returns all ENABLED sectors (for menus, homepage TargetSectors, /sectors list). */
export function getSectorsData(settings: Settings, locale: string): SectorData[] {
  return SECTORS
    .map((sector) => buildSectorData(sector, settings, locale))
    .filter((s) => s.enabled)
}

/** Returns one sector by slug regardless of enabled state (detail page always accessible). */
export function getSectorData(
  slug: string,
  settings: Settings,
  locale: string,
): SectorData | null {
  const sector = getSector(slug)
  if (!sector) return null
  return buildSectorData(sector, settings, locale)
}
