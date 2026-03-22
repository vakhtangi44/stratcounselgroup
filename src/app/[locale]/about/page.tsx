import { getLocale } from 'next-intl/server'
import Link from 'next/link'

export default async function AboutPage() {
  const locale = await getLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-dark text-white py-24 text-center px-4">
        <h1 className="font-heading text-4xl mb-4">{isKa ? 'ჩვენ შესახებ' : 'About Us'}</h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          {isKa
            ? 'Strategic Counsel Group არის თბილისში დაფუძნებული სამართლებრივი ფირმა, რომელიც სპეციალიზირებულია კომერციულ და სარეგულაციო სამართალში.'
            : 'Strategic Counsel Group is a Tbilisi-based law firm specialising in commercial and regulatory law across Georgia and the wider region.'}
        </p>
      </section>

      {/* Mission */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-3xl text-dark mb-6">{isKa ? 'მისია' : 'Our Mission'}</h2>
          <p className="text-secondary leading-relaxed text-lg mb-8">
            {isKa
              ? 'ჩვენი მისიაა კლიენტებს მივაწოდოთ მაღალი ხარისხის სამართლებრივი კონსულტაცია, რომელიც ეფუძნება ღრმა ექსპერტიზასა და სტრატეგიულ აზროვნებას.'
              : 'Our mission is to deliver high-quality legal counsel grounded in deep expertise and strategic thinking — helping clients navigate complex legal landscapes with confidence.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '⚖️', titleKa: 'ექსპერტიზა', titleEn: 'Expertise', descKa: 'წლების გამოცდილება სახელმწიფო და კერძო სექტორში', descEn: 'Years of experience across public and private sectors' },
              { icon: '🎯', titleKa: 'სტრატეგია', titleEn: 'Strategy', descKa: 'გამჭვირვალე, შედეგზე ორიენტირებული მიდგომა', descEn: 'Transparent, results-driven approach to every matter' },
              { icon: '🤝', titleKa: 'პარტნიორობა', titleEn: 'Partnership', descKa: 'გრძელვადიანი ურთიერთობა კლიენტებთან', descEn: 'Long-term relationships built on trust and results' },
            ].map((v) => (
              <div key={v.titleEn} className="text-center p-6 bg-bg-alt rounded-lg">
                <span className="text-4xl block mb-4">{v.icon}</span>
                <h3 className="font-heading text-lg text-dark mb-2">{isKa ? v.titleKa : v.titleEn}</h3>
                <p className="text-secondary text-sm">{isKa ? v.descKa : v.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold py-16 text-center text-white px-4">
        <h2 className="font-heading text-3xl mb-4">{isKa ? 'კონსულტაციისთვის დაგვიკავშირდით' : 'Ready to work with us?'}</h2>
        <Link href={`${prefix}/contact`} className="bg-white text-gold px-8 py-3 font-medium hover:bg-white/90 transition-colors">
          {isKa ? 'კონტაქტი' : 'Get in touch'}
        </Link>
      </section>
    </div>
  )
}
