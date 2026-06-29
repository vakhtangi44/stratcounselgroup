'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'


interface SectorItem {
  slug: string
  name: string
  image: string
}

interface Props {
  locale: string
  sectors: SectorItem[]
  enabled: boolean
}

export default function TargetSectors({ locale, sectors, enabled }: Props) {
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'

  if (sectors.length === 0) return null

  return (
    <section className="py-[3.25rem] md:py-[9.1rem] bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-5 md:mb-[4.5rem]">
          <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
          <h2 className="font-heading mb-4" style={{ fontSize: 'var(--typo-sectionTitle-size, 2.25rem)', color: 'var(--typo-sectionTitle-color, #1C122C)', fontFamily: 'var(--typo-sectionTitle-font)' }}>
            {isKa ? 'სამიზნე სექტორები' : 'Target Sectors'}
          </h2>
        </ScrollReveal>

        {/* All sectors — centered, wrap to new row when needed */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-[88rem] mx-auto">
          {sectors.map((sector, i) => {
            const cardContent = (
              <div className="group text-center">
                <div className="relative overflow-hidden h-32 sm:h-56 md:h-72 rounded-sm mb-3 md:mb-[4.5rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sector.image}
                    alt={sector.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/10 transition-colors duration-500" />
                </div>
                <p className="text-dark/80 group-hover:text-gold font-semibold text-sm md:text-base uppercase tracking-[0.06em] transition-colors duration-300 px-2">
                  {sector.name}
                </p>
              </div>
            )

            return (
              <ScrollReveal
                key={sector.slug}
                delay={i * 100}
                className=""
              >
                {enabled ? (
                  <Link href={`${prefix}/sectors/${sector.slug}`} className="block">
                    {cardContent}
                  </Link>
                ) : (
                  cardContent
                )}
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
