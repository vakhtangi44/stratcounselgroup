import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { config } from 'dotenv'

config({ path: '.env.local' })
config({ path: '.env' })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const db = new PrismaClient({ adapter })

const icons = [
  'scale', 'document', 'chart', 'building', 'globe', 'shop', 'truck',
  'airplane', 'fuel', 'beverage', 'truck', 'tree', 'balance', 'bank',
  'train', 'tv', 'cart', 'beaker', 'cup', 'medical', 'hotel',
]

const casesKa = [
  'სსიპ — ლევან სამხარაულის სახელობის ექსპერტიზის ეროვნული ბიუროს სამედიცინო დეპარტამენტის ექსპერტი დავით გრიგოლიას სრულად გამართლება — 2025 წლის 16 დეკემბერს, თბილისის საქალაქო სასამართლოში, მოსამართლე ეკა არეშიძის მიერ გამოტანილი გამამართლებელი განაჩენით, ადვოკატ თამარ კუჭავას დაცვის შედეგად.',
  'ფრანგული კომპანიის — Menard Georgia LLC — ინტერესების წარმომადგენლობა — თამარ კუჭავა, სანდრო მწყერაძესთან ერთად, მრავალმილიონიან დავაში, რომელიც ეხებოდა რიკოთის პროექტის ფარგლებში ფინანსური ვალდებულებების არსებით დარღვევას. დავის დაწყებამდე მომზადებულმა სამართლებრივმა წერილმა უზრუნველყო დავის სასამართლოს გარეშე დასრულება და ვალდებულებების სრული შესრულება.',
  'საქართველოში ტკბილეულის ერთ-ერთი უმსხვილესი მწარმოებელი კომპანიის სასარგებლოდ საგადასახადო დავის წარმატებული წარმოება.',
  'სახელმწიფო შესყიდვებში მონაწილე პროექტირება-მშენებლობის მწარმოებელი კომპანიების იურიდიული მხარდაჭერა, მათ შორის, მრავალმილიონიან ინფრასტრუქტურულ პროექტებთან დაკავშირებულ დავებში წარმატებული წარმომადგენლობა.',
  'იაპონიის საერთაშორისო თანამშრომლობის სააგენტოს (JICA) დაკვეთით შრომითი სამართლის რეგულაციების შესახებ იურიდიული დასკვნის მომზადება.',
  'საქართველოში წამყვანი სავაჭრო მარკეტების ქსელის მფლობელი კომპანიის კომპლექსური იურიდიული მომსახურება.',
  'საქართველოში წამყვანი საკურიერო სერვისის ოპერატორი კომპანიის სრული სამართლებრივი მხარდაჭერა.',
  'საჰაერო ხომალდების კომპოზიტური მასალების მწარმოებელი საწარმოს სასარგებლოდ შრომით-სამართლებრივი დავის წარმატებული წარმოება.',
  'საქართველოში ნავთობპროდუქტების მიმწოდებელი წამყვანი კომპანიებისთვის იურიდიული მომსახურების გაწევა, მათ შორის, სასამართლო დავებში წარმატებული წარმომადგენლობა.',
  'საქართველოში ლუდისა და გამაგრილებელი სასმელების წამყვანი მწარმოებელი კომპანიის ინტერესების წარმატებული წარმომადგენლობა მრავალმილიონიან აქტივთან დაკავშირებულ სასამართლო დავაში.',
  'საქართველოში წამყვანი საფოსტო-საკურიერო და ადგილობრივი და საერთაშორისო გადაზიდვების ოპერატორი კომპანიის სრული იურიდიული მხარდაჭერა.',
  'ხე-ტყის დამამუშავებელი საწარმოს კორპორაციული იურიდიული მხარდაჭერა და კომპანიის სასარგებლოდ საგადასახადო დავის წარმატებით წარმოება.',
  'გადახდისუუნარობის პროცესებში მოვალე და კრედიტორი კომპანიების ინტერესების წარმომადგენლობა.',
  'საბანკო და საკრედიტო დაწესებულებების სამართლებრივი მხარდაჭერა.',
  'რკინიგზის სექტორში მოქმედი კომპანიების იურიდიული მომსახურება.',
  'საყოფაცხოვრებო ტექნიკის სარეალიზაციო ქსელის ინტერესების წარმატებული წარმომადგენლობა საავტორო უფლებებთან დაკავშირებულ სასამართლო დავაში.',
  'სავაჭრო სუპერმარკეტების ქსელის სამართლებრივი მხარდაჭერა.',
  'სამედიცინო-კოსმეტოლოგიური დანადგარების იმპორტიორი კომპანიის იურიდიული მომსახურება.',
  'ქაღალდის ჭიქების მწარმოებელი საწარმოს სამართლებრივი მხარდაჭერა.',
  'სამედიცინო საქმიანობის განმახორციელებელი სუბიექტების სამართლებრივი მხარდაჭერა, მათ შორის, სასამართლო დავებში წარმატებული წარმომადგენლობა.',
  'მაღალმთიანი კურორტის სასტუმრო და სარესტორნო ბიზნესის მწარმოებელი კომპანიის სრული იურიდიული მხარდაჭერა.',
]

const casesEn = [
  'Full acquittal of David Grigolia, expert at the Medical Department of the LEPL Levan Samkharauli National Forensics Bureau — on December 16, 2025, by a judgment of the Tbilisi City Court (Judge Eka Areshidze), delivered as a result of the defense led by attorney Tamar Kuchava.',
  "Representation of the French company Menard Georgia LLC — Tamar Kuchava, together with Sandro Mtskeradze, in a multi-million dispute concerning a material breach of financial obligations within the Rikoti project. A legal letter prepared before the dispute ensured out-of-court resolution and full performance of obligations.",
  'Successful representation of a major confectionery manufacturer in a tax dispute in Georgia.',
  'Legal support for design-build companies participating in public procurement, including successful representation in disputes over multi-million infrastructure projects.',
  'Preparation of a legal opinion on labor law regulations commissioned by the Japan International Cooperation Agency (JICA).',
  'Comprehensive legal services for a leading retail market chain in Georgia.',
  'Full legal support for a leading courier service operator in Georgia.',
  'Successful representation of an aircraft composite materials manufacturer in a labor law dispute.',
  'Legal services for leading oil product suppliers in Georgia, including successful court representation.',
  'Successful representation of a leading beer and soft drink manufacturer in a multi-million asset dispute.',
  'Full legal support for a leading postal-courier and domestic/international freight operator in Georgia.',
  'Corporate legal support for a timber processing enterprise and successful tax dispute representation.',
  'Representation of debtor and creditor companies in insolvency proceedings.',
  'Legal support for banking and credit institutions.',
  'Legal services for companies operating in the railway sector.',
  'Successful representation of a household appliance retail chain in a copyright-related court dispute.',
  'Legal support for a supermarket chain.',
  'Legal services for an importer of medical and cosmetology equipment.',
  'Legal support for a paper cup manufacturer.',
  'Legal support for medical service providers, including successful court representation.',
  'Full legal support for a hotel and restaurant business at a high-altitude resort.',
]

async function main() {
  const existing = await db.successfulCase.count()
  if (existing > 0) {
    console.log(`SuccessfulCase already has ${existing} rows; skipping seed.`)
    return
  }
  for (let i = 0; i < casesKa.length; i++) {
    await db.successfulCase.create({
      data: {
        textKa: casesKa[i],
        textEn: casesEn[i],
        icon: icons[i] ?? 'scale',
        featured: i < 2,
        order: i,
      },
    })
  }
  console.log(`Seeded ${casesKa.length} SuccessfulCase rows.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
