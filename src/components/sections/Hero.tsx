import Link from 'next/link'
import HeroScrollIndicator from '@/components/ui/HeroScrollIndicator'
import HeroAnimations from '@/components/ui/HeroAnimations'
import RichText from '@/components/ui/RichText'

interface HeroStrings {
  heading: string
  subtitle: string
  cta1: string
  cta2: string
}

export default async function Hero({ locale, strings }: { locale: string; strings: HeroStrings }) {
  const prefix = locale === 'en' ? '/en' : ''

  const headline = strings.heading
  const hasHtml = /<[a-z][\s\S]*>/i.test(headline)
  const words = hasHtml ? [] : headline.split(' ')

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-navy overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-dark/95 to-navy/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 bg-dark-pattern" />

      {/* Breathing background element */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/3 animate-breathe" />

      {/* Subtle geometric accent */}
      <div className="absolute top-1/4 right-0 w-96 h-96 border border-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 border border-gold/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold/15 hidden md:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-gold/15 hidden md:block" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-gold/15 hidden md:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold/15 hidden md:block" />

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <p className="text-gold font-heading text-sm md:text-base mb-6 tracking-[0.35em] uppercase opacity-0 animate-slide-up-elegant" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          Strategic Counsel Group
        </p>

        {/* Animated gold divider */}
        <div className="flex justify-center mb-8">
          <div className="h-[1px] w-12 bg-gold opacity-0 animate-draw-line" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }} />
        </div>

        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-[-0.02em]">
          {hasHtml ? (
            <RichText
              html={headline}
              className="opacity-0 animate-slide-up-elegant"
              style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
            />
          ) : (
            words.map((word, i) => (
              <span
                key={i}
                className="inline-block opacity-0 animate-slide-up-elegant mr-[0.3em]"
                style={{ animationDelay: `${800 + i * 200}ms`, animationFillMode: 'forwards' }}
              >
                {word}
              </span>
            ))
          )}
        </h1>

        <RichText html={strings.subtitle} as="p" className="text-white/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light opacity-0 animate-slide-up-elegant" style={{ animationDelay: '1400ms', animationFillMode: 'forwards' }} />

        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-slide-up-elegant" style={{ animationDelay: '1800ms', animationFillMode: 'forwards' }}>
          <Link
            href={`${prefix}/contact`}
            className="btn-gold-fill bg-gold text-white px-10 py-4 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-500 hover:shadow-lg hover:shadow-gold/20"
          >
            <RichText html={strings.cta1} />
          </Link>
          <Link
            href={`${prefix}/practice-areas`}
            className="border border-white/30 text-white hover:border-gold hover:text-gold px-10 py-4 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-500"
          >
            <RichText html={strings.cta2} />
          </Link>
        </div>
      </div>

      {/* Animated gold line across screen */}
      <HeroAnimations />

      {/* Scroll indicator */}
      <HeroScrollIndicator />
    </section>
  )
}
