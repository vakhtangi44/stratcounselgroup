'use client'

import { useState } from 'react'
import type { Testimonial } from '@prisma/client'

interface Props {
  testimonials: Testimonial[]
  locale: string
}

export default function TestimonialsCarousel({ testimonials, locale }: Props) {
  const [idx, setIdx] = useState(0)
  if (testimonials.length === 0) return null
  const t = testimonials[idx]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="font-heading text-3xl text-dark mb-12">
          {locale === 'ka' ? 'კლიენტების შეფასება' : 'Client Testimonials'}
        </h2>
        <blockquote className="text-secondary text-lg leading-relaxed mb-6 italic">
          &ldquo;{locale === 'ka' ? t.quoteKa : t.quoteEn}&rdquo;
        </blockquote>
        <p className="font-heading text-dark">{t.clientName}</p>
        <div className="flex justify-center gap-1 mt-2 mb-8">
          {Array.from({ length: t.rating }).map((_, i) => (
            <span key={i} className="text-gold">
              ★
            </span>
          ))}
        </div>
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === idx ? 'bg-gold' : 'bg-gray-300'}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
