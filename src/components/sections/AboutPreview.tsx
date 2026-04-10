'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import RichText from '@/components/ui/RichText'
import Link from 'next/link'

interface Props {
  locale: string
  strings: {
    heading: string
    body: string
    stat: string
    statLabel: string
    cta: string
    image: string
  }
}

export default function AboutPreview({ locale, strings }: Props) {
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch max-w-6xl mx-auto">

          {/* Left: text + stat box */}
          <ScrollReveal className="flex flex-col justify-center">
            <div className="w-12 h-[2px] bg-gold mb-8" />
            <RichText
              html={strings.heading}
              as="h2"
              className="font-heading text-3xl md:text-4xl text-dark mb-8 leading-tight"
            />
            <RichText
              html={strings.body}
              as="div"
              className="text-dark/70 text-base md:text-lg leading-relaxed mb-8"
            />

            {/* Stat box */}
            {(strings.stat || strings.statLabel) && (
              <div className="border border-gold/40 p-5 inline-flex items-center gap-5 mb-8">
                <span className="font-heading text-4xl md:text-5xl text-gold leading-none">
                  {strings.stat}
                </span>
                <RichText
                  html={strings.statLabel}
                  as="p"
                  className="text-dark/60 text-sm leading-snug max-w-[220px]"
                />
              </div>
            )}

            {strings.cta && (
              <Link
                href={`${prefix}/about`}
                className="inline-block text-gold text-sm uppercase tracking-[0.15em] font-medium border-b border-gold/40 pb-1 hover:border-gold transition-colors duration-300 self-start"
              >
                {strings.cta} →
              </Link>
            )}
          </ScrollReveal>

          {/* Right: photo */}
          <ScrollReveal delay={150} className="min-h-[400px] lg:min-h-[500px]">
            {strings.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={strings.image}
                alt={strings.heading}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-[400px] bg-navy/5 border border-gray-100 flex items-center justify-center">
                <p className="text-dark/30 text-sm text-center px-8">
                  {locale === 'ka'
                    ? 'ფოტო არ არის დამატებული — დაამატეთ Admin → Settings → "About Photo"'
                    : 'No photo set — add one in Admin → Settings → "About Photo"'}
                </p>
              </div>
            )}
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
