import Link from 'next/link'
import Image from 'next/image'
import NewsletterForm from './NewsletterForm'

export default function Footer({ locale }: { locale: string }) {
  const prefix = locale === 'en' ? '/en' : ''

  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Image src="/logo.webp" alt="Strategic Counsel Group" width={120} height={60} className="h-12 w-auto mb-2 brightness-0 invert" />
          <p className="text-white/60 text-sm leading-relaxed">Insight. Strategy. Impact.</p>
        </div>
        <div>
          <h4 className="font-heading text-gold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {[
              ['about', 'About'],
              ['practice-areas', 'Practice Areas'],
              ['blog', 'Blog'],
              ['team', 'Team'],
              ['contact', 'Contact'],
            ].map(([slug, label]) => (
              <li key={slug}>
                <Link href={`${prefix}/${slug}`} className="hover:text-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-gold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <div className="space-y-2 text-sm text-white/70">
            <p>Tbilisi, Georgia</p>
            <p>+995 551 55 39 54</p>
            <p>info@stratcounselgroup.com</p>
          </div>
        </div>
        <div>
          <h4 className="font-heading text-gold mb-4 text-sm uppercase tracking-wider">
            {locale === 'ka' ? 'განახლებები' : 'Newsletter'}
          </h4>
          <NewsletterForm locale={locale} />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4 text-center text-white/40 text-xs">
          © {new Date().getFullYear()} Strategic Counsel Group. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
