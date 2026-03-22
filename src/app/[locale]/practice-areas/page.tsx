import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { PRACTICE_AREAS } from '@/lib/practice-areas'

export default async function PracticeAreasPage() {
  const locale = await getLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'

  return (
    <div className="pt-16">
      <section className="bg-dark text-white py-24 text-center px-4">
        <h1 className="font-heading text-4xl mb-4">{isKa ? 'პრაქტიკის სფეროები' : 'Practice Areas'}</h1>
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRACTICE_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`${prefix}/practice-areas/${area.slug}`}
                className="group p-8 border border-gray-100 rounded-lg hover:border-gold hover:shadow-md transition-all"
              >
                <span className="text-4xl block mb-4">{area.icon}</span>
                <h2 className="font-heading text-lg text-dark group-hover:text-gold transition-colors mb-2">
                  {isKa ? area.nameKa : area.nameEn}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
