export const PRACTICE_AREAS = [
  { slug: 'corporate-law', nameKa: 'კორპორაციული სამართალი', nameEn: 'Corporate Law', icon: '🏢' },
  { slug: 'tax-law', nameKa: 'საგადასახადო სამართალი', nameEn: 'Tax Law', icon: '📊' },
  { slug: 'telecommunications-law', nameKa: 'სატელეკომუნიკაციო სამართალი', nameEn: 'Telecommunications Law', icon: '📡' },
  { slug: 'healthcare-law', nameKa: 'სამედიცინო სამართალი', nameEn: 'Healthcare Law', icon: '⚕️' },
  { slug: 'infrastructure-law', nameKa: 'ინფრასტრუქტურის სამართალი', nameEn: 'Infrastructure Law', icon: '🏗️' },
  { slug: 'energy-law', nameKa: 'ენერგეტიკის სამართალი', nameEn: 'Energy Law', icon: '⚡' },
  { slug: 'transportation-law', nameKa: 'სატრანსპორტო სამართალი', nameEn: 'Transportation Law', icon: '🚛' },
  { slug: 'construction-law', nameKa: 'სამშენებლო სამართალი', nameEn: 'Construction Law', icon: '🏛️' },
] as const

export type PracticeAreaSlug = typeof PRACTICE_AREAS[number]['slug']

export function getPracticeArea(slug: string) {
  return PRACTICE_AREAS.find((a) => a.slug === slug)
}

export function isPracticeAreaSlug(slug: string): slug is PracticeAreaSlug {
  return PRACTICE_AREAS.some((a) => a.slug === slug)
}
