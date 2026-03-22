import Link from 'next/link'
import { PRACTICE_AREAS } from '@/lib/practice-areas'

export default function PracticeAreasGrid({ locale }: { locale: string }) {
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl text-dark text-center mb-12">
          {locale === 'ka' ? 'პრაქტიკის სფეროები' : 'Practice Areas'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRACTICE_AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`${prefix}/practice-areas/${area.slug}`}
              className="group p-6 border border-gray-100 rounded-lg hover:border-gold hover:shadow-md transition-all text-center"
            >
              <span className="text-3xl mb-3 block">{area.icon}</span>
              <p className="text-sm font-medium text-dark group-hover:text-gold transition-colors">
                {locale === 'ka' ? area.nameKa : area.nameEn}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
