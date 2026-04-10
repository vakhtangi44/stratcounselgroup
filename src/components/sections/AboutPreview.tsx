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
    imagePosition: string
    imageSize: string
  }
}

const SIZE_MAP: Record<string, string> = {
  small: 'lg:min-h-[350px]',
  medium: 'lg:min-h-[500px]',
  large: 'lg:min-h-[650px]',
  xlarge: 'lg:min-h-[800px]',
}

export default function AboutPreview({ locale, strings }: Props) {
  const prefix = locale === 'en' ? '/en' : ''

  const hasImage =
    strings.image &&
    strings.image !== 'section.about.image' &&
    strings.image.trim() !== ''

  const imageOnLeft = strings.imagePosition === 'left'
  const sizeClass = SIZE_MAP[strings.imageSize] || SIZE_MAP.medium

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className={`grid grid-cols-1 gap-12 lg:gap-16 items-stretch max-w-6xl mx-auto${hasImage ? ' lg:grid-cols-2' : ''}`}>

          {/* Left: text + stat box */}
          <ScrollReveal className={`flex flex-col justify-center${hasImage && imageOnLeft ? ' lg:order-2' : ''}`}>
            <div className="w-12 h-[2px] bg-gold mb-8" />
            <RichText
              html={strings.heading}
              as="h2"
              className="font-heading text-3xl md:text-4xl text-dark mb-8 leading-tight"
            />
            <RichText
              html={strings.body}
              as="div"
              className="text-navy text-base md:text-lg leading-relaxed mb-8 [&_p]:mb-4 [&_p]:text-justify [&_p:last-child]:mb-0"
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

          {/* Right: photo — only rendered when image URL is set */}
          {hasImage && (
            <ScrollReveal delay={150} className={`min-h-[400px] ${sizeClass}${imageOnLeft ? ' lg:order-1' : ''}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={strings.image}
                alt={strings.heading}
                className="w-full h-full object-cover"
              />
            </ScrollReveal>
          )}

        </div>
      </div>
    </section>
  )
}
