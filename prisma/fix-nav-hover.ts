import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.siteSetting.update({
    where: { key: 'appearance.nav.hoverColor' },
    data: { valueKa: '#d88551', valueEn: '#d88551' },
  })
  console.log('Nav hover set to orange')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
