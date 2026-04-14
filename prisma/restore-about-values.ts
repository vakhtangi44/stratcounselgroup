import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

async function main() {
  const iconToSettingsKey: Record<string, { title: string; desc: string }> = {
    chart: { title: 'about.value2.title', desc: 'about.value2.desc' },
    users: { title: 'about.value3.title', desc: 'about.value3.desc' },
    search: { title: 'about.value4.title', desc: 'about.value4.desc' },
    check: { title: 'about.value5.title', desc: 'about.value5.desc' },
  }

  const values = await db.aboutValue.findMany({ orderBy: { order: 'asc' } })
  for (const v of values) {
    if (v.icon === 'scales') {
      console.log(`Skipping scales/სამართალი (id=${v.id})`)
      continue
    }
    const keys = iconToSettingsKey[v.icon]
    if (!keys) {
      console.log(`No mapping for icon=${v.icon} (id=${v.id})`)
      continue
    }
    const [titleRow, descRow] = await Promise.all([
      db.siteSetting.findUnique({ where: { key: keys.title } }),
      db.siteSetting.findUnique({ where: { key: keys.desc } }),
    ])
    if (!titleRow && !descRow) {
      console.log(`No SiteSetting rows found for ${keys.title}/${keys.desc} — skipping id=${v.id}`)
      continue
    }
    await db.aboutValue.update({
      where: { id: v.id },
      data: {
        titleKa: titleRow?.valueKa || v.titleKa,
        titleEn: titleRow?.valueEn || v.titleEn,
        descriptionKa: descRow?.valueKa || v.descriptionKa,
        descriptionEn: descRow?.valueEn || v.descriptionEn,
      },
    })
    console.log(`Restored id=${v.id} (${v.icon}) → ${titleRow?.valueKa}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
