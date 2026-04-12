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
  /** When true: show preview (limited logos + View All CTA, no trust indicators). */
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

/**
 * Returns CSS to blend each logo into the navy background based on its known styling.
 * - 'multiply' removes WHITE/LIGHT backgrounds (keeps dark content visible)
 * - 'screen' removes BLACK/DARK backgrounds (keeps light content visible)
 * - default (no blend) for truly transparent PNGs with colored content
 */
function getLogoStyle(logoUrl: string | null): React.CSSProperties {
  const baseShadow = 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.5))'
  if (!logoUrl) return { filter: baseShadow }

  const name = logoUrl.toLowerCase()

  // DARK bg (white/light text on black/dark): screen blend removes the dark square
  if (/(m-capital|ken-walker)/.test(name)) {
    return {
      filter: baseShadow,
      mixBlendMode: 'screen' as React.CSSProperties['mixBlendMode'],
    }
  }

  // LIGHT/WHITE bg with dark content: multiply blend removes the light square
  if (
    /(radius|studio9|redix|caucasus|crp|dagi|zreps|georgia-railway|belas-cakes)/.test(name)
  ) {
    return {
      filter: baseShadow,
      mixBlendMode: 'multiply' as React.CSSProperties['mixBlendMode'],
    }
  }

  // Truly transparent PNGs with colored content — no blend needed
  return { filter: baseShadow }
}

export default function TrustedBy({ locale, categories, preview = false, strings }: Props) {
  const isKa = locale === 'ka'
  const prefix = locale === 'en' ? '/en' : ''

  const allClients = categories.flatMap((cat) => cat.clients)
  // Preview mode: show first 8 (2 rows of 4). Full mode: all.
  const displayClients = preview ? allClients.slice(0, 8) : allClients

  // Homepage preview: fully navy. /clients page (preview=false): white header + navy logos.
  const headerBg = preview ? 'bg-navy' : 'bg-white'
  const headerTitleColor = preview ? 'text-white' : 'text-dark'
  const headerDescColor = preview ? 'text-white/70' : 'text-secondary'

  return (
    <section id="clients">
      {/* Header — title + description */}
      <div className={`${headerBg} ${preview ? 'pt-20 md:pt-28 pb-0' : 'py-20 md:py-28'}`}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center">
              <RichText
                html={strings.subtitle}
                as="p"
                className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4"
              />
              <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
              <RichText
                html={strings.title}
                as="h2"
                className={`font-heading text-3xl md:text-4xl ${headerTitleColor} mb-4`}
              />
              <RichText
                html={strings.description}
                as="p"
                className={`${headerDescColor} font-light max-w-2xl mx-auto text-lg`}
              />
              <GoldDivider className="mt-8" />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Navy logos grid */}
      <div className={`bg-navy ${preview ? 'pt-8 md:pt-10 pb-16 md:pb-20' : 'py-8 md:py-12'}`}>
        <div className="container mx-auto px-4">
          {displayClients.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 max-w-[44rem] mx-auto">
              {displayClients.map((client, idx) => {
                const logo = isKa
                  ? client.logoKa || client.logoEn
                  : client.logoEn || client.logoKa
                const name = isKa
                  ? client.nameKa || client.name
                  : client.nameEn || client.name

                return (
                  <ScrollReveal key={client.id} delay={idx * 150}>
                    <div className="flex items-center justify-center h-20 md:h-24 hover:scale-105 active:scale-105 transition-transform duration-500 overflow-hidden">
                      {logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={logo}
                          alt={name}
                          className="w-full h-full object-cover"
                          style={getLogoStyle(logo)}
                        />
                      ) : (
                        <span className="text-white/70 text-sm font-medium text-center leading-snug">
                          {name}
                        </span>
                      )}
                    </div>
                  </ScrollReveal>
                )
              })}
            </div>
          ) : (
            <p className="text-center text-white/50 font-light">
              {isKa ? 'კლიენტები მალე დაემატება.' : 'Clients will be added soon.'}
            </p>
          )}

          {/* Preview mode: "View All Clients" button */}
          {preview && displayClients.length > 0 && (
            <div className="mt-16 text-center">
              <Link
                href={`${prefix}/clients`}
                className="inline-block border border-gold text-gold px-10 py-4 text-sm uppercase tracking-[0.15em] font-medium hover:bg-gold hover:text-white transition-all duration-300"
              >
                {strings.viewAll || (isKa ? 'ყველა კლიენტი' : 'View All Clients')}
              </Link>
            </div>
          )}

          {/* Full mode: trust indicators */}
          {!preview && (
            <div className="mt-20 pt-12 border-t border-white/10 max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
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
          )}
        </div>
      </div>
    </section>
  )
}
