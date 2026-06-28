import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
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
      <section className="py-20 md:py-28 px-4" style={{ background: 'white' }}>
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
            <h1 className="font-heading text-3xl md:text-4xl text-dark mb-4">
              {locale === 'ka' ? 'ჩვენი სერვისები' : 'Our Services'}
            </h1>
            <p className="text-secondary text-[1.49rem] font-bold">
              {locale === 'ka'
                ? 'სრული სამართლებრივი მხარდაჭერა — მოლაპარაკებიდან სასამართლომდე'
                : 'Complete legal support — from negotiation to courtroom'}
            </p>
          </div>
          <div key={Date.now()} className="space-y-12">
            {services.map((service, idx) => (
              <ScrollReveal key={service.id} delay={idx * 400}>
                <div className="relative group">
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
                    <h2 className="font-heading text-2xl md:text-3xl text-dark mb-4 leading-tight">
                      {locale === 'ka' ? service.titleKa : service.titleEn}
                    </h2>

                    {/* Description */}
                    <p className="text-secondary text-base md:text-lg leading-relaxed mb-6 font-[520] italic text-justify">
                      {locale === 'ka' ? service.descriptionKa : service.descriptionEn}
                    </p>

                    {/* Items */}
                    {service.items.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.items.map((item, itemIdx) => (
                          <ScrollReveal key={item.id} delay={idx * 400 + itemIdx * 150}>
                            <div className="flex items-start gap-3 p-4 bg-cream border border-gray-100  transition-all duration-500 group/item">
                              <div className="flex-shrink-0 w-6 h-6 bg-gold/10 flex items-center justify-center mt-0.5">
                                <svg className="w-5 h-5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <p className="text-dark text-sm leading-relaxed group-hover/item:text-dark transition-colors duration-300 text-justify">
                                {locale === 'ka' ? item.textKa : item.textEn}
                              </p>
                            </div>
                          </ScrollReveal>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom separator */}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
