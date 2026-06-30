import Link from 'next/link'
import HeroScrollIndicator from '@/components/ui/HeroScrollIndicator'
import RichText from '@/components/ui/RichText'

interface HeroStrings {
  heading: string
  subtitle: string
  cta1: string
  cta2: string
}

export default async function Hero({ locale, strings, dotsColor = '#d88551' }: { locale: string; strings: HeroStrings; dotsColor?: string }) {
  const prefix = locale === 'en' ? '/en' : ''

  const rawHeadline = strings.heading
  const dotSpan = `<span style="color:#1C122C;font-weight:700;margin:0 0.05em;font-size:0.64em">.</span>`
  const stripped = rawHeadline.replace(/<[^>]*>/g, '')
  let headline: string
  if (stripped.includes('.')) {
    headline = rawHeadline.replace(/\.\s?/g, dotSpan)
  } else {
    const words = stripped.trim().split(/\s+/)
    headline = words.join(dotSpan + ' ') + dotSpan
  }

  // English is longer than the (space-less) Georgian motto and would wrap onto a
  // second line. Keep it on one line like the Georgian, shrinking it a step so it
  // always fits the container.
  const headingSize =
    locale === 'en'
      ? 'text-[1.06rem] sm:text-[1.59rem] md:text-[2.55rem] lg:text-[3.19rem] whitespace-nowrap'
      : 'text-[1.06rem] sm:text-[1.59rem] md:text-[2.55rem] lg:text-[3.19rem]'

  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden pt-[130px] md:pt-[230px] pb-[36px] md:pb-[83px] bg-white">

      <div className="relative z-10 text-center px-4 lg:px-8 max-w-6xl mx-auto">
        <h2
          className="font-heading text-[1.53rem] sm:text-[2.3rem] md:text-[3.8rem] font-bold mb-9 tracking-[-0.02em] leading-[1.1]"
          style={{ color: 'var(--typo-heroTitle-color, #1C122C)', fontFamily: 'var(--typo-heroTitle-font)', fontSize: `clamp(1.53rem, 5vw, var(--typo-heroTitle-size, 4.6rem))` }}
        >
          Strategic Counsel Group
        </h2>

        <h1
          className={`font-heading ${headingSize} font-bold mb-9 leading-[1.1] tracking-[-0.02em]`}
          style={{ color: 'var(--typo-heroTagline-color, #1C122C)', fontFamily: 'var(--typo-heroTagline-font)', fontSize: `clamp(1.06rem, 3.5vw, var(--typo-heroTagline-size, 3.19rem))` }}
        >
          <RichText html={headline} />
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`${prefix}/contact`}
            className="btn-gold-fill bg-gold px-10 py-4 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-500 hover:shadow-lg hover:shadow-gold/20"
            style={{ color: 'var(--typo-button-color, #fff)', fontSize: 'var(--typo-button-size, 0.875rem)', fontFamily: 'var(--typo-button-font)' }}
          >
            <RichText html={strings.cta1} />
          </Link>
          <Link
            href={`${prefix}/services`}
            className="border border-dark/30 text-dark hover:border-gold hover:text-gold px-10 py-4 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-500"
            style={{ fontSize: 'var(--typo-button-size, 0.875rem)', fontFamily: 'var(--typo-button-font)' }}
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
