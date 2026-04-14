import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

async function main() {
  const row = await db.siteSetting.upsert({
    where: { key: 'about.values.subtitle' },
    create: { key: 'about.values.subtitle', valueKa: '', valueEn: '', category: 'about' },
    update: { valueKa: '', valueEn: '' },
  })
  console.log('Cleared about.values.subtitle:', row)
}

main().catch(console.error).finally(() => db.$disconnect())
