import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

async function main() {
  const result = await db.siteSetting.updateMany({
    where: { key: 'appearance.typo.footerHeading.color' },
    data: { valueKa: '#d88551', valueEn: '#d88551' },
  })
  console.log('Updated footerHeading color to #d88551:', result.count, 'rows')
}
main().then(() => db.$disconnect())
