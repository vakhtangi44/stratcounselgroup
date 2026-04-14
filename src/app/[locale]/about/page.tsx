import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { db } from '@/lib/db'
import { getSettings, s } from '@/lib/settings'
import { unstable_noStore as noStore } from 'next/cache'
import RichText from '@/components/ui/RichText'
import AboutPreview from '@/components/sections/AboutPreview'
import { AboutValueIcon } from '@/lib/about-value-icons'

export default async function AboutPage() {
  noStore()
  const locale = await getLocale()
  const [advantages, values, settings] = await Promise.all([
    db.advantage.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    db.aboutValue.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    getSettings(),
  ])
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <div className="pt-[221px]">
      {/* Hero */}
      <section className="relative bg-section-gradient text-white py-24 md:py-32 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-pattern" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/5 rounded-full" />

        <div className="relative z-10">
          <RichText html={s(settings, 'about.subtitle', locale)} as="p" className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4" />
          <div className="gold-divider mx-auto mb-8" />
          <RichText html={s(settings, 'about.heading', locale)} as="h1" className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 tracking-[-0.02em]" />
        </div>
      </section>

      {/* About body — white section, same style as homepage AboutPreview */}
      <AboutPreview
        locale={locale}
        strings={{
          heading: s(settings, 'about.heading', locale),
          body: s(settings, 'about.pageBody', locale),
          stat: s(settings, 'about.pageStat', locale),
          statLabel: s(settings, 'about.pageStatLabel', locale),
          cta: '',
          image: s(settings, 'about.pageImage', locale),
          imagePosition: s(settings, 'about.pageImagePosition', locale),
          imageSize: s(settings, 'about.pageImageSize', locale),
        }}
      />

      {/* Advantages */}
      <section className="py-20 md:py-28 px-4 bg-white bg-subtle-pattern">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal className="text-center mb-16">
            <RichText html={s(settings, 'about.whyUs.subtitle', locale)} as="p" className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4" />
            <RichText html={s(settings, 'about.whyUs', locale)} as="h2" className="font-heading text-3xl md:text-4xl text-dark gold-underline inline-block" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {advantages.map((v, i) => (
              <ScrollReveal key={v.id} delay={i * 100}>
                <div className="flex items-start gap-4 p-6 bg-cream border border-gray-100 hover:border-gold/30 transition-all duration-500 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-gold/10 flex items-center justify-center mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="#A8853A" viewBox="0 0 24 24" strokeWidth={3.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-dark text-base leading-relaxed">{locale === 'ka' ? v.titleKa : v.titleEn}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 px-4 bg-cream">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal className="text-center mb-16">
            <RichText html={s(settings, 'about.values.subtitle', locale)} as="p" className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4" />
            <RichText html={s(settings, 'about.values', locale)} as="h2" className="font-heading text-3xl md:text-4xl text-dark gold-underline inline-block" />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {values.map((v, i) => {
              const total = values.length
              const remainder = total % 3
              const lastRowStart = total - remainder
              let colClass = 'lg:col-span-2'
              if (remainder && i >= lastRowStart) {
                if (remainder === 1) colClass = 'lg:col-span-2 lg:col-start-3'
                else if (remainder === 2) {
                  colClass = i === lastRowStart ? 'lg:col-span-2 lg:col-start-2' : 'lg:col-span-2 lg:col-start-4'
                }
              }
              return (
                <ScrollReveal key={v.id} delay={i * 150} className={colClass}>
                  <div className="text-center p-8 bg-white border border-gray-100 hover:border-gold hover:bg-gold transition-all duration-500 group hover:shadow-xl hover:shadow-gold/30 hover:scale-[1.2] h-full cursor-pointer">
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-gold border border-gold/20 group-hover:text-white group-hover:border-white transition-all duration-500">
                      <AboutValueIcon icon={v.icon} />
                    </div>
                    <h3 className="font-heading text-xl text-dark group-hover:text-white mb-3 transition-colors duration-500">
                      {locale === 'ka' ? v.titleKa : v.titleEn}
                    </h3>
                    <p className="text-secondary text-sm font-light leading-relaxed text-justify group-hover:text-white/90 transition-colors duration-500">
                      {locale === 'ka' ? v.descriptionKa : v.descriptionEn}
                    </p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-section-gradient py-20 md:py-28 text-center text-white px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-pattern" />
        <div className="relative z-10">
          <ScrollReveal>
            <div className="gold-divider mx-auto mb-8" />
            <RichText html={s(settings, 'about.cta.heading', locale)} as="h2" className="font-heading text-3xl md:text-4xl mb-10 tracking-[-0.01em]" />
            {s(settings, 'about.cta.description', locale) && (
              <RichText html={s(settings, 'about.cta.description', locale)} as="p" className="text-white/40 mb-10 max-w-lg mx-auto font-light" />
            )}
            <Link
              href={`${prefix}/contact`}
              className="inline-block bg-gold text-white px-10 py-4 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gold-dark transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
            >
              <RichText html={s(settings, 'about.cta.button', locale)} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
