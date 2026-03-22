'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import LanguageToggle from './LanguageToggle'
import MobileMenu from './MobileMenu'
import { useState, useEffect } from 'react'

interface Props {
  locale: string
}

export default function Header({ locale }: Props) {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const prefix = locale === 'en' ? '/en' : ''
  const navLinks = [
    { href: `${prefix}/about`, label: t('about') },
    { href: `${prefix}/practice-areas`, label: t('practiceAreas') },
    { href: `${prefix}/blog`, label: t('blog') },
    { href: `${prefix}/team`, label: t('team') },
    { href: `${prefix}/contact`, label: t('contact') },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-shadow ${scrolled ? 'bg-white shadow-md' : 'bg-white/95'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href={prefix || '/'}>
          <Image src="/logo.webp" alt="Strategic Counsel Group" width={120} height={60} className="h-12 w-auto" priority />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-secondary hover:text-gold transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle locale={locale} />
          <MobileMenu locale={locale} links={navLinks} />
        </div>
      </div>
    </header>
  )
}
