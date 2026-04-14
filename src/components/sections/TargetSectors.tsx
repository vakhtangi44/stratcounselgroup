'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GoldDivider from '@/components/ui/GoldDivider'

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
    <section className="py-20 md:py-28 bg-section-gradient text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
            {isKa ? 'სამიზნე სექტორები' : 'Target Sectors'}
          </h2>
          <GoldDivider className="mt-8" />
        </ScrollReveal>

        {/* All sectors — centered, wrap to new row when needed */}
        <div className="flex flex-wrap justify-center gap-4 max-w-[88rem] mx-auto">
          {sectors.map((sector, i) => {
            const cardContent = (
              <div className="group text-center">
                <div className="relative overflow-hidden h-48 md:h-64 rounded-sm mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sector.image}
                    alt={sector.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/10 transition-colors duration-500" />
                </div>
                <p className="text-white/80 group-hover:text-gold font-semibold text-sm md:text-base uppercase tracking-[0.06em] transition-colors duration-300 px-2">
                  {sector.name}
                </p>
              </div>
            )

            return (
              <ScrollReveal
                key={sector.slug}
                delay={i * 100}
                className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] lg:w-[calc(20%-0.8rem)]"
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
