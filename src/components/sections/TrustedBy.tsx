'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'
import GoldDivider from '@/components/ui/GoldDivider'

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
}

export default function TrustedBy({ locale, categories }: Props) {
  const isKa = locale === 'ka'

  return (
    <section id="clients" className="py-20 md:py-28 bg-white bg-linen">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4">
              {isKa ? 'ვინც ჩვენ გვენდობა' : 'Who Trusts Us'}
            </p>
            <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
            <h2 className="font-heading text-3xl md:text-4xl text-dark mb-4">
              {isKa ? 'ჩვენი კლიენტები' : 'Our Clients'}
            </h2>
            <p className="text-secondary font-light max-w-2xl mx-auto">
              {isKa
                ? 'ჩვენ წარმატებით ვთანამშრომლობთ წამყვან კომპანიებთან სხვადასხვა სექტორში'
                : 'We successfully collaborate with leading companies across various sectors'}
            </p>
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
                <p className="text-secondary text-xs font-light uppercase tracking-wider">
                  {isKa ? 'კლიენტი' : 'Clients'}
                </p>
              </div>
              <div>
                <p className="font-heading text-3xl text-gold mb-1">10+</p>
                <p className="text-secondary text-xs font-light uppercase tracking-wider">
                  {isKa ? 'სექტორი' : 'Sectors'}
                </p>
              </div>
              <div>
                <p className="font-heading text-3xl text-gold mb-1">20+</p>
                <p className="text-secondary text-xs font-light uppercase tracking-wider">
                  {isKa ? 'წლის გამოცდილება' : 'Years Experience'}
                </p>
              </div>
              <div>
                <p className="font-heading text-3xl text-gold mb-1">100%</p>
                <p className="text-secondary text-xs font-light uppercase tracking-wider">
                  {isKa ? 'კონფიდენციალურობა' : 'Confidentiality'}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
