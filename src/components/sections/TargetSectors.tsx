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
    <section className="py-20 md:py-28 bg-dark text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
            {isKa ? 'სამიზნე სექტორები' : 'Target Sectors'}
          </h2>
          <GoldDivider className="mt-8" />
        </ScrollReveal>

        {/* Adaptive grid: if 5 sectors use 3+2 layout, else centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 max-w-[1075px] mx-auto">
          {sectors.map((sector, i) => {
            const cardContent = (
              <div className="relative overflow-hidden group h-64 md:h-72">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sector.image}
                  alt={sector.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy/55 group-hover:bg-navy/40 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white font-medium text-xl md:text-2xl text-center px-6 drop-shadow-lg tracking-wide">
                    {sector.name}
                  </p>
                </div>
              </div>
            )

            const className =
              i < 3
                ? 'lg:col-span-2'
                : i === 3
                ? 'lg:col-span-2 lg:col-start-2'
                : 'lg:col-span-2 lg:col-start-4'

            return (
              <ScrollReveal key={sector.slug} delay={i * 100} className={className}>
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
