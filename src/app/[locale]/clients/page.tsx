import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import { getSettings, s } from '@/lib/settings'
import { unstable_noStore as noStore } from 'next/cache'
import ScrollReveal from '@/components/ui/ScrollReveal'
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

  // Admin toggle (/admin/clients): enlarge logos on hover. On by default.
  const logoZoom = s(settings, 'clients.logoZoom', locale) !== 'false'

  const title = s(settings, 'section.trustedBy.title', locale)
  const subtitle = s(settings, 'section.trustedBy.subtitle', locale)
  const description = s(settings, 'section.trustedBy.description', locale)
  const clientsLabel = s(settings, 'section.trustedBy.clients', locale)
  const sectorsLabel = s(settings, 'section.trustedBy.sectors', locale)
  const experienceLabel = s(settings, 'section.trustedBy.experience', locale)
  const confidentialityLabel = s(settings, 'section.trustedBy.confidentiality', locale)

  return (
    <div className="pt-[140px] md:pt-[255px]">
      {/* Page Hero + Client Logos */}
      <section className="py-12 md:py-16 text-white overflow-visible" style={{ background: '#1C122C' }}>
        <div className="text-center px-4 mb-6 sm:mb-[3.91rem]">
          <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 tracking-[-0.02em] text-white">{title}</h1>
          <RichText html={description} as="p" className="text-gold max-w-none mx-auto text-lg leading-relaxed font-[520] whitespace-nowrap" />
        </div>
        <div className="px-4 overflow-visible">
          <div key={Date.now()} className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4 max-w-[95%] sm:max-w-[80%] mx-auto overflow-visible">
            {allClients.map((client, idx) => {
              const logo = isKa ? (client.logoKa || client.logoEn) : (client.logoEn || client.logoKa)
              const name = isKa ? (client.nameKa || client.name) : (client.nameEn || client.name)

              return (
                <div
                  key={client.id}
                  className="group flex items-center justify-center h-[6rem] sm:h-[10rem] md:h-[12rem] p-2 sm:p-4 relative border border-white/10 hover:border-gold/50 transition-all duration-500 hover:scale-[1.27]"
                >
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logo}
                      alt={name}
                      className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-500"
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

    </div>
  )
}
