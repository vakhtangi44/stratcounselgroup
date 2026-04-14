import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

// Only fix settings where KA is wrong (English in KA field, or empty).
const fixes: { key: string; ka?: string; en?: string }[] = [
  { key: 'section.asSeenIn', ka: 'დაინახეს' },
  { key: 'about.values.subtitle', ka: 'პრინციპები', en: 'Principles' },
]

async function main() {
  for (const fix of fixes) {
    const existing = await db.siteSetting.findUnique({ where: { key: fix.key } })
    if (!existing) {
      console.log(`Skip: ${fix.key} not found`)
      continue
    }
    await db.siteSetting.update({
      where: { key: fix.key },
      data: {
        valueKa: fix.ka ?? existing.valueKa,
        valueEn: fix.en ?? existing.valueEn,
      },
    })
    console.log(`Fixed: ${fix.key}`)
  }
}

main().catch(console.error).finally(() => db.$disconnect())
