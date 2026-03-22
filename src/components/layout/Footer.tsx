import Link from 'next/link'
import Image from 'next/image'
import NewsletterForm from './NewsletterForm'

export default function Footer({ locale }: { locale: string }) {
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'

  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/logo.webp"
              alt="Strategic Counsel Group"
              width={140}
              height={70}
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-white/40 text-sm leading-relaxed mb-6 font-light">
              {isKa
                ? 'ხედვა. სტრატეგია. გავლენა.'
                : 'Insight. Strategy. Impact.'}
            </p>
            {/* Social links placeholder */}
            <div className="flex items-center gap-4">
              {['LinkedIn', 'Facebook'].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/50 transition-all duration-300 text-xs"
                >
                  {name[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-gold mb-6 text-[12px] uppercase tracking-[0.2em]">
              {isKa ? 'ბმულები' : 'Quick Links'}
            </h4>
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
            <h4 className="font-heading text-gold mb-6 text-[12px] uppercase tracking-[0.2em]">
              {isKa ? 'კონტაქტი' : 'Contact'}
            </h4>
            <div className="space-y-3 text-sm text-white/50 font-light">
              <a href="https://maps.app.goo.gl/u8enJWpSmMdmJFhY7" target="_blank" rel="noopener noreferrer" className="block hover:text-gold transition-colors duration-300">
                {isKa ? 'დ.არაყიშვილის N3, ოფისი 71, თბილისი' : 'D. Arakishvili St. N3, Office 71, Tbilisi'}
              </a>
              <p>
                <a href="tel:+995551553954" className="hover:text-gold transition-colors duration-300">
                  +995 551 55 39 54
                </a>
              </p>
              <p>
                <a href="mailto:info@stratcounselgroup.com" className="hover:text-gold transition-colors duration-300">
                  info@stratcounselgroup.com
                </a>
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading text-gold mb-6 text-[12px] uppercase tracking-[0.2em]">
              {isKa ? 'განახლებები' : 'Newsletter'}
            </h4>
            <p className="text-white/40 text-sm mb-4 font-light">
              {isKa ? 'გამოიწერეთ სიახლეები' : 'Stay informed with our latest insights'}
            </p>
            <NewsletterForm locale={locale} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/10">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wide font-light">
            &copy; {new Date().getFullYear()} Strategic Counsel Group. All rights reserved.
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
