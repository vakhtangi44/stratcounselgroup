import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const settings = [
  { key: 'appearance.color.header', valueKa: '#1C122C', valueEn: '#1C122C', category: 'appearance' },
  { key: 'appearance.color.footer', valueKa: '#1C122C', valueEn: '#1C122C', category: 'appearance' },
]

async function main() {
  for (const s of settings) {
    await prisma.siteSetting.upsert({ where: { key: s.key }, update: {}, create: s })
  }
  console.log('Seeded header/footer color settings')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
