import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import HeroScrollIndicator from '@/components/ui/HeroScrollIndicator'

export default async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations('hero')
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-navy overflow-hidden">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-dark/95 to-navy/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 bg-dark-pattern" />

      {/* Subtle geometric accent */}
      <div className="absolute top-1/4 right-0 w-96 h-96 border border-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 border border-gold/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <p className="text-gold font-heading text-sm md:text-base mb-6 tracking-[0.35em] uppercase">
          Strategic Counsel Group
        </p>

        {/* Gold divider */}
        <div className="gold-divider mx-auto mb-8" />

        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-[-0.02em]">
          {locale === 'ka' ? 'ხედვა. სტრატეგია. გავლენა.' : 'Insight. Strategy. Impact.'}
        </h1>

        <p className="text-white/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          {locale === 'ka'
            ? 'მაღალკვალიფიციური იურისტებისა და აუდიტორების გუნდი 20 წელზე მეტი გამოცდილებით საჯარო და კერძო სექტორში.'
            : 'A team of highly qualified lawyers and auditors with over 20 years of experience in public and private sectors.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`${prefix}/contact`}
            className="bg-gold hover:bg-gold-dark text-white px-10 py-4 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
          >
            {t('cta1')}
          </Link>
          <Link
            href={`${prefix}/practice-areas`}
            className="border border-white/30 text-white hover:bg-white hover:text-dark px-10 py-4 text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300"
          >
            {t('cta2')}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <HeroScrollIndicator />
    </section>
  )
}
