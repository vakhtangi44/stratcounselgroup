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
    nameKa: 'ინფრასტრუქტურა',
    nameEn: 'Infrastructure',
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

export function getSector(slug: string) {
  return SECTORS.find((s) => s.slug === slug)
}

import type { Settings } from '@/lib/settings'
import { s as getSetting } from '@/lib/settings'

export interface SectorData {
  slug: string
  name: string
  description: string
  image: string
  enabled: boolean
}

/** Reads a setting value, falling back to default if not set or still the key name. */
function readOverride(settings: Settings, key: string, fallback: string): string {
  const val = getSetting(settings, key, 'ka')
  const valEn = getSetting(settings, key, 'en')
  // s() returns the key name as fallback when missing; treat that as unset
  if (!val || val === key) return fallback
  return val || valEn || fallback
}

/** Returns all active sectors with admin-overridable title and description. */
export function getSectorsData(settings: Settings, locale: string): SectorData[] {
  return SECTORS
    .map((sector) => {
      const defaultName = locale === 'ka' ? sector.nameKa : sector.nameEn
      const defaultDesc = locale === 'ka' ? sector.descriptionKa : sector.descriptionEn
      const enabledVal = getSetting(settings, `sector.${sector.slug}.enabled`, locale)
      const enabled = enabledVal !== 'false'
      const name =
        getSetting(settings, `sector.${sector.slug}.title`, locale) === `sector.${sector.slug}.title`
          ? defaultName
          : getSetting(settings, `sector.${sector.slug}.title`, locale) || defaultName
      const description =
        getSetting(settings, `sector.${sector.slug}.description`, locale) ===
        `sector.${sector.slug}.description`
          ? defaultDesc
          : getSetting(settings, `sector.${sector.slug}.description`, locale) || defaultDesc
      return {
        slug: sector.slug,
        name,
        description,
        image: sector.image,
        enabled,
      }
    })
    .filter((s) => s.enabled)
}

/** Returns one sector with admin-overridable text, or null. */
export function getSectorData(
  slug: string,
  settings: Settings,
  locale: string
): SectorData | null {
  const sector = getSector(slug)
  if (!sector) return null
  const [data] = getSectorsData(settings, locale).filter((s) => s.slug === slug)
  return data || null
}

