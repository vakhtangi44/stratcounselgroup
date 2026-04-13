import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import { db } from '@/lib/db'
import { getSectorsData } from '@/lib/sectors'
import { getSettings } from '@/lib/settings'
import ScrollReveal from '@/components/ui/ScrollReveal'
import LogoMarquee from '@/components/sections/LogoMarquee'
import { unstable_noStore as noStore } from 'next/cache'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: locale === 'ka'
      ? 'სექტორები | Strategic Counsel Group'
      : 'Sectors | Strategic Counsel Group',
    description: locale === 'ka'
      ? 'Strategic Counsel Group — სამიზნე სექტორები: გადაზიდვები, ენერგეტიკა, ინფრასტრუქტურა, მედიცინა, მშენებლობა.'
      : 'Strategic Counsel Group — target sectors: transportation, energy, infrastructure, medicine, construction.',
  }
}

export default async function SectorsPage() {
  noStore()
  const locale = await getLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'
  const [settings, clientCategories] = await Promise.all([
    getSettings(),
    db.clientCategory.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      include: { clients: { where: { active: true }, orderBy: { order: 'asc' } } },
    }),
  ])
  const sectors = getSectorsData(settings, locale)
  const allClients = clientCategories.flatMap((cat) => cat.clients)

  return (
    <div className="pt-[170px]">
      <section className="relative bg-navy text-white py-24 md:py-32 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-pattern" />
        <div className="relative z-10">
          <p className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4">
            {isKa ? 'ჩვენი გამოცდილება' : 'Our Expertise'}
          </p>
          <div className="gold-divider mx-auto mb-8" />
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 tracking-[-0.02em]">
            {isKa ? 'სამიზნე სექტორები' : 'Target Sectors'}
          </h1>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-navy text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mx-auto">
            {sectors.map((sector, i) => {
              return (
              <ScrollReveal key={sector.slug} delay={i * 100}>
                <Link
                  href={`${prefix}/sectors/${sector.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden h-48 md:h-64 rounded-sm mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sector.image}
                      alt={sector.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/10 transition-colors duration-500" />
                  </div>
                  <p className="text-white/80 group-hover:text-gold font-semibold text-sm md:text-base uppercase tracking-[0.06em] transition-colors duration-300 px-2 text-center">
                    {sector.name}
                  </p>
                </Link>
              </ScrollReveal>
              )
            })}
          </div>
          {!isKa && null}
        </div>
      </section>

      <LogoMarquee locale={locale} clients={allClients} />
    </div>
  )
}
