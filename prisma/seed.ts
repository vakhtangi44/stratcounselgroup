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

  console.log('Seed complete.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
