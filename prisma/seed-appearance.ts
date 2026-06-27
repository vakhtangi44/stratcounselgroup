import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

const settings = [
  { key: 'appearance.logo.height', valueKa: '232', valueEn: '232', category: 'appearance' },
  { key: 'appearance.logo.heightMobile', valueKa: '105', valueEn: '105', category: 'appearance' },
  { key: 'appearance.logo.widthScale', valueKa: '1.42', valueEn: '1.42', category: 'appearance' },
  { key: 'appearance.color.primary', valueKa: '#668CCE', valueEn: '#668CCE', category: 'appearance' },
  { key: 'appearance.color.primaryDark', valueKa: '#5478B8', valueEn: '#5478B8', category: 'appearance' },
  { key: 'appearance.color.primaryLight', valueKa: '#8AAAE0', valueEn: '#8AAAE0', category: 'appearance' },
  { key: 'appearance.color.accent', valueKa: '#d88551', valueEn: '#d88551', category: 'appearance' },
  { key: 'appearance.color.background', valueKa: '#1C122C', valueEn: '#1C122C', category: 'appearance' },
]

async function main() {
  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }
  console.log(`Seeded ${settings.length} appearance settings`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
