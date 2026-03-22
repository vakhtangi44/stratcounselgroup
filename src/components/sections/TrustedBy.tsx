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
    <section id="clients" className="py-20 md:py-28 bg-white bg-linen">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <RichText html={strings.subtitle} as="p" className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4" />
            <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
            <RichText html={strings.title} as="h2" className="font-heading text-3xl md:text-4xl text-dark mb-4" />
            <RichText html={strings.description} as="p" className="text-secondary font-light max-w-2xl mx-auto" />
            <GoldDivider className="mt-8" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, idx) => (
            <ScrollReveal key={category.id} delay={idx * 80}>
              <div className="border border-gray-100 p-6 hover:border-gold/30 transition-all duration-500 h-full group client-glow">
                <div className="text-2xl mb-3">{category.icon}</div>
                <h3 className="font-heading text-sm text-dark mb-4 group-hover:text-gold transition-colors duration-500">
                  {isKa ? category.labelKa : category.labelEn}
                </h3>
                <ul className="space-y-2">
                  {category.clients.map((client) => (
                    <li key={client.id} className="text-secondary text-xs font-light flex items-start gap-2 transition-colors duration-300 group-hover:text-secondary/80">
                      <span className="text-gold/60 mt-0.5">&mdash;</span>
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
          <div className="mt-16 pt-12 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="font-heading text-3xl text-gold mb-1">50+</p>
                <RichText html={strings.clients} as="p" className="text-secondary text-xs font-light uppercase tracking-wider" />
              </div>
              <div>
                <p className="font-heading text-3xl text-gold mb-1">10+</p>
                <RichText html={strings.sectors} as="p" className="text-secondary text-xs font-light uppercase tracking-wider" />
              </div>
              <div>
                <p className="font-heading text-3xl text-gold mb-1">20+</p>
                <RichText html={strings.experience} as="p" className="text-secondary text-xs font-light uppercase tracking-wider" />
              </div>
              <div>
                <p className="font-heading text-3xl text-gold mb-1">100%</p>
                <RichText html={strings.confidentiality} as="p" className="text-secondary text-xs font-light uppercase tracking-wider" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
