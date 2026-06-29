import Link from 'next/link'

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
  showViewAll?: boolean
}

export default function LogoMarquee({ locale, clients, showViewAll = true }: Props) {
  const isKa = locale === 'ka'
  const prefix = locale === 'en' ? '/en' : ''

  if (clients.length === 0) return null

  return (
    <section className="py-[6.5rem] md:py-[9.1rem] bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <p className="text-[11px] uppercase tracking-[0.3em] text-dark/40 font-medium">
            {isKa ? 'კლიენტები' : 'Clients'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-10 max-w-4xl mx-auto items-center justify-items-center">
          {clients.map((client) => {
            const logo = isKa
              ? client.logoKa || client.logoEn
              : client.logoEn || client.logoKa
            const name = isKa
              ? client.nameKa || client.name
              : client.nameEn || client.name

            return (
              <div
                key={client.id}
                className="flex items-center justify-center h-16 w-full"
              >
                {logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logo}
                    alt={name}
                    className="max-w-[140px] max-h-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                ) : (
                  <span className="text-dark/40 text-sm font-medium text-center">
                    {name}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {showViewAll && (
          <div className="mt-16 text-center">
            <Link
              href={`${prefix}/clients`}
              className="text-dark/40 hover:text-gold text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300"
              style={{ fontFamily: 'var(--typo-button-font)' }}
            >
              {isKa ? 'ყველა კლიენტი →' : 'View All Clients →'}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
