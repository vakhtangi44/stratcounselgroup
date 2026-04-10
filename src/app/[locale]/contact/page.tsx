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
    phone: s(settings, 'contact.phone', locale),
    email: s(settings, 'contact.email', locale),
    whatsapp: s(settings, 'contact.whatsapp', locale),
    telegram: s(settings, 'contact.telegram', locale),
    facebook: s(settings, 'contact.facebook', locale),
    linkedin: s(settings, 'contact.linkedin', locale),
  }

  return <ContactPageClient locale={locale} strings={strings} />
}
