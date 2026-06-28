import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const settings = [
  { key: 'appearance.logo.headerOffsetX', valueKa: '0', valueEn: '0', category: 'appearance' },
  { key: 'appearance.logo.headerOffsetY', valueKa: '0', valueEn: '0', category: 'appearance' },
  { key: 'appearance.logo.footerOffsetX', valueKa: '0', valueEn: '0', category: 'appearance' },
  { key: 'appearance.logo.footerOffsetY', valueKa: '0', valueEn: '0', category: 'appearance' },
]

async function main() {
  for (const s of settings) {
    await prisma.siteSetting.upsert({ where: { key: s.key }, update: {}, create: s })
  }
  console.log('Seeded logo offset settings')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
