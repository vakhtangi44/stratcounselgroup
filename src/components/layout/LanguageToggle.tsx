'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface Props {
  locale: string
}

export default function LanguageToggle({ locale }: Props) {
  const pathname = usePathname()

  // Build the path for each locale
  const pathWithoutLocale = pathname.replace(/^\/en(\/|$)/, '/')
  const kaHref = pathWithoutLocale || '/'
  const enHref = `/en${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`

  return (
    <div className="flex items-center gap-1">
      <Link
        href={kaHref}
        locale="ka"
        className={`text-xs font-medium px-2 py-1 rounded transition-colors ${locale === 'ka' ? 'text-gold font-bold' : 'text-secondary hover:text-gold'}`}
      >
        KA
      </Link>
      <span className="text-secondary">|</span>
      <Link
        href={enHref}
        locale="en"
        className={`text-xs font-medium px-2 py-1 rounded transition-colors ${locale === 'en' ? 'text-gold font-bold' : 'text-secondary hover:text-gold'}`}
      >
        EN
      </Link>
    </div>
  )
}
