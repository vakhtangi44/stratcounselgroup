'use client'

import { usePathname, useRouter } from 'next/navigation'

interface Props {
  locale: string
}

export default function LanguageToggle({ locale }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  function toggle() {
    if (locale === 'ka') {
      // Going from Georgian (no prefix) to English (/en/...)
      router.push(`/en${pathname}`)
    } else {
      // Going from English (/en/...) to Georgian (remove /en)
      const newPath = pathname.replace(/^\/en(\/|$)/, '/')
      router.push(newPath || '/')
    }
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => locale !== 'ka' && toggle()}
        className={`text-xs font-medium px-2 py-1 rounded transition-colors ${locale === 'ka' ? 'text-gold font-bold' : 'text-secondary hover:text-gold'}`}
      >
        KA
      </button>
      <span className="text-secondary">|</span>
      <button
        onClick={() => locale !== 'en' && toggle()}
        className={`text-xs font-medium px-2 py-1 rounded transition-colors ${locale === 'en' ? 'text-gold font-bold' : 'text-secondary hover:text-gold'}`}
      >
        EN
      </button>
    </div>
  )
}
