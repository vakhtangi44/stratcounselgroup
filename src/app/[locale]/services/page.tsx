import { getLocale } from 'next-intl/server'
import Link from 'next/link'

import RichText from '@/components/ui/RichText'
import { CaseIcon } from '@/lib/case-icons'
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
    <div className="pt-[110px] md:pt-[166px]" style={{ background: 'white' }}>
      {/* Services */}
      <section className="py-[4rem] md:py-[9.1rem] px-4 lg:px-8" style={{ background: 'white' }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10 md:mb-16">
            <div className="w-6 h-[1px] bg-gold mx-auto mb-3" />
            <h1 className="font-heading mb-3" style={{ fontSize: 'var(--typo-sectionTitle-size, 2.25rem)', color: 'var(--typo-sectionTitle-color, #1C122C)', fontFamily: 'var(--typo-sectionTitle-font)' }}>
              {locale === 'ka' ? 'ჩვენი სერვისები' : 'Our Services'}
            </h1>
            <p className="font-medium" style={{ fontSize: 'calc(var(--typo-subtitle-size, 1.05rem) * 1.2)', color: 'var(--typo-subtitle-color, #5a5a6e)', fontFamily: 'var(--typo-subtitle-font)' }}>
              {locale === 'ka'
                ? 'სრული სამართლებრივი მხარდაჭერა — მოლაპარაკებიდან სასამართლომდე'
                : 'Complete legal support — from negotiation to courtroom'}
            </p>
          </div>
          <div key={Date.now()} className="space-y-10 md:space-y-14">
            {services.map((service, idx) => (
                <div key={service.id} className="relative group transition-transform duration-500 hover:scale-[1.065]">
                  <div>
                    {/* Service Photo */}
                    {service.image && (
                      <div className="relative overflow-hidden rounded-sm mb-5 h-44 md:h-56">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={service.image}
                          alt={locale === 'ka' ? service.titleKa : service.titleEn}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: service.imagePosition || 'center' }}
                        />
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="font-heading mb-2 leading-tight text-[1.02rem] sm:text-[1.274rem]" style={{ color: 'var(--typo-serviceTitle-color, #1C122C)', fontFamily: 'var(--typo-serviceTitle-font)' }}>
                      {locale === 'ka' ? service.titleKa : service.titleEn}
                    </h2>

                    {/* Description */}
                    <p className="leading-[1.7] mb-5 text-left text-[0.84rem] sm:text-[1.04rem]" style={{ color: 'var(--color-navy)', fontFamily: 'var(--typo-serviceBody-font)', fontStyle: 'normal' }}>
                      {locale === 'ka' ? service.descriptionKa : service.descriptionEn}
                    </p>

                    {/* Items */}
                    {service.items.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
                        {service.items.map((item) => (
                            <div key={item.id} className="flex items-start gap-2.5 py-1.5">
                              {item.icon ? (
                                <CaseIcon icon={item.icon} className="w-[18px] h-[18px] text-navy flex-shrink-0 mt-[2px]" />
                              ) : (
                                <svg className="w-[14px] h-[14px] text-navy flex-shrink-0 mt-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                              <p className="flex-1 text-navy text-[0.84rem] sm:text-[1.04rem] leading-[1.6] text-left">
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
