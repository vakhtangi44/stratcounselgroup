import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const connectionString = process.env.DATABASE_URL ?? 'postgresql://stratcounsel:password@localhost:5432/stratcounsel'
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL || 'admin@stratcounselgroup.com'
  const password = process.env.ADMIN_SEED_PASSWORD || 'Admin1234!'
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

  console.log('Seed complete.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
