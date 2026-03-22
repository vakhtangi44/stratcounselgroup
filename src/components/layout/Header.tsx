'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import LanguageToggle from './LanguageToggle'
import MobileMenu from './MobileMenu'
import { useState, useEffect } from 'react'

interface Props {
  locale: string
}

export default function Header({ locale }: Props) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  // Only use transparent header on the homepage
  const isHome = pathname === '/' || pathname === '/en'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const isTransparent = isHome && !scrolled

  const prefix = locale === 'en' ? '/en' : ''
  const navLinks = [
    { href: `${prefix}/about`, label: t('about') },
    { href: `${prefix}/practice-areas`, label: t('practiceAreas') },
    { href: `${prefix}/blog`, label: t('blog') },
    { href: `${prefix}/team`, label: t('team') },
    { href: `${prefix}/#clients`, label: t('clients') },
    { href: `${prefix}/contact`, label: t('contact') },
  ]

  return (
    <>
      {/* Thin gold accent line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-50" />

      <header
        className={`fixed top-[2px] left-0 right-0 z-40 transition-all duration-500 ${
          isTransparent
            ? 'bg-transparent'
            : 'bg-white/98 shadow-lg backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-20">
          <Link href={prefix || '/'} className="relative z-10">
            <Image
              src="/logo.webp"
              alt="Strategic Counsel Group"
              width={180}
              height={90}
              className={`h-14 w-auto transition-all duration-500 ${
                isTransparent ? 'brightness-0 invert' : ''
              }`}
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] uppercase tracking-[0.15em] font-medium transition-colors duration-300 hover:text-gold ${
                  isTransparent ? 'text-white' : 'text-dark'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href={`${prefix}/contact`}
              className={`hidden lg:inline-flex items-center px-5 py-2 text-[12px] uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                isTransparent
                  ? 'border border-gold text-gold hover:bg-gold hover:text-white'
                  : 'bg-gold text-white hover:bg-gold-dark'
              }`}
            >
              {locale === 'ka' ? 'კონსულტაცია' : 'Consultation'}
            </Link>
            <LanguageToggle locale={locale} />
            <MobileMenu locale={locale} links={navLinks} />
          </div>
        </div>
      </header>
    </>
  )
}
