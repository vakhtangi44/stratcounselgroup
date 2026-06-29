import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const settings = [
  { key: 'homepage.section.hero', valueKa: 'true', valueEn: 'true', category: 'appearance' },
  { key: 'homepage.section.about', valueKa: 'true', valueEn: 'true', category: 'appearance' },
  { key: 'homepage.section.sectors', valueKa: 'true', valueEn: 'true', category: 'appearance' },
  { key: 'homepage.section.services', valueKa: 'true', valueEn: 'true', category: 'appearance' },
  { key: 'homepage.section.clients', valueKa: 'true', valueEn: 'true', category: 'appearance' },
  { key: 'homepage.section.testimonials', valueKa: 'true', valueEn: 'true', category: 'appearance' },
  { key: 'homepage.section.blog', valueKa: 'true', valueEn: 'true', category: 'appearance' },
  { key: 'homepage.section.press', valueKa: 'true', valueEn: 'true', category: 'appearance' },
]

async function main() {
  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }
  console.log(`Seeded ${settings.length} homepage section settings`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
