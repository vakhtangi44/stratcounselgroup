import { getLocale } from 'next-intl/server'
import Link from 'next/link'

import RichText from '@/components/ui/RichText'
import { db } from '@/lib/db'
import { getSettings, s } from '@/lib/settings'
import { unstable_noStore as noStore } from 'next/cache'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: locale === 'ka'
      ? 'სერვისები | Strategic Counsel Group'
      : 'Our Services | Strategic Counsel Group',
    description: locale === 'ka'
      ? 'სამართლებრივი მომსახურება — წინასახელშეკრულებო ეტაპიდან სრულმასშტაბიან წარმომადგენლობამდე.'
      : 'Legal services — from pre-contractual stage to full-scale representation.',
  }
}

export default async function ServicesPage() {
  noStore()
  const locale = await getLocale()
  const prefix = locale === 'en' ? '/en' : ''

  const [services, settings] = await Promise.all([
    db.service.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      include: { items: { orderBy: { order: 'asc' } } },
    }),
    getSettings(),
  ])

  return (
    <div className="pt-[140px] md:pt-[255px]" style={{ background: 'white' }}>
      {/* Services */}
      <section className="py-[4rem] md:py-[9.1rem] px-4 lg:px-8" style={{ background: 'white' }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20">
            <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
            <h1 className="font-heading mb-4" style={{ fontSize: 'var(--typo-sectionTitle-size, 2.25rem)', color: 'var(--typo-sectionTitle-color, #1C122C)', fontFamily: 'var(--typo-sectionTitle-font)' }}>
              {locale === 'ka' ? 'ჩვენი სერვისები' : 'Our Services'}
            </h1>
            <p className="font-bold" style={{ fontSize: 'var(--typo-subtitle-size, 1.15rem)', color: 'var(--typo-subtitle-color, #5a5a6e)', fontFamily: 'var(--typo-subtitle-font)' }}>
              {locale === 'ka'
                ? 'სრული სამართლებრივი მხარდაჭერა — მოლაპარაკებიდან სასამართლომდე'
                : 'Complete legal support — from negotiation to courtroom'}
            </p>
          </div>
          <div key={Date.now()} className="space-y-16">
            {services.map((service, idx) => (
                <div key={service.id} className="relative group">
                  <div>
                    {/* Service Photo */}
                    {service.image && (
                      <div className="relative overflow-hidden rounded-sm mb-6 h-48 md:h-64">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={service.image}
                          alt={locale === 'ka' ? service.titleKa : service.titleEn}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="font-heading mb-4 leading-tight" style={{ fontSize: 'var(--typo-serviceTitle-size, 1.46rem)', color: 'var(--typo-serviceTitle-color, #1C122C)', fontFamily: 'var(--typo-serviceTitle-font)' }}>
                      {locale === 'ka' ? service.titleKa : service.titleEn}
                    </h2>

                    {/* Description */}
                    <p className="leading-relaxed mb-6 font-[520] text-left" style={{ fontSize: 'var(--typo-serviceBody-size, 1.3rem)', color: 'var(--typo-serviceBody-color, #5a5a6e)', fontFamily: 'var(--typo-serviceBody-font)' }}>
                      {locale === 'ka' ? service.descriptionKa : service.descriptionEn}
                    </p>

                    {/* Items */}
                    {service.items.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.items.map((item) => (
                            <div key={item.id} className="flex items-start gap-3 py-2">
                              <svg className="w-5 h-5 text-dark flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <p className="text-dark text-sm leading-relaxed text-justify">
                                {locale === 'ka' ? item.textKa : item.textEn}
                              </p>
                            </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
