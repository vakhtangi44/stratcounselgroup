'use client'

import { usePathname } from 'next/navigation'

interface Props {
  locale: string
}

export default function LanguageToggle({ locale }: Props) {
  const pathname = usePathname()

  const pathWithoutLocale = pathname.replace(/^\/en(\/|$)/, '/')
  const kaHref = pathWithoutLocale || '/'
  const enHref = `/en${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`

  return (
    <div className="flex items-center gap-1">
      <a
        href={kaHref}
        className={`text-xs font-medium px-2 py-1 rounded transition-colors ${locale === 'ka' ? 'text-gold font-bold' : 'text-secondary hover:text-gold'}`}
      >
        KA
      </a>
      <span className="text-secondary">|</span>
      <a
        href={enHref}
        className={`text-xs font-medium px-2 py-1 rounded transition-colors ${locale === 'en' ? 'text-gold font-bold' : 'text-secondary hover:text-gold'}`}
      >
        EN
      </a>
    </div>
  )
}
