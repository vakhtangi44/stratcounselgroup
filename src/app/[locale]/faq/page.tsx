import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import { getSettings, s } from '@/lib/settings'
import RichText from '@/components/ui/RichText'

export default async function FaqPage() {
  const locale = await getLocale()
  const isKa = locale === 'ka'

  const [faqs, settings] = await Promise.all([
    db.fAQ.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    }),
    getSettings(),
  ])

  return (
    <div className="pt-[72px] md:pt-[166px]">
      <section className="bg-section-gradient text-white py-24 text-center px-4">
        <RichText html={s(settings, 'page.faq', locale)} as="h1" className="font-heading mb-4" style={{ fontSize: 'var(--typo-sectionTitle-size, 2.25rem)', fontFamily: 'var(--typo-sectionTitle-font)' }} />
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl space-y-4">
          {faqs.map((faq) => (
            <details key={faq.id} className="border border-gray-100 rounded-lg p-4 group">
              <summary className="cursor-pointer font-medium text-dark list-none flex justify-between items-center">
                {isKa ? faq.questionKa : faq.questionEn}
                <span className="text-gold ml-4">+</span>
              </summary>
              <p className="mt-4 text-secondary text-[0.9rem] md:text-lg leading-relaxed">{isKa ? faq.answerKa : faq.answerEn}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
