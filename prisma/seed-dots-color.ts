import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.siteSetting.upsert({
    where: { key: 'appearance.color.dots' },
    update: {},
    create: { key: 'appearance.color.dots', valueKa: '#d88551', valueEn: '#d88551', category: 'appearance' },
  })
  console.log('Seeded dots color')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
