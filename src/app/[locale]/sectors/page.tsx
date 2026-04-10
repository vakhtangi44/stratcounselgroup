import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { SECTORS } from '@/lib/sectors'
import ScrollReveal from '@/components/ui/ScrollReveal'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: locale === 'ka'
      ? 'სექტორები | Strategic Counsel Group'
      : 'Sectors | Strategic Counsel Group',
    description: locale === 'ka'
      ? 'Strategic Counsel Group — სამიზნე სექტორები: გადაზიდვები, ენერგეტიკა, ინფრასტრუქტურა, მედიცინა, მშენებლობა.'
      : 'Strategic Counsel Group — target sectors: transportation, energy, infrastructure, medicine, construction.',
  }
}

export default async function SectorsPage() {
  const locale = await getLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'

  return (
    <div className="pt-[130px]">
      <section className="relative bg-navy text-white py-24 md:py-32 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-pattern" />
        <div className="relative z-10">
          <p className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4">
            {isKa ? 'ჩვენი გამოცდილება' : 'Our Expertise'}
          </p>
          <div className="gold-divider mx-auto mb-8" />
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 tracking-[-0.02em]">
            {isKa ? 'სამიზნე სექტორები' : 'Target Sectors'}
          </h1>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-navy text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTORS.map((sector, i) => (
              <ScrollReveal key={sector.slug} delay={i * 100}>
                <Link
                  href={`${prefix}/sectors/${sector.slug}`}
                  className="relative overflow-hidden group h-72 block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sector.image}
                    alt={isKa ? sector.nameKa : sector.nameEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy/55 group-hover:bg-navy/40 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white font-medium text-xl md:text-2xl text-center px-6 drop-shadow-lg tracking-wide">
                      {isKa ? sector.nameKa : sector.nameEn}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
