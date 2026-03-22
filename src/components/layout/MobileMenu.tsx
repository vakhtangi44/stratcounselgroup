'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Props {
  locale: string
  links: { href: string; label: string }[]
}

export default function MobileMenu({ locale: _locale, links }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(!open)} className="text-dark p-1" aria-label="Menu">
        <span className="text-xl">{open ? '✕' : '☰'}</span>
      </button>
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-50">
          <nav className="flex flex-col p-4 gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-secondary hover:text-gold transition-colors border-b border-gray-50 last:border-0"
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
