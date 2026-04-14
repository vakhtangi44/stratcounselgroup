import Link from 'next/link'
import Image from 'next/image'
import NewsletterForm from './NewsletterForm'
import { getSettings, s } from '@/lib/settings'
import RichText from '@/components/ui/RichText'

export default async function Footer({ locale }: { locale: string }) {
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'
  const settings = await getSettings()

  const phone = s(settings, 'contact.phone', locale)

  // Unified body text style — same color, weight, size everywhere in the footer
  const bodyText = 'text-white/70 text-[14.5px] font-[520] tracking-tight'

  return (
    <footer className="bg-section-gradient text-white relative">
      {/* Gold line pattern at top */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src="/logo-v2.png"
              alt="Strategic Counsel Group"
              width={280}
              height={280}
              className="h-24 w-auto mb-4"
            />
            <RichText
              html={s(settings, 'footer.tagline', locale)}
              as="p"
              className={`${bodyText} leading-relaxed mb-6 text-justify`}
            />
          </div>

          {/* Quick Links */}
          <div>
            <RichText
              html={s(settings, 'footer.quickLinks', locale)}
              as="div"
              className="font-heading text-gold mb-6 text-[15.6px] uppercase tracking-[0.06em] font-bold"
            />
            <ul className="space-y-3">
              {[
                ['about', isKa ? 'ჩვენ შესახებ' : 'About'],
                ['sectors', isKa ? 'სექტორები' : 'Sectors'],
                ['blog', isKa ? 'ბლოგი' : 'Blog'],
                ['team', isKa ? 'გუნდი' : 'Team'],
                ['contact', isKa ? 'კონტაქტი' : 'Contact'],
              ].map(([slug, label]) => (
                <li key={slug}>
                  <Link
                    href={`${prefix}/${slug}`}
                    className={`${bodyText} hover:text-gold transition-colors duration-300`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <RichText
              html={s(settings, 'footer.contact', locale)}
              as="div"
              className="font-heading text-gold mb-6 text-[15.6px] uppercase tracking-[0.06em] font-bold"
            />
            <div className={`space-y-2 ${bodyText}`}>
              <p className="leading-snug">
                {isKa ? 'შპს „სტრატეგიულ მრჩეველთა ჯგუფი"' : 'Strategic Counsel Group LLC'}
              </p>
              <p className="leading-snug">
                {isKa ? 'ს/ნ: 405847213' : 'ID: 405847213'}
              </p>
              <p className="leading-snug">
                {isKa
                  ? 'იურ. მის.: საქართველო, თბილისი, ვაკის რაიონი, ირაკლი აბაშიძის ქ. N3, ბინა N7'
                  : 'Legal addr.: Georgia, Tbilisi, Vake, Irakli Abashidze St. N3, Apt. N7'}
              </p>
              <p className="leading-snug">
                {isKa ? 'ფაქტ. მის.: ' : 'Office addr.: '}
                <a
                  href="https://maps.app.goo.gl/u8enJWpSmMdmJFhY7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors duration-300"
                >
                  {isKa
                    ? 'საქართველო, თბილისი, დ. არაყიშვილის ქ. N3, ოფისი 71'
                    : 'Georgia, Tbilisi, D. Arakishvili St. N3, Office 71'}
                </a>
              </p>
              <p className="leading-snug">
                {isKa ? 'მობ.: ' : 'Phone: '}
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="hover:text-gold transition-colors duration-300"
                >
                  {phone}
                </a>
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <RichText
              html={s(settings, 'footer.newsletter', locale)}
              as="div"
              className="font-heading text-gold mb-6 text-[15.6px] uppercase tracking-[0.06em] font-bold"
            />
            <RichText
              html={s(settings, 'footer.newsletterText', locale)}
              as="p"
              className={`${bodyText} mb-4 text-justify`}
            />
            <NewsletterForm locale={locale} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/10">
        <div className="container mx-auto px-4 lg:px-8 py-6 text-center">
          <p className="text-white/50 text-xs tracking-wide font-light">
            &copy; {new Date().getFullYear()}{' '}<RichText html={s(settings, 'footer.copyright', locale)} />
          </p>
        </div>
      </div>
    </footer>
  )
}
