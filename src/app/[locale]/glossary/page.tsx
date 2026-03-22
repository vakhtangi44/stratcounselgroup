import { getLocale } from 'next-intl/server'
import { getSettings, s } from '@/lib/settings'
import GlossaryPageClient from './GlossaryPageClient'

export default async function GlossaryPage() {
  const locale = await getLocale()
  const settings = await getSettings()

  return <GlossaryPageClient locale={locale} pageTitle={s(settings, 'page.glossary', locale)} />
}
