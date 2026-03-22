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

  console.log('Seed complete.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
