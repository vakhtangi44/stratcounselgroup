import ScrollReveal from '@/components/ui/ScrollReveal'
import GoldDivider from '@/components/ui/GoldDivider'
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
    <div tabIndex={0} className="relative h-full p-8 bg-white border border-gray-100 hover:border-gold/40 focus:border-gold/40 transition-all duration-700 group hover:shadow-lg hover:shadow-gold/5 focus:shadow-lg focus:shadow-gold/5 hover:scale-[1.2] focus:scale-[1.2] text-center outline-none">
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold scale-y-0 group-hover:scale-y-100 group-focus:scale-y-100 transition-transform duration-700 origin-top" />
      <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold group-hover:text-white group-hover:border-gold group-focus:bg-gold group-focus:text-white group-focus:border-gold transition-all duration-500">
        <CaseIcon icon={icon} />
      </div>
      <p className="text-navy text-[14px] md:text-[15px] leading-relaxed font-[316] text-justify group-hover:text-dark group-focus:text-dark transition-colors duration-500">
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
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollReveal className="text-center mb-16">
              <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
              <h2 className="font-heading text-3xl md:text-4xl text-dark mb-4">
                {isKa ? 'წარმატებული აქტივობები' : 'Successful Cases'}
              </h2>
              <GoldDivider className="mt-8" />
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
        <section className="py-20 md:py-28 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollReveal className="text-center mb-16">
              <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
              <h2 className="font-heading text-3xl md:text-4xl text-dark mb-4">
                {isKa ? 'ჩვენი გამოცდილება' : 'Our Experience'}
              </h2>
              <GoldDivider className="mt-8" />
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
