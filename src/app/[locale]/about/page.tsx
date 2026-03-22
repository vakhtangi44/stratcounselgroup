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
            ? 'Strategic Counsel Group აერთიანებს მრავალწლიანი გამოცდილების მქონე პროფესიონალთა გუნდს, რომელთაც აქვთ პრაქტიკული გამოცდილება სახელმწიფო სტრუქტურებში, მსხვილ კორპორაციებში, ინფრასტრუქტურულ პროექტებსა და საერთაშორისო ბიზნესში.'
            : 'Strategic Counsel Group brings together a team of professionals with extensive experience, who have practical expertise in public institutions, large corporations, infrastructure projects, and international business.'}
        </p>
      </section>

      {/* Advantages */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-3xl text-dark mb-6">{isKa ? 'რატომ ჩვენ' : 'Why Us'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                titleKa: 'მუდმივი რისკ-მონიტორინგი',
                titleEn: 'Continuous risk monitoring',
              },
              {
                titleKa: 'კონტრაჰენტებთან და ადმინისტრაციულ ორგანოებთან კომუნიკაციის კონტროლი',
                titleEn: 'Control over communication with counterparties and administrative bodies',
              },
              {
                titleKa: 'სახელშეკრულებო არქიტექტურის სწორად აგება',
                titleEn: 'Proper structuring of contractual architecture',
              },
              {
                titleKa: 'დავების ტაქტიკური დაგეგმვა და წარმოება',
                titleEn: 'Tactical planning and conduct of disputes',
              },
              {
                titleKa: 'კონფიდენციალურობის მაღალი სტანდარტი და სანდოობა',
                titleEn: 'High standard of confidentiality and reliability',
              },
              {
                titleKa: 'შედეგზე ორიენტირებული თანამშრომლობა',
                titleEn: 'Result-oriented cooperation',
              },
            ].map((v, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-bg-alt rounded-lg">
                <span className="text-gold text-xl mt-0.5">&#10003;</span>
                <p className="text-secondary">{isKa ? v.titleKa : v.titleEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-bg-alt">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-3xl text-dark mb-6">{isKa ? 'ჩვენი ღირებულებები' : 'Our Values'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '⚖️', titleKa: 'ექსპერტიზა', titleEn: 'Expertise', descKa: 'წლების გამოცდილება სახელმწიფო და კერძო სექტორში', descEn: 'Years of experience across public and private sectors' },
              { icon: '🎯', titleKa: 'სტრატეგია', titleEn: 'Strategy', descKa: 'გამჭვირვალე, შედეგზე ორიენტირებული მიდგომა', descEn: 'Transparent, results-driven approach to every matter' },
              { icon: '🤝', titleKa: 'პარტნიორობა', titleEn: 'Partnership', descKa: 'გრძელვადიანი ურთიერთობა კლიენტებთან', descEn: 'Long-term relationships built on trust and results' },
            ].map((v) => (
              <div key={v.titleEn} className="text-center p-6 bg-white rounded-lg">
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
