import Link from 'next/link'
import { PRACTICE_AREAS } from '@/lib/practice-areas'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import RichText from '@/components/ui/RichText'

interface Props {
  locale: string
  strings: {
    subtitle: string
    title: string
    description: string
  }
}

export default function PracticeAreasGrid({ locale, strings }: Props) {
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <section className="py-20 md:py-28 bg-white bg-subtle-pattern bg-linen">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <RichText html={strings.subtitle} as="p" className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4" />
          <RichText html={strings.title} as="h2" className="font-heading text-3xl md:text-4xl text-dark mb-4 gold-underline inline-block" />
          <RichText html={strings.description} as="p" className="text-secondary mt-6 max-w-2xl mx-auto text-base leading-relaxed" />
          <GoldDivider className="mt-8" />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {PRACTICE_AREAS.map((area, i) => (
            <ScrollReveal key={area.slug} delay={i * 120}>
              <Link
                href={`${prefix}/practice-areas/${area.slug}`}
                className="group block p-7 border border-gray-100 hover:border-gold/40 transition-all duration-700 text-left relative overflow-hidden bg-white hover:shadow-lg hover:shadow-gold/5"
              >
                {/* Gold left border on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />

                {/* Small diamond decorative element in top-right */}
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rotate-45 border border-gold/0 group-hover:border-gold/40 transition-all duration-700 delay-200" />

                <span className="text-3xl mb-4 block">{area.icon}</span>
                <p className="text-sm font-medium text-dark group-hover:text-gold transition-colors duration-500 leading-snug">
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
