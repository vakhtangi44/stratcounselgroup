import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const connectionString = process.env.DATABASE_URL ?? 'postgresql://stratcounsel:password@localhost:5432/stratcounsel'
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  const newPassword = process.argv[2]
  if (!newPassword) {
    console.error('Usage: npx ts-node prisma/reset-password.ts <new-password>')
    process.exit(1)
  }
  const passwordHash = await bcrypt.hash(newPassword, 12)
  await prisma.adminUser.updateMany({ data: { passwordHash } })
  console.log('Password updated.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
