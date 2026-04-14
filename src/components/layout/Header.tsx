'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import LanguageToggle from './LanguageToggle'
import MobileMenu from './MobileMenu'
import { useState, useEffect, useRef } from 'react'

interface SectorLink {
  slug: string
  name: string
}

interface Props {
  locale: string
  sectorsEnabled: boolean
  sectors: SectorLink[]
}

function DropdownMenu({
  label,
  isTransparent,
  children,
}: {
  label: string
  isTransparent: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const timeout = useRef<NodeJS.Timeout | null>(null)

  function handleEnter() {
    if (timeout.current) clearTimeout(timeout.current)
    setOpen(true)
  }

  function handleLeave() {
    timeout.current = setTimeout(() => setOpen(false), 200)
  }

  return (
    <div ref={ref} className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        className={`text-[14px] uppercase tracking-[0.048em] font-semibold transition-colors duration-300 whitespace-nowrap flex items-center gap-1 ${
          'text-white hover:text-gold'
        }`}
      >
        {label}
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
          <div className="bg-white shadow-2xl border border-gray-100 rounded-sm overflow-hidden animate-fade-in-up">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Header({ locale, sectorsEnabled, sectors }: Props) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const isKa = locale === 'ka'

  const isHome = pathname === '/' || pathname === '/en'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const isTransparent = isHome && !scrolled

  const prefix = locale === 'en' ? '/en' : ''


  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-50" />

      <header
        className={`fixed top-[2px] left-0 right-0 z-40 transition-all duration-500 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-section-gradient shadow-lg backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-[218px]">
          <Link href={prefix || '/'} className="relative z-10">
            <Image
              src="/logo-v2.png"
              alt="Strategic Counsel Group"
              width={442}
              height={442}
              className="h-[177px] w-auto transition-all duration-500"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            <Link
              href={`${prefix}/about`}
              className={`text-[14px] uppercase tracking-[0.048em] font-semibold transition-colors duration-300 whitespace-nowrap ${
                'text-white hover:text-gold'
              }`}
            >
              {t('about')}
            </Link>

            {/* Sectors Dropdown */}
            {sectorsEnabled && sectors.length > 0 && (
              <DropdownMenu label={isKa ? 'სექტორები' : 'Sectors'} isTransparent={isTransparent}>
                <div className="w-[300px] p-4">
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gold font-medium">
                      {isKa ? 'სექტორები' : 'Sectors'}
                    </p>
                    <Link
                      href={`${prefix}/sectors`}
                      className="text-[11px] uppercase tracking-wider text-secondary hover:text-gold transition-colors"
                    >
                      {isKa ? 'ყველა →' : 'View All →'}
                    </Link>
                  </div>
                  <div className="space-y-0.5">
                    {sectors.map((sector) => (
                      <Link
                        key={sector.slug}
                        href={`${prefix}/sectors/${sector.slug}`}
                        className="block px-3 py-2 text-[14px] text-dark hover:text-gold hover:bg-cream rounded transition-colors duration-200"
                      >
                        {sector.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </DropdownMenu>
            )}

            {/* Services Dropdown */}
            <DropdownMenu label={t('services')} isTransparent={isTransparent}>
              <div className="w-[240px] p-4">
                <Link
                  href={`${prefix}/services`}
                  className="block px-3 py-2 text-[13px] text-dark hover:text-gold hover:bg-cream rounded transition-colors duration-200"
                >
                  {isKa ? 'ყველა სერვისი' : 'All Services'}
                </Link>
              </div>
            </DropdownMenu>

            <Link
              href={`${prefix}/blog`}
              className={`text-[14px] uppercase tracking-[0.048em] font-semibold transition-colors duration-300 whitespace-nowrap ${
                'text-white hover:text-gold'
              }`}
            >
              {t('blog')}
            </Link>

            <Link
              href={`${prefix}/team`}
              className={`text-[14px] uppercase tracking-[0.048em] font-semibold transition-colors duration-300 whitespace-nowrap ${
                'text-white hover:text-gold'
              }`}
            >
              {t('team')}
            </Link>

            <Link
              href={`${prefix}/clients`}
              className={`text-[14px] uppercase tracking-[0.048em] font-semibold transition-colors duration-300 whitespace-nowrap ${
                'text-white hover:text-gold'
              }`}
            >
              {t('clients')}
            </Link>

            <Link
              href={`${prefix}/contact`}
              className={`text-[14px] uppercase tracking-[0.048em] font-semibold transition-colors duration-300 whitespace-nowrap ${
                'text-white hover:text-gold'
              }`}
            >
              {t('contact')}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href={`${prefix}/contact`}
              className={`hidden xl:inline-flex items-center px-5 py-2 text-[12px] uppercase tracking-[0.15em] font-medium transition-all duration-500 ${
                isTransparent
                  ? 'border border-gold text-gold hover:bg-gold hover:text-white'
                  : 'bg-gold text-white hover:bg-gold-dark'
              }`}
            >
              {isKa ? 'კონსულტაცია' : 'Consultation'}
            </Link>
            <LanguageToggle locale={locale} />
            <MobileMenu locale={locale} links={[
              { href: `${prefix}/about`, label: t('about') },
              ...(sectorsEnabled ? [{ href: `${prefix}/sectors`, label: isKa ? 'სექტორები' : 'Sectors' }] : []),
              { href: `${prefix}/services`, label: t('services') },
              { href: `${prefix}/blog`, label: t('blog') },
              { href: `${prefix}/team`, label: t('team') },
              { href: `${prefix}/clients`, label: t('clients') },
              { href: `${prefix}/contact`, label: t('contact') },
            ]} />
          </div>
        </div>
      </header>
    </>
  )
}
