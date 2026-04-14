import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

async function main() {
  const rows = await db.siteSetting.findMany({
    where: { key: { startsWith: 'sector.infrastructure' } },
  })
  for (const r of rows) {
    console.log(`${r.key} | KA="${r.valueKa}" | EN="${r.valueEn}"`)
  }
}

main().catch(console.error).finally(() => db.$disconnect())
