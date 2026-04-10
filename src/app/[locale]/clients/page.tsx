import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import { getSettings, s } from '@/lib/settings'
import { unstable_noStore as noStore } from 'next/cache'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import RichText from '@/components/ui/RichText'

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

  const [categories, settings] = await Promise.all([
    db.clientCategory.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      include: { clients: { where: { active: true }, orderBy: { order: 'asc' } } },
    }),
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
    <div className="pt-[258px]">
      {/* Page Hero */}
      <section className="relative bg-navy text-white py-24 md:py-32 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-pattern" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold/5 rounded-full" />
        <div className="relative z-10">
          <RichText html={subtitle} as="p" className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4" />
          <div className="gold-divider mx-auto mb-8" />
          <RichText html={title} as="h1" className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 tracking-[-0.02em]" />
          <RichText html={description} as="p" className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed font-light" />
        </div>
      </section>

      {/* All Client Logos */}
      <section className="py-20 md:py-28 bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {allClients.map((client, idx) => {
              const logo = isKa ? (client.logoKa || client.logoEn) : (client.logoEn || client.logoKa)
              const name = isKa ? (client.nameKa || client.name) : (client.nameEn || client.name)

              const hasWhiteBg = logo
                ? ['redix', 'gig-energy', 'liderfood'].some((n) => logo.toLowerCase().includes(n))
                : false

              return (
                <ScrollReveal key={client.id} delay={idx * 40}>
                  <div className="group flex items-center justify-center min-h-[280px] p-4">
                    {logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logo}
                        alt={name}
                        className={`object-contain h-[320px] w-full opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105${hasWhiteBg ? ' mix-blend-multiply' : ''}`}
                      />
                    ) : (
                      <span className="text-white/70 group-hover:text-white text-sm font-medium text-center leading-snug transition-colors duration-300">
                        {name}
                      </span>
                    )}
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Trust Indicators */}
          <ScrollReveal>
            <div className="mt-20 pt-12 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <p className="font-heading text-4xl md:text-5xl text-gold mb-2">50+</p>
                  <RichText html={clientsLabel} as="p" className="text-white/60 text-sm uppercase tracking-wider" />
                </div>
                <div>
                  <p className="font-heading text-4xl md:text-5xl text-gold mb-2">10+</p>
                  <RichText html={sectorsLabel} as="p" className="text-white/60 text-sm uppercase tracking-wider" />
                </div>
                <div>
                  <p className="font-heading text-4xl md:text-5xl text-gold mb-2">20+</p>
                  <RichText html={experienceLabel} as="p" className="text-white/60 text-sm uppercase tracking-wider" />
                </div>
                <div>
                  <p className="font-heading text-4xl md:text-5xl text-gold mb-2">100%</p>
                  <RichText html={confidentialityLabel} as="p" className="text-white/60 text-sm uppercase tracking-wider" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-dark py-16 text-center text-white px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-pattern" />
        <div className="relative z-10">
          <ScrollReveal>
            <GoldDivider className="mx-auto mb-8" />
            <p className="font-heading text-2xl md:text-3xl mb-6">
              {isKa ? 'გამოიყენეთ ჩვენი გამოცდილება' : 'Put Our Experience to Work'}
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
