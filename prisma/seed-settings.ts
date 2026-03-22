import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

const settings = [
  // Hero
  { key: 'hero.heading', valueKa: 'ხედვა. სტრატეგია. გავლენა.', valueEn: 'Insight. Strategy. Impact.', category: 'hero' },
  { key: 'hero.subtitle', valueKa: 'მაღალკვალიფიციური იურისტებისა და აუდიტორების გუნდი 20 წელზე მეტი გამოცდილებით საჯარო და კერძო სექტორში.', valueEn: 'A team of highly qualified lawyers and auditors with over 20 years of experience in public and private sectors.', category: 'hero' },
  { key: 'hero.cta1', valueKa: 'კონსულტაციის ჯავშნა', valueEn: 'Book Consultation', category: 'hero' },
  { key: 'hero.cta2', valueKa: 'ჩვენი სერვისები', valueEn: 'Our Services', category: 'hero' },

  // Sections
  { key: 'section.practiceAreas.subtitle', valueKa: 'რას ვაკეთებთ', valueEn: 'What We Do', category: 'sections' },
  { key: 'section.practiceAreas', valueKa: 'პრაქტიკის სფეროები', valueEn: 'Practice Areas', category: 'sections' },
  { key: 'section.practiceAreas.description', valueKa: 'ჩვენ გთავაზობთ სრულყოფილ იურიდიულ მომსახურებას ბიზნესის ყველა ეტაპზე.', valueEn: 'We provide comprehensive legal services at every stage of your business journey.', category: 'sections' },
  { key: 'section.ourTeam.subtitle', valueKa: 'პროფესიონალები', valueEn: 'Professionals', category: 'sections' },
  { key: 'section.ourTeam', valueKa: 'ჩვენი გუნდი', valueEn: 'Our Team', category: 'sections' },
  { key: 'section.meetFullTeam', valueKa: 'მთელი გუნდი', valueEn: 'Meet the full team', category: 'sections' },
  { key: 'section.testimonials.subtitle', valueKa: 'შეფასებები', valueEn: 'Testimonials', category: 'sections' },
  { key: 'section.testimonials', valueKa: 'კლიენტების შეფასება', valueEn: 'Client Testimonials', category: 'sections' },
  { key: 'section.latestArticles.subtitle', valueKa: 'სიახლეები', valueEn: 'Insights', category: 'sections' },
  { key: 'section.latestArticles', valueKa: 'ბლოგი', valueEn: 'Latest Articles', category: 'sections' },
  { key: 'section.allArticles', valueKa: 'ყველა სტატია', valueEn: 'All articles', category: 'sections' },
  { key: 'section.asSeenIn', valueKa: 'As Seen In', valueEn: 'As Seen In', category: 'sections' },

  // TrustedBy
  { key: 'section.trustedBy.subtitle', valueKa: 'ვინც ჩვენ გვენდობა', valueEn: 'Who Trusts Us', category: 'sections' },
  { key: 'section.trustedBy.title', valueKa: 'ჩვენი კლიენტები', valueEn: 'Our Clients', category: 'sections' },
  { key: 'section.trustedBy.description', valueKa: 'ჩვენ წარმატებით ვთანამშრომლობთ წამყვან კომპანიებთან სხვადასხვა სექტორში', valueEn: 'We successfully collaborate with leading companies across various sectors', category: 'sections' },
  { key: 'section.trustedBy.clients', valueKa: 'კლიენტი', valueEn: 'Clients', category: 'sections' },
  { key: 'section.trustedBy.sectors', valueKa: 'სექტორი', valueEn: 'Sectors', category: 'sections' },
  { key: 'section.trustedBy.experience', valueKa: 'წლის გამოცდილება', valueEn: 'Years Experience', category: 'sections' },
  { key: 'section.trustedBy.confidentiality', valueKa: 'კონფიდენციალურობა', valueEn: 'Confidentiality', category: 'sections' },

  // About page
  { key: 'about.subtitle', valueKa: 'ჩვენ შესახებ', valueEn: 'About Us', category: 'about' },
  { key: 'about.heading', valueKa: 'ჩვენ შესახებ', valueEn: 'About Us', category: 'about' },
  { key: 'about.description', valueKa: 'Strategic Counsel Group აერთიანებს მრავალწლიანი გამოცდილების მქონე პროფესიონალთა გუნდს, რომელთაც აქვთ პრაქტიკული გამოცდილება სახელმწიფო სტრუქტურებში, მსხვილ კორპორაციებში, ინფრასტრუქტურულ პროექტებსა და საერთაშორისო ბიზნესში.', valueEn: 'Strategic Counsel Group brings together a team of professionals with extensive experience, who have practical expertise in public institutions, large corporations, infrastructure projects, and international business.', category: 'about' },
  { key: 'about.whyUs.subtitle', valueKa: 'უპირატესობები', valueEn: 'Our Edge', category: 'about' },
  { key: 'about.whyUs', valueKa: 'რატომ ჩვენ', valueEn: 'Why Us', category: 'about' },
  { key: 'about.values.subtitle', valueKa: 'პრინციპები', valueEn: 'Principles', category: 'about' },
  { key: 'about.values', valueKa: 'ჩვენი ღირებულებები', valueEn: 'Our Values', category: 'about' },
  { key: 'about.value1.title', valueKa: 'ექსპერტიზა', valueEn: 'Expertise', category: 'about' },
  { key: 'about.value1.desc', valueKa: 'წლების გამოცდილება სახელმწიფო და კერძო სექტორში', valueEn: 'Years of experience across public and private sectors', category: 'about' },
  { key: 'about.value2.title', valueKa: 'სტრატეგია', valueEn: 'Strategy', category: 'about' },
  { key: 'about.value2.desc', valueKa: 'გამჭვირვალე, შედეგზე ორიენტირებული მიდგომა', valueEn: 'Transparent, results-driven approach to every matter', category: 'about' },
  { key: 'about.value3.title', valueKa: 'პარტნიორობა', valueEn: 'Partnership', category: 'about' },
  { key: 'about.value3.desc', valueKa: 'გრძელვადიანი ურთიერთობა კლიენტებთან', valueEn: 'Long-term relationships built on trust and results', category: 'about' },
  { key: 'about.cta.heading', valueKa: 'კონსულტაციისთვის დაგვიკავშირდით', valueEn: 'Ready to work with us?', category: 'about' },
  { key: 'about.cta.description', valueKa: 'დაგვიკავშირდით და მოგაწვდით კვალიფიციურ იურიდიულ კონსულტაციას.', valueEn: 'Contact us for qualified legal counsel tailored to your needs.', category: 'about' },
  { key: 'about.cta.button', valueKa: 'კონტაქტი', valueEn: 'Get in touch', category: 'about' },

  // Contact page
  { key: 'contact.subtitle', valueKa: 'დაგვიკავშირდით', valueEn: 'Get In Touch', category: 'contact' },
  { key: 'contact.heading', valueKa: 'კონტაქტი', valueEn: 'Contact Us', category: 'contact' },
  { key: 'contact.heroSubtitle', valueKa: 'გვიპასუხეთ 24 საათში', valueEn: 'We respond within 24 hours', category: 'contact' },
  { key: 'contact.info.subtitle', valueKa: 'ინფორმაცია', valueEn: 'Information', category: 'contact' },
  { key: 'contact.info', valueKa: 'საკონტაქტო ინფორმაცია', valueEn: 'Contact Information', category: 'contact' },
  { key: 'contact.address.label', valueKa: 'მისამართი', valueEn: 'Address', category: 'contact' },
  { key: 'contact.address', valueKa: 'თბილისი, დ.არაყიშვილის N3, ოფისი 71', valueEn: 'D. Arakishvili St. N3, Office 71, Tbilisi, Georgia', category: 'contact' },
  { key: 'contact.workingHours.label', valueKa: 'სამუშაო საათები', valueEn: 'Working Hours', category: 'contact' },
  { key: 'contact.workingHours', valueKa: 'ორშაბათი - პარასკევი: 10:00 - 19:00', valueEn: 'Monday - Friday: 10:00 - 19:00', category: 'contact' },
  { key: 'contact.phone', valueKa: '+995 551 55 39 54', valueEn: '+995 551 55 39 54', category: 'contact' },
  { key: 'contact.email', valueKa: 'info@stratcounselgroup.com', valueEn: 'info@stratcounselgroup.com', category: 'contact' },
  { key: 'contact.whatsapp', valueKa: '995551553954', valueEn: '995551553954', category: 'contact' },

  // Footer
  { key: 'footer.tagline', valueKa: 'ხედვა. სტრატეგია. გავლენა.', valueEn: 'Insight. Strategy. Impact.', category: 'footer' },
  { key: 'footer.quickLinks', valueKa: 'ბმულები', valueEn: 'Quick Links', category: 'footer' },
  { key: 'footer.contact', valueKa: 'კონტაქტი', valueEn: 'Contact', category: 'footer' },
  { key: 'footer.newsletter', valueKa: 'განახლებები', valueEn: 'Newsletter', category: 'footer' },
  { key: 'footer.newsletterText', valueKa: 'გამოიწერეთ სიახლეები', valueEn: 'Stay informed with our latest insights', category: 'footer' },
  { key: 'footer.address', valueKa: 'დ.არაყიშვილის N3, ოფისი 71, თბილისი', valueEn: 'D. Arakishvili St. N3, Office 71, Tbilisi', category: 'footer' },
  { key: 'footer.copyright', valueKa: 'Strategic Counsel Group. ყველა უფლება დაცულია.', valueEn: 'Strategic Counsel Group. All rights reserved.', category: 'footer' },

  // Pages
  { key: 'page.team.subtitle', valueKa: 'პროფესიონალები', valueEn: 'Professionals', category: 'pages' },
  { key: 'page.team', valueKa: 'ჩვენი გუნდი', valueEn: 'Our Team', category: 'pages' },
  { key: 'page.blog', valueKa: 'ბლოგი', valueEn: 'Blog', category: 'pages' },
  { key: 'page.faq', valueKa: 'ხშირი კითხვები', valueEn: 'Frequently Asked Questions', category: 'pages' },
  { key: 'page.glossary', valueKa: 'სამართლებრივი ლექსიკონი', valueEn: 'Legal Glossary', category: 'pages' },
  { key: 'page.press', valueKa: 'პრესა', valueEn: 'Press', category: 'pages' },
]

async function main() {
  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { valueKa: setting.valueKa, valueEn: setting.valueEn, category: setting.category },
      create: setting,
    })
  }
  console.log(`Seeded ${settings.length} site settings`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
