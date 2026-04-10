import 'dotenv/config'
import { db } from '../src/lib/db'

async function main() {
  // Create one category to hold all clients
  // Find existing category by label or create it
  let cat = await db.clientCategory.findFirst({ where: { labelEn: 'Our Clients' } })
  if (!cat) {
    cat = await db.clientCategory.create({
      data: { labelEn: 'Our Clients', labelKa: 'ჩვენი კლიენტები', icon: '🏢', order: 0, active: true },
    })
  } else {
    cat = await db.clientCategory.update({
      where: { id: cat.id },
      data: { labelKa: 'ჩვენი კლიენტები', icon: '🏢', order: 0, active: true },
    })
  }

  const clients = [
    {
      order: 1,
      nameEn: 'Rico Group',
      nameKa: 'რიკო ჯგუფი',
      logoEn: '/logos/clients/rico.png',
      logoKa: '/logos/clients/rico.png',
    },
    {
      order: 2,
      nameEn: 'Dagi Construction',
      nameKa: 'დაგი სამშენებლო კომპანია',
      logoEn: '/logos/clients/dagi-en.png',
      logoKa: '/logos/clients/dagi-ka.png',
    },
    {
      order: 3,
      nameEn: 'Caucasus Road Project',
      nameKa: 'კავკასუს როუდ პროჯექტი',
      logoEn: '/logos/clients/crp-en.png',
      logoKa: '/logos/clients/crp-ka.png',
    },
    {
      order: 4,
      nameEn: 'Redix',
      nameKa: 'რედიქსი',
      logoEn: '/logos/clients/redix.png',
      logoKa: '/logos/clients/redix.png',
    },
    {
      order: 5,
      nameEn: 'M Capital',
      nameKa: 'ემ კაპიტალი',
      logoEn: '/logos/clients/m-capital-en.png',
      logoKa: '/logos/clients/m-capital-ka.png',
    },
    {
      order: 6,
      nameEn: 'Radius Construction',
      nameKa: 'რადიუს კონსტრაქშენი',
      logoEn: '/logos/clients/radius-en.png',
      logoKa: '/logos/clients/radius-ka.png',
    },
    {
      order: 7,
      nameEn: 'Studio 9',
      nameKa: 'სტუდიო 9',
      logoEn: '/logos/clients/studio9-en.png',
      logoKa: '/logos/clients/studio9-ka.png',
    },
    {
      order: 8,
      nameEn: 'Caucasus Science and Engineering',
      nameKa: 'კავკასუს მეცნიერება და ინჟინერია',
      logoEn: '/logos/clients/caucasus.png',
      logoKa: '/logos/clients/caucasus.png',
    },
    {
      order: 9,
      nameEn: 'GIG Energy',
      nameKa: 'ქართული საინვესტიციო ჯგუფი ენერგია',
      logoEn: '/logos/clients/gig-energy.png',
      logoKa: '/logos/clients/gig-energy.png',
    },
    {
      order: 10,
      nameEn: 'David Tatishvili Health Center',
      nameKa: 'დავით ტატიშვილის ჯანმრთელობის ცენტრი',
      logoEn: '/logos/clients/tatishvili-en.png',
      logoKa: '/logos/clients/tatishvili-ka.png',
    },
    {
      order: 11,
      nameEn: 'Liderfood',
      nameKa: 'ლიდერფუდი',
      logoEn: '/logos/clients/liderfood-en.jpg',
      logoKa: '/logos/clients/liderfood-ka.jpg',
    },
    {
      order: 12,
      nameEn: 'Best Western Gudauri',
      nameKa: 'ბესტ ვესტერნ გუდაური',
      logoEn: '/logos/clients/best-western.png',
      logoKa: '/logos/clients/best-western.png',
    },
    {
      order: 13,
      nameEn: "Bela's Cakes",
      nameKa: 'ბელას ტორტები',
      logoEn: '/logos/clients/belas-cakes.png',
      logoKa: '/logos/clients/belas-cakes.png',
    },
    {
      order: 14,
      nameEn: 'Ken Walker International University',
      nameKa: 'კენ ვოლკერის საერთაშორისო უნივერსიტეტი',
      logoEn: '/logos/clients/ken-walker.png',
      logoKa: '/logos/clients/ken-walker.png',
    },
    {
      order: 15,
      nameEn: 'ZREPS.GE',
      nameKa: 'ზრეფს',
      logoEn: '/logos/clients/zreps-en.png',
      logoKa: '/logos/clients/zreps-ka.png',
    },
    {
      order: 16,
      nameEn: 'Georgia Railway Electric Locomotive Repair Company',
      nameKa: 'საქართველოს რკინიგზის ელმავლების სარემონტო კომპანია',
      logoEn: '/logos/clients/georgia-en.png',
      logoKa: '/logos/clients/georgia-ka.png',
    },
  ]

  for (const c of clients) {
    const existing = await db.client.findFirst({
      where: { nameEn: c.nameEn, categoryId: cat.id },
    })

    if (existing) {
      await db.client.update({
        where: { id: existing.id },
        data: {
          nameKa: c.nameKa,
          logoEn: c.logoEn,
          logoKa: c.logoKa,
          order: c.order,
        },
      })
      console.log(`↺ Updated ${c.nameEn}`)
    } else {
      await db.client.create({
        data: {
          name: c.nameEn,
          nameEn: c.nameEn,
          nameKa: c.nameKa,
          logoEn: c.logoEn,
          logoKa: c.logoKa,
          order: c.order,
          active: true,
          categoryId: cat.id,
        },
      })
      console.log(`✓ Created ${c.nameEn}`)
    }
  }

  console.log('\nDone! 16 clients seeded/updated.')
}

main().catch(console.error).finally(() => db.$disconnect())
