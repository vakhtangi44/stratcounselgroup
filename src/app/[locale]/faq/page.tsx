import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import { getSettings, s } from '@/lib/settings'
import { PRACTICE_AREAS } from '@/lib/practice-areas'

export default async function FaqPage() {
  const locale = await getLocale()
  const isKa = locale === 'ka'

  const [faqs, settings] = await Promise.all([
    db.fAQ.findMany({
      where: { active: true },
      orderBy: [{ practiceArea: 'asc' }, { order: 'asc' }],
    }),
    getSettings(),
  ])

  const grouped: Record<string, typeof faqs> = {}
  for (const faq of faqs) {
    const key = faq.practiceArea || 'general'
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(faq)
  }

  function getAreaLabel(key: string) {
    if (key === 'general') return isKa ? 'ზოგადი' : 'General'
    const area = PRACTICE_AREAS.find((a) => a.slug === key)
    return area ? (isKa ? area.nameKa : area.nameEn) : key
  }

  return (
    <div className="pt-16">
      <section className="bg-dark text-white py-24 text-center px-4">
        <h1 className="font-heading text-4xl mb-4">{s(settings, 'page.faq', locale)}</h1>
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl space-y-12">
          {Object.entries(grouped).map(([key, items]) => (
            <div key={key}>
              <h2 className="font-heading text-xl text-gold mb-6">{getAreaLabel(key)}</h2>
              <div className="space-y-4">
                {items.map((faq) => (
                  <details key={faq.id} className="border border-gray-100 rounded-lg p-4 group">
                    <summary className="cursor-pointer font-medium text-dark list-none flex justify-between items-center">
                      {isKa ? faq.questionKa : faq.questionEn}
                      <span className="text-gold ml-4">+</span>
                    </summary>
                    <p className="mt-4 text-secondary leading-relaxed">{isKa ? faq.answerKa : faq.answerEn}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
