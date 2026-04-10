'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'

const sections = [
  {
    label: 'Content',
    links: [
      { href: '/admin', label: 'Dashboard' },
      { href: '/admin/blog', label: 'Blog Posts' },
      { href: '/admin/team', label: 'Team' },
      { href: '/admin/testimonials', label: 'Testimonials' },
      { href: '/admin/faq', label: 'FAQ' },
      { href: '/admin/glossary', label: 'Glossary' },
      { href: '/admin/press', label: 'Press' },
      { href: '/admin/stats', label: 'Statistics' },
    ],
  },
  {
    label: 'Site Management',
    links: [
      { href: '/admin/about', label: 'About Photo' },
      { href: '/admin/advantages', label: 'Why Us' },
      { href: '/admin/sectors', label: 'Sectors' },
      { href: '/admin/clients', label: 'Our Clients' },
      { href: '/admin/services', label: 'Services' },
      { href: '/admin/settings', label: 'Site Strings' },
    ],
  },
  {
    label: 'Communication',
    links: [
      { href: '/admin/newsletter', label: 'Newsletter' },
      { href: '/admin/messages', label: 'Messages' },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 bg-dark text-white flex flex-col shrink-0">
      <div className="p-6 border-b border-white/10">
        <p className="font-heading text-lg text-gold">SCG Admin</p>
      </div>
      <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 px-3 mb-2">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block px-3 py-2 rounded text-sm transition-colors',
                    pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href))
                      ? 'bg-gold text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
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
