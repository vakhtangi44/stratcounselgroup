'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { SECTORS } from '@/lib/sectors'

export default function TargetSectors({ locale }: { locale: string }) {
  const isKa = locale === 'ka'
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <section className="py-20 md:py-28 bg-navy text-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* 3 + 2 grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {SECTORS.map((sector, i) => (
            <ScrollReveal
              key={sector.slug}
              delay={i * 100}
              className={
                i < 3
                  ? 'lg:col-span-2'
                  : i === 3
                  ? 'lg:col-span-2 lg:col-start-2'
                  : 'lg:col-span-2 lg:col-start-4'
              }
            >
              <Link
                href={`${prefix}/sectors/${sector.slug}`}
                className="relative overflow-hidden group h-64 md:h-72 block"
              >
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
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
