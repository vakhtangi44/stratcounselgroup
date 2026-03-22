import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GoldDivider from '@/components/ui/GoldDivider'

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
    <section className="py-20 md:py-28 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4">
            {locale === 'ka' ? 'რას ვთავაზობთ' : 'What We Offer'}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-dark mb-4 gold-underline inline-block">
            {locale === 'ka' ? 'ჩვენი სერვისები' : 'Our Services'}
          </h2>
          <p className="text-secondary mt-6 max-w-2xl mx-auto text-base leading-relaxed">
            {locale === 'ka'
              ? 'სრული სამართლებრივი მხარდაჭერა ყველა ეტაპზე.'
              : 'Complete legal support at every stage.'}
          </p>
          <GoldDivider className="mt-8" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 150}>
              <div className="relative h-full p-8 bg-white border border-gray-100 hover:border-gold/40 transition-all duration-700 group hover:shadow-lg hover:shadow-gold/5">
                {/* Gold left border on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />

                {/* Roman numeral */}
                <div className="text-gold/20 font-heading text-5xl mb-4 leading-none">
                  {['I', 'II', 'III'][i] || (i + 1).toString()}
                </div>

                <h3 className="font-heading text-lg text-dark mb-3 leading-snug group-hover:text-gold transition-colors duration-500">
                  {locale === 'ka' ? service.titleKa.replace(/^[IVX]+\.\s*/, '') : service.titleEn.replace(/^[IVX]+\.\s*/, '')}
                </h3>

                <p className="text-secondary text-sm font-light leading-relaxed mb-5 line-clamp-3">
                  {locale === 'ka' ? service.descriptionKa : service.descriptionEn}
                </p>

                {/* Show first 3 items */}
                <ul className="space-y-2 mb-4">
                  {service.items.slice(0, 3).map((item) => (
                    <li key={item.id} className="flex items-start gap-2 text-xs text-secondary">
                      <svg className="w-3 h-3 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{locale === 'ka' ? item.textKa : item.textEn}</span>
                    </li>
                  ))}
                  {service.items.length > 3 && (
                    <li className="text-xs text-gold/60 pl-5">
                      +{service.items.length - 3} {locale === 'ka' ? 'სხვა' : 'more'}
                    </li>
                  )}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <Link
            href={`${prefix}/services`}
            className="inline-block bg-gold text-white px-8 py-3.5 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gold-dark transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
          >
            {locale === 'ka' ? 'ყველა სერვისი' : 'View All Services'}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
