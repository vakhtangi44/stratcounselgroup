import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const connectionString = process.env.DATABASE_URL ?? 'postgresql://stratcounsel:password@localhost:5432/stratcounsel'
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL || 'salomekoberidze9@gmail.com'
  const password = process.env.ADMIN_SEED_PASSWORD || 'Sali1234$'
  const passwordHash = await bcrypt.hash(password, 12)

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash },
  })

  const stats = [
    { key: 'cases_won', labelKa: 'მოგებული საქმე', labelEn: 'Cases Won', value: '200', suffix: '+' },
    { key: 'years_experience', labelKa: 'გამოცდილება', labelEn: 'Years of Experience', value: '15', suffix: '+' },
    { key: 'clients_served', labelKa: 'კლიენტი', labelEn: 'Clients Served', value: '500', suffix: '+' },
    { key: 'countries', labelKa: 'ქვეყანა', labelEn: 'Countries', value: '5', suffix: '+' },
  ]

  for (const stat of stats) {
    await prisma.statistic.upsert({
      where: { key: stat.key },
      update: {},
      create: stat,
    })
  }

  // --- Team Members ---
  const teamMembers = [
    {
      slug: 'tamar-kuchava',
      nameKa: 'თამარ კუჭავა',
      nameEn: 'Tamar Kuchava',
      titleKa: 'მმართველი პარტნიორი',
      titleEn: 'Managing Partner',
      shortBioKa: 'იურისტი მრავალწლიანი გამოცდილებით სისხლის, სამოქალაქო და ადმინისტრაციული სამართლის სფეროებში.',
      shortBioEn: 'Lawyer with many years of experience in criminal, civil, and administrative law.',
      fullBioKa: 'თამარ კუჭავა არის იურისტი მრავალწლიანი პროფესიული გამოცდილებით სისხლის, სამოქალაქო და ადმინისტრაციული სამართლის სფეროებში. ის არის მოქმედი ადვოკატი საერთო სპეციალიზაციით და ასევე ჩაბარებული აქვს მოსამართლის საკვალიფიკაციო გამოცდა. პროფესიული კარიერის განმავლობაში მან მნიშვნელოვანი გამოცდილება შეიძინა როგორც სამართალდამცავ სისტემაში, ასევე კერძო სამართლებრივ პრაქტიკაში საქმიანობით.',
      fullBioEn: 'Tamar Kuchava is a lawyer with many years of professional experience in criminal, civil, and administrative law. She is an active advocate with general specialization and has also passed the judicial qualification exam. Throughout her professional career, she has gained significant experience in both law enforcement and private legal practice.',
      photo: null,
      gbaNumber: null,
      practiceAreas: ['criminal-law', 'cybercrime', 'financial-crimes', 'public-procurement', 'civil-law', 'labor-law', 'administrative-law', 'tax-law', 'litigation'],
      isFeatured: true,
      order: 1,
      active: true,
    },
    {
      slug: 'tinatin-siradze',
      nameKa: 'თინათინ სირაძე',
      nameEn: 'Tinatin Siradze',
      titleKa: 'მმართველი პარტნიორი',
      titleEn: 'Managing Partner',
      shortBioKa: 'იურისტი 20 წელზე მეტი პროფესიული გამოცდილებით საჯარო და კერძო სამართლის სფეროებში.',
      shortBioEn: 'Lawyer with over 20 years of professional experience in public and private law.',
      fullBioKa: 'თინათინ სირაძე არის იურისტი 20 წელზე მეტი პროფესიული გამოცდილებით საჯარო და კერძო სამართლის სფეროებში. ის არის მოქმედი ადვოკატი სამოქალაქო და ადმინისტრაციული სამართლის სპეციალიზაციით.',
      fullBioEn: 'Tinatin Siradze is a lawyer with over 20 years of professional experience in public and private law. She is an active advocate specializing in civil and administrative law.',
      photo: null,
      gbaNumber: null,
      practiceAreas: ['corporate-law', 'contract-law', 'labor-law', 'healthcare-law', 'administrative-law', 'litigation', 'risk-management'],
      isFeatured: true,
      order: 2,
      active: true,
    },
    {
      slug: 'nino-dzaganishvili',
      nameKa: 'ნინო ძაგანიშვილი',
      nameEn: 'Nino Dzaganishvili',
      titleKa: 'პარტნიორი',
      titleEn: 'Partner',
      shortBioKa: '',
      shortBioEn: '',
      fullBioKa: '',
      fullBioEn: '',
      photo: null,
      gbaNumber: null,
      practiceAreas: [],
      isFeatured: true,
      order: 3,
      active: true,
    },
    {
      slug: 'tamta-basilaia',
      nameKa: 'თამთა ბასილაია',
      nameEn: 'Tamta Basilaia',
      titleKa: 'სტრატეგიული პროექტების მართვის კონსულტანტი',
      titleEn: 'Strategic Project Management Consultant',
      shortBioKa: 'პროექტების მართვის დამოუკიდებელი კონსულტანტი და PMI სერთიფიცირებული პროექტის მენეჯერი.',
      shortBioEn: 'Independent project management consultant and PMI-certified Project Manager.',
      fullBioKa: 'თამთა ბასილაია არის პროექტების მართვის დამოუკიდებელი კონსულტანტი, ტრენერი და საერთაშორისო პროექტების მართვის ინსტიტუტის (PMI) სერთიფიცირებული პროექტის მენეჯერი.',
      fullBioEn: 'Tamta Basilaia is an independent project management consultant, trainer, and certified Project Manager of the Project Management Institute (PMI).',
      photo: null,
      gbaNumber: null,
      practiceAreas: ['project-management', 'strategic-consulting'],
      isFeatured: false,
      order: 4,
      active: true,
    },
    {
      slug: 'shio-vekua',
      nameKa: 'შიო ვეკუა',
      nameEn: 'Shio Vekua',
      titleKa: 'ფინანსური აუდიტისა და რისკების მართვის სპეციალისტი',
      titleEn: 'Financial Audit and Risk Management Specialist',
      shortBioKa: 'აუდიტისა და ფინანსური კონტროლის სფეროს პროფესიონალი მრავალწლიანი გამოცდილებით.',
      shortBioEn: 'Professional in audit and financial control with many years of experience.',
      fullBioKa: 'შიო ვეკუა არის აუდიტისა და ფინანსური კონტროლის სფეროს პროფესიონალი მრავალწლიანი გამოცდილებით როგორც საჯარო, ისე კერძო სექტორში.',
      fullBioEn: 'Shio Vekua is a professional in the field of audit and financial control with many years of experience in both public and private sectors.',
      photo: null,
      gbaNumber: null,
      practiceAreas: ['financial-audit', 'risk-management'],
      isFeatured: false,
      order: 5,
      active: true,
    },
    {
      slug: 'salome-koberidze',
      nameKa: 'სალომე კობერიძე',
      nameEn: 'Salome Koberidze',
      titleKa: 'წამყვანი იურისტი',
      titleEn: 'Lead Lawyer',
      shortBioKa: 'იურისტი მრავალწლიანი გამოცდილებით კორპორაციული, კომერციული და სამოქალაქო სამართლის სფეროებში.',
      shortBioEn: 'Lawyer with many years of experience in corporate, commercial, and civil law.',
      fullBioKa: 'სალომე კობერიძე არის იურისტი მრავალწლიანი პროფესიული გამოცდილებით კორპორაციული, კომერციული და სამოქალაქო სამართლის სფეროებში. ის არის ადვოკატი სამოქალაქო და ადმინისტრაციული სამართლის სპეციალიზაციით.',
      fullBioEn: 'Salome Koberidze is a lawyer with many years of professional experience in corporate, commercial, and civil law. She is an advocate specializing in civil and administrative law.',
      photo: null,
      gbaNumber: null,
      practiceAreas: ['corporate-law', 'civil-law', 'contract-law', 'labor-law', 'administrative-law', 'litigation'],
      isFeatured: false,
      order: 6,
      active: true,
    },
    {
      slug: 'sandro-mtskveradze',
      nameKa: 'სანდრო მწყერაძე',
      nameEn: 'Sandro Mtskveradze',
      titleKa: 'იურისტი',
      titleEn: 'Lawyer',
      shortBioKa: 'იურისტი 10-ზე მეტი წლის გამოცდილებით საკორპორაციო და ენერგეტიკის სამართლის სფეროებში.',
      shortBioEn: 'Lawyer with over 10 years of experience in corporate and energy law.',
      fullBioKa: 'სანდრო მწყერაძე არის იურისტი 10-ზე მეტი წლის პროფესიული გამოცდილებით საკორპორაციო და ენერგეტიკის სამართლის სფეროებში. ის არის მოქმედი ადვოკატი სამოქალაქო სამართლის სპეციალიზაციით.',
      fullBioEn: 'Sandro Mtskveradze is a lawyer with over 10 years of professional experience in corporate and energy law. He is an active advocate specializing in civil law.',
      photo: null,
      gbaNumber: null,
      practiceAreas: ['corporate-law', 'energy-law', 'infrastructure-law', 'project-finance', 'contract-law', 'compliance', 'commercial-law', 'litigation'],
      isFeatured: false,
      order: 7,
      active: true,
    },
  ]

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { slug: member.slug },
      update: {
        nameKa: member.nameKa,
        nameEn: member.nameEn,
        titleKa: member.titleKa,
        titleEn: member.titleEn,
        shortBioKa: member.shortBioKa,
        shortBioEn: member.shortBioEn,
        fullBioKa: member.fullBioKa,
        fullBioEn: member.fullBioEn,
        photo: member.photo,
        gbaNumber: member.gbaNumber,
        practiceAreas: member.practiceAreas,
        isFeatured: member.isFeatured,
        order: member.order,
        active: member.active,
      },
      create: member,
    })
  }

  // --- Blog Posts ---
  const blogPosts = [
    {
      slug: 'corporate-law-georgia-changes-2025',
      titleKa: 'კორპორაციული სამართალი საქართველოში - 2025 წლის ცვლილებები',
      titleEn: 'Corporate Law in Georgia - Changes in 2025',
      contentKa: `<p>2025 წელს საქართველოს კორპორაციულ სამართალში მნიშვნელოვანი ცვლილებები განხორციელდა, რომლებიც მიზნად ისახავს ბიზნეს გარემოს გაუმჯობესებას და საერთაშორისო სტანდარტებთან ჰარმონიზაციას. „მეწარმეთა შესახებ" საქართველოს კანონში შეტანილი ცვლილებები მოიცავს კომპანიის მართვის სტრუქტურის გამარტივებას, სამეთვალყურეო საბჭოს უფლებამოსილებების გაფართოებას და მცირე და საშუალო ბიზნესის რეგისტრაციის პროცედურების ოპტიმიზაციას.</p>
<h2>ძირითადი ცვლილებები</h2>
<p>ერთ-ერთი მთავარი სიახლეა ციფრული მმართველობის შესაძლებლობების გაფართოება. კომპანიის პარტნიორებს და დირექტორებს ახლა შეუძლიათ დისტანციურად მიიღონ გადაწყვეტილებები ელექტრონული ხელმოწერის გამოყენებით, რაც მნიშვნელოვნად ამარტივებს კორპორაციულ მმართველობას. ასევე დაინერგა კომპანიის ბენეფიციარი მესაკუთრეების რეესტრის ელექტრონული სისტემა, რომელიც უზრუნველყოფს გამჭვირვალობის გაზრდას.</p>
<p>მნიშვნელოვანი ცვლილება შეეხო კაპიტალის სტრუქტურას. მინიმალური საწესდებო კაპიტალის მოთხოვნები გადაიხედა და დიფერენცირდა კომპანიის ტიპის მიხედვით. შეზღუდული პასუხისმგებლობის საზოგადოებისთვის (შპს) შემოღებულ იქნა მოქნილი კაპიტალის მართვის მექანიზმი, რომელიც საშუალებას აძლევს პარტნიორებს უფრო ეფექტურად მართონ კომპანიის ფინანსური რესურსები.</p>
<p>რეკომენდებულია, რომ მოქმედმა კომპანიებმა 2026 წლის ბოლომდე უზრუნველყონ თავიანთი წესდებების და კორპორაციული დოკუმენტაციის შესაბამისობა ახალ მოთხოვნებთან. ჩვენი ფირმა მზად არის დაეხმაროს ბიზნესებს ამ გარდამავალ პერიოდში სამართლებრივი კონსულტაციით და დოკუმენტაციის მომზადებით.</p>`,
      contentEn: `<p>In 2025, significant changes were implemented in Georgian corporate law, aimed at improving the business environment and harmonizing with international standards. The amendments to the Law of Georgia on Entrepreneurs encompass simplification of company management structures, expansion of supervisory board authorities, and optimization of registration procedures for small and medium businesses.</p>
<h2>Key Changes</h2>
<p>One of the main innovations is the expansion of digital governance capabilities. Company partners and directors can now make decisions remotely using electronic signatures, which significantly simplifies corporate governance. Additionally, an electronic registry system for company beneficial owners has been introduced, ensuring increased transparency.</p>
<p>A significant change concerns capital structure. Minimum charter capital requirements have been revised and differentiated according to company type. For limited liability companies (LLC), a flexible capital management mechanism has been introduced, allowing partners to manage the company's financial resources more efficiently.</p>
<p>It is recommended that existing companies ensure their charters and corporate documentation comply with the new requirements by the end of 2026. Our firm is ready to assist businesses during this transitional period with legal consultation and document preparation.</p>`,
      excerptKa: 'საქართველოს კორპორაციულ სამართალში 2025 წელს მნიშვნელოვანი ცვლილებები განხორციელდა, რომლებიც შეეხო კომპანიის მართვას, ციფრულ მმართველობას და კაპიტალის სტრუქტურას.',
      excerptEn: 'Significant changes were implemented in Georgian corporate law in 2025, affecting company management, digital governance, and capital structure.',
      status: 'published',
      publishedAt: new Date('2026-03-03T10:00:00Z'),
      authorId: null,
      tags: ['corporate-law', 'compliance', 'commercial-law'],
    },
    {
      slug: 'tax-compliance-guide-businesses-georgia',
      titleKa: 'საგადასახადო შესაბამისობის გზამკვლევი ბიზნესისთვის',
      titleEn: 'Tax Compliance Guide for Businesses',
      contentKa: `<p>საქართველოს საგადასახადო კანონმდებლობა ბოლო წლებში მნიშვნელოვან ტრანსფორმაციას განიცდის. ბიზნესებისთვის საგადასახადო შესაბამისობის უზრუნველყოფა არა მხოლოდ სამართლებრივი ვალდებულებაა, არამედ სტრატეგიული უპირატესობაც. სწორად ორგანიზებული საგადასახადო პოლიტიკა ამცირებს რისკებს, ხელს უწყობს ინვესტორების ნდობის მოპოვებას და კომპანიის მდგრად განვითარებას.</p>
<h2>ძირითადი საგადასახადო ვალდებულებები</h2>
<p>საქართველოში მოქმედი ბიზნესები ვალდებულნი არიან აწარმოონ ბუღალტრული აღრიცხვა საქართველოს ფინანსური ანგარიშგების საერთაშორისო სტანდარტების (IFRS) შესაბამისად. მოგების გადასახადი ე.წ. ესტონური მოდელით ხორციელდება - გადასახადი გადახდას ექვემდებარება მხოლოდ მოგების განაწილების შემთხვევაში. დამატებული ღირებულების გადასახადის (დღგ) რეგისტრაცია სავალდებულოა იმ კომპანიებისთვის, რომლთა წლიური ბრუნვა აჭარბებს 100,000 ლარს.</p>
<p>საგულისხმოა ტრანსფერ ფრაისინგის წესების გამკაცრება. ურთიერთდამოკიდებულ პირებს შორის გარიგებები უნდა შეესაბამებოდეს საბაზრო ფასებს, ხოლო შესაბამისი დოკუმენტაციის წარმოება სავალდებულოა კომპანიებისთვის, რომელთა შემოსავალი აღემატება 8 მილიონ ლარს. დოკუმენტაციის არქონა შეიძლება გახდეს ჯარიმის დაკისრების საფუძველი.</p>
<p>ჩვენი გუნდი გთავაზობთ საგადასახადო აუდიტს, შესაბამისობის შეფასებას და საგადასახადო დავების წარმოებას. დროული კონსულტაცია საშუალებას მოგცემთ თავიდან აიცილოთ სანქციები და ოპტიმიზაცია გაუკეთოთ საგადასახადო ტვირთს კანონის ფარგლებში.</p>`,
      contentEn: `<p>Georgian tax legislation has undergone significant transformation in recent years. For businesses, ensuring tax compliance is not only a legal obligation but also a strategic advantage. A properly organized tax policy reduces risks, helps build investor confidence, and supports sustainable company development.</p>
<h2>Key Tax Obligations</h2>
<p>Businesses operating in Georgia are required to maintain accounting records in accordance with International Financial Reporting Standards (IFRS). Corporate income tax operates under the so-called Estonian model — tax is payable only upon distribution of profits. Value Added Tax (VAT) registration is mandatory for companies whose annual turnover exceeds GEL 100,000.</p>
<p>Notably, transfer pricing rules have been tightened. Transactions between related parties must comply with market prices, and maintaining appropriate documentation is mandatory for companies with revenue exceeding GEL 8 million. Lack of documentation may serve as grounds for penalty imposition.</p>
<p>Our team offers tax audits, compliance assessments, and tax dispute representation. Timely consultation will allow you to avoid sanctions and optimize your tax burden within the framework of the law.</p>`,
      excerptKa: 'საქართველოში მოქმედი ბიზნესებისთვის საგადასახადო შესაბამისობის უზრუნველყოფა სტრატეგიული მნიშვნელობის საკითხია. გაეცანით ძირითად ვალდებულებებს და რეკომენდაციებს.',
      excerptEn: 'Ensuring tax compliance is a strategically important issue for businesses operating in Georgia. Learn about key obligations and recommendations.',
      status: 'published',
      publishedAt: new Date('2026-03-07T10:00:00Z'),
      authorId: null,
      tags: ['tax-law', 'compliance', 'financial-audit'],
    },
    {
      slug: 'construction-infrastructure-law-regulations-georgia',
      titleKa: 'სამშენებლო და ინფრასტრუქტურული სამართალი - ძირითადი რეგულაციები',
      titleEn: 'Construction and Infrastructure Law - Key Regulations',
      contentKa: `<p>საქართველოში სამშენებლო სექტორი ეკონომიკის ერთ-ერთი ყველაზე დინამიურად განვითარებადი დარგია. სამშენებლო საქმიანობის სამართლებრივი რეგულირება მოიცავს ნებართვების სისტემას, უსაფრთხოების სტანდარტებს, გარემოსდაცვით მოთხოვნებს და კონტრაქტორების პასუხისმგებლობის საკითხებს. სწორი სამართლებრივი მიდგომა პროექტის დაგეგმვის ეტაპიდანვე კრიტიკულად მნიშვნელოვანია წარმატებული განხორციელებისთვის.</p>
<h2>სამშენებლო ნებართვების სისტემა</h2>
<p>სამშენებლო ნებართვის მიღების პროცესი რამდენიმე ეტაპს მოიცავს: მიწის ნაკვეთის სამშენებლო პირობების დადგენა, არქიტექტურული პროექტის შეთანხმება და მშენებლობის ნებართვის გაცემა. განსაკუთრებული ყურადღება ეთმობა სეისმური უსაფრთხოების სტანდარტებს, ენერგოეფექტურობის მოთხოვნებს და ხანძარსაწინააღმდეგო ნორმებს. ნებართვის გარეშე მშენებლობა იწვევს მძიმე ადმინისტრაციულ სანქციებს, მათ შორის ნაგებობის დემონტაჟის ვალდებულებას.</p>
<p>ინფრასტრუქტურული პროექტების სამართლებრივი ჩარჩო მოიცავს საჯარო-კერძო პარტნიორობის (PPP) მექანიზმებს, კონცესიების რეჟიმს და სახელმწიფო შესყიდვების სპეციალურ პროცედურებს. მსხვილი ინფრასტრუქტურული პროექტები ხშირად მოითხოვენ გარემოზე ზემოქმედების შეფასებას (EIA) და საერთაშორისო საფინანსო ინსტიტუტების მოთხოვნებთან შესაბამისობას.</p>
<p>ჩვენი ფირმა სთავაზობს კლიენტებს სამშენებლო პროექტების სრულ სამართლებრივ მხარდაჭერას — ნებართვების მოპოვებიდან კონტრაქტების შედგენამდე და დავების გადაწყვეტამდე. ჩვენი გამოცდილება მოიცავს როგორც კომერციულ, ისე საცხოვრებელ მშენებლობას და ინფრასტრუქტურულ პროექტებს.</p>`,
      contentEn: `<p>The construction sector in Georgia is one of the most dynamically developing areas of the economy. Legal regulation of construction activities encompasses the permits system, safety standards, environmental requirements, and contractor liability issues. A proper legal approach from the project planning stage is critically important for successful implementation.</p>
<h2>Construction Permits System</h2>
<p>The construction permit process involves several stages: establishing land plot construction conditions, coordinating the architectural project, and issuing the construction permit. Special attention is given to seismic safety standards, energy efficiency requirements, and fire safety regulations. Construction without a permit results in severe administrative sanctions, including the obligation to demolish the structure.</p>
<p>The legal framework for infrastructure projects includes public-private partnership (PPP) mechanisms, concession regimes, and special public procurement procedures. Large infrastructure projects often require Environmental Impact Assessments (EIA) and compliance with international financial institution requirements.</p>
<p>Our firm offers clients full legal support for construction projects — from obtaining permits to drafting contracts and resolving disputes. Our experience encompasses commercial, residential, and infrastructure projects.</p>`,
      excerptKa: 'საქართველოში სამშენებლო სექტორის სამართლებრივი რეგულირება მოიცავს ნებართვებს, უსაფრთხოებას და კონტრაქტორების პასუხისმგებლობას. გაეცანით ძირითად მოთხოვნებს.',
      excerptEn: 'Legal regulation of the construction sector in Georgia covers permits, safety, and contractor liability. Learn about the key requirements.',
      status: 'published',
      publishedAt: new Date('2026-03-12T10:00:00Z'),
      authorId: null,
      tags: ['infrastructure-law', 'contract-law', 'administrative-law'],
    },
    {
      slug: 'employment-law-updates-worker-protection-georgia',
      titleKa: 'შრომის სამართლის განახლებები - მშრომელთა დაცვა',
      titleEn: 'Employment Law Updates - Worker Protection',
      contentKa: `<p>საქართველოს შრომის კანონმდებლობა ბოლო წლებში მნიშვნელოვანი რეფორმების ობიექტი გახდა, განსაკუთრებით მშრომელთა უფლებების დაცვის გაძლიერების მიმართულებით. შრომის კოდექსის ცვლილებებმა გააფართოვა დასაქმებულთა გარანტიები, დაინერგა ახალი მექანიზმები შრომითი დავების გადასაწყვეტად და გამკაცრდა დამსაქმებლის ვალდებულებები სამუშაო პირობების უზრუნველყოფის კუთხით.</p>
<h2>შრომითი ხელშეკრულებები და გათავისუფლება</h2>
<p>შრომითი ხელშეკრულებების რეგულირება გამკაცრდა. დამსაქმებელი ვალდებულია წერილობითი ფორმით გააფორმოს შრომითი ხელშეკრულება, სადაც მკაფიოდ იქნება განსაზღვრული სამუშაო პირობები, ანაზღაურება, სამუშაო საათები და შვებულების უფლება. დასაქმებულის გათავისუფლებისთვის საჭიროა ობიექტური საფუძველი, ხოლო უსაფუძვლო გათავისუფლების შემთხვევაში სასამართლოს შეუძლია დააკისროს კომპენსაცია 6-თვიანი ხელფასის ოდენობით.</p>
<p>შრომის ინსპექციის უფლებამოსილებები გაფართოვდა. ინსპექციას ახლა უფლება აქვს შეამოწმოს არა მხოლოდ შრომის უსაფრთხოების, არამედ შრომითი უფლებების დაცვის საკითხებიც. დარღვევის აღმოჩენის შემთხვევაში ინსპექციას შეუძლია გამოსცეს სავალდებულო მითითებები და დააკისროს ჯარიმა.</p>
<p>დამსაქმებლებს ვურჩევთ რეგულარულად გადახედონ შრომით ხელშეკრულებებს და შიდა პოლიტიკის დოკუმენტებს კანონმდებლობასთან შესაბამისობის უზრუნველსაყოფად. ჩვენი გუნდი გთავაზობთ შრომის სამართლის სრულ კონსულტაციას, შრომითი ხელშეკრულებების შედგენას და შრომითი დავების წარმოებას.</p>`,
      contentEn: `<p>Georgian labor legislation has been the subject of significant reforms in recent years, particularly in strengthening the protection of workers' rights. Amendments to the Labor Code have expanded employee guarantees, introduced new mechanisms for resolving labor disputes, and tightened employer obligations regarding working conditions.</p>
<h2>Employment Contracts and Termination</h2>
<p>Regulation of employment contracts has been strengthened. Employers are required to execute written employment contracts clearly defining working conditions, compensation, working hours, and leave entitlements. Objective grounds are required for employee termination, and in cases of unjustified dismissal, courts may impose compensation of up to six months' salary.</p>
<p>The Labor Inspection's authority has been expanded. The Inspection now has the right to examine not only occupational safety but also labor rights protection issues. Upon discovering violations, the Inspection may issue mandatory instructions and impose fines.</p>
<p>We advise employers to regularly review their employment contracts and internal policy documents to ensure compliance with legislation. Our team offers comprehensive labor law consultation, employment contract drafting, and labor dispute representation.</p>`,
      excerptKa: 'საქართველოს შრომის კოდექსში შეტანილმა ცვლილებებმა გააძლიერა მშრომელთა დაცვა. გაეცანით დამსაქმებლის ახალ ვალდებულებებს და დასაქმებულთა გარანტიებს.',
      excerptEn: 'Amendments to the Georgian Labor Code have strengthened worker protection. Learn about new employer obligations and employee guarantees.',
      status: 'published',
      publishedAt: new Date('2026-03-17T10:00:00Z'),
      authorId: null,
      tags: ['labor-law', 'litigation', 'compliance'],
    },
    {
      slug: 'energy-sector-legal-framework-georgia',
      titleKa: 'ენერგეტიკის სექტორის სამართლებრივი ჩარჩო საქართველოში',
      titleEn: 'Energy Sector Legal Framework in Georgia',
      contentKa: `<p>საქართველოს ენერგეტიკის სექტორი სტრატეგიული მნიშვნელობის დარგია, რომელიც მოიცავს ჰიდროენერგეტიკას, ქარის და მზის ენერგიას, ასევე ნავთობისა და გაზის ტრანზიტს. ქვეყნის გეოგრაფიული მდებარეობა და მდიდარი ჰიდრორესურსები ქმნიან უნიკალურ შესაძლებლობებს ენერგეტიკული ინვესტიციებისთვის. სამართლებრივი ჩარჩოს ცოდნა აუცილებელია ამ სექტორში წარმატებული საქმიანობისთვის.</p>
<h2>ენერგეტიკული კანონმდებლობის ძირითადი ასპექტები</h2>
<p>საქართველოს ენერგეტიკის კანონი და მისი ქვენორმატიული აქტები არეგულირებენ ელექტროენერგიის წარმოებას, გადაცემას, განაწილებას და მოხმარებას. ენერგეტიკის მარეგულირებელი კომისია (GNERC) განსაზღვრავს ტარიფებს, გასცემს ლიცენზიებს და ზედამხედველობს ბაზრის მონაწილეების საქმიანობას. განახლებადი ენერგიის წყაროების კანონი ადგენს პრეფერენციულ პირობებს მწვანე ენერგეტიკის პროექტებისთვის, მათ შორის გარანტირებული შესყიდვის ტარიფებს და საგადასახადო შეღავათებს.</p>
<p>ინვესტორებისთვის განსაკუთრებით მნიშვნელოვანია მიწის შესყიდვისა და იჯარის, გარემოზე ზემოქმედების შეფასების და ადგილობრივი თემების ჩართულობის საკითხები. ჰიდროელექტროსადგურების მშენებლობა მოითხოვს კომპლექსურ სამართლებრივ მხარდაჭერას — წყლის რესურსების გამოყენების ლიცენზიიდან დაწყებული ელექტროენერგიის ყიდვა-გაყიდვის ხელშეკრულების (PPA) შედგენამდე.</p>
<p>ჩვენი ფირმის ენერგეტიკის სამართლის გუნდს აქვს მრავალწლიანი გამოცდილება ენერგეტიკული პროექტების სამართლებრივ მხარდაჭერაში, მათ შორის ჰიდროელექტროსადგურების, ქარის ფარმების და მზის ელექტროსადგურების პროექტებში. ჩვენ ვთავაზობთ კლიენტებს სრულ სამართლებრივ სერვისს — საპროექტო ფინანსირებიდან მარეგულირებელ საკითხებამდე.</p>`,
      contentEn: `<p>Georgia's energy sector is a strategically important industry encompassing hydropower, wind and solar energy, as well as oil and gas transit. The country's geographical location and rich hydroelectric resources create unique opportunities for energy investments. Knowledge of the legal framework is essential for successful operations in this sector.</p>
<h2>Key Aspects of Energy Legislation</h2>
<p>The Georgian Energy Law and its subordinate regulations govern the generation, transmission, distribution, and consumption of electricity. The Georgian National Energy and Water Supply Regulatory Commission (GNERC) sets tariffs, issues licenses, and supervises market participants. The Renewable Energy Sources Law establishes preferential conditions for green energy projects, including guaranteed purchase tariffs and tax incentives.</p>
<p>For investors, issues related to land acquisition and lease, environmental impact assessment, and local community engagement are particularly important. Hydroelectric power plant construction requires comprehensive legal support — from water resource utilization licenses to drafting Power Purchase Agreements (PPAs).</p>
<p>Our firm's energy law team has years of experience providing legal support for energy projects, including hydroelectric power plants, wind farms, and solar power plant projects. We offer clients a full range of legal services — from project finance to regulatory matters.</p>`,
      excerptKa: 'საქართველოს ენერგეტიკის სექტორი უნიკალურ ინვესტიციურ შესაძლებლობებს ქმნის. გაეცანით სამართლებრივ ჩარჩოს და რეგულაციებს.',
      excerptEn: 'Georgia\'s energy sector creates unique investment opportunities. Learn about the legal framework and regulations.',
      status: 'published',
      publishedAt: new Date('2026-03-22T10:00:00Z'),
      authorId: null,
      tags: ['energy-law', 'infrastructure-law', 'project-finance'],
    },
    {
      slug: 'telecommunications-law-georgia-digital-regulation',
      titleKa: 'სატელეკომუნიკაციო სამართალი საქართველოში — ციფრული რეგულირების ახალი ეპოქა',
      titleEn: 'Telecommunications Law in Georgia — A New Era of Digital Regulation',
      contentKa: `<p>საქართველოს სატელეკომუნიკაციო სექტორი სწრაფად ვითარდება და მისი სამართლებრივი რეგულირება მუდმივად განახლებას საჭიროებს. საქართველოს კომუნიკაციების ეროვნული კომისია (GNCC) არის ძირითადი მარეგულირებელი ორგანო, რომელიც პასუხისმგებელია ლიცენზირებაზე, ტარიფების რეგულირებაზე და ბაზრის კონკურენტუნარიანობის უზრუნველყოფაზე.</p>
<h2>ძირითადი სამართლებრივი ჩარჩო</h2>
<p>„ელექტრონული კომუნიკაციების შესახებ" საქართველოს კანონი არეგულირებს სატელეკომუნიკაციო მომსახურებების მიწოდებას, ქსელების აგებასა და ოპერატორთა ვალდებულებებს. კანონი მოიცავს ინტერკონექციის, ნუმერაციის, რადიოსიხშირული სპექტრის მართვისა და მომხმარებელთა უფლებების დაცვის საკითხებს. 2025 წლის ცვლილებებით გაძლიერდა მონაცემთა დაცვის მოთხოვნები და დაინერგა 5G ქსელების განლაგების ახალი პროცედურები.</p>
<h2>პერსონალურ მონაცემთა დაცვა</h2>
<p>სატელეკომუნიკაციო კომპანიები ვალდებულნი არიან დაიცვან მომხმარებელთა პერსონალური მონაცემები „პერსონალურ მონაცემთა დაცვის შესახებ" საქართველოს კანონის შესაბამისად. ეს მოიცავს მონაცემთა შეგროვების, დამუშავებისა და შენახვის მკაცრ სტანდარტებს, რომლებიც ჰარმონიზირებულია ევროკავშირის GDPR-თან.</p>
<p>ჩვენი გუნდი უზრუნველყოფს სატელეკომუნიკაციო კომპანიებისთვის ყოვლისმომცველ სამართლებრივ მხარდაჭერას — ლიცენზირებიდან მარეგულირებელ ორგანოებთან წარმომადგენლობამდე.</p>`,
      contentEn: `<p>Georgia's telecommunications sector is rapidly evolving, requiring constant updates to its legal regulation. The Georgian National Communications Commission (GNCC) serves as the primary regulatory body responsible for licensing, tariff regulation, and ensuring market competitiveness.</p>
<h2>Core Legal Framework</h2>
<p>The Georgian Law on Electronic Communications regulates the provision of telecommunications services, network construction, and operator obligations. The law covers interconnection, numbering, radio frequency spectrum management, and consumer rights protection. The 2025 amendments strengthened data protection requirements and introduced new procedures for 5G network deployment.</p>
<h2>Personal Data Protection</h2>
<p>Telecommunications companies are required to protect consumer personal data in accordance with the Georgian Law on Personal Data Protection. This includes strict standards for data collection, processing, and storage, harmonized with the EU's GDPR.</p>
<p>Our team provides comprehensive legal support for telecommunications companies — from licensing to representation before regulatory bodies.</p>`,
      excerptKa: 'საქართველოს სატელეკომუნიკაციო სექტორის სამართლებრივი რეგულირება, ლიცენზირება და მონაცემთა დაცვის მოთხოვნები.',
      excerptEn: 'Legal regulation of Georgia\'s telecommunications sector, licensing, and data protection requirements.',
      status: 'published',
      publishedAt: new Date('2026-03-10T10:00:00Z'),
      authorId: null,
      tags: ['telecommunications-law', 'compliance'],
    },
    {
      slug: 'healthcare-law-georgia-medical-regulation',
      titleKa: 'სამედიცინო სამართალი საქართველოში — პაციენტთა უფლებები და სამედიცინო დაწესებულებების რეგულირება',
      titleEn: 'Healthcare Law in Georgia — Patient Rights and Medical Facility Regulation',
      contentKa: `<p>საქართველოს ჯანდაცვის სამართალი მოიცავს სამედიცინო საქმიანობის ლიცენზირების, პაციენტთა უფლებების დაცვის, სამედიცინო პერსონალის პასუხისმგებლობისა და ფარმაცევტული რეგულირების საკითხებს. „ჯანმრთელობის დაცვის შესახებ" საქართველოს კანონი ადგენს ჯანდაცვის სისტემის ფუნქციონირების ძირითად პრინციპებს.</p>
<h2>სამედიცინო დაწესებულებების ლიცენზირება</h2>
<p>საქართველოში სამედიცინო საქმიანობის განსახორციელებლად აუცილებელია შესაბამისი ნებართვის მოპოვება. სამედიცინო დაწესებულებებმა უნდა დააკმაყოფილონ ინფრასტრუქტურის, აღჭურვილობის, პერსონალის კვალიფიკაციისა და ჰიგიენური სტანდარტების მოთხოვნები. რეგულირების ზედამხედველობის ორგანო — სახელმწიფო რეგულირების სააგენტო — ახორციელებს პერიოდულ ინსპექციებს.</p>
<h2>პაციენტთა უფლებები</h2>
<p>საქართველოს კანონმდებლობა იცავს პაციენტთა უფლებებს, მათ შორის ინფორმირებული თანხმობის, სამედიცინო დოკუმენტაციაზე წვდომის, კონფიდენციალურობისა და მკურნალობის არჩევის უფლებას. სამედიცინო შეცდომის შემთხვევაში პაციენტს უფლება აქვს მოითხოვოს ზიანის ანაზღაურება როგორც სამოქალაქო, ისე სისხლის სამართლის წესით.</p>
<p>ჩვენი ფირმა სპეციალიზირდება სამედიცინო დაწესებულებების სამართლებრივ მხარდაჭერაში, მათ შორის ლიცენზირების, სამედიცინო დავების წარმოებისა და მარეგულირებელ ორგანოებთან ურთიერთობის საკითხებში.</p>`,
      contentEn: `<p>Georgian healthcare law encompasses medical activity licensing, patient rights protection, medical personnel liability, and pharmaceutical regulation. The Georgian Law on Healthcare establishes the fundamental principles of the healthcare system's operation.</p>
<h2>Medical Facility Licensing</h2>
<p>To conduct medical activities in Georgia, obtaining the appropriate permits is mandatory. Medical facilities must meet requirements for infrastructure, equipment, personnel qualifications, and hygiene standards. The regulatory oversight body — the State Regulation Agency — conducts periodic inspections.</p>
<h2>Patient Rights</h2>
<p>Georgian legislation protects patient rights, including informed consent, access to medical records, confidentiality, and the right to choose treatment. In cases of medical malpractice, patients have the right to seek compensation through both civil and criminal proceedings.</p>
<p>Our firm specializes in legal support for medical institutions, including licensing, medical dispute resolution, and regulatory body relations.</p>`,
      excerptKa: 'საქართველოს ჯანდაცვის სამართალი — სამედიცინო ლიცენზირება, პაციენტთა უფლებები და სამედიცინო დავების გადაწყვეტა.',
      excerptEn: 'Georgian healthcare law — medical licensing, patient rights, and medical dispute resolution.',
      status: 'published',
      publishedAt: new Date('2026-03-14T10:00:00Z'),
      authorId: null,
      tags: ['healthcare-law', 'litigation', 'administrative-law'],
    },
    {
      slug: 'transportation-law-georgia-logistics-regulation',
      titleKa: 'სატრანსპორტო სამართალი საქართველოში — ლოგისტიკის რეგულირება და საერთაშორისო გადაზიდვები',
      titleEn: 'Transportation Law in Georgia — Logistics Regulation and International Shipping',
      contentKa: `<p>საქართველოს სტრატეგიული გეოგრაფიული მდებარეობა ევროპასა და აზიას შორის ქმნის უნიკალურ შესაძლებლობებს სატრანსპორტო და ლოგისტიკური სექტორისთვის. სატრანსპორტო სამართალი მოიცავს საავტომობილო, სარკინიგზო, საჰაერო და საზღვაო გადაზიდვების რეგულირებას, ასევე მულტიმოდალური ტრანსპორტირების სამართლებრივ ჩარჩოს.</p>
<h2>საერთაშორისო გადაზიდვების რეგულირება</h2>
<p>საქართველო არის CMR კონვენციის, COTIF-ის და სხვა საერთაშორისო სატრანსპორტო ხელშეკრულებების მონაწილე. ეს ხელშეკრულებები არეგულირებს გადამზიდავის პასუხისმგებლობას, ტვირთის დაზღვევას, საბაჟო პროცედურებს და სატრანზიტო გადაზიდვების წესებს. 2025 წელს საქართველომ გააძლიერა თანამშრომლობა „შუა დერეფნის" ფარგლებში, რამაც გამოიწვია სატრანზიტო რეგულაციების განახლება.</p>
<h2>სალიცენზიო მოთხოვნები</h2>
<p>სატრანსპორტო საქმიანობა საქართველოში მოითხოვს შესაბამის ლიცენზიებსა და ნებართვებს. საერთაშორისო სატვირთო გადაზიდვების ლიცენზია, სამგზავრო გადაყვანის ნებართვა და სპეციალური ტვირთების (საშიში ტვირთები, არაგაბარიტული ტვირთები) გადაზიდვის ნებართვები რეგულირდება „საავტომობილო ტრანსპორტის შესახებ" საქართველოს კანონით.</p>
<p>Strategic Counsel Group-ის გუნდი უზრუნველყოფს სატრანსპორტო კომპანიებისა და ლოგისტიკური ოპერატორების სრულ სამართლებრივ მხარდაჭერას.</p>`,
      contentEn: `<p>Georgia's strategic geographical location between Europe and Asia creates unique opportunities for the transport and logistics sector. Transportation law encompasses the regulation of road, rail, air, and maritime transport, as well as the legal framework for multimodal transportation.</p>
<h2>International Shipping Regulation</h2>
<p>Georgia is a party to the CMR Convention, COTIF, and other international transport agreements. These agreements regulate carrier liability, cargo insurance, customs procedures, and transit transport rules. In 2025, Georgia strengthened cooperation within the "Middle Corridor" framework, leading to updates in transit regulations.</p>
<h2>Licensing Requirements</h2>
<p>Transport activities in Georgia require appropriate licenses and permits. International freight transport licenses, passenger transport permits, and special cargo (hazardous materials, oversized loads) transport permits are regulated by the Georgian Law on Road Transport.</p>
<p>The Strategic Counsel Group team provides comprehensive legal support for transport companies and logistics operators.</p>`,
      excerptKa: 'საქართველოს სატრანსპორტო სამართალი — საერთაშორისო გადაზიდვების რეგულირება, ლიცენზირება და „შუა დერეფნის" სამართლებრივი ჩარჩო.',
      excerptEn: 'Georgian transportation law — international shipping regulation, licensing, and the Middle Corridor legal framework.',
      status: 'published',
      publishedAt: new Date('2026-03-19T10:00:00Z'),
      authorId: null,
      tags: ['transportation-law', 'compliance', 'contract-law'],
    },
    {
      slug: 'construction-law-georgia-building-permits-safety',
      titleKa: 'სამშენებლო სამართალი საქართველოში — მშენებლობის ნებართვები, უსაფრთხოება და FIDIC კონტრაქტები',
      titleEn: 'Construction Law in Georgia — Building Permits, Safety, and FIDIC Contracts',
      contentKa: `<p>საქართველოს სამშენებლო სექტორი ბოლო წლებში მნიშვნელოვან ზრდას განიცდის, რაც სამშენებლო სამართლის აქტუალურობას კიდევ უფრო ზრდის. „მშენებლობის ნებართვის შესახებ" საქართველოს კანონი და შესაბამისი კანონქვემდებარე აქტები არეგულირებს მშენებლობის დაგეგმვას, ნებართვების გაცემას, სამშენებლო ზედამხედველობასა და ექსპლუატაციაში მიღების პროცედურებს.</p>
<h2>მშენებლობის ნებართვების სისტემა</h2>
<p>საქართველოში მშენებლობის ნებართვის მოპოვება მოიცავს რამდენიმე ეტაპს: მიწის ნაკვეთის სამშენებლო განვითარების პირობების დადგენა, არქიტექტურული პროექტის შეთანხმება, მშენებლობის ნებართვის გაცემა და მშენებლობის ზედამხედველობა. 2025 წლიდან დაინერგა ელექტრონული ნებართვების სისტემა, რამაც მნიშვნელოვნად გაამარტივა პროცესი.</p>
<h2>FIDIC კონტრაქტები საქართველოში</h2>
<p>საქართველოში ინფრასტრუქტურულ პროექტებში ფართოდ გამოიყენება FIDIC-ის სტანდარტული კონტრაქტის ფორმები. ეს განსაკუთრებით ეხება საერთაშორისო დაფინანსების (მსოფლიო ბანკი, ADB, EBRD) მქონე პროექტებს. FIDIC-ის „წითელი წიგნის" და „ყვითელი წიგნის" კონტრაქტები ყველაზე ხშირად გამოიყენება გზების, ხიდების და ენერგეტიკული ინფრასტრუქტურის მშენებლობაში.</p>
<h2>სეისმური უსაფრთხოება</h2>
<p>საქართველო სეისმურად აქტიურ ზონაში მდებარეობს, რის გამოც სამშენებლო კოდექსი მკაცრ მოთხოვნებს აწესებს შენობების სეისმურ მდგრადობაზე. ყველა ახალი მშენებლობა უნდა აკმაყოფილებდეს ეროვნულ სეისმურ სტანდარტებს, რომლებიც ჰარმონიზირებულია ევროკოდებთან (Eurocodes).</p>
<p>ჩვენი გუნდი გთავაზობთ სრულ სამართლებრივ მხარდაჭერას სამშენებლო პროექტებში — ნებართვების მოპოვებიდან FIDIC კონტრაქტების მომზადებასა და დავების წარმოებამდე.</p>`,
      contentEn: `<p>Georgia's construction sector has experienced significant growth in recent years, making construction law increasingly relevant. The Georgian Law on Construction Permits and related subordinate legislation regulates construction planning, permit issuance, construction supervision, and commissioning procedures.</p>
<h2>Building Permit System</h2>
<p>Obtaining a construction permit in Georgia involves several stages: establishing land plot development conditions, architectural project approval, construction permit issuance, and construction supervision. Since 2025, an electronic permitting system has been introduced, significantly simplifying the process.</p>
<h2>FIDIC Contracts in Georgia</h2>
<p>FIDIC standard contract forms are widely used in infrastructure projects in Georgia. This particularly applies to projects with international financing (World Bank, ADB, EBRD). FIDIC "Red Book" and "Yellow Book" contracts are most commonly used in the construction of roads, bridges, and energy infrastructure.</p>
<h2>Seismic Safety</h2>
<p>Georgia is located in a seismically active zone, which is why the building code imposes strict requirements on buildings' seismic resistance. All new construction must meet national seismic standards harmonized with Eurocodes.</p>
<p>Our team offers comprehensive legal support for construction projects — from obtaining permits to preparing FIDIC contracts and dispute resolution.</p>`,
      excerptKa: 'საქართველოს სამშენებლო სამართალი — ნებართვები, FIDIC კონტრაქტები, სეისმური უსაფრთხოება და სამშენებლო დავების წარმოება.',
      excerptEn: 'Georgian construction law — permits, FIDIC contracts, seismic safety, and construction dispute resolution.',
      status: 'published',
      publishedAt: new Date('2026-03-20T10:00:00Z'),
      authorId: null,
      tags: ['construction-law', 'infrastructure-law', 'contract-law'],
    },
  ]

  for (const post of blogPosts) {
    const { tags, ...postData } = post
    const upserted = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        titleKa: postData.titleKa,
        titleEn: postData.titleEn,
        contentKa: postData.contentKa,
        contentEn: postData.contentEn,
        excerptKa: postData.excerptKa,
        excerptEn: postData.excerptEn,
        status: postData.status,
        publishedAt: postData.publishedAt,
        authorId: postData.authorId,
      },
      create: {
        slug: postData.slug,
        titleKa: postData.titleKa,
        titleEn: postData.titleEn,
        contentKa: postData.contentKa,
        contentEn: postData.contentEn,
        excerptKa: postData.excerptKa,
        excerptEn: postData.excerptEn,
        status: postData.status,
        publishedAt: postData.publishedAt,
        authorId: postData.authorId,
        tags: {
          create: tags.map((practiceArea) => ({ practiceArea })),
        },
      },
    })

    // On update, sync tags: delete existing and recreate
    const existingTags = await prisma.blogPostTag.findMany({
      where: { postId: upserted.id },
    })
    const existingSlugs = existingTags.map((t) => t.practiceArea)
    const tagsMatch =
      existingSlugs.length === tags.length &&
      tags.every((t) => existingSlugs.includes(t))

    if (!tagsMatch) {
      await prisma.blogPostTag.deleteMany({ where: { postId: upserted.id } })
      await prisma.blogPostTag.createMany({
        data: tags.map((practiceArea) => ({
          postId: upserted.id,
          practiceArea,
        })),
      })
    }
  }

  // --- Glossary Terms ---
  const glossaryTerms = [
    {
      termKa: 'იურიდიული პირი',
      termEn: 'Legal Entity',
      definitionKa: 'საქართველოს კანონმდებლობით რეგისტრირებული ორგანიზაცია, რომელსაც აქვს საკუთარი სახელით უფლებებისა და ვალდებულებების შეძენის, ქონების ფლობის, სარჩელის აღძვრისა და სასამართლოში მოპასუხედ ყოფნის უფლება.',
      definitionEn: 'An organization registered under Georgian law that has the right to acquire rights and obligations in its own name, own property, file claims, and be a defendant in court.',
    },
    {
      termKa: 'საგადასახადო რეზიდენტი',
      termEn: 'Tax Resident',
      definitionKa: 'ფიზიკური ან იურიდიული პირი, რომელიც საქართველოს საგადასახადო კანონმდებლობის მიხედვით ვალდებულია გადაიხადოს გადასახადები საქართველოში მიღებულ და საქართველოს ფარგლებს გარეთ მიღებულ შემოსავალზე.',
      definitionEn: 'A natural or legal person who, under Georgian tax legislation, is obligated to pay taxes on income received both within Georgia and abroad.',
    },
    {
      termKa: 'სასამართლო წარმომადგენლობა',
      termEn: 'Litigation / Court Representation',
      definitionKa: 'კლიენტის ინტერესების დაცვა და წარმომადგენლობა სასამართლო პროცესებში, მათ შორის სარჩელის მომზადება, შესაგებლის წარდგენა, მტკიცებულებების შეგროვება და სასამართლო სხდომებში მონაწილეობა.',
      definitionEn: 'Protection and representation of a client\'s interests in court proceedings, including preparation of claims, filing responses, collecting evidence, and participation in court hearings.',
    },
    {
      termKa: 'კორპორაციული მმართველობა',
      termEn: 'Corporate Governance',
      definitionKa: 'კომპანიის მართვის სისტემა, რომელიც მოიცავს დირექტორთა საბჭოს, სამეთვალყურეო საბჭოსა და აქციონერთა ურთიერთობებს, ასევე კომპანიის გადაწყვეტილების მიღების პროცედურებს და კონტროლის მექანიზმებს.',
      definitionEn: 'A company management system that encompasses the board of directors, supervisory board, and shareholder relations, as well as the company\'s decision-making procedures and control mechanisms.',
    },
    {
      termKa: 'დიუ-დილიჯენსი',
      termEn: 'Due Diligence',
      definitionKa: 'კომპანიის ან აქტივის ყოვლისმომცველი სამართლებრივი, ფინანსური და ოპერაციული შემოწმება ინვესტიციის, შერწყმის ან შეძენის წინ, რომელიც მიზნად ისახავს რისკების იდენტიფიცირებას და ინფორმირებული გადაწყვეტილების მიღებას.',
      definitionEn: 'A comprehensive legal, financial, and operational examination of a company or asset prior to investment, merger, or acquisition, aimed at identifying risks and making informed decisions.',
    },
    {
      termKa: 'არბიტრაჟი',
      termEn: 'Arbitration',
      definitionKa: 'დავის ალტერნატიული გადაწყვეტის მექანიზმი, რომლის დროსაც მხარეები თანხმდებიან, რომ მათ დავას განიხილავს არბიტრი ან არბიტრთა პანელი სასამართლოს ნაცვლად. გადაწყვეტილება, როგორც წესი, საბოლოოა და სავალდებულო.',
      definitionEn: 'An alternative dispute resolution mechanism where parties agree to have their dispute resolved by an arbitrator or panel of arbitrators instead of a court. The decision is typically final and binding.',
    },
    {
      termKa: 'ხელშეკრულების შეუსრულებლობა',
      termEn: 'Breach of Contract',
      definitionKa: 'ხელშეკრულების მხარის მიერ ხელშეკრულებით ნაკისრი ვალდებულებების სრულად ან ნაწილობრივ შეუსრულებლობა, რაც მეორე მხარეს აძლევს უფლებას მოითხოვოს ზიანის ანაზღაურება ან ხელშეკრულების შეწყვეტა.',
      definitionEn: 'The full or partial non-performance of contractual obligations by a party, giving the other party the right to claim damages or terminate the contract.',
    },
    {
      termKa: 'ინტელექტუალური საკუთრება',
      termEn: 'Intellectual Property',
      definitionKa: 'გონებრივი შემოქმედების შედეგები, მათ შორის პატენტები, სასაქონლო ნიშნები, საავტორო უფლებები და სამრეწველო დიზაინი, რომლებიც დაცულია კანონით და მათ მფლობელს ანიჭებს ექსკლუზიურ უფლებებს.',
      definitionEn: 'Results of intellectual creation, including patents, trademarks, copyrights, and industrial designs, which are protected by law and grant their owner exclusive rights.',
    },
    {
      termKa: 'სახელმწიფო შესყიდვა',
      termEn: 'Public Procurement',
      definitionKa: 'სახელმწიფო ან მუნიციპალური ორგანოების მიერ საქონლის, მომსახურების ან სამშენებლო სამუშაოების შეძენის პროცესი, რომელიც რეგულირდება საქართველოს სახელმწიფო შესყიდვების შესახებ კანონით და ტარდება კონკურენტული ტენდერის პროცედურებით.',
      definitionEn: 'The process by which state or municipal bodies acquire goods, services, or construction works, regulated by the Georgian Law on Public Procurement and conducted through competitive tender procedures.',
    },
    {
      termKa: 'FIDIC კონტრაქტი',
      termEn: 'FIDIC Contract',
      definitionKa: 'საერთაშორისო საინჟინრო კონსულტანტთა ფედერაციის (FIDIC) მიერ შემუშავებული სტანდარტული სამშენებლო კონტრაქტის ფორმები, რომლებიც ფართოდ გამოიყენება საქართველოში ინფრასტრუქტურულ და სამშენებლო პროექტებში.',
      definitionEn: 'Standard construction contract forms developed by the International Federation of Consulting Engineers (FIDIC), widely used in infrastructure and construction projects in Georgia.',
    },
    {
      termKa: 'იპოთეკა',
      termEn: 'Mortgage',
      definitionKa: 'უძრავი ქონების გირავნობა, რომლის დროსაც მსესხებელი გირავნობით უზრუნველყოფს სესხის დაბრუნებას. სესხის შეუსრულებლობის შემთხვევაში კრედიტორს უფლება აქვს მოახდინოს იპოთეკით დატვირთული ქონების რეალიზაცია.',
      definitionEn: 'A pledge of real property where the borrower secures loan repayment with collateral. In case of default, the creditor has the right to foreclose on the mortgaged property.',
    },
    {
      termKa: 'მედიაცია',
      termEn: 'Mediation',
      definitionKa: 'დავის მოგვარების ალტერნატიული მეთოდი, რომლის დროსაც ნეიტრალური მესამე მხარე (მედიატორი) ეხმარება დავის მხარეებს ურთიერთმისაღები გადაწყვეტის მიღწევაში. მედიატორის გადაწყვეტილება არ არის სავალდებულო.',
      definitionEn: 'An alternative dispute resolution method where a neutral third party (mediator) helps the disputing parties reach a mutually acceptable solution. The mediator\'s decision is not binding.',
    },
  ]

  for (const term of glossaryTerms) {
    const existing = await prisma.glossaryTerm.findFirst({
      where: { termEn: term.termEn },
    })
    if (!existing) {
      await prisma.glossaryTerm.create({ data: term })
    }
  }

  console.log('Seed complete.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
