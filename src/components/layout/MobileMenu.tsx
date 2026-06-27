'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Props {
  locale: string
  links: { href: string; label: string }[]
}

export default function MobileMenu({ links }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="xl:hidden">
      <button onClick={() => setOpen(!open)} className="text-gold p-1" aria-label="Menu">
        <span className="text-2xl">{open ? '✕' : '☰'}</span>
      </button>
      {open && (
        <div className="fixed top-[120px] left-0 right-0 bg-dark shadow-lg border-t border-gold/20 z-50 max-h-[70vh] overflow-y-auto">
          <nav className="flex flex-col p-4 gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-white hover:text-gold transition-colors border-b border-white/10 last:border-0 text-[15px]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
