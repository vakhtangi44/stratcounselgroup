import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations('hero')
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-dark">
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark/95 to-dark/80" />
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <p className="text-gold font-heading text-lg mb-4 tracking-widest uppercase">
          Strategic Counsel Group
        </p>
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight">
          {locale === 'ka' ? 'ხედვა. სტრატეგია. გავლენა.' : 'Vision. Strategy. Impact.'}
        </h1>
        <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
          {locale === 'ka'
            ? 'გამოცდილი სამართლებრივი გუნდი, რომელიც იცავს თქვენს ინტერესებს'
            : 'An experienced legal team protecting your interests at every step'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`${prefix}/contact`}
            className="bg-gold hover:bg-gold-dark text-white px-8 py-3 font-medium transition-colors"
          >
            {t('cta1')}
          </Link>
          <Link
            href={`${prefix}/practice-areas`}
            className="border border-white text-white hover:bg-white hover:text-dark px-8 py-3 font-medium transition-colors"
          >
            {t('cta2')}
          </Link>
        </div>
      </div>
    </section>
  )
}
