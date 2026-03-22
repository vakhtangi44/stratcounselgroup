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
      fullBioKa: `<p>თამარ კუჭავა არის იურისტი მრავალწლიანი პროფესიული გამოცდილებით სისხლის, სამოქალაქო და ადმინისტრაციული სამართლის სფეროებში. ის არის მოქმედი ადვოკატი საერთო სპეციალიზაციით და ასევე ჩაბარებული აქვს მოსამართლის საკვალიფიკაციო გამოცდა.</p>
<p>პროფესიული კარიერის განმავლობაში მან მნიშვნელოვანი გამოცდილება შეიძინა როგორც სამართალდამცავ სისტემაში, ასევე კერძო სამართლებრივ პრაქტიკაში საქმიანობით. იგი მრავალი წლის განმავლობაში მუშაობდა განსაკუთრებით მნიშვნელოვან საქმეებზე და მონაწილეობდა ფინანსურ, კორუფციულ, ფულის გათეთრებისა და საერთაშორისო ეკონომიკურ დანაშაულებთან დაკავშირებული საქმეების გამოძიებასა და სამართლებრივ ანალიზში.</p>
<p>თამარ კუჭავას პროფესიული საქმიანობა მოიცავს კომპანიებისა და ფიზიკური პირების წარმომადგენლობას სასამართლო პროცესებში, სამართლებრივი დოკუმენტების მომზადებას, სამართლებრივი სტრატეგიის შემუშავებას და რთული სამართლებრივი საქმეების სამართლებრივ მხარდაჭერას.</p>
<p>აქტიური პროფესიული პრაქტიკის პარალელურად იგი ჩართულია აკადემიურ საქმიანობაში და კითხულობს ლექციებს კიბერდანაშაულისა და კიბერუსაფრთხოების სამართლის საკითხებზე.</p>
<h2>განათლება და პროფესიული ტრენინგები</h2>
<ul>
<li>ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი — იურიდიული განათლება (2000–2006)</li>
<li>საგადასახადო სამართლის სრული კურსი, Kreston Georgia Academy (2024)</li>
<li>FIDIC-ის კონტრაქტები – შესავალი კურსი, ACEG / FIDIC (2023)</li>
<li>საგადასახადო სამართლის სრული კურსი, საქართველოს ფინანსთა სამინისტროს აკადემია (2023)</li>
<li>კიბერდანაშაულის გამოძიებისა და სისხლისსამართლებრივი დევნის ტრენინგი (2018)</li>
<li>ფულის გათეთრებისა და ტერორიზმის დაფინანსების საქმეების გამოძიება, საერთაშორისო პროგრამა (2017)</li>
<li>ელექტრონული მტკიცებულებებისა და კიბერდანაშაულის საქმეებში საერთაშორისო თანამშრომლობა, FBI პროგრამა (2017)</li>
<li>ევროკავშირის ქვეყნებში ქონების კონფისკაციის სისტემები, ევროპის კომისიის პროგრამა (2011)</li>
<li>ფულის გათეთრების წინააღმდეგ ბრძოლა და აქტივების მოძიება, ბაზელის უნივერსიტეტი (2010)</li>
<li>კიბერტერორიზმის წინააღმდეგ ბრძოლის სპეციალური კურსი, ბაზელის უნივერსიტეტი (2010)</li>
<li>ფულის გათეთრების წინააღმდეგ ბრძოლის სპეციალური პროგრამა, აშშ-ის ფინანსთა დეპარტამენტი (2010)</li>
<li>ფულის გათეთრების წინააღმდეგ ბრძოლის საერთაშორისო პროგრამა, საერთაშორისო სავალუტო ფონდი (IMF)</li>
</ul>
<h2>სამუშაო გამოცდილება</h2>
<ul>
<li>კერძო საადვოკატო პრაქტიკა (2022 – დღემდე)</li>
<li>უფროსი გამომძიებელი, საქართველოს გენერალური პროკურატურა (2010 – 2021)</li>
<li>პროკურორი, საქართველოს გენერალური პროკურატურა (2009 – 2010)</li>
<li>სპეციალისტი / გამომძიებელი, საქართველოს გენერალური პროკურატურა (2007 – 2009)</li>
<li>გამომძიებლის ასისტენტი, საქართველოს გენერალური პროკურატურა (2005 – 2007)</li>
<li>თანამშრომელი, თბილისის სააპელაციო სასამართლო (2003 – 2004)</li>
</ul>
<h2>აკადემიური საქმიანობა</h2>
<ul>
<li>ლექტორი, კავკასიის უნივერსიტეტი (2022 – დღემდე)</li>
<li>ლექტორი, საქართველოს ფინანსთა სამინისტროს აკადემია (2021 – დღემდე)</li>
</ul>
<h2>პრაქტიკა</h2>
<ul>
<li>სისხლის სამართალი</li>
<li>კიბერდანაშაული</li>
<li>ფინანსური დანაშაული</li>
<li>სახელმწიფო შესყიდვები</li>
<li>სამოქალაქო სამართალი</li>
<li>შრომის სამართალი</li>
<li>ადმინისტრაციული სამართალი</li>
<li>საგადასახადო სამართალი</li>
<li>სასამართლო წარმომადგენლობა</li>
</ul>`,
      fullBioEn: `<p>Tamar Kuchava is a lawyer with many years of professional experience in criminal, civil, and administrative law. She is an active advocate with general specialization and has also passed the judicial qualification exam.</p>
<p>Throughout her professional career, she has gained significant experience in both law enforcement and private legal practice. For many years, she worked on particularly important cases and participated in the investigation and legal analysis of financial, corruption, money laundering, and international economic crime cases.</p>
<p>Tamar Kuchava's professional activities include representing companies and individuals in court proceedings, preparing legal documents, developing legal strategies, and providing legal support for complex legal matters.</p>
<p>In parallel with active professional practice, she is engaged in academic activities and lectures on cybercrime and cybersecurity law.</p>
<h2>Education & Professional Training</h2>
<ul>
<li>Ivane Javakhishvili Tbilisi State University — Legal Education (2000–2006)</li>
<li>Full Tax Law Course, Kreston Georgia Academy (2024)</li>
<li>FIDIC Contracts — Introductory Course, ACEG / FIDIC (2023)</li>
<li>Full Tax Law Course, Academy of the Ministry of Finance of Georgia (2023)</li>
<li>Cybercrime Investigation and Criminal Prosecution Training (2018)</li>
<li>Money Laundering and Terrorism Financing Investigation, International Program (2017)</li>
<li>Electronic Evidence and International Cooperation in Cybercrime Cases, FBI Program (2017)</li>
<li>Asset Confiscation Systems in EU Countries, European Commission Program (2011)</li>
<li>Anti-Money Laundering and Asset Recovery, University of Basel (2010)</li>
<li>Counter-Cyberterrorism Special Course, University of Basel (2010)</li>
<li>Anti-Money Laundering Special Program, U.S. Department of the Treasury (2010)</li>
<li>Anti-Money Laundering International Program, International Monetary Fund (IMF)</li>
</ul>
<h2>Work Experience</h2>
<ul>
<li>Private Legal Practice (2022 – Present)</li>
<li>Senior Investigator, Prosecutor General's Office of Georgia (2010 – 2021)</li>
<li>Prosecutor, Prosecutor General's Office of Georgia (2009 – 2010)</li>
<li>Specialist / Investigator, Prosecutor General's Office of Georgia (2007 – 2009)</li>
<li>Investigator's Assistant, Prosecutor General's Office of Georgia (2005 – 2007)</li>
<li>Staff Member, Tbilisi Court of Appeals (2003 – 2004)</li>
</ul>
<h2>Academic Activities</h2>
<ul>
<li>Lecturer, Caucasus University (2022 – Present)</li>
<li>Lecturer, Academy of the Ministry of Finance of Georgia (2021 – Present)</li>
</ul>
<h2>Practice Areas</h2>
<ul>
<li>Criminal Law</li>
<li>Cybercrime</li>
<li>Financial Crimes</li>
<li>Public Procurement</li>
<li>Civil Law</li>
<li>Labor Law</li>
<li>Administrative Law</li>
<li>Tax Law</li>
<li>Litigation</li>
</ul>`,
      photo: null,
      linkedinUrl: null,
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
      fullBioKa: `<p>თინათინ სირაძე არის იურისტი 20 წელზე მეტი პროფესიული გამოცდილებით საჯარო და კერძო სამართლის სფეროებში. ის არის მოქმედი ადვოკატი სამოქალაქო და ადმინისტრაციული სამართლის სპეციალიზაციით.</p>
<p>პროფესიული კარიერის განმავლობაში მან მრავალმხრივი გამოცდილება შეიძინა კორპორაციული სამართლის, სახელშეკრულებო სამართლის, შრომის სამართლის, ჯანდაცვის სამართლისა და ადმინისტრაციული სამართლის სფეროებში. მისი პრაქტიკა მოიცავს კომპანიების იურიდიულ კონსულტირებას, ხელშეკრულებების შედგენასა და მოლაპარაკებებს, შრომითი ურთიერთობების მართვას და რისკების შეფასებას.</p>
<p>თინათინ სირაძე წარმატებით წარმოადგენს კლიენტებს სასამართლო პროცესებში და ადმინისტრაციულ ორგანოებთან ურთიერთობაში. მისი პროფესიული მიდგომა გამოირჩევა სიღრმისეული ანალიზით, სტრატეგიული დაგეგმვით და კლიენტზე ორიენტირებული მომსახურებით.</p>
<h2>განათლება და პროფესიული ტრენინგები</h2>
<ul>
<li>ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი — იურიდიული ფაკულტეტი, სამართალმცოდნეობა (1997–2002)</li>
<li>საგადასახადო სამართლის სრული კურსი, Kreston Georgia Academy (2024)</li>
<li>FIDIC-ის კონტრაქტები – შესავალი კურსი, ACEG / FIDIC (2023), FIDIC-ის აკადემია</li>
<li>საგადასახადო სამართლის სრული კურსი, საქართველოს ფინანსთა სამინისტროს აკადემია (2023)</li>
<li>შრომის სამართალი და შრომითი ურთიერთობების მართვა, პროფესიული ტრენინგი (2019)</li>
<li>კორპორაციული მმართველობა და კომპლაიანსი, საერთაშორისო პროგრამა (2016)</li>
<li>სახელშეკრულებო სამართალი და მოლაპარაკებების ტექნიკა, პროფესიული ტრენინგი (2014)</li>
<li>სამედიცინო სამართალი და ჯანდაცვის რეგულირება, პროფესიული კურსი (2012)</li>
</ul>
<p>გავლილი აქვს მრავალი საერთაშორისო ტრენინგი კორპორაციული სამართლის, შრომის სამართლისა და ჯანდაცვის რეგულირების მიმართულებით.</p>
<h2>სამუშაო გამოცდილება</h2>
<ul>
<li>მმართველი პარტნიორი, Strategic Counsel Group (2022 – დღემდე)</li>
<li>კერძო საადვოკატო პრაქტიკა (2015 – 2022)</li>
<li>უფროსი იურისტი, სამედიცინო კომპანია (2012 – 2015)</li>
<li>იურისტი, კორპორაციული სამართლის მიმართულება (2008 – 2012)</li>
<li>იურისტი, საჯარო სამსახური (2004 – 2008)</li>
<li>სტაჟიორი, იურიდიული კომპანია (2002 – 2004)</li>
<li>20 წელზე მეტი პროფესიული გამოცდილება საჯარო და კერძო სექტორში</li>
</ul>
<h2>პრაქტიკა</h2>
<ul>
<li>კორპორაციული სამართალი</li>
<li>სახელშეკრულებო სამართალი</li>
<li>შრომის სამართალი</li>
<li>ჯანდაცვის სამართალი</li>
<li>ადმინისტრაციული სამართალი</li>
<li>სასამართლო წარმომადგენლობა</li>
<li>რისკების მართვა</li>
</ul>`,
      fullBioEn: `<p>Tinatin Siradze is a lawyer with over 20 years of professional experience in public and private law. She is an active advocate specializing in civil and administrative law.</p>
<p>Throughout her professional career, she has gained extensive experience in corporate law, contract law, labor law, healthcare law, and administrative law. Her practice includes legal consulting for companies, contract drafting and negotiations, labor relations management, and risk assessment.</p>
<p>Tinatin Siradze successfully represents clients in court proceedings and in dealings with administrative bodies. Her professional approach is distinguished by in-depth analysis, strategic planning, and client-oriented service.</p>
<h2>Education & Professional Training</h2>
<ul>
<li>Ivane Javakhishvili Tbilisi State University — Faculty of Law, Jurisprudence (1997–2002)</li>
<li>Full Tax Law Course, Kreston Georgia Academy (2024)</li>
<li>FIDIC Contracts — Introductory Course, ACEG / FIDIC (2023), FIDIC Academy</li>
<li>Full Tax Law Course, Academy of the Ministry of Finance of Georgia (2023)</li>
<li>Labor Law and Labor Relations Management, Professional Training (2019)</li>
<li>Corporate Governance and Compliance, International Program (2016)</li>
<li>Contract Law and Negotiation Techniques, Professional Training (2014)</li>
<li>Medical Law and Healthcare Regulation, Professional Course (2012)</li>
</ul>
<p>Has completed numerous international trainings in corporate law, labor law, and healthcare regulation.</p>
<h2>Work Experience</h2>
<ul>
<li>Managing Partner, Strategic Counsel Group (2022 – Present)</li>
<li>Private Legal Practice (2015 – 2022)</li>
<li>Senior Lawyer, Medical Company (2012 – 2015)</li>
<li>Lawyer, Corporate Law Division (2008 – 2012)</li>
<li>Lawyer, Public Service (2004 – 2008)</li>
<li>Intern, Law Firm (2002 – 2004)</li>
<li>Over 20 years of professional experience in public and private sectors</li>
</ul>
<h2>Practice Areas</h2>
<ul>
<li>Corporate Law</li>
<li>Contract Law</li>
<li>Labor Law</li>
<li>Healthcare Law</li>
<li>Administrative Law</li>
<li>Litigation</li>
<li>Risk Management</li>
</ul>`,
      photo: null,
      linkedinUrl: null,
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
      linkedinUrl: null,
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
      fullBioKa: `<p>თამთა ბასილაია არის პროექტების მართვის დამოუკიდებელი კონსულტანტი, ტრენერი და საერთაშორისო პროექტების მართვის ინსტიტუტის (PMI) სერთიფიცირებული პროექტის მენეჯერი (PMP).</p>
<p>მას აქვს მრავალწლიანი გამოცდილება სტრატეგიული პროექტების მართვაში ჰიბრიდული მეთოდოლოგიების გამოყენებით, რაც მოიცავს როგორც ტრადიციულ (Waterfall), ისე მოქნილ (Agile) მიდგომებს. მისი პროფესიული საქმიანობა მოიცავს საერთაშორისო და ადგილობრივი პროექტების დაგეგმვას, განხორციელებასა და მონიტორინგს.</p>
<p>თამთა ბასილაია აქტიურად ეწევა საკონსულტაციო საქმიანობას ორგანიზაციული განვითარების, ცვლილებების მართვისა და პროექტების მართვის მეთოდოლოგიების დანერგვის მიმართულებით. ასევე ატარებს ტრენინგებს პროექტების მართვის საკითხებზე.</p>
<h2>განათლება და პროფესიული ტრენინგები</h2>
<ul>
<li>ჯორჯ ვაშინგტონის უნივერსიტეტი — პროექტის მენეჯმენტის სერთიფიცირებული პროგრამა</li>
<li>კავკასიის უნივერსიტეტი — ბიზნესის ადმინისტრირების მაგისტრი (MBA)</li>
<li>PMP (Project Management Professional) — საერთაშორისო პროექტების მართვის ინსტიტუტი (PMI)</li>
<li>PMI-ACP (Agile Certified Practitioner) — საერთაშორისო პროექტების მართვის ინსტიტუტი (PMI)</li>
</ul>
<h2>სამუშაო გამოცდილება</h2>
<ul>
<li>სტრატეგიული პროექტების მართვის კონსულტანტი, Strategic Counsel Group (დღემდე)</li>
<li>დამოუკიდებელი კონსულტანტი პროექტების მართვის სფეროში</li>
<li>პროექტის მენეჯერი, British Petroleum (BP)</li>
<li>პროექტის მენეჯერი, საქართველოს ტურიზმის ეროვნული ფონდი</li>
<li>პროექტების კოორდინატორი, საქართველოს ტურიზმის ეროვნული ფონდი</li>
</ul>
<h2>აკადემიური საქმიანობა</h2>
<ul>
<li>ტრენერი პროექტების მართვის მეთოდოლოგიებში</li>
</ul>
<h2>ძირითადი საქმიანობის სფეროები</h2>
<ul>
<li>პროექტების მართვა</li>
<li>სტრატეგიული კონსულტირება</li>
<li>ორგანიზაციული განვითარება</li>
<li>ცვლილებების მართვა</li>
<li>ჰიბრიდული მეთოდოლოგიები (Waterfall / Agile)</li>
<li>ტრენინგი და კოუჩინგი</li>
</ul>`,
      fullBioEn: `<p>Tamta Basilaia is an independent project management consultant, trainer, and certified Project Management Professional (PMP) of the Project Management Institute (PMI).</p>
<p>She has extensive experience in strategic project management using hybrid methodologies, encompassing both traditional (Waterfall) and agile (Agile) approaches. Her professional activities include planning, implementation, and monitoring of international and local projects.</p>
<p>Tamta Basilaia actively provides consulting services in the areas of organizational development, change management, and implementation of project management methodologies. She also conducts training on project management topics.</p>
<h2>Education & Professional Training</h2>
<ul>
<li>George Washington University — Certified Project Management Program</li>
<li>Caucasus University — Master of Business Administration (MBA)</li>
<li>PMP (Project Management Professional) — Project Management Institute (PMI)</li>
<li>PMI-ACP (Agile Certified Practitioner) — Project Management Institute (PMI)</li>
</ul>
<h2>Work Experience</h2>
<ul>
<li>Strategic Project Management Consultant, Strategic Counsel Group (Present)</li>
<li>Independent Consultant in Project Management</li>
<li>Project Manager, British Petroleum (BP)</li>
<li>Project Manager, Georgian National Tourism Fund</li>
<li>Project Coordinator, Georgian National Tourism Fund</li>
</ul>
<h2>Academic Activities</h2>
<ul>
<li>Trainer in Project Management Methodologies</li>
</ul>
<h2>Key Areas of Activity</h2>
<ul>
<li>Project Management</li>
<li>Strategic Consulting</li>
<li>Organizational Development</li>
<li>Change Management</li>
<li>Hybrid Methodologies (Waterfall / Agile)</li>
<li>Training and Coaching</li>
</ul>`,
      photo: null,
      linkedinUrl: null,
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
      fullBioKa: `<p>შიო ვეკუა არის აუდიტისა და ფინანსური კონტროლის სფეროს პროფესიონალი მრავალწლიანი გამოცდილებით როგორც საჯარო, ისე კერძო სექტორში.</p>
<p>მისი პროფესიული საქმიანობა მოიცავს ფინანსური აუდიტის ჩატარებას, რისკების შეფასებასა და მართვას, შიდა კონტროლის სისტემების შემუშავებას და ფინანსური ანგარიშგების ანალიზს. მას აქვს მნიშვნელოვანი გამოცდილება საჯარო ფინანსების მართვის, საბიუჯეტო კონტროლისა და ფინანსური კომპლაიანსის სფეროებში.</p>
<p>შიო ვეკუა წარმატებით თანამშრომლობს როგორც ადგილობრივ, ისე საერთაშორისო ორგანიზაციებთან ფინანსური აუდიტისა და კონსულტირების სფეროში.</p>
<h2>განათლება</h2>
<ul>
<li>ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი — ეკონომიკისა და ბიზნესის ფაკულტეტი</li>
</ul>
<h2>სამუშაო გამოცდილება</h2>
<ul>
<li>ფინანსური აუდიტისა და რისკების მართვის სპეციალისტი, Lumeo (დღემდე)</li>
<li>ფინანსური მენეჯერი, Rico Express</li>
<li>ფინანსური კონტროლერი, Leader-Food</li>
<li>აუდიტორი, Aegis</li>
<li>სპეციალისტი, საქართველოს შემოსავლების სამსახური</li>
<li>აუდიტორი, საქართველოს კონტროლის პალატა</li>
</ul>
<h2>პრაქტიკა</h2>
<ul>
<li>ფინანსური აუდიტი</li>
<li>რისკების მართვა</li>
<li>შიდა კონტროლი</li>
<li>ფინანსური კომპლაიანსი</li>
<li>საბიუჯეტო კონტროლი</li>
<li>ფინანსური ანგარიშგების ანალიზი</li>
</ul>`,
      fullBioEn: `<p>Shio Vekua is a professional in the field of audit and financial control with many years of experience in both public and private sectors.</p>
<p>His professional activities include conducting financial audits, risk assessment and management, developing internal control systems, and analyzing financial reporting. He has significant experience in public finance management, budgetary control, and financial compliance.</p>
<p>Shio Vekua successfully collaborates with both local and international organizations in the field of financial audit and consulting.</p>
<h2>Education</h2>
<ul>
<li>Ivane Javakhishvili Tbilisi State University — Faculty of Economics and Business</li>
</ul>
<h2>Work Experience</h2>
<ul>
<li>Financial Audit and Risk Management Specialist, Lumeo (Present)</li>
<li>Financial Manager, Rico Express</li>
<li>Financial Controller, Leader-Food</li>
<li>Auditor, Aegis</li>
<li>Specialist, Revenue Service of Georgia</li>
<li>Auditor, Control Chamber of Georgia</li>
</ul>
<h2>Practice Areas</h2>
<ul>
<li>Financial Audit</li>
<li>Risk Management</li>
<li>Internal Control</li>
<li>Financial Compliance</li>
<li>Budgetary Control</li>
<li>Financial Reporting Analysis</li>
</ul>`,
      photo: null,
      linkedinUrl: null,
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
      fullBioKa: `<p>სალომე კობერიძე არის იურისტი მრავალწლიანი პროფესიული გამოცდილებით კორპორაციული, კომერციული და სამოქალაქო სამართლის სფეროებში. ის არის ადვოკატი სამოქალაქო და ადმინისტრაციული სამართლის სპეციალიზაციით.</p>
<p>პროფესიული საქმიანობის ფარგლებში მან მნიშვნელოვანი გამოცდილება შეიძინა როგორც კერძო სექტორის კომპანიებთან, ისე იურიდიულ საკონსულტაციო პრაქტიკაში მუშაობისას. იგი უზრუნველყოფს სამართლებრივ მხარდაჭერას სხვადასხვა ორგანიზაციისთვის, მათ შორის სამართლებრივი დოკუმენტების მომზადებას, კონტრაქტების სამართლებრივ ანალიზს, მოლაპარაკებების პროცესში მონაწილეობას და სამართლებრივი შესაბამისობის უზრუნველყოფას.</p>
<p>სალომე კობერიძეს აქვს მნიშვნელოვანი გამოცდილება სასამართლო დავებში კლიენტების წარმომადგენლობის მიმართულებით. იგი წარმოადგენს კლიენტების ინტერესებს საქართველოს ყველა ინსტანციის სასამართლოში და უზრუნველყოფს სამართლებრივი პოზიციების შემუშავებასა და საპროცესო დოკუმენტების მომზადებას.</p>
<p>პროფესიული საქმიანობის პარალელურად იგი ჩართულია აკადემიურ საქმიანობაში და მონაწილეობს სამართლებრივი კვლევისა და სწავლების პროცესში.</p>
<h2>განათლება, აკადემიური საქმიანობა და პუბლიკაციები</h2>
<ul>
<li>დოქტორანტი, სულხან-საბა ორბელიანის უნივერსიტეტი (2021 – დღემდე)</li>
<li>გაცვლითი პროგრამა, ესპანეთი, კადისის უნივერსიტეტი (2025–2026, შემოდგომის სემესტრი)</li>
<li>ნიუ ვიჟენ უნივერსიტეტი — მაგისტრატურა, შედარებითი კერძო და საერთაშორისო სამართალი (2017–2019)</li>
<li>ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი — ბაკალავრი, სამართალმცოდნეობა (2013–2017)</li>
<li>კვლევითი ვიზიტი მაქს პლანკის უნივერსიტეტში, ჰამბურგი, გერმანია (2024)</li>
</ul>
<h2>საერთაშორისო აკადემიური ღონისძიებები</h2>
<ul>
<li>National Identity Through Constitutional Lenses: Legal Reflections From Across the Borders — საერთაშორისო საპანელო დისკუსიის ორგანიზატორი, სულხან-საბა ორბელიანის უნივერსიტეტი (2025)</li>
<li>Light At the End of the Tunnel: Introduction To the New EU Directive in the Field of Environmental Criminal Law — საერთაშორისო სემინარის ორგანიზატორი, სულხან-საბა ორბელიანის უნივერსიტეტი (2025)</li>
<li>აფილირებული ასისტენტი, სულხან-საბა ორბელიანის უნივერსიტეტი (2024 – დღემდე)</li>
<li>მოწვეული ლექტორი, სულხან-საბა ორბელიანის უნივერსიტეტი (2023–2024)</li>
</ul>
<h2>პუბლიკაციები</h2>
<ul>
<li>„მედიატორის აკრედიტაციის სტანდარტები საქართველოში" (2018)</li>
<li>„შრომით დავებში გადაწყვეტილების აღსრულების შეუძლებლობისას უფლების დაცვის პროცესუალური საშუალებები" (2020)</li>
<li>„მტკიცების პროცესი კაპიტალური ტიპის საზოგადოების პარტნიორის/აქციონერის გამჭოლი პასუხისმგებლობის დროს" (2023)</li>
</ul>
<h2>სამუშაო გამოცდილება</h2>
<ul>
<li>სამართლებრივი უზრუნველყოფის სამსახურის უფროსი, შპს „საქართველოს ფოსტა" (2022–2026)</li>
<li>მიკროსაფინანსო ორგანიზაცია „იზიკრედიტ ჯორჯია" (2023–2024)</li>
<li>შპს „გვირილა რითეილი" (2023)</li>
<li>უფროსი იურისტი, იურიდიული კომპანია „ჯეი ენდ თი ქონსალთინგი" (2019–2024)</li>
<li>უფროსი იურისტი, შპს „საქართველოს ფოსტა" (2019–2022)</li>
<li>იურისტი, შპს „ჯიარ ლოგისტიკა" — სს „საქართველოს რკინიგზის" შვილობილი კომპანია (2019)</li>
<li>იურისტი, იურიდიული კომპანია „ჯეი ენდ თი ქონსალთინგი" (2017–2019)</li>
<li>სტაჟიორი, იურიდიული კომპანია „ჯეი ენდ თი ქონსალთინგი" (2017)</li>
<li>იურისტ-სტაჟიორი, შპს „დეკო გრუპი" (2016–2017)</li>
</ul>`,
      fullBioEn: `<p>Salome Koberidze is a lawyer with many years of professional experience in corporate, commercial, and civil law. She is an advocate specializing in civil and administrative law.</p>
<p>Throughout her professional career, she has gained significant experience working with private sector companies and in legal consulting practice. She provides legal support to various organizations, including preparation of legal documents, legal analysis of contracts, participation in negotiation processes, and ensuring legal compliance.</p>
<p>Salome Koberidze has extensive experience in representing clients in court disputes. She represents clients' interests in all instances of Georgian courts and ensures the development of legal positions and preparation of procedural documents.</p>
<p>In parallel with professional activities, she is engaged in academic work and participates in legal research and teaching processes.</p>
<h2>Education, Academic Activities & Publications</h2>
<ul>
<li>Doctoral Candidate, Sulkhan-Saba Orbeliani University (2021 – Present)</li>
<li>Exchange Program, University of Cádiz, Spain (2025–2026, Fall Semester)</li>
<li>New Vision University — Master's Degree, Comparative Private and International Law (2017–2019)</li>
<li>Ivane Javakhishvili Tbilisi State University — Bachelor's Degree, Law (2013–2017)</li>
<li>Research Visit, Max Planck Institute, Hamburg, Germany (2024)</li>
</ul>
<h2>International Academic Events</h2>
<ul>
<li>National Identity Through Constitutional Lenses: Legal Reflections From Across the Borders — International Panel Discussion Organizer, Sulkhan-Saba Orbeliani University (2025)</li>
<li>Light At the End of the Tunnel: Introduction To the New EU Directive in the Field of Environmental Criminal Law — International Seminar Organizer, Sulkhan-Saba Orbeliani University (2025)</li>
<li>Affiliated Assistant, Sulkhan-Saba Orbeliani University (2024 – Present)</li>
<li>Visiting Lecturer, Sulkhan-Saba Orbeliani University (2023–2024)</li>
</ul>
<h2>Publications</h2>
<ul>
<li>"Mediator Accreditation Standards in Georgia" (2018)</li>
<li>"Procedural Means of Protecting Rights When Enforcement of Labor Dispute Decisions is Impossible" (2020)</li>
<li>"The Burden of Proof in Piercing the Corporate Veil of Capital-Type Company Partners/Shareholders" (2023)</li>
</ul>
<h2>Work Experience</h2>
<ul>
<li>Head of Legal Department, Georgia Post LLC (2022–2026)</li>
<li>EasyCredit Georgia, Microfinance Organization (2023–2024)</li>
<li>Gvirila Retail LLC (2023)</li>
<li>Senior Lawyer, J&T Consulting Law Firm (2019–2024)</li>
<li>Senior Lawyer, Georgia Post LLC (2019–2022)</li>
<li>Lawyer, GR Logistics LLC — subsidiary of Georgian Railway JSC (2019)</li>
<li>Lawyer, J&T Consulting Law Firm (2017–2019)</li>
<li>Intern, J&T Consulting Law Firm (2017)</li>
<li>Legal Intern, Deco Group LLC (2016–2017)</li>
</ul>`,
      photo: null,
      linkedinUrl: 'https://www.linkedin.com/in/salome-koberidze-a00089150/',
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
      fullBioKa: `<p>სანდრო მწყერაძე არის იურისტი 10-ზე მეტი წლის პროფესიული გამოცდილებით საკორპორაციო და ენერგეტიკის სამართლის სფეროებში. ის არის მოქმედი ადვოკატი სამოქალაქო სამართლის სპეციალიზაციით.</p>
<p>მისი პროფესიული საქმიანობა მოიცავს ენერგეტიკული პროექტების სამართლებრივ მხარდაჭერას, ინფრასტრუქტურული პროექტების იურიდიულ კონსულტირებას, საპროექტო ფინანსირების სამართლებრივ უზრუნველყოფას, FIDIC კონტრაქტებს და კორპორაციული მმართველობის საკითხებს.</p>
<h2>განათლება და კვალიფიკაცია</h2>
<ul>
<li>ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი — იურიდიული ფაკულტეტი, სამართალმცოდნეობა</li>
<li>FIDIC-ის კონტრაქტები – სერთიფიცირებული კურსი, ACEG / FIDIC</li>
<li>საგადასახადო სამართლის კურსი, Deloitte Academy</li>
<li>კომერციული სამართლის კურსი, საქართველოს სავაჭრო-სამრეწველო პალატა</li>
<li>ფინანსური ანგარიშგების სტანდარტები, EY Academy</li>
<li>შრომის უსაფრთხოების კურსი, საქართველოს დამსაქმებელთა ასოციაცია</li>
</ul>
<h2>ლიცენზიები და წევრობა</h2>
<ul>
<li>საქართველოს ადვოკატთა ასოციაციის წევრი (GBA)</li>
<li>GBA სერთიფიცირებული სპეციალისტი სამშენებლო სამართალში</li>
<li>ბიზნეს აკადემიის შრომის უსაფრთხოების სერთიფიკატი</li>
</ul>
<h2>სამუშაო გამოცდილება</h2>
<ul>
<li>უფროსი იურისტი, GIG Energy (დღემდე)</li>
<li>იურისტი, GIG Energy</li>
<li>იურისტი, დავით თათიშვილის სამედიცინო ცენტრი</li>
<li>უფროსი იურისტი, Caucasus Road Project (CRP)</li>
<li>იურისტი, Caucasus Road Project (CRP)</li>
<li>იურისტი, CRP Wood</li>
<li>იურისტი, Legal Consulting</li>
<li>სტაჟიორი, საქართველოს პროკურატურა</li>
</ul>
<h2>პრაქტიკა</h2>
<ul>
<li>კორპორაციული სამართალი</li>
<li>ენერგეტიკის სამართალი</li>
<li>ინფრასტრუქტურის სამართალი</li>
<li>საპროექტო ფინანსირება</li>
<li>სახელშეკრულებო სამართალი</li>
<li>კომპლაიანსი</li>
<li>კომერციული სამართალი</li>
<li>სასამართლო წარმომადგენლობა</li>
</ul>`,
      fullBioEn: `<p>Sandro Mtskveradze is a lawyer with over 10 years of professional experience in corporate and energy law. He is an active advocate specializing in civil law.</p>
<p>His professional activities include legal support for energy projects, legal consulting for infrastructure projects, legal assurance of project financing, FIDIC contracts, and corporate governance matters.</p>
<h2>Education & Qualifications</h2>
<ul>
<li>Ivane Javakhishvili Tbilisi State University — Faculty of Law, Jurisprudence</li>
<li>FIDIC Contracts — Certified Course, ACEG / FIDIC</li>
<li>Tax Law Course, Deloitte Academy</li>
<li>Commercial Law Course, Georgian Chamber of Commerce and Industry</li>
<li>Financial Reporting Standards, EY Academy</li>
<li>Occupational Safety Course, Georgian Employers Association</li>
</ul>
<h2>Licenses & Memberships</h2>
<ul>
<li>Member of the Georgian Bar Association (GBA)</li>
<li>GBA Certified Specialist in Construction Law</li>
<li>Business Academy Occupational Safety Certificate</li>
</ul>
<h2>Work Experience</h2>
<ul>
<li>Senior Lawyer, GIG Energy (Present)</li>
<li>Lawyer, GIG Energy</li>
<li>Lawyer, David Tatishvili Medical Center</li>
<li>Senior Lawyer, Caucasus Road Project (CRP)</li>
<li>Lawyer, Caucasus Road Project (CRP)</li>
<li>Lawyer, CRP Wood</li>
<li>Lawyer, Legal Consulting</li>
<li>Intern, Prosecutor's Office of Georgia</li>
</ul>
<h2>Practice Areas</h2>
<ul>
<li>Corporate Law</li>
<li>Energy Law</li>
<li>Infrastructure Law</li>
<li>Project Finance</li>
<li>Contract Law</li>
<li>Compliance</li>
<li>Commercial Law</li>
<li>Litigation</li>
</ul>`,
      photo: null,
      linkedinUrl: null,
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
        // Only update text content from seed — preserve admin-managed fields
        // (photo, isFeatured, active are managed via admin panel)
        nameKa: member.nameKa,
        nameEn: member.nameEn,
        titleKa: member.titleKa,
        titleEn: member.titleEn,
        shortBioKa: member.shortBioKa,
        shortBioEn: member.shortBioEn,
        fullBioKa: member.fullBioKa,
        fullBioEn: member.fullBioEn,
        linkedinUrl: member.linkedinUrl,
        gbaNumber: member.gbaNumber,
        practiceAreas: member.practiceAreas,
        order: member.order,
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

  // --- FAQ ---
  const faqs = [
    // General
    { questionKa: 'როგორ შემიძლია კონსულტაციის დაჯავშნა?', questionEn: 'How can I book a consultation?', answerKa: 'კონსულტაციის დასაჯავშნად შეგიძლიათ დაგვიკავშირდეთ ტელეფონზე +995 551 55 39 54, მოგვწეროთ ელ. ფოსტაზე info@stratcounselgroup.com ან გამოიყენოთ ჩვენი ვებსაიტის საკონტაქტო ფორმა. ჩვენ გიპასუხებთ 24 საათის განმავლობაში.', answerEn: 'To book a consultation, you can call us at +995 551 55 39 54, email us at info@stratcounselgroup.com, or use the contact form on our website. We will respond within 24 hours.', practiceArea: 'general', order: 1 },
    { questionKa: 'რა ღირს იურიდიული კონსულტაცია?', questionEn: 'How much does a legal consultation cost?', answerKa: 'კონსულტაციის ღირებულება დამოკიდებულია საქმის სირთულეზე და სფეროზე. პირველი კონსულტაცია, როგორც წესი, მოიცავს საქმის შეფასებას და სამოქმედო გეგმის შემუშავებას. დეტალური ინფორმაციისთვის დაგვიკავშირდით.', answerEn: 'Consultation fees depend on the complexity and area of the case. The initial consultation typically includes case assessment and development of an action plan. Contact us for detailed information.', practiceArea: 'general', order: 2 },
    { questionKa: 'რა ენებზე გთავაზობთ მომსახურებას?', questionEn: 'In what languages do you offer services?', answerKa: 'ჩვენი გუნდი მომსახურებას უწევს კლიენტებს ქართულ და ინგლისურ ენებზე. საერთაშორისო პროექტებისთვის ასევე ვთანამშრომლობთ სერთიფიცირებულ თარჯიმნებთან.', answerEn: 'Our team serves clients in Georgian and English. For international projects, we also collaborate with certified interpreters.', practiceArea: 'general', order: 3 },
    // Corporate Law
    { questionKa: 'რა დოკუმენტებია საჭირო კომპანიის რეგისტრაციისთვის საქართველოში?', questionEn: 'What documents are required for company registration in Georgia?', answerKa: 'საქართველოში კომპანიის რეგისტრაციისთვის საჭიროა დამფუძნებლის/დამფუძნებლების პირადობის დამადასტურებელი დოკუმენტი, კომპანიის წესდება, იურიდიული მისამართის დამადასტურებელი დოკუმენტი და სარეგისტრაციო განცხადება. რეგისტრაცია შესაძლებელია იუსტიციის სახლში და ონლაინ.', answerEn: 'For company registration in Georgia, you need the founder(s) identification documents, company charter, legal address confirmation, and a registration application. Registration is possible at the Justice House and online.', practiceArea: 'corporate-law', order: 4 },
    { questionKa: 'რა არის კომპანიის ბენეფიციარი მესაკუთრის რეესტრი?', questionEn: 'What is the Beneficial Owner Registry?', answerKa: 'საქართველოს კანონმდებლობა ავალდებულებს კომპანიებს გამჟღავნონ ბენეფიციარი მესაკუთრეების ინფორმაცია. ბენეფიციარი მესაკუთრე არის ფიზიკური პირი, რომელიც საბოლოოდ ფლობს ან აკონტროლებს კომპანიას (25%-ზე მეტი წილი ან ხმის უფლება).', answerEn: 'Georgian legislation requires companies to disclose beneficial owner information. A beneficial owner is a natural person who ultimately owns or controls the company (more than 25% share or voting rights).', practiceArea: 'corporate-law', order: 5 },
    // Tax Law
    { questionKa: 'რა არის ესტონური მოდელის დაბეგვრა?', questionEn: 'What is the Estonian model of taxation?', answerKa: 'საქართველოში 2017 წლიდან მოქმედებს ესტონური მოდელის მოგების გადასახადი — კომპანია იხდის მოგების გადასახადს (15%) მხოლოდ მოგების განაწილებისას (დივიდენდის გაცემა). განუნაწილებელი მოგება არ იბეგრება, რაც ხელს უწყობს რეინვესტირებას.', answerEn: 'Since 2017, Georgia applies the Estonian model of corporate income tax — companies pay profit tax (15%) only upon distribution of profits (dividend payment). Undistributed profits are not taxed, encouraging reinvestment.', practiceArea: 'tax-law', order: 6 },
    { questionKa: 'რა ვადაში უნდა წარვადგინო საგადასახადო დეკლარაცია?', questionEn: 'What is the deadline for filing a tax declaration?', answerKa: 'წლიური მოგების გადასახადის დეკლარაცია წარედგინება არაუგვიანეს საანგარიშო წლის მომდევნო წლის 1 აპრილისა. დღგ-ის დეკლარაცია — ყოველთვიურად, საანგარიშო თვის მომდევნო თვის 15 რიცხვამდე.', answerEn: 'The annual corporate income tax declaration must be filed no later than April 1 of the year following the reporting year. VAT declarations are filed monthly, by the 15th of the month following the reporting month.', practiceArea: 'tax-law', order: 7 },
    // Construction Law
    { questionKa: 'რამდენ ხანში გაიცემა მშენებლობის ნებართვა?', questionEn: 'How long does it take to obtain a construction permit?', answerKa: 'მშენებლობის ნებართვის გაცემის ვადა დამოკიდებულია პროექტის კატეგორიაზე. I კლასის ნაგებობებისთვის — 10 სამუშაო დღე, II კლასი — 18 სამუშაო დღე, III კლასი — 20 სამუშაო დღე, IV კლასი — 25 სამუშაო დღე. ელექტრონული სისტემის მეშვეობით პროცესი შეიძლება უფრო სწრაფი იყოს.', answerEn: 'Construction permit issuance timelines depend on the project category. Class I buildings — 10 working days, Class II — 18 working days, Class III — 20 working days, Class IV — 25 working days. The electronic system may expedite the process.', practiceArea: 'construction-law', order: 8 },
    // Healthcare Law
    { questionKa: 'რა პასუხისმგებლობა ეკისრება ექიმს სამედიცინო შეცდომის შემთხვევაში?', questionEn: 'What liability does a doctor face in case of medical malpractice?', answerKa: 'სამედიცინო შეცდომის შემთხვევაში ექიმს შეიძლება დაეკისროს სამოქალაქო პასუხისმგებლობა (ზიანის ანაზღაურება), ადმინისტრაციული პასუხისმგებლობა (ლიცენზიის შეჩერება/გაუქმება) ან სისხლის სამართლის პასუხისმგებლობა (განზრახვის ან უხეში გაუფრთხილებლობის შემთხვევაში).', answerEn: 'In cases of medical malpractice, a doctor may face civil liability (compensation for damages), administrative liability (license suspension/revocation), or criminal liability (in cases of intent or gross negligence).', practiceArea: 'healthcare-law', order: 9 },
    // Energy Law
    { questionKa: 'რა ლიცენზიაა საჭირო ელექტროენერგიის წარმოებისთვის?', questionEn: 'What license is required for electricity generation?', answerKa: 'საქართველოში ელექტროენერგიის წარმოებისთვის საჭიროა ენერგეტიკის მარეგულირებელი ეროვნული კომისიის (GNERC) მიერ გაცემული ლიცენზია. მცირე სიმძლავრის (100 კვტ-მდე) განახლებადი ენერგიის წყაროებისთვის შეიძლება საჭირო არ იყოს ლიცენზია, მაგრამ აუცილებელია რეგისტრაცია.', answerEn: 'In Georgia, electricity generation requires a license issued by the Georgian National Energy and Water Supply Regulatory Commission (GNERC). Small-capacity renewable energy sources (up to 100 kW) may not require a license, but registration is mandatory.', practiceArea: 'energy-law', order: 10 },
    // Telecommunications Law
    { questionKa: 'რა მოთხოვნებია სატელეკომუნიკაციო კომპანიის ლიცენზირებისთვის?', questionEn: 'What are the requirements for telecommunications company licensing?', answerKa: 'სატელეკომუნიკაციო საქმიანობის ლიცენზირება რეგულირდება საქართველოს კომუნიკაციების ეროვნული კომისიის (GNCC) მიერ. საჭიროა ავტორიზაციის მოპოვება, ტექნიკური მოთხოვნების დაკმაყოფილება, ხარისხის სტანდარტების უზრუნველყოფა და მომხმარებელთა მონაცემების დაცვის გეგმის წარდგენა.', answerEn: 'Telecommunications licensing is regulated by the Georgian National Communications Commission (GNCC). It requires obtaining authorization, meeting technical requirements, ensuring quality standards, and submitting a consumer data protection plan.', practiceArea: 'telecommunications-law', order: 11 },
    // Transportation Law
    { questionKa: 'რა რეგულაციები მოქმედებს საერთაშორისო სატვირთო გადაზიდვებზე?', questionEn: 'What regulations apply to international freight transport?', answerKa: 'საქართველოში საერთაშორისო სატვირთო გადაზიდვები რეგულირდება CMR კონვენციით (საავტომობილო), COTIF-ით (სარკინიგზო) და ჰააგის წესებით (საზღვაო). ასევე მოქმედებს ორმხრივი და მრავალმხრივი ხელშეკრულებები მეზობელ ქვეყნებთან, განსაკუთრებით „შუა დერეფნის" ფარგლებში.', answerEn: 'International freight transport in Georgia is regulated by the CMR Convention (road), COTIF (rail), and the Hague Rules (maritime). Bilateral and multilateral agreements with neighboring countries also apply, particularly within the Middle Corridor framework.', practiceArea: 'transportation-law', order: 12 },
  ]

  for (const faq of faqs) {
    const existing = await prisma.fAQ.findFirst({
      where: { questionEn: faq.questionEn },
    })
    if (!existing) {
      await prisma.fAQ.create({ data: faq })
    }
  }

  // --- Advantages ---
  const advantages = [
    { titleKa: 'მუდმივი რისკ-მონიტორინგი', titleEn: 'Continuous risk monitoring', order: 1 },
    { titleKa: 'კონტრაჰენტებთან და ადმინისტრაციულ ორგანოებთან კომუნიკაციის კონტროლი', titleEn: 'Control over communication with counterparties and administrative bodies', order: 2 },
    { titleKa: 'სახელშეკრულებო არქიტექტურის სწორად აგება', titleEn: 'Proper structuring of contractual architecture', order: 3 },
    { titleKa: 'დავების ტაქტიკური დაგეგმვა და წარმოება', titleEn: 'Tactical planning and conduct of disputes', order: 4 },
    { titleKa: 'კონფიდენციალურობის მაღალი სტანდარტი და სანდოობა', titleEn: 'High standard of confidentiality and reliability', order: 5 },
    { titleKa: 'შედეგზე ორიენტირებული თანამშრომლობა', titleEn: 'Result-oriented cooperation', order: 6 },
  ]

  for (const adv of advantages) {
    const existing = await prisma.advantage.findFirst({
      where: { titleEn: adv.titleEn },
    })
    if (!existing) {
      await prisma.advantage.create({ data: adv })
    }
  }

  // --- Client Categories & Clients ---
  const clientCategories = [
    {
      icon: '🏗️',
      labelKa: 'მშენებლობა და ინფრასტრუქტურა',
      labelEn: 'Construction & Infrastructure',
      order: 1,
      clients: [
        'Caucasus Road Project (CRP)',
        'Construction Company "Dagi"',
        'Design and Construction Company "GES"',
        'Construction Company "Redix Group"',
        'Construction Company "M Capital"',
        'Construction Company "Radius Construction"',
      ],
    },
    {
      icon: '🏛️',
      labelKa: 'არქიტექტურა და დიზაინი',
      labelEn: 'Architecture & Design',
      order: 2,
      clients: [
        'Architectural Design Company "Studio 9"',
        'Caucasus Science and Engineering',
      ],
    },
    {
      icon: '⛽',
      labelKa: 'ენერგეტიკა და რესურსები',
      labelEn: 'Energy & Resources',
      order: 3,
      clients: [
        'British Petroleum (BP)',
        'Georgian Investment Group',
        'Oil products supplying company',
      ],
    },
    {
      icon: '💰',
      labelKa: 'საფინანსო სექტორი',
      labelEn: 'Financial Sector',
      order: 4,
      clients: [
        'Microfinance Organization "Rico Group"',
        'Microfinance Organization "EasyCredit Georgia"',
      ],
    },
    {
      icon: '🏨',
      labelKa: 'ტურიზმი',
      labelEn: 'Tourism & Hospitality',
      order: 5,
      clients: [
        'Hotel "Paragraph Resort & Spa Shekvetili"',
        'Hotel "Best Western Gudauri"',
        'Hotel "Sololaki Hills"',
      ],
    },
    {
      icon: '🚆',
      labelKa: 'ტრანსპორტი და ლოგისტიკა',
      labelEn: 'Transport & Logistics',
      order: 6,
      clients: [
        'Tbilisi Branch of Rolling Stock Repair Plant',
        'Railway Locomotive Repair Company "Georgia"',
        'Vehicle Import Company "Global Auto Import"',
        'Leading postal and courier services company',
        'Courier service operator company',
      ],
    },
    {
      icon: '🏥',
      labelKa: 'ჯანდაცვა და სამედიცინო ტექნიკა',
      labelEn: 'Healthcare & MedTech',
      order: 7,
      clients: [
        'David Tatishvili Medical Center',
        'Importer of medical and cosmetology equipment',
        'Other medical service entities',
      ],
    },
    {
      icon: '🎓',
      labelKa: 'განათლება',
      labelEn: 'Education',
      order: 8,
      clients: [
        'Ken Walker International University',
      ],
    },
    {
      icon: '🛒',
      labelKa: 'ვაჭრობა და რითეილი',
      labelEn: 'Trade & Retail',
      order: 9,
      clients: [
        'Retail chain "Gvirila"',
        'Household appliances retail network',
      ],
    },
    {
      icon: '🏭',
      labelKa: 'წარმოება და ინდუსტრია',
      labelEn: 'Manufacturing & Industry',
      order: 10,
      clients: [
        'Beer and soft drinks manufacturer',
        'Confectionery manufacturer',
        'Wood processing enterprise',
        'Composite materials manufacturer',
        'Paper cup manufacturer',
      ],
    },
    {
      icon: '🌍',
      labelKa: 'საერთაშორისო ორგანიზაციები',
      labelEn: 'International Organizations',
      order: 11,
      clients: [
        'Japan International Cooperation Agency (JICA)',
      ],
    },
  ]

  for (const cat of clientCategories) {
    const existing = await prisma.clientCategory.findFirst({
      where: { labelEn: cat.labelEn },
    })
    if (!existing) {
      const created = await prisma.clientCategory.create({
        data: {
          icon: cat.icon,
          labelKa: cat.labelKa,
          labelEn: cat.labelEn,
          order: cat.order,
          active: true,
        },
      })
      for (let i = 0; i < cat.clients.length; i++) {
        await prisma.client.create({
          data: {
            name: cat.clients[i],
            categoryId: created.id,
            order: i + 1,
            active: true,
          },
        })
      }
    }
  }

  // --- Services ---
  const services = [
    {
      titleKa: 'I. წინასახელშეკრულებო ეტაპი — მოლაპარაკება და ხელშეკრულების გაფორმება',
      titleEn: 'I. Pre-Contractual Stage — Negotiation and Contract Conclusion',
      descriptionKa: 'ჩვენ ვმართავთ პროცესს იქიდან, სადაც იქმნება რისკი - მოლაპარაკების მაგიდიდან.',
      descriptionEn: 'We manage the process from the point where the risk arises — at the negotiation table.',
      order: 1,
      items: [
        { textKa: 'კომუნიკაციის სამართლებრივი პროტოკოლის შემუშავება და კონტროლი', textEn: 'Development and control of a legal communication protocol', order: 1 },
        { textKa: 'სტრატეგიულად მნიშვნელოვანი კორესპონდენციის მომზადება და წარმოება', textEn: 'Preparation and management of strategically important correspondence', order: 2 },
        { textKa: 'ხელშეკრულებების იურიდიული მოდელირება და სახელშეკრულებო არქიტექტურის შექმნა', textEn: 'Legal modeling of contracts and creation of contractual architecture', order: 3 },
        { textKa: 'რისკების იდენტიფიცირება და პრევენციული მექანიზმების ინტეგრირება ხელშეკრულებაში', textEn: 'Identification of risks and integration of preventive mechanisms into the contract', order: 4 },
      ],
    },
    {
      titleKa: 'II. დავის დაწყებამდე — სამართლებრივი პოზიციის სტრატეგიული მომზადება',
      titleEn: 'II. Before the Dispute — Strategic Preparation of Legal Position',
      descriptionKa: 'დავა იწყება ბევრად ადრე, ვიდრე ის სასამართლოში გადავა. ჩვენი მიზანია — დავაში შესვლამდე კლიენტი უკვე იყოს ნახევრად გამარჯვებული.',
      descriptionEn: 'A dispute begins long before it reaches court. Our goal is for the client to be half-victorious before entering the dispute.',
      order: 2,
      items: [
        { textKa: 'სამოქმედო სტრატეგიის შემუშავება', textEn: 'Development of an action strategy', order: 1 },
        { textKa: 'საჩივრების სტრუქტურირება', textEn: 'Structuring of claims', order: 2 },
        { textKa: 'საქმის ძლიერი და სუსტი მხარეების იდენტიფიცირება და კომპლექსური ანალიზი', textEn: 'Identification and comprehensive analysis of strengths and weaknesses', order: 3 },
        { textKa: 'მტკიცებულებების მოძიება, ორგანიზება და შეფასება', textEn: 'Collection, organization, and evaluation of evidence', order: 4 },
        { textKa: 'შესაძლო ზიანის კალკულაცია და ფინანსური რისკების შეფასება', textEn: 'Calculation of potential damages and assessment of financial risks', order: 5 },
        { textKa: 'სამართლებრივი პოზიციის ფორმირება და არგუმენტირება', textEn: 'Formation and substantiation of the legal position', order: 6 },
      ],
    },
    {
      titleKa: 'III. სამართლებრივი დავის წარმოება — სრულმასშტაბიანი წარმომადგენლობა',
      titleEn: 'III. Legal Dispute Resolution — Full-Scale Representation',
      descriptionKa: 'ჩვენ უზრუნველვყოფთ კლიენტის ინტერესების მაღალკვალიფიციურ დაცვას ყველა ინსტანციაში.',
      descriptionEn: 'We ensure highly qualified protection of client interests in all instances.',
      order: 3,
      items: [
        { textKa: 'წარმომადგენლობა სამოქალაქო, ადმინისტრაციულ და სისხლის სამართლის საქმეებზე', textEn: 'Representation in civil, administrative, and criminal cases', order: 1 },
        { textKa: 'სახელმწიფო შესყიდვებთან დაკავშირებული დავების წარმოება', textEn: 'Handling disputes related to public procurement', order: 2 },
        { textKa: 'ფინანსური სანქციების გასაჩივრება', textEn: 'Appeal of financial sanctions', order: 3 },
        { textKa: 'ქონებაზე ყადაღის გაუქმებასთან დაკავშირებული სამართლებრივი პროცესები', textEn: 'Legal proceedings related to lifting of seizure over property', order: 4 },
        { textKa: 'ზიანის ანაზღაურების მოთხოვნები (მათ შორის, სახელმწიფოს მიმართ)', textEn: 'Claims for damages (including against the state)', order: 5 },
        { textKa: 'სრული საპროცესო დოკუმენტაციის მომზადება (სარჩელები, შესაგებლები, შუამდგომლობები და სხვა)', textEn: 'Preparation of full procedural documentation (claims, responses, motions, etc.)', order: 6 },
      ],
    },
  ]

  for (const svc of services) {
    const existing = await prisma.service.findFirst({ where: { titleEn: svc.titleEn } })
    if (!existing) {
      await prisma.service.create({
        data: {
          titleKa: svc.titleKa,
          titleEn: svc.titleEn,
          descriptionKa: svc.descriptionKa,
          descriptionEn: svc.descriptionEn,
          order: svc.order,
          active: true,
          items: {
            create: svc.items,
          },
        },
      })
    }
  }

  console.log('Seed complete.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
