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
  }
}

export default function AboutPreview({ locale, strings }: Props) {
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Left: text */}
          <ScrollReveal>
            <div className="w-12 h-[2px] bg-gold mb-8" />
            <RichText
              html={strings.heading}
              as="h2"
              className="font-heading text-3xl md:text-4xl text-dark mb-8 leading-tight"
            />
            <RichText
              html={strings.body}
              as="div"
              className="text-dark/70 text-lg leading-relaxed"
            />
            {strings.cta && (
              <Link
                href={`${prefix}/about`}
                className="inline-block mt-8 text-gold text-sm uppercase tracking-[0.15em] font-medium border-b border-gold/40 pb-1 hover:border-gold transition-colors duration-300"
              >
                {strings.cta} →
              </Link>
            )}
          </ScrollReveal>

          {/* Right: stat box */}
          <ScrollReveal delay={150}>
            <div className="border border-gold/40 p-10 flex flex-col items-start gap-3">
              <span className="font-heading text-5xl md:text-6xl text-gold leading-none">
                {strings.stat}
              </span>
              <RichText
                html={strings.statLabel}
                as="p"
                className="text-dark/60 text-base leading-relaxed max-w-xs"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
