'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import RichText from '@/components/ui/RichText'

interface ClientData {
  id: number
  name: string
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {categories.map((category, idx) => (
            <ScrollReveal key={category.id} delay={idx * 80}>
              <div className="border border-white/10 bg-white/5 p-6 hover:border-gold/40 hover:bg-white/10 transition-all duration-500 h-full group backdrop-blur-sm">
                <div className="text-3xl mb-4">{category.icon}</div>
                <h3 className="font-heading text-base text-gold mb-4 group-hover:text-gold transition-colors duration-500">
                  {isKa ? category.labelKa : category.labelEn}
                </h3>
                <ul className="space-y-2.5">
                  {category.clients.map((client) => (
                    <li key={client.id} className="text-white/80 text-sm flex items-start gap-2.5 transition-colors duration-300 group-hover:text-white">
                      <span className="text-gold mt-1 text-xs">&#9670;</span>
                      {client.name}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
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
