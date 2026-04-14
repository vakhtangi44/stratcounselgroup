import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

async function main() {
  // Re-disable standalone construction sector
  const disabled = await db.siteSetting.upsert({
    where: { key: 'sector.construction.enabled' },
    create: { key: 'sector.construction.enabled', valueKa: 'false', valueEn: 'false', category: 'sectors' },
    update: { valueKa: 'false', valueEn: 'false' },
  })
  console.log('Disabled construction:', disabled.key, disabled.valueKa)

  // Clear any stale title overrides on infrastructure so the new default names apply
  const deleted = await db.siteSetting.deleteMany({
    where: { key: { in: ['sector.infrastructure.title'] } },
  })
  console.log('Removed infrastructure title overrides:', deleted.count)
}

main().catch(console.error).finally(() => db.$disconnect())
