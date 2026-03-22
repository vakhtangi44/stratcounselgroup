'use client'

import { usePathname } from 'next/navigation'

interface Props {
  locale: string
}

export default function LanguageToggle({ locale }: Props) {
  const pathname = usePathname()

  function switchTo(newLocale: 'ka' | 'en') {
    // Set the NEXT_LOCALE cookie so middleware knows the preferred locale
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`

    let newPath: string
    if (newLocale === 'en') {
      // Add /en prefix
      if (pathname.startsWith('/en')) {
        newPath = pathname // already on /en
      } else {
        newPath = `/en${pathname}`
      }
    } else {
      // Remove /en prefix for Georgian (default locale, no prefix)
      newPath = pathname.replace(/^\/en(\/|$)/, '/') || '/'
    }

    // Full page navigation to trigger middleware
    window.location.href = newPath
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => switchTo('ka')}
        className={`text-xs font-medium px-2 py-1 rounded transition-colors ${locale === 'ka' ? 'text-gold font-bold' : 'text-secondary hover:text-gold'}`}
      >
        KA
      </button>
      <span className="text-secondary">|</span>
      <button
        onClick={() => switchTo('en')}
        className={`text-xs font-medium px-2 py-1 rounded transition-colors ${locale === 'en' ? 'text-gold font-bold' : 'text-secondary hover:text-gold'}`}
      >
        EN
      </button>
    </div>
  )
}
