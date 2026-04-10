'use client'

import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import RichText from '@/components/ui/RichText'

export interface ClientData {
  id: number
  name: string
  nameKa: string
  nameEn: string
  logoKa: string | null
  logoEn: string | null
  order: number
  active: boolean
}

export interface CategoryData {
  id: number
  icon: string
  labelKa: string
  labelEn: string
  order: number
  active: boolean
  clients: ClientData[]
}

interface Props {
  locale: string
  categories: CategoryData[]
  /** When true: show 4 logos + "View All" CTA. When false/omitted: show all logos + stats. */
  preview?: boolean
  strings: {
    subtitle: string
    title: string
    description: string
    clients: string
    sectors: string
    experience: string
    confidentiality: string
    viewAll?: string
  }
}

export default function TrustedBy({ locale, categories, preview = false, strings }: Props) {
  const isKa = locale === 'ka'
  const prefix = locale === 'en' ? '/en' : ''

  const allClients = categories.flatMap((cat) => cat.clients)
  const displayClients = preview ? allClients.slice(0, 4) : allClients

  return (
    <section id="clients" className="py-20 md:py-28 bg-navy text-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <RichText html={strings.subtitle} as="p" className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4" />
            <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
            <RichText html={strings.title} as="h2" className="font-heading text-3xl md:text-4xl text-white mb-4" />
            <RichText html={strings.description} as="p" className="text-white/70 font-light max-w-2xl mx-auto text-lg" />
            <GoldDivider className="mt-8" />
          </div>
        </ScrollReveal>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {displayClients.map((client, idx) => {
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

        {/* Preview mode: "View All Clients" button */}
        {preview && (
          <ScrollReveal>
            <div className="mt-12 text-center">
              <Link
                href={`${prefix}/clients`}
                className="inline-block border border-gold text-gold px-10 py-4 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gold hover:text-white transition-all duration-300"
              >
                {strings.viewAll || (isKa ? 'ყველა კლიენტი' : 'View All Clients')}
              </Link>
            </div>
          </ScrollReveal>
        )}

        {/* Full mode: trust indicators */}
        {!preview && (
          <ScrollReveal>
            <div className="mt-20 pt-12 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <p className="font-heading text-4xl md:text-5xl text-gold mb-2">50+</p>
                  <RichText html={strings.clients} as="p" className="text-white/60 text-sm uppercase tracking-wider" />
                </div>
                <div>
                  <p className="font-heading text-4xl md:text-5xl text-gold mb-2">10+</p>
                  <RichText html={strings.sectors} as="p" className="text-white/60 text-sm uppercase tracking-wider" />
                </div>
                <div>
                  <p className="font-heading text-4xl md:text-5xl text-gold mb-2">20+</p>
                  <RichText html={strings.experience} as="p" className="text-white/60 text-sm uppercase tracking-wider" />
                </div>
                <div>
                  <p className="font-heading text-4xl md:text-5xl text-gold mb-2">100%</p>
                  <RichText html={strings.confidentiality} as="p" className="text-white/60 text-sm uppercase tracking-wider" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
