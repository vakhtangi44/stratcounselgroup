import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import { getSettings, s } from '@/lib/settings'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import RichText from '@/components/ui/RichText'

export default async function PressPage() {
  const locale = await getLocale()
  const isKa = locale === 'ka'

  const [items, settings] = await Promise.all([
    db.pressItem.findMany({
      where: { active: true },
      orderBy: { date: 'desc' },
    }),
    getSettings(),
  ])

  return (
    <div className="pt-16">
      <section className="bg-section-gradient text-white py-24 text-center px-4">
        <RichText html={s(settings, 'page.press', locale)} as="h1" className="font-heading text-4xl mb-4" />
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-6 items-start p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {item.outletLogo && (
                <div className="relative w-16 h-16 shrink-0">
                  <Image src={item.outletLogo} alt={item.outletName} fill className="object-contain" />
                </div>
              )}
              <div>
                <p className="text-xs text-gold mb-1">{item.outletName}</p>
                <h2 className="font-heading text-lg text-dark hover:text-gold transition-colors mb-2">
                  {isKa ? item.headlineKa : item.headlineEn}
                </h2>
                <p className="text-xs text-secondary">{formatDate(item.date, locale)}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
