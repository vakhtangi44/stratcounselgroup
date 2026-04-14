import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import { getSettings, s } from '@/lib/settings'
import { unstable_noStore as noStore } from 'next/cache'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import RichText from '@/components/ui/RichText'
import SuccessfulCases from '@/components/sections/SuccessfulCases'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: locale === 'ka'
      ? 'ჩვენი კლიენტები | Strategic Counsel Group'
      : 'Our Clients | Strategic Counsel Group',
    description: locale === 'ka'
      ? 'Strategic Counsel Group-ის კლიენტები სხვადასხვა სექტორში'
      : 'Clients of Strategic Counsel Group across various sectors',
    alternates: {
      canonical: locale === 'ka'
        ? 'https://stratcounselgroup.com/clients'
        : 'https://stratcounselgroup.com/en/clients',
      languages: {
        'ka': 'https://stratcounselgroup.com/clients',
        'en': 'https://stratcounselgroup.com/en/clients',
      },
    },
  }
}

export default async function ClientsPage() {
  noStore()
  const locale = await getLocale()
  const isKa = locale === 'ka'

  const [categories, cases, settings] = await Promise.all([
    db.clientCategory.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      include: { clients: { where: { active: true }, orderBy: { order: 'asc' } } },
    }),
    db.successfulCase.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    getSettings(),
  ])

  const allClients = categories.flatMap((cat) => cat.clients)

  const title = s(settings, 'section.trustedBy.title', locale)
  const subtitle = s(settings, 'section.trustedBy.subtitle', locale)
  const description = s(settings, 'section.trustedBy.description', locale)
  const clientsLabel = s(settings, 'section.trustedBy.clients', locale)
  const sectorsLabel = s(settings, 'section.trustedBy.sectors', locale)
  const experienceLabel = s(settings, 'section.trustedBy.experience', locale)
  const confidentialityLabel = s(settings, 'section.trustedBy.confidentiality', locale)

  return (
    <div className="pt-[170px]">
      {/* Page Hero */}
      <section className="relative bg-white text-dark py-24 md:py-32 text-center px-4 overflow-hidden">
        <div className="relative z-10">
          <RichText html={subtitle} as="p" className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4" />
          <div className="gold-divider mx-auto mb-8" />
          <RichText html={title} as="h1" className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 tracking-[-0.02em] text-dark" />
          <RichText html={description} as="p" className="text-secondary max-w-none mx-auto text-lg leading-relaxed font-[520] whitespace-nowrap" />
        </div>
      </section>

      {/* All Client Logos */}
      <section className="py-12 md:py-16 bg-dark text-white">
        <div className="px-4">
          <div key={Date.now()} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-[80%] mx-auto">
            {allClients.map((client, idx) => {
              const logo = isKa ? (client.logoKa || client.logoEn) : (client.logoEn || client.logoKa)
              const name = isKa ? (client.nameKa || client.name) : (client.nameEn || client.name)

              return (
                <div
                  key={client.id}
                  className="group flex items-center justify-center h-[10rem] md:h-[12rem] p-4 overflow-visible relative opacity-0 client-logo-fall"
                  style={{ animationDelay: `${idx * 200}ms` }}
                >
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logo}
                      alt={name}
                      className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-[2.5] group-hover:z-20 relative"
                    />
                  ) : (
                    <span className="text-white/70 group-hover:text-white text-xs font-medium text-center leading-snug transition-colors duration-300">
                      {name}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Successful Cases */}
      <SuccessfulCases locale={locale} cases={cases} />

      {/* CTA */}
      <section className="relative bg-dark py-16 text-center text-white px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-pattern" />
        <div className="relative z-10">
          <ScrollReveal>
            <GoldDivider className="mx-auto mb-8" />
            <p className="font-heading text-2xl md:text-3xl mb-6">
              {isKa ? 'დაგვიკავშირდით' : 'Contact Us'}
            </p>
            <a
              href={locale === 'en' ? '/en/contact' : '/contact'}
              className="inline-block bg-gold text-white px-10 py-4 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gold-dark transition-all duration-300"
            >
              {isKa ? 'კონტაქტი' : 'Get in Touch'}
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
