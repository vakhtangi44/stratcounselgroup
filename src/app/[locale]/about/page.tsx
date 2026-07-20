import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { db } from '@/lib/db'
import { getSettings, s } from '@/lib/settings'
import { unstable_noStore as noStore } from 'next/cache'
import RichText from '@/components/ui/RichText'
import AboutPreview from '@/components/sections/AboutPreview'
import { AboutValueIcon } from '@/lib/about-value-icons'
import { CaseIcon } from '@/lib/case-icons'

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
    <div className="pt-[110px] md:pt-[166px]">
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
      <section className="py-[4rem] md:py-[9.1rem] px-4 lg:px-8" style={{ background: 'white' }}>
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal className="text-center mb-8 md:mb-12">
            <div className="w-6 h-[1px] bg-gold mx-auto mb-3" />
            <h2 className="font-heading" style={{ fontSize: 'var(--typo-sectionTitle-size, 2.25rem)', color: 'var(--typo-sectionTitle-color, #1C122C)', fontFamily: 'var(--typo-sectionTitle-font)' }}>
              {locale === 'ka' ? 'ჩვენი უპირატესობები' : 'Our Advantages'}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1 max-w-3xl mx-auto">
            {advantages.map((v, i) => (
              <ScrollReveal key={v.id} delay={i * 100}>
                <div className="flex items-start gap-3 py-2">
                  {v.icon ? (
                    <CaseIcon icon={v.icon} className="w-6 h-6 text-accent-orange flex-shrink-0 mt-0.5" />
                  ) : (
                    <svg className="w-5 h-5 text-accent-orange flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  <p className="text-dark text-base leading-relaxed font-medium">{locale === 'ka' ? v.titleKa : v.titleEn}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-[4rem] md:py-[9.1rem] px-4 lg:px-8 bg-cream">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal className="text-center mb-10 md:mb-20">
            <RichText html={s(settings, 'about.values.subtitle', locale)} as="p" className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4" />
            <RichText html={s(settings, 'about.values', locale)} as="h2" className="font-heading gold-underline inline-block" style={{ fontSize: 'var(--typo-sectionTitle-size, 2.25rem)', color: 'var(--typo-sectionTitle-color, #1C122C)', fontFamily: 'var(--typo-sectionTitle-font)' }} />
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
                  <div className="text-center p-5 sm:p-8 bg-white border border-gray-100 group card-hover hover:shadow-lg h-full cursor-pointer" style={{ transition: 'transform 0.5s, box-shadow 0.5s' }}>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center text-gold border border-gold/20">
                      <AboutValueIcon icon={v.icon} />
                    </div>
                    <h3 className="font-heading mb-3" style={{ fontSize: 'var(--typo-cardTitle-size, 1.125rem)', color: 'var(--typo-cardTitle-color, #1C122C)', fontFamily: 'var(--typo-cardTitle-font)' }}>
                      {locale === 'ka' ? v.titleKa : v.titleEn}
                    </h3>
                    <p className="font-medium leading-relaxed text-justify" style={{ fontSize: 'var(--typo-cardBody-size, 0.875rem)', color: 'var(--typo-cardBody-color, #5a5a6e)', fontFamily: 'var(--typo-cardBody-font)' }}>
                      {locale === 'ka' ? v.descriptionKa : v.descriptionEn}
                    </p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

    </div>
  )
}
