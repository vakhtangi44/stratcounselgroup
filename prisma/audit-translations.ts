import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

function isMissing(en: string | null | undefined, ka: string) {
  if (!en) return true
  if (en.trim() === '') return true
  if (en.trim() === ka.trim()) return true
  return false
}

async function main() {
  console.log('=== TRANSLATION AUDIT ===\n')

  const aboutValues = await db.aboutValue.findMany({ orderBy: { order: 'asc' } })
  console.log(`AboutValue: ${aboutValues.length} rows`)
  aboutValues.forEach((v) => {
    if (isMissing(v.titleEn, v.titleKa) || isMissing(v.descriptionEn, v.descriptionKa)) {
      console.log(`  [MISSING] id=${v.id} titleKa="${v.titleKa}"`)
    }
  })

  const cases = await db.successfulCase.findMany({ orderBy: { order: 'asc' } })
  console.log(`\nSuccessfulCase: ${cases.length} rows`)
  cases.forEach((c) => {
    if (isMissing(c.textEn, c.textKa)) {
      console.log(`  [MISSING] id=${c.id} textKa="${c.textKa.slice(0, 60)}…"`)
    }
  })

  const advantages = await db.advantage.findMany({ orderBy: { order: 'asc' } })
  console.log(`\nAdvantage: ${advantages.length} rows`)
  advantages.forEach((a) => {
    if (isMissing(a.titleEn, a.titleKa) || (a.descriptionKa && isMissing(a.descriptionEn, a.descriptionKa))) {
      console.log(`  [MISSING] id=${a.id} titleKa="${a.titleKa}"`)
    }
  })

  const team = await db.teamMember.findMany({ orderBy: { order: 'asc' } })
  console.log(`\nTeamMember: ${team.length} rows`)
  team.forEach((t) => {
    const issues: string[] = []
    if (isMissing(t.nameEn, t.nameKa)) issues.push('name')
    if (isMissing(t.titleEn, t.titleKa)) issues.push('title')
    if (isMissing(t.shortBioEn, t.shortBioKa)) issues.push('shortBio')
    if (isMissing(t.fullBioEn, t.fullBioKa)) issues.push('fullBio')
    if (issues.length) console.log(`  [MISSING ${issues.join(',')}] id=${t.id} ${t.nameKa}`)
  })

  const services = await db.service.findMany({ include: { items: true }, orderBy: { order: 'asc' } })
  console.log(`\nService: ${services.length} rows`)
  services.forEach((s) => {
    if (isMissing(s.titleEn, s.titleKa) || isMissing(s.descriptionEn, s.descriptionKa)) {
      console.log(`  [MISSING] id=${s.id} title="${s.titleKa}"`)
    }
    s.items.forEach((it) => {
      if (isMissing(it.textEn, it.textKa)) {
        console.log(`    item id=${it.id}: "${it.textKa.slice(0, 60)}"`)
      }
    })
  })

  const faqs = await db.fAQ.findMany({ orderBy: { order: 'asc' } })
  console.log(`\nFAQ: ${faqs.length} rows`)
  faqs.forEach((f) => {
    if (isMissing(f.questionEn, f.questionKa) || isMissing(f.answerEn, f.answerKa)) {
      console.log(`  [MISSING] id=${f.id} q="${f.questionKa.slice(0, 60)}"`)
    }
  })

  const glossary = await db.glossaryTerm.findMany()
  console.log(`\nGlossaryTerm: ${glossary.length} rows`)
  glossary.forEach((g) => {
    if (isMissing(g.termEn, g.termKa) || isMissing(g.definitionEn, g.definitionKa)) {
      console.log(`  [MISSING] id=${g.id} term="${g.termKa}"`)
    }
  })

  const testimonials = await db.testimonial.findMany()
  console.log(`\nTestimonial: ${testimonials.length} rows`)
  testimonials.forEach((t) => {
    if (isMissing(t.quoteEn, t.quoteKa)) {
      console.log(`  [MISSING] id=${t.id} client=${t.clientName}`)
    }
  })

  const press = await db.pressItem.findMany()
  console.log(`\nPressItem: ${press.length} rows`)
  press.forEach((p) => {
    if (isMissing(p.headlineEn, p.headlineKa)) {
      console.log(`  [MISSING] id=${p.id} headline="${p.headlineKa.slice(0, 60)}"`)
    }
  })

  const stats = await db.statistic.findMany()
  console.log(`\nStatistic: ${stats.length} rows`)
  stats.forEach((s) => {
    if (isMissing(s.labelEn, s.labelKa)) {
      console.log(`  [MISSING] id=${s.id} key=${s.key}`)
    }
  })

  const settings = await db.siteSetting.findMany()
  console.log(`\nSiteSetting: ${settings.length} rows`)
  let missingSettings = 0
  settings.forEach((s) => {
    if (isMissing(s.valueEn, s.valueKa)) {
      missingSettings++
      if (missingSettings <= 30) console.log(`  [MISSING] key=${s.key} ka="${s.valueKa.slice(0, 50)}"`)
    }
  })
  if (missingSettings > 30) console.log(`  ... and ${missingSettings - 30} more`)
  console.log(`  Total settings missing EN: ${missingSettings}`)

  const blog = await db.blogPost.findMany()
  console.log(`\nBlogPost: ${blog.length} rows`)
  blog.forEach((b) => {
    const issues: string[] = []
    if (isMissing(b.titleEn, b.titleKa)) issues.push('title')
    if (isMissing(b.excerptEn, b.excerptKa)) issues.push('excerpt')
    if (isMissing(b.contentEn, b.contentKa)) issues.push('content')
    if (issues.length) console.log(`  [MISSING ${issues.join(',')}] id=${b.id} ${b.titleKa}`)
  })

  const clients = await db.client.findMany()
  console.log(`\nClient: ${clients.length} rows`)
  clients.forEach((c) => {
    if (c.nameKa && isMissing(c.nameEn, c.nameKa)) {
      console.log(`  [MISSING] id=${c.id} nameKa="${c.nameKa}"`)
    }
  })

  console.log('\n=== END AUDIT ===')
}

main().catch(console.error).finally(() => db.$disconnect())
