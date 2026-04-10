'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import RichText from '@/components/ui/RichText'

interface ClientData {
  id: number
  name: string
  nameKa: string
  nameEn: string
  logoKa: string | null
  logoEn: string | null
  order: number
  active: boolean
}

interface CategoryData {
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
  strings: {
    subtitle: string
    title: string
    description: string
    clients: string
    sectors: string
    experience: string
    confidentiality: string
  }
}

export default function TrustedBy({ locale, categories, strings }: Props) {
  const isKa = locale === 'ka'

  // Flatten all clients from all categories, preserving order
  const allClients = categories.flatMap((cat) => cat.clients)

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {allClients.map((client, idx) => {
            const logo = isKa ? (client.logoKa || client.logoEn) : (client.logoEn || client.logoKa)
            const name = isKa ? (client.nameKa || client.name) : (client.nameEn || client.name)

            return (
              <ScrollReveal key={client.id} delay={idx * 40}>
                <div className="group bg-white flex items-center justify-center aspect-[3/2] p-4 border border-transparent hover:border-gold/50 hover:shadow-[0_0_18px_rgba(196,163,90,0.2)] transition-all duration-500">
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logo}
                      alt={name}
                      className="object-contain w-full max-h-[72px] opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-navy text-sm font-medium text-center leading-snug">{name}</span>
                  )}
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Bottom trust indicators */}
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
      </div>
    </section>
  )
}
