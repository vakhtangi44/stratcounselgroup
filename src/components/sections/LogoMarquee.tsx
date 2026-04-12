'use client'

interface ClientData {
  id: number
  name: string
  nameKa: string
  nameEn: string
  logoKa: string | null
  logoEn: string | null
}

interface Props {
  locale: string
  clients: ClientData[]
}

function getLogoFilter(logoUrl: string | null): React.CSSProperties | undefined {
  if (!logoUrl) return undefined
  const name = logoUrl.toLowerCase()
  // CRP: handled separately with dark bg card
  if (/crp/.test(name)) return undefined
  // M Capital, Ken Walker: white text — black outline
  if (/(m-capital|ken-walker|best-western|dagi)/.test(name)) return { filter: 'drop-shadow(0 0 1px #000) drop-shadow(0 0 1px #000) drop-shadow(0 0 1px #000)' }
  return undefined
}

export default function LogoMarquee({ locale, clients }: Props) {
  const isKa = locale === 'ka'

  if (clients.length === 0) return null

  // Double the list for seamless loop
  const logos = [...clients, ...clients]

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="flex items-center justify-center gap-6 mb-10">
        <div className="h-[1px] w-16 bg-gold/40" />
        <h2 className="font-heading text-sm md:text-base text-gold uppercase tracking-[0.2em]">
          {isKa ? 'ჩვენი კლიენტები' : 'Our Clients'}
        </h2>
        <div className="h-[1px] w-16 bg-gold/40" />
      </div>
      <div
        className="flex items-center gap-10 animate-marquee"
        style={{ width: 'max-content' }}
      >
        {logos.map((client, idx) => {
          const logo = isKa
            ? client.logoKa || client.logoEn
            : client.logoEn || client.logoKa
          const name = isKa
            ? client.nameKa || client.name
            : client.nameEn || client.name

          return (
            <div
              key={`${client.id}-${idx}`}
              className="flex-shrink-0 w-[16.4rem] h-[9.1rem] flex items-center justify-center rounded transition-all duration-500"
            >
              {logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo}
                  alt={name}
                  className="max-w-full max-h-full object-contain"
                  style={getLogoFilter(logo)}
                />
              ) : (
                <span className="text-dark/50 text-xs font-medium text-center">
                  {name}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
