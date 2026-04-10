'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import GoldDivider from '@/components/ui/GoldDivider'

const SECTORS = [
  {
    nameKa: 'გადაზიდვები',
    nameEn: 'Transportation & Logistics',
    image: '/images/sectors/transport.jpg',
  },
  {
    nameKa: 'ენერგეტიკა',
    nameEn: 'Energy',
    image: '/images/sectors/energy.jpg',
  },
  {
    nameKa: 'ინფრასტრუქტურა',
    nameEn: 'Infrastructure',
    image: '/images/sectors/infrastructure.jpg',
  },
  {
    nameKa: 'მედიცინა',
    nameEn: 'Medicine & Healthcare',
    image: '/images/sectors/medicine.jpg',
  },
  {
    nameKa: 'მშენებლობა',
    nameEn: 'Construction',
    image: '/images/sectors/construction.jpg',
  },
]

export default function TargetSectors({ locale }: { locale: string }) {
  const isKa = locale === 'ka'

  return (
    <section className="py-20 md:py-28 bg-navy text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <p className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4">
            {isKa ? 'ჩვენი გამოცდილება' : 'Our Expertise'}
          </p>
          <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
            {isKa ? 'სამიზნე სექტორები' : 'Target Sectors'}
          </h2>
          <GoldDivider className="mt-8" />
        </ScrollReveal>

        {/* 3 + 2 grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {SECTORS.map((sector, i) => (
            <ScrollReveal
              key={sector.nameEn}
              delay={i * 100}
              className={
                i < 3
                  ? 'lg:col-span-2'
                  : i === 3
                  ? 'lg:col-span-2 lg:col-start-2'
                  : 'lg:col-span-2 lg:col-start-4'
              }
            >
              <div className="relative overflow-hidden group h-64 md:h-72">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sector.image}
                  alt={isKa ? sector.nameKa : sector.nameEn}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-navy/55 group-hover:bg-navy/40 transition-colors duration-500" />
                {/* Bottom shadow for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Sector name */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white font-medium text-xl md:text-2xl text-center px-6 drop-shadow-lg tracking-wide">
                    {isKa ? sector.nameKa : sector.nameEn}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
