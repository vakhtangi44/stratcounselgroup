import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

async function main() {
  const row = await db.siteSetting.upsert({
    where: { key: 'sector.construction.enabled' },
    create: { key: 'sector.construction.enabled', valueKa: 'true', valueEn: 'true', category: 'sectors' },
    update: { valueKa: 'true', valueEn: 'true' },
  })
  console.log('Enabled construction sector:', row)
}

main().catch(console.error).finally(() => db.$disconnect())
