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
      router.push(`/en${pathname}`)
    } else {
      router.push(pathname.replace(/^\/en/, '') || '/')
    }
  }

  return (
    <button
      onClick={toggle}
      className="text-xs font-medium border border-gold text-gold px-3 py-1 rounded hover:bg-gold hover:text-white transition-colors"
    >
      {locale === 'ka' ? 'EN' : 'ქართ'}
    </button>
  )
}
