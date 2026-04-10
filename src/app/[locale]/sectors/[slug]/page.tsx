import { getLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSector, SECTORS } from '@/lib/sectors'
import ScrollReveal from '@/components/ui/ScrollReveal'

export async function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const sector = getSector(slug)
  if (!sector) return {}
  return {
    title: `${locale === 'ka' ? sector.nameKa : sector.nameEn} | Strategic Counsel Group`,
    description: locale === 'ka' ? sector.descriptionKa : sector.descriptionEn,
  }
}

export default async function SectorDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  const locale = await getLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'

  const sector = getSector(slug)
  if (!sector) notFound()

  return (
    <div className="pt-[130px]">
      {/* Hero with sector photo */}
      <section className="relative bg-navy text-white py-32 md:py-40 text-center px-4 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sector.image}
          alt={isKa ? sector.nameKa : sector.nameEn}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />

        <div className="relative z-10">
          <p className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4">
            {isKa ? 'სექტორი' : 'Sector'}
          </p>
          <div className="gold-divider mx-auto mb-8" />
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 tracking-[-0.02em]">
            {isKa ? sector.nameKa : sector.nameEn}
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            {isKa ? sector.descriptionKa : sector.descriptionEn}
          </p>
        </div>
      </section>

      {/* Back to Sectors + other sectors */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <ScrollReveal>
            <p className="text-center text-secondary mb-10">
              {isKa ? 'სხვა სექტორები' : 'Other Sectors'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SECTORS.filter((s) => s.slug !== sector.slug).map((s) => (
                <Link
                  key={s.slug}
                  href={`${prefix}/sectors/${s.slug}`}
                  className="relative overflow-hidden group h-40 block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image}
                    alt={isKa ? s.nameKa : s.nameEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy/60 group-hover:bg-navy/40 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center p-3">
                    <p className="text-white font-medium text-sm text-center drop-shadow-lg">
                      {isKa ? s.nameKa : s.nameEn}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>

          <div className="text-center mt-12">
            <Link
              href={`${prefix}/sectors`}
              className="inline-block border border-gold text-gold px-8 py-3.5 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gold hover:text-white transition-all duration-300"
            >
              {isKa ? 'ყველა სექტორი' : 'All Sectors'}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-dark py-20 md:py-28 text-center text-white px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-pattern" />
        <div className="relative z-10">
          <ScrollReveal>
            <div className="gold-divider mx-auto mb-8" />
            <h2 className="font-heading text-3xl md:text-4xl mb-6 tracking-[-0.01em]">
              {isKa ? 'გჭირდებათ სამართლებრივი კონსულტაცია?' : 'Need Legal Consultation?'}
            </h2>
            <p className="text-white/40 mb-10 max-w-lg mx-auto font-light">
              {isKa
                ? 'დაგვიკავშირდით და ჩვენი გუნდი მოგიყვანთ საუკეთესო შედეგამდე.'
                : 'Contact us and our team will guide you to the best outcome.'}
            </p>
            <Link
              href={`${prefix}/contact`}
              className="inline-block bg-gold text-white px-10 py-4 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gold-dark transition-all duration-300"
            >
              {isKa ? 'კონსულტაციის ჯავშნა' : 'Book Consultation'}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
