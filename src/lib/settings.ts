import { db } from './db'

export type Settings = Map<string, { ka: string; en: string }>

export async function getSettings(): Promise<Settings> {
  const rows = await db.siteSetting.findMany()
  const map = new Map<string, { ka: string; en: string }>()
  for (const row of rows) {
    map.set(row.key, { ka: row.valueKa, en: row.valueEn })
  }
  return map
}

export function s(settings: Settings, key: string, locale: string): string {
  const val = settings.get(key)
  if (!val) return key // fallback to key name
  return locale === 'ka' ? val.ka : val.en
}

/** Check if a string contains HTML tags */
export function hasHtml(str: string): boolean {
  return /<[a-z][\s\S]*>/i.test(str)
}
