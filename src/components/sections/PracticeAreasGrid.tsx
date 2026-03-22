import Link from 'next/link'
import { PRACTICE_AREAS } from '@/lib/practice-areas'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function PracticeAreasGrid({ locale }: { locale: string }) {
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <section className="py-20 md:py-28 bg-white bg-subtle-pattern">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4">
            {locale === 'ka' ? 'რას ვაკეთებთ' : 'What We Do'}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-dark mb-4 gold-underline inline-block">
            {locale === 'ka' ? 'პრაქტიკის სფეროები' : 'Practice Areas'}
          </h2>
          <p className="text-secondary mt-6 max-w-2xl mx-auto text-base leading-relaxed">
            {locale === 'ka'
              ? 'ჩვენ გთავაზობთ სრულყოფილ იურიდიულ მომსახურებას ბიზნესის ყველა ეტაპზე.'
              : 'We provide comprehensive legal services at every stage of your business journey.'}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {PRACTICE_AREAS.map((area, i) => (
            <ScrollReveal key={area.slug} delay={i * 80}>
              <Link
                href={`${prefix}/practice-areas/${area.slug}`}
                className="group block p-7 border border-gray-100 hover:border-gold/30 transition-all duration-500 text-left relative overflow-hidden bg-white hover:shadow-lg hover:shadow-gold/5"
              >
                {/* Gold left border on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                <span className="text-3xl mb-4 block">{area.icon}</span>
                <p className="text-sm font-medium text-dark group-hover:text-gold transition-colors duration-300 leading-snug">
                  {locale === 'ka' ? area.nameKa : area.nameEn}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
