'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Testimonial } from '@prisma/client'
import RichText from '@/components/ui/RichText'

interface Props {
  testimonials: Testimonial[]
  locale: string
  strings: {
    subtitle: string
    title: string
  }
}

export default function TestimonialsCarousel({ testimonials, locale, strings }: Props) {
  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)

  const goTo = useCallback((i: number) => {
    setFade(false)
    setTimeout(() => {
      setIdx(i)
      setFade(true)
    }, 300)
  }, [])

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return
    const timer = setInterval(() => {
      goTo((idx + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [idx, testimonials.length, goTo])

  if (testimonials.length === 0) return null
  const t = testimonials[idx]

  return (
    <section className="py-20 md:py-28 bg-white bg-subtle-pattern">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <RichText html={strings.subtitle} as="p" className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4" />
        <RichText html={strings.title} as="h2" className="font-heading text-3xl md:text-4xl text-dark mb-16 gold-underline inline-block" />

        <div className={`transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          {/* Large decorative quote marks */}
          <div className="text-gold/20 font-heading text-8xl md:text-9xl leading-none mb-2 select-none">&ldquo;</div>

          <blockquote className="text-dark text-xl md:text-2xl leading-relaxed mb-8 font-heading font-normal -mt-12">
            {locale === 'ka' ? t.quoteKa : t.quoteEn}
          </blockquote>

          {/* Gold divider */}
          <div className="gold-divider mx-auto mb-6" />

          <p className="font-heading text-dark text-lg tracking-wide">{t.clientName}</p>
          <div className="flex justify-center gap-1 mt-3">
            {Array.from({ length: t.rating }).map((_, i) => (
              <span key={i} className="text-gold text-sm">
                &#9733;
              </span>
            ))}
          </div>
        </div>

        {testimonials.length > 1 && (
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all duration-500 rounded-full ${
                  i === idx
                    ? 'w-8 h-2 bg-gold'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gold/50'
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
