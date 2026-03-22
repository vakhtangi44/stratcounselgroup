'use client'

import { usePathname, useRouter } from '@/i18n/navigation'

interface Props {
  locale: string
}

export default function LanguageToggle({ locale }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  function switchTo(newLocale: 'ka' | 'en') {
    router.replace(pathname, { locale: newLocale })
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
