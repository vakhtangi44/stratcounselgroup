import { getLocale } from 'next-intl/server'
import { getSettings, s } from '@/lib/settings'
import ContactPageClient from './ContactPageClient'

export default async function ContactPage() {
  const locale = await getLocale()
  const settings = await getSettings()

  const strings = {
    subtitle: s(settings, 'contact.subtitle', locale),
    heading: s(settings, 'contact.heading', locale),
    heroSubtitle: s(settings, 'contact.heroSubtitle', locale),
    infoSubtitle: s(settings, 'contact.info.subtitle', locale),
    info: s(settings, 'contact.info', locale),
    addressLabel: s(settings, 'contact.address.label', locale),
    address: s(settings, 'contact.address', locale),
    workingHoursLabel: s(settings, 'contact.workingHours.label', locale),
    workingHours: s(settings, 'contact.workingHours', locale),
  }

  return <ContactPageClient locale={locale} strings={strings} />
}
