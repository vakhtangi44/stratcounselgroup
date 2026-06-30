import ScrollReveal from '@/components/ui/ScrollReveal'

import { CaseIcon } from '@/lib/case-icons'

interface Case {
  id: number
  textKa: string
  textEn: string
  icon: string
  featured: boolean
}

interface Props {
  locale: string
  cases: Case[]
}

function CaseCard({ text, icon }: { text: string; icon: string }) {
  return (
    <div tabIndex={0} className="relative h-full p-5 sm:p-8 bg-white border border-gray-100 transition-all duration-700 group text-center outline-none card-hover focus:scale-[1.05]">
      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 flex items-center justify-center text-gold border border-gold/20 transition-all duration-500">
        <CaseIcon icon={icon} />
      </div>
      <p className="leading-relaxed font-[316] text-justify group-hover:text-dark group-focus:text-dark transition-colors duration-500" style={{ fontSize: 'var(--typo-cardBody-size, 0.875rem)', color: 'var(--typo-cardBody-color, #1C122C)', fontFamily: 'var(--typo-cardBody-font)' }}>
        {text}
      </p>
    </div>
  )
}

export default function SuccessfulCases({ locale, cases }: Props) {
  const isKa = locale === 'ka'
  const featured = cases.filter((c) => c.featured)
  const rest = cases.filter((c) => !c.featured)
  const getText = (c: Case) => (isKa ? c.textKa : c.textEn)

  return (
    <>
      {featured.length > 0 && (
        <section className="py-[4rem] md:py-[9.1rem] bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollReveal className="text-center mb-10 md:mb-20">
              <div className="w-6 h-[1px] bg-gold mx-auto mb-3" />
              <h2 className="font-heading mb-4" style={{ fontSize: 'var(--typo-sectionTitle-size, 2.25rem)', color: 'var(--typo-sectionTitle-color, #1C122C)', fontFamily: 'var(--typo-sectionTitle-font)' }}>
                {isKa ? 'წარმატებული აქტივობები' : 'Successful Cases'}
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {featured.map((c, i) => (
                <ScrollReveal key={c.id} delay={i * 100}>
                  <CaseCard text={getText(c)} icon={c.icon} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="py-[4rem] md:py-[9.1rem] bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollReveal className="text-center mb-10 md:mb-20">
              <div className="w-6 h-[1px] bg-gold mx-auto mb-3" />
              <h2 className="font-heading mb-4" style={{ fontSize: 'var(--typo-sectionTitle-size, 2.25rem)', color: 'var(--typo-sectionTitle-color, #1C122C)', fontFamily: 'var(--typo-sectionTitle-font)' }}>
                {isKa ? 'ჩვენი გამოცდილება' : 'Our Experience'}
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {rest.map((c, i) => (
                <ScrollReveal key={c.id} delay={(i % 6) * 100}>
                  <CaseCard text={getText(c)} icon={c.icon} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
