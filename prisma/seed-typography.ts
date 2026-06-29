import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const settings = [
  // Hero — Company Name
  { key: 'appearance.typo.heroTitle.size', valueKa: '4.6', valueEn: '4.6', category: 'appearance' },
  { key: 'appearance.typo.heroTitle.color', valueKa: '#FFFFFF', valueEn: '#FFFFFF', category: 'appearance' },
  { key: 'appearance.typo.heroTitle.font', valueKa: 'heading', valueEn: 'heading', category: 'appearance' },
  // Hero — Tagline
  { key: 'appearance.typo.heroTagline.size', valueKa: '3.19', valueEn: '3.19', category: 'appearance' },
  { key: 'appearance.typo.heroTagline.color', valueKa: '#FFFFFF', valueEn: '#FFFFFF', category: 'appearance' },
  { key: 'appearance.typo.heroTagline.font', valueKa: 'heading', valueEn: 'heading', category: 'appearance' },
  // Section Titles (light backgrounds)
  { key: 'appearance.typo.sectionTitle.size', valueKa: '2.25', valueEn: '2.25', category: 'appearance' },
  { key: 'appearance.typo.sectionTitle.color', valueKa: '#1C122C', valueEn: '#1C122C', category: 'appearance' },
  { key: 'appearance.typo.sectionTitle.font', valueKa: 'heading', valueEn: 'heading', category: 'appearance' },
  // Section Titles (dark backgrounds)
  { key: 'appearance.typo.sectionTitleDark.size', valueKa: '2.25', valueEn: '2.25', category: 'appearance' },
  { key: 'appearance.typo.sectionTitleDark.color', valueKa: '#FFFFFF', valueEn: '#FFFFFF', category: 'appearance' },
  { key: 'appearance.typo.sectionTitleDark.font', valueKa: 'heading', valueEn: 'heading', category: 'appearance' },
  // Section Subtitles
  { key: 'appearance.typo.subtitle.size', valueKa: '1.15', valueEn: '1.15', category: 'appearance' },
  { key: 'appearance.typo.subtitle.color', valueKa: '#5a5a6e', valueEn: '#5a5a6e', category: 'appearance' },
  { key: 'appearance.typo.subtitle.font', valueKa: 'body', valueEn: 'body', category: 'appearance' },
  // Card Titles
  { key: 'appearance.typo.cardTitle.size', valueKa: '1.125', valueEn: '1.125', category: 'appearance' },
  { key: 'appearance.typo.cardTitle.color', valueKa: '#1C122C', valueEn: '#1C122C', category: 'appearance' },
  { key: 'appearance.typo.cardTitle.font', valueKa: 'heading', valueEn: 'heading', category: 'appearance' },
  // Card Body Text
  { key: 'appearance.typo.cardBody.size', valueKa: '0.875', valueEn: '0.875', category: 'appearance' },
  { key: 'appearance.typo.cardBody.color', valueKa: '#5a5a6e', valueEn: '#5a5a6e', category: 'appearance' },
  { key: 'appearance.typo.cardBody.font', valueKa: 'body', valueEn: 'body', category: 'appearance' },
  // General Body Text
  { key: 'appearance.typo.body.size', valueKa: '1', valueEn: '1', category: 'appearance' },
  { key: 'appearance.typo.body.color', valueKa: '#5a5a6e', valueEn: '#5a5a6e', category: 'appearance' },
  { key: 'appearance.typo.body.font', valueKa: 'body', valueEn: 'body', category: 'appearance' },
  // Buttons
  { key: 'appearance.typo.button.size', valueKa: '0.875', valueEn: '0.875', category: 'appearance' },
  { key: 'appearance.typo.button.color', valueKa: '#FFFFFF', valueEn: '#FFFFFF', category: 'appearance' },
  { key: 'appearance.typo.button.font', valueKa: 'body', valueEn: 'body', category: 'appearance' },
  // Footer Headings
  { key: 'appearance.typo.footerHeading.size', valueKa: '0.9', valueEn: '0.9', category: 'appearance' },
  { key: 'appearance.typo.footerHeading.color', valueKa: '#668CCE', valueEn: '#668CCE', category: 'appearance' },
  { key: 'appearance.typo.footerHeading.font', valueKa: 'heading', valueEn: 'heading', category: 'appearance' },
  // Footer Body Text
  { key: 'appearance.typo.footerBody.size', valueKa: '0.906', valueEn: '0.906', category: 'appearance' },
  { key: 'appearance.typo.footerBody.color', valueKa: '#B0B0B0', valueEn: '#B0B0B0', category: 'appearance' },
  { key: 'appearance.typo.footerBody.font', valueKa: 'body', valueEn: 'body', category: 'appearance' },
]

async function main() {
  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }
  console.log(`Seeded ${settings.length} typography settings`)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1) })
