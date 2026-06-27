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
    <div className="pt-[220px]">
      {/* Services */}
      <section className="py-20 md:py-28 px-4 bg-white bg-subtle-pattern">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="font-heading text-3xl md:text-4xl text-dark mb-4">
              {locale === 'ka' ? 'ჩვენი სერვისები' : 'Our Services'}
            </h1>
            <p className="text-secondary text-lg font-light">
              {locale === 'ka'
                ? 'სრული სამართლებრივი მხარდაჭერა — მოლაპარაკებიდან სასამართლომდე.'
                : 'Complete legal support — from negotiation to courtroom.'}
            </p>
          </div>
          <div key={Date.now()} className="space-y-12">
            {services.map((service, idx) => (
              <ScrollReveal key={service.id} delay={idx * 400}>
                <div className="relative group">
                  {/* Gold left accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-gold via-gold/60 to-transparent" />

                  <div className="pl-8 md:pl-10">
                    {/* Title */}
                    <h2 className="font-heading text-2xl md:text-3xl text-dark mb-4 leading-tight">
                      {locale === 'ka' ? service.titleKa : service.titleEn}
                    </h2>

                    {/* Decorative divider */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="h-[1px] w-12 bg-gradient-to-r from-gold to-transparent" />
                      <div className="w-1.5 h-1.5 rotate-45 border border-gold/40" />
                    </div>

                    {/* Description */}
                    <p className="text-secondary text-base md:text-lg leading-relaxed mb-6 font-[520] italic text-justify">
                      {locale === 'ka' ? service.descriptionKa : service.descriptionEn}
                    </p>

                    {/* Items */}
                    {service.items.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.items.map((item, itemIdx) => (
                          <ScrollReveal key={item.id} delay={idx * 400 + itemIdx * 150}>
                            <div className="flex items-start gap-3 p-4 bg-cream border border-gray-100 hover:border-gold/30 transition-all duration-500 group/item">
                              <div className="flex-shrink-0 w-6 h-6 bg-gold/10 flex items-center justify-center mt-0.5">
                                <svg className="w-5 h-5" fill="none" stroke="#A8853A" viewBox="0 0 24 24" strokeWidth={3.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <p className="text-dark text-sm leading-relaxed group-hover/item:text-gold transition-colors duration-300 text-justify">
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

      {/* CTA */}
      <section className="relative bg-section-gradient py-20 md:py-28 text-center text-white px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-pattern" />
        <div className="relative z-10">
          <ScrollReveal>
            <div className="gold-divider mx-auto mb-8" />
            <h2 className="font-heading text-3xl md:text-4xl mb-10 tracking-[-0.01em]">
              {locale === 'ka' ? 'დაგვიკავშირდით' : 'Contact Us'}
            </h2>
            <Link
              href={`${prefix}/contact`}
              className="inline-block bg-gold text-white px-10 py-4 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gold-dark transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              {locale === 'ka' ? 'კონსულტაციის დაჯავშნა' : 'Book Consultation'}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
