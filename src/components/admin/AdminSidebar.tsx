'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/blog', label: 'Blog Posts' },
  { href: '/admin/team', label: 'Team' },
  { href: '/admin/testimonials', label: 'Testimonials' },
  { href: '/admin/faq', label: 'FAQ' },
  { href: '/admin/advantages', label: 'Advantages' },
  { href: '/admin/glossary', label: 'Glossary' },
  { href: '/admin/press', label: 'Press' },
  { href: '/admin/stats', label: 'Statistics' },
  { href: '/admin/newsletter', label: 'Newsletter' },
  { href: '/admin/messages', label: 'Messages' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 bg-dark text-white flex flex-col shrink-0">
      <div className="p-6 border-b border-white/10">
        <p className="font-heading text-lg text-gold">SCG Admin</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'block px-3 py-2 rounded text-sm transition-colors',
              pathname === link.href
                ? 'bg-gold text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full text-left text-sm text-white/50 hover:text-white transition-colors"
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}
