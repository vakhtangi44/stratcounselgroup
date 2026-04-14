import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

const values = [
  {
    icon: 'scales',
    titleKa: 'სამართალი',
    titleEn: 'Law',
    descriptionKa:
      'მულტიდისციპლინური სამართლებრივი მხარდაჭერა, რომელიც მოიცავს წინასახელშეკრულებო მოლაპარაკების ეტაპს, ხელშეკრულების სტრუქტურირებას, ბიზნესპროცესების კანონმდებლობის მოთხოვნებთან შესაბამისობის უზრუნველყოფას, დავების კვალიფიციურ წარმოებას.',
    descriptionEn:
      'Multidisciplinary legal support encompassing pre-contractual negotiations, contract structuring, ensuring business process compliance with regulatory requirements, and qualified dispute representation.',
    order: 0,
  },
  {
    icon: 'chart',
    titleKa: 'სტრატეგია',
    titleEn: 'Strategy',
    descriptionKa: 'გამჭვირვალე, შედეგზე ორიენტირებული მიდგომა',
    descriptionEn: 'Transparent, results-driven approach to every matter',
    order: 1,
  },
  {
    icon: 'users',
    titleKa: 'პროექტის მართვა',
    titleEn: 'Project Management',
    descriptionKa: 'გრძელვადიანი ურთიერთობა კლიენტებთან',
    descriptionEn: 'Long-term relationships built on trust and results',
    order: 2,
  },
  {
    icon: 'search',
    titleKa: 'ალტერნატიული გამოძიება',
    titleEn: 'Alternative Investigation',
    descriptionKa: 'დეტალური ანალიზი და ფაქტების გამოძიება',
    descriptionEn: 'Detailed analysis and fact-finding investigation',
    order: 3,
  },
  {
    icon: 'check',
    titleKa: 'ექსპერტიზა',
    titleEn: 'Expertise',
    descriptionKa: 'წლების გამოცდილება სახელმწიფო და კერძო სექტორში',
    descriptionEn: 'Years of experience across public and private sectors',
    order: 4,
  },
]

async function main() {
  const existing = await db.aboutValue.count()
  if (existing > 0) {
    console.log(`AboutValue already has ${existing} rows; skipping seed.`)
    return
  }
  for (const v of values) {
    await db.aboutValue.create({ data: v })
  }
  console.log(`Seeded ${values.length} AboutValue rows.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
