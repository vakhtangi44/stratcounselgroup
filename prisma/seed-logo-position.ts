import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const settings = [
  { key: 'appearance.logo.headerPosition', valueKa: 'left', valueEn: 'left', category: 'appearance' },
  { key: 'appearance.logo.footerPosition', valueKa: 'left', valueEn: 'left', category: 'appearance' },
  { key: 'appearance.logo.headerVisible', valueKa: 'true', valueEn: 'true', category: 'appearance' },
  { key: 'appearance.logo.footerVisible', valueKa: 'true', valueEn: 'true', category: 'appearance' },
]

async function main() {
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    })
  }
  console.log('Seeded logo position settings')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
