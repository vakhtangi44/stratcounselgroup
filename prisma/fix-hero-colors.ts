import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.siteSetting.update({
    where: { key: 'appearance.typo.heroTitle.color' },
    data: { valueKa: '#1C122C', valueEn: '#1C122C' },
  })
  await prisma.siteSetting.update({
    where: { key: 'appearance.typo.heroTagline.color' },
    data: { valueKa: '#1C122C', valueEn: '#1C122C' },
  })
  console.log('Hero colors updated to dark')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
