import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { db } from '@/lib/db'
import { getSettings, s } from '@/lib/settings'
import { unstable_noStore as noStore } from 'next/cache'
import RichText from '@/components/ui/RichText'
import AboutPreview from '@/components/sections/AboutPreview'

export default async function AboutPage() {
  noStore()
  const locale = await getLocale()
  const [advantages, settings] = await Promise.all([
    db.advantage.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    getSettings(),
  ])
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <div className="pt-[170px]">
      {/* Hero */}
      <section className="relative bg-navy text-white py-24 md:py-32 text-center px-4 overflow-hidden">
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
            {[
              {
                // Scales of justice (სამართალი)
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                  </svg>
                ),
                titleKey: 'about.value1.title',
                descKey: 'about.value1.desc',
              },
              {
                // Presentation chart (სტრატეგია)
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                  </svg>
                ),
                titleKey: 'about.value2.title',
                descKey: 'about.value2.desc',
              },
              {
                // Users group (პროექტის მართვა)
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                ),
                titleKey: 'about.value3.title',
                descKey: 'about.value3.desc',
              },
              {
                // Magnifying glass (ალტერნატიული გამოძიება)
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                ),
                titleKey: 'about.value4.title',
                descKey: 'about.value4.desc',
              },
              {
                // Clipboard with checkmark (ექსპერტიზა)
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                ),
                titleKey: 'about.value5.title',
                descKey: 'about.value5.desc',
              },
            ].map((v, i) => {
              const colClass =
                i < 3
                  ? 'lg:col-span-2'
                  : i === 3
                  ? 'lg:col-span-2 lg:col-start-2'
                  : 'lg:col-span-2 lg:col-start-4'
              return (
                <ScrollReveal key={v.titleKey} delay={i * 150} className={colClass}>
                  <div className="text-center p-8 bg-white border border-gray-100 hover:border-gold hover:bg-gold transition-all duration-500 group hover:shadow-xl hover:shadow-gold/30 hover:scale-[1.2] h-full cursor-pointer">
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-gold border border-gold/20 group-hover:text-white group-hover:border-white transition-all duration-500">
                      {v.icon}
                    </div>
                    <RichText html={s(settings, v.titleKey, locale)} as="h3" className="font-heading text-xl text-dark group-hover:text-white mb-3 transition-colors duration-500" />
                    <RichText html={s(settings, v.descKey, locale)} as="p" className="text-secondary text-sm font-light leading-relaxed text-justify group-hover:text-white/90 transition-colors duration-500" />
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-dark py-20 md:py-28 text-center text-white px-4 overflow-hidden">
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
