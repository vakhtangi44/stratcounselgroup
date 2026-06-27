import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

async function main() {
  const r1 = await db.siteSetting.upsert({
    where: { key: 'site.headerLogo' },
    create: { key: 'site.headerLogo', valueKa: '/logo-v2.png', valueEn: '/logo-v2.png', category: 'general' },
    update: {},
  })
  const r2 = await db.siteSetting.upsert({
    where: { key: 'site.footerLogo' },
    create: { key: 'site.footerLogo', valueKa: '/logo-v2.png', valueEn: '/logo-v2.png', category: 'general' },
    update: {},
  })
  const r3 = await db.siteSetting.upsert({
    where: { key: 'section.stats.visible' },
    create: { key: 'section.stats.visible', valueKa: 'true', valueEn: 'true', category: 'sections' },
    update: {},
  })
  console.log('headerLogo:', r1.id, 'footerLogo:', r2.id, 'statsVisible:', r3.id)
}

main().finally(() => db.$disconnect())
