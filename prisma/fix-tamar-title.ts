import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

async function main() {
  const member = await db.teamMember.findUnique({ where: { slug: 'tamar-kuchava' } })
  if (!member) {
    console.log('Member not found, trying other slugs...')
    const all = await db.teamMember.findMany({ select: { slug: true, nameEn: true, titleKa: true } })
    console.log(all)
    return
  }
  console.log('Current titleKa:', member.titleKa)
  console.log('Current titleEn:', member.titleEn)
  await db.teamMember.update({
    where: { slug: 'tamar-kuchava' },
    data: {
      titleKa: 'მმართველი პარტნიორი / დირექტორი',
      titleEn: 'Managing Partner / Director',
    },
  })
  console.log('Updated title')
}
main().then(() => db.$disconnect())
