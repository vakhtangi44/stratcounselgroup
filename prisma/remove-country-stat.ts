import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

async function main() {
  const stats = await db.statistic.findMany()
  for (const s of stats) {
    console.log(`${s.id} | key=${s.key} | ka="${s.labelKa}" | en="${s.labelEn}" | value=${s.value}`)
  }
  const countryRow = stats.find((s) => s.labelKa === 'ქვეყანა' || /country/i.test(s.labelEn))
  if (!countryRow) {
    console.log('No country stat found.')
    return
  }
  await db.statistic.delete({ where: { id: countryRow.id } })
  console.log(`Deleted id=${countryRow.id}`)
}

main().catch(console.error).finally(() => db.$disconnect())
