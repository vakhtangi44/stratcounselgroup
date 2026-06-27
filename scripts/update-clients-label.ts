import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

async function main() {
  const r = await db.siteSetting.updateMany({
    where: { key: 'section.trustedBy.subtitle' },
    data: { valueKa: 'ჩვენი კლიენტები', valueEn: 'Our Clients' },
  })
  console.log('Updated:', r.count)
}

main().finally(() => db.$disconnect())
