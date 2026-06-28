import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const settings = [
  { key: 'appearance.nav.color', valueKa: '#FFFFFF', valueEn: '#FFFFFF', category: 'appearance' },
  { key: 'appearance.nav.hoverColor', valueKa: '#668CCE', valueEn: '#668CCE', category: 'appearance' },
  { key: 'appearance.nav.size', valueKa: '14.4', valueEn: '14.4', category: 'appearance' },
]

async function main() {
  for (const s of settings) {
    await prisma.siteSetting.upsert({ where: { key: s.key }, update: {}, create: s })
  }
  console.log('Seeded nav settings')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
