import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface ServiceItem {
  id: number
  textKa: string
  textEn: string
  order: number
}

interface Service {
  id: number
  titleKa: string
  titleEn: string
  descriptionKa: string
  descriptionEn: string
  items: ServiceItem[]
}

interface Props {
  services: Service[]
  locale: string
}

export default function ServicesPreview({ services, locale }: Props) {
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <section className="py-[4rem] md:py-[9.1rem] bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-20">
          <p className="text-[12px] uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--typo-label-color, var(--color-dark))', fontFamily: 'var(--typo-label-font)' }}>
            {locale === 'ka' ? 'რას გთავაზობთ' : 'What We Offer'}
          </p>
          <h2 className="font-heading mb-4 gold-underline inline-block" style={{ fontSize: 'var(--typo-sectionTitle-size, 2.25rem)', color: 'var(--typo-sectionTitle-color, #1C122C)', fontFamily: 'var(--typo-sectionTitle-font)' }}>
            {locale === 'ka' ? 'ჩვენი სერვისები' : 'Our Services'}
          </h2>
          <p className="mt-6 max-w-2xl mx-auto leading-relaxed" style={{ fontSize: 'var(--typo-subtitle-size, 1.15rem)', color: 'var(--typo-subtitle-color, #5a5a6e)', fontFamily: 'var(--typo-subtitle-font)' }}>
            {locale === 'ka'
              ? 'სრული სამართლებრივი მხარდაჭერა ყველა ეტაპზე'
              : 'Complete legal support at every stage'}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 max-w-[120rem] mx-auto">
          {services.map((service, i) => {
            const colClass =
              i < 3
                ? 'lg:col-span-2'
                : i === 3
                ? 'lg:col-span-2 lg:col-start-2'
                : 'lg:col-span-2 lg:col-start-4'
            return (
            <ScrollReveal key={service.id} delay={i * 150} className={colClass}>
              <div className="relative h-full p-8 bg-white border border-gray-100 group card-hover hover:shadow-lg" style={{ transition: 'transform 0.7s, box-shadow 0.7s' }}>
                {/* Roman numeral */}
                <div className="text-dark font-heading text-5xl mb-4 leading-none">
                  {['I', 'II', 'III', 'IV', 'V'][i] || (i + 1).toString()}
                </div>

                <h3 className="font-heading mb-3 leading-snug" style={{ fontSize: 'var(--typo-serviceTitle-size, 1.46rem)', color: 'var(--typo-serviceTitle-color, #1C122C)', fontFamily: 'var(--typo-serviceTitle-font)' }}>
                  {locale === 'ka' ? service.titleKa.replace(/^[IVX]+\.\s*/, '') : service.titleEn.replace(/^[IVX]+\.\s*/, '')}
                </h3>

                <p className="font-light leading-relaxed mb-5 line-clamp-3 text-left" style={{ fontSize: 'var(--typo-serviceBody-size, 1.14rem)', color: 'var(--typo-serviceBody-color, #5a5a6e)', fontFamily: 'var(--typo-serviceBody-font)' }}>
                  {locale === 'ka' ? service.descriptionKa : service.descriptionEn}
                </p>

                {/* Show first 3 items */}
                <ul className="space-y-2 mb-4">
                  {service.items.slice(0, 3).map((item) => (
                    <li key={item.id} className="flex items-start gap-2 text-xs text-secondary">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{locale === 'ka' ? item.textKa : item.textEn}</span>
                    </li>
                  ))}
                  {service.items.length > 3 && (
                    <li className="text-xs text-dark/60 pl-5">
                      +{service.items.length - 3} {locale === 'ka' ? 'სხვა' : 'more'}
                    </li>
                  )}
                </ul>
              </div>
            </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal className="text-center mt-16">
          <Link
            href={`${prefix}/services`}
            className="inline-block bg-gold px-8 py-3.5 uppercase tracking-[0.15em] font-medium hover:bg-gold-dark transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            style={{ color: 'var(--typo-button-color, #fff)', fontSize: 'var(--typo-button-size, 0.875rem)', fontFamily: 'var(--typo-button-font)' }}
          >
            {locale === 'ka' ? 'ყველა სერვისი' : 'View All Services'}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
