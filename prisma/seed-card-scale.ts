import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.siteSetting.upsert({
    where: { key: 'appearance.cardScale' },
    update: {},
    create: { key: 'appearance.cardScale', valueKa: '1.10', valueEn: '1.10', category: 'appearance' },
  })
  console.log('Seeded card scale setting')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
