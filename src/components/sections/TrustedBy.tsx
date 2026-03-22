'use client'

import ScrollReveal from '@/components/ui/ScrollReveal'

interface Props {
  locale: string
}

const CLIENT_CATEGORIES = [
  {
    iconKa: '🏗️',
    labelKa: 'მშენებლობა და ინფრასტრუქტურა',
    labelEn: 'Construction & Infrastructure',
    clients: [
      'Caucasus Road Project (CRP)',
      'Dagi',
      'GES',
      'Redix Group',
      'M Capital',
      'Radius Construction',
    ],
  },
  {
    iconKa: '🏛️',
    labelKa: 'არქიტექტურა და დიზაინი',
    labelEn: 'Architecture & Design',
    clients: [
      'Studio 9',
      'Caucasus Science and Engineering',
    ],
  },
  {
    iconKa: '⛽',
    labelKa: 'ენერგეტიკა',
    labelEn: 'Energy & Resources',
    clients: [
      'British Petroleum (BP)',
      'Georgian Investment Group',
    ],
  },
  {
    iconKa: '💰',
    labelKa: 'საფინანსო სექტორი',
    labelEn: 'Financial Sector',
    clients: [
      'Rico Group',
      'EasyCredit Georgia',
    ],
  },
  {
    iconKa: '🏨',
    labelKa: 'ტურიზმი',
    labelEn: 'Tourism & Hospitality',
    clients: [
      'Paragraph Resort & Spa Shekvetili',
      'Best Western Gudauri',
      'Sololaki Hills',
    ],
  },
  {
    iconKa: '🚆',
    labelKa: 'ტრანსპორტი და ლოგისტიკა',
    labelEn: 'Transport & Logistics',
    clients: [
      'Global Auto Import',
      'Georgia Post',
    ],
  },
  {
    iconKa: '🏥',
    labelKa: 'ჯანდაცვა',
    labelEn: 'Healthcare',
    clients: [
      'David Tatishvili Medical Center',
    ],
  },
  {
    iconKa: '🎓',
    labelKa: 'განათლება',
    labelEn: 'Education',
    clients: [
      'Ken Walker International University',
    ],
  },
  {
    iconKa: '🛒',
    labelKa: 'ვაჭრობა და წარმოება',
    labelEn: 'Trade & Manufacturing',
    clients: [
      'Gvirila Retail',
    ],
  },
  {
    iconKa: '🌍',
    labelKa: 'საერთაშორისო ორგანიზაციები',
    labelEn: 'International Organizations',
    clients: [
      'JICA (Japan International Cooperation Agency)',
    ],
  },
]

export default function TrustedBy({ locale }: Props) {
  const isKa = locale === 'ka'

  return (
    <section className="py-20 md:py-28 bg-white">
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
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {CLIENT_CATEGORIES.map((category, idx) => (
            <ScrollReveal key={category.labelEn} delay={idx * 80}>
              <div className="border border-gray-100 p-6 hover:border-gold/30 hover:shadow-md transition-all duration-300 h-full group">
                <div className="text-2xl mb-3">{category.iconKa}</div>
                <h3 className="font-heading text-sm text-dark mb-4 group-hover:text-gold transition-colors duration-300">
                  {isKa ? category.labelKa : category.labelEn}
                </h3>
                <ul className="space-y-2">
                  {category.clients.map((client) => (
                    <li key={client} className="text-secondary text-xs font-light flex items-start gap-2">
                      <span className="text-gold/60 mt-0.5">—</span>
                      {client}
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
