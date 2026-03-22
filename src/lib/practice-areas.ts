export const PRACTICE_AREAS = [
  { slug: 'corporate-law', nameKa: 'საკორპორაციო სამართალი', nameEn: 'Corporate Law', icon: '🏢' },
  { slug: 'tax-law', nameKa: 'საგადასახადო სამართალი', nameEn: 'Tax Law', icon: '📊' },
  { slug: 'contract-law', nameKa: 'სახელშეკრულებო სამართალი', nameEn: 'Contract Law', icon: '📝' },
  { slug: 'labor-law', nameKa: 'შრომის სამართალი', nameEn: 'Labor Law', icon: '👷' },
  { slug: 'administrative-law', nameKa: 'ადმინისტრაციული სამართალი', nameEn: 'Administrative Law', icon: '🏛️' },
  { slug: 'criminal-law', nameKa: 'სისხლის სამართალი', nameEn: 'Criminal Law', icon: '⚖️' },
  { slug: 'civil-law', nameKa: 'სამოქალაქო სამართალი', nameEn: 'Civil Law', icon: '📜' },
  { slug: 'healthcare-law', nameKa: 'სამედიცინო სამართალი', nameEn: 'Healthcare Law', icon: '⚕️' },
  { slug: 'construction-law', nameKa: 'სამშენებლო სამართალი', nameEn: 'Construction Law', icon: '🏗️' },
  { slug: 'energy-law', nameKa: 'ენერგეტიკის სამართალი', nameEn: 'Energy Law', icon: '⚡' },
  { slug: 'infrastructure-law', nameKa: 'ინფრასტრუქტურის სამართალი', nameEn: 'Infrastructure Law', icon: '🛤️' },
  { slug: 'telecommunications-law', nameKa: 'სატელეკომუნიკაციო სამართალი', nameEn: 'Telecommunications Law', icon: '📡' },
  { slug: 'transportation-law', nameKa: 'სატრანსპორტო სამართალი', nameEn: 'Transportation Law', icon: '🚛' },
  { slug: 'cybercrime-law', nameKa: 'კიბერდანაშაულის სამართალი', nameEn: 'Cybercrime & Cybersecurity Law', icon: '🔒' },
  { slug: 'financial-crimes', nameKa: 'ფინანსური დანაშაულები', nameEn: 'Financial & Anti-Corruption Crimes', icon: '🔍' },
  { slug: 'public-procurement', nameKa: 'სახელმწიფო შესყიდვები', nameEn: 'Public Procurement', icon: '📋' },
  { slug: 'litigation', nameKa: 'დავების წარმოება და სასამართლო წარმომადგენლობა', nameEn: 'Litigation & Court Representation', icon: '🏛️' },
  { slug: 'risk-management', nameKa: 'სამართლებრივი რისკების მართვა', nameEn: 'Legal Risk Management', icon: '🛡️' },
  { slug: 'compliance', nameKa: 'სამართლებრივი შესაბამისობა', nameEn: 'Legal Compliance', icon: '✅' },
  { slug: 'financial-audit', nameKa: 'ფინანსური აუდიტი და კონტროლი', nameEn: 'Financial Audit & Control', icon: '📈' },
  { slug: 'project-management', nameKa: 'პროექტების მართვა', nameEn: 'Project Management', icon: '📐' },
  { slug: 'commercial-law', nameKa: 'კომერციული სამართალი', nameEn: 'Commercial Law', icon: '💼' },
] as const

export type PracticeAreaSlug = typeof PRACTICE_AREAS[number]['slug']

export function getPracticeArea(slug: string) {
  return PRACTICE_AREAS.find((a) => a.slug === slug)
}

export function isPracticeAreaSlug(slug: string): slug is PracticeAreaSlug {
  return PRACTICE_AREAS.some((a) => a.slug === slug)
}
