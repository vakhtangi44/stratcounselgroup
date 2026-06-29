import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

async function main() {
  const clients = await db.client.findMany({ where: { active: true }, orderBy: { order: 'asc' }, take: 8 })
  console.log('Setting featured for:', clients.map(c => c.name).join(', '))
  for (const c of clients) {
    await db.client.update({ where: { id: c.id }, data: { featured: true } })
  }
  console.log('Done — set', clients.length, 'clients as featured')
}
main()
