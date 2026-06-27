import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.siteSetting.upsert({
    where: { key: 'appearance.logo.url' },
    update: {},
    create: { key: 'appearance.logo.url', valueKa: '/scg-logo.png', valueEn: '/scg-logo.png', category: 'appearance' },
  })
  console.log('Seeded logo URL setting')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
