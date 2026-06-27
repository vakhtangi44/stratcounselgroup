import Link from 'next/link'
import HeroScrollIndicator from '@/components/ui/HeroScrollIndicator'
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

  // English is longer than the (space-less) Georgian motto and would wrap onto a
  // second line. Keep it on one line like the Georgian, shrinking it a step so it
  // always fits the container.
  const headingSize =
    locale === 'en'
      ? 'text-[1.06rem] sm:text-[1.59rem] md:text-[2.55rem] lg:text-[3.19rem] whitespace-nowrap'
      : 'text-[1.09rem] sm:text-[1.62rem] md:text-[2.71rem] lg:text-[3.26rem]'

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[234px] pb-20" style={{ background: '#1C122C' }}>

      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <h2 className="text-gold font-heading text-[1.53rem] sm:text-[2.3rem] md:text-[3.8rem] lg:text-[4.6rem] font-bold mb-4 tracking-[-0.02em] leading-[1.1] opacity-0 animate-slide-up-elegant" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
          Strategic Counsel Group
        </h2>

        {/* Animated gold divider */}
        <div className="flex justify-center mb-8">
          <div className="h-[1px] w-12 bg-gold opacity-0 animate-draw-line" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }} />
        </div>

        <h1 className={`font-heading ${headingSize} font-bold mb-8 leading-[1.1] tracking-[-0.02em]`}>
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-slide-up-elegant" style={{ animationDelay: '1400ms', animationFillMode: 'forwards' }}>
          <Link
            href={`${prefix}/contact`}
            className="btn-gold-fill bg-gold text-white px-10 py-4 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-500 hover:shadow-lg hover:shadow-gold/20"
          >
            <RichText html={strings.cta1} />
          </Link>
          <Link
            href={`${prefix}/services`}
            className="border border-white/30 text-white hover:border-gold hover:text-gold px-10 py-4 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-500"
          >
            <RichText html={strings.cta2} />
          </Link>
        </div>
      </div>


      {/* Scroll indicator */}
      <HeroScrollIndicator />
    </section>
  )
}
