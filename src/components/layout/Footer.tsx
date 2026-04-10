import Link from 'next/link'
import Image from 'next/image'
import NewsletterForm from './NewsletterForm'
import { getSettings, s } from '@/lib/settings'
import RichText from '@/components/ui/RichText'

export default async function Footer({ locale }: { locale: string }) {
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'
  const settings = await getSettings()

  return (
    <footer className="bg-navy text-white relative">
      {/* Gold line pattern at top */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/logo.webp"
              alt="Strategic Counsel Group"
              width={280}
              height={280}
              className="h-24 w-auto mb-4"
            />
            <RichText html={s(settings, 'footer.tagline', locale)} as="p" className="text-white/40 text-sm leading-relaxed mb-6 font-light" />
          </div>

          {/* Quick Links */}
          <div>
            <RichText html={s(settings, 'footer.quickLinks', locale)} as="div" className="font-heading text-gold mb-6 text-[12px] uppercase tracking-[0.2em]" />
            <ul className="space-y-3 text-sm">
              {[
                ['about', isKa ? 'ჩვენ შესახებ' : 'About'],
                ['practice-areas', isKa ? 'პრაქტიკა' : 'Practice Areas'],
                ['blog', isKa ? 'ბლოგი' : 'Blog'],
                ['team', isKa ? 'გუნდი' : 'Team'],
                ['contact', isKa ? 'კონტაქტი' : 'Contact'],
              ].map(([slug, label]) => (
                <li key={slug}>
                  <Link
                    href={`${prefix}/${slug}`}
                    className="text-white/50 hover:text-gold transition-colors duration-300 font-light"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <RichText html={s(settings, 'footer.contact', locale)} as="div" className="font-heading text-gold mb-6 text-[12px] uppercase tracking-[0.2em]" />
            <div className="space-y-3 text-sm text-white/50 font-light">
              <a href="https://maps.app.goo.gl/u8enJWpSmMdmJFhY7" target="_blank" rel="noopener noreferrer" className="block hover:text-gold transition-colors duration-300">
                <RichText html={s(settings, 'footer.address', locale)} />
              </a>
              <p>
                <a href={`tel:${s(settings, 'contact.phone', locale).replace(/\s/g, '')}`} className="hover:text-gold transition-colors duration-300">
                  {s(settings, 'contact.phone', locale)}
                </a>
              </p>
              <p>
                <a href={`mailto:${s(settings, 'contact.email', locale)}`} className="hover:text-gold transition-colors duration-300">
                  {s(settings, 'contact.email', locale)}
                </a>
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <RichText html={s(settings, 'footer.newsletter', locale)} as="div" className="font-heading text-gold mb-6 text-[12px] uppercase tracking-[0.2em]" />
            <RichText html={s(settings, 'footer.newsletterText', locale)} as="p" className="text-white/40 text-sm mb-4 font-light" />
            <NewsletterForm locale={locale} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/10">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wide font-light">
            &copy; {new Date().getFullYear()}{' '}<RichText html={s(settings, 'footer.copyright', locale)} />
          </p>
          <div className="flex items-center gap-6 text-white/30 text-xs">
            <Link href={`${prefix}/faq`} className="hover:text-gold transition-colors duration-300">
              FAQ
            </Link>
            <Link href={`${prefix}/glossary`} className="hover:text-gold transition-colors duration-300">
              {isKa ? 'ტერმინოლოგია' : 'Glossary'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
