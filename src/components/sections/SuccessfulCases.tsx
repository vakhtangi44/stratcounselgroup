import ScrollReveal from '@/components/ui/ScrollReveal'
import GoldDivider from '@/components/ui/GoldDivider'
import type { ReactNode } from 'react'

const svgCls = 'w-8 h-8'
const svgProps = {
  className: svgCls,
  fill: 'none' as const,
  stroke: 'currentColor',
  viewBox: '0 0 24 24',
  strokeWidth: 1.5,
}

// Semantic icon set (Heroicons outline)
const ICON: Record<string, ReactNode> = {
  scale: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
    </svg>
  ),
  document: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  chart: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  building: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  globe: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  cart: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  ),
  truck: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.08-1.123a11.94 11.94 0 00-2.649-6.103A1.125 1.125 0 0015.75 9h-1.5M15 18.75H9.375m3-18a.75.75 0 00-.75.75v9a.75.75 0 001.5 0V2.25a.75.75 0 00-.75-.75zm-9 12.75h9V3.75h-9v11.25z" />
    </svg>
  ),
  airplane: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5" />
    </svg>
  ),
  fuel: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 14.25v-2.625a3.375 3.375 0 00-3.375-3.375m3.375 6H7.5m-4.5 0V21m0-6.75h7.5V21m4.5 0v-7.5m0 7.5h3.375a3.375 3.375 0 003.375-3.375m-3.375 3.375v-6.75m3.375 6.75V9.375a3.375 3.375 0 00-3.375-3.375h-9.75M21 14.25v-4.875M3 21h18M9 9h1.5" />
    </svg>
  ),
  beverage: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
  ),
  tree: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25l-4.5 8.25h9l-4.5-8.25zm0 0v8.25M7.5 10.5L3 18.75h18l-4.5-8.25m-9 0h9m-9 0L7.5 10.5m9 0l1.5 2.25M12 18.75v3" />
    </svg>
  ),
  balance: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  ),
  bank: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3V9H6V7.5z" />
    </svg>
  ),
  train: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.08-1.123a11.94 11.94 0 00-2.649-6.103A1.125 1.125 0 0015.75 9h-1.5M8.25 4.5l7.5 0m-7.5 0L8.25 4.5m0 0v2.25m7.5-2.25v2.25M3.75 11.25h16.5M3.75 11.25V4.875c0-.621.504-1.125 1.125-1.125h14.25c.621 0 1.125.504 1.125 1.125v6.375" />
    </svg>
  ),
  tv: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
  shop: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
    </svg>
  ),
  beaker: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
  cup: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
    </svg>
  ),
  medical: (
    <svg {...svgProps}>
      {/* Circle */}
      <circle cx="12" cy="12" r="9" />
      {/* Plus / medical cross */}
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v7.5M8.25 12h7.5" />
    </svg>
  ),
  hotel: (
    <svg {...svgProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21M1.5 13.5l9.75-9 9.75 9M3.75 11.25v8.625c0 .621.504 1.125 1.125 1.125h5.25v-4.5a1.5 1.5 0 013 0v4.5h5.25c.621 0 1.125-.504 1.125-1.125V11.25M7.5 15h2.25" />
    </svg>
  ),
}

// Case index → icon mapping (matches content semantics)
const CASE_ICONS: string[] = [
  'scale',     // 0. Court acquittal (Grigolia)
  'document',  // 1. Menard Georgia — out-of-court settlement via legal letter
  'chart',     // 2. Confectionery tax dispute
  'building',  // 3. Infrastructure / design-build companies
  'globe',     // 4. JICA — Japan international cooperation opinion
  'shop',      // 5. Retail market chain
  'truck',     // 6. Courier service
  'airplane',  // 7. Aircraft composite materials manufacturer
  'fuel',      // 8. Oil products suppliers
  'beverage',  // 9. Beer & soft drinks manufacturer
  'truck',     // 10. Postal-courier + freight operator
  'tree',      // 11. Timber processing + tax dispute
  'balance',   // 12. Insolvency proceedings
  'bank',      // 13. Banking & credit institutions
  'train',     // 14. Railway sector
  'tv',        // 15. Appliance retailer — copyright dispute
  'cart',      // 16. Supermarket chain
  'beaker',    // 17. Medical-cosmetology equipment importer
  'cup',       // 18. Paper cup manufacturer
  'medical',   // 19. Medical service providers
  'hotel',     // 20. Hotel/restaurant — high-altitude resort
]

const CASES_KA: string[] = [
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

const CASES_EN: string[] = [
  'Full acquittal of David Grigolia, expert at the Medical Department of the LEPL Levan Samkharauli National Forensics Bureau — on December 16, 2025, by a judgment of the Tbilisi City Court (Judge Eka Areshidze), delivered as a result of the defense led by attorney Tamar Kuchava.',
  "Representation of the French company Menard Georgia LLC — Tamar Kuchava, together with Sandro Mtskeradze, in a multi-million dispute concerning a material breach of financial obligations within the Rikoti project. A legal letter prepared before the dispute ensured out-of-court resolution and full performance of obligations.",
  'Successful representation of a major confectionery manufacturer in a tax dispute in Georgia.',
  'Legal support for design-build companies participating in public procurement, including successful representation in disputes over multi-million infrastructure projects.',
  'Preparation of a legal opinion on labor law regulations commissioned by the Japan International Cooperation Agency (JICA).',
  'Comprehensive legal services for a leading retail market chain in Georgia.',
  'Full legal support for a leading courier service operator in Georgia.',
  'Successful representation of an aircraft composite materials manufacturer in a labor law dispute.',
  'Legal services for leading oil product suppliers in Georgia, including successful court representation.',
  "Successful representation of a leading beer and soft drink manufacturer in a multi-million asset dispute.",
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

interface Props {
  locale: string
}

export default function SuccessfulCases({ locale }: Props) {
  const isKa = locale === 'ka'
  const cases = isKa ? CASES_KA : CASES_EN

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4">
            {isKa ? 'ჩვენი გამოცდილება' : 'Our Track Record'}
          </p>
          <div className="w-12 h-[2px] bg-gold mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl text-dark mb-4">
            {isKa ? 'წარმატებული აქტივობები' : 'Successful Cases'}
          </h2>
          <GoldDivider className="mt-8" />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cases.map((text, i) => (
            <ScrollReveal key={i} delay={(i % 6) * 100}>
              <div className="relative h-full p-8 bg-white border border-gray-100 hover:border-gold/40 transition-all duration-700 group hover:shadow-lg hover:shadow-gold/5 hover:scale-[1.05] text-center">
                {/* Gold left border on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />

                {/* Gold-bordered square with semantically-matched icon */}
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all duration-500">
                  {ICON[CASE_ICONS[i]] ?? ICON.scale}
                </div>

                <p className="text-navy text-[14px] md:text-[15px] leading-relaxed font-light text-justify group-hover:text-dark transition-colors duration-500">
                  {text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
