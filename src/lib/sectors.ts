export const SECTORS = [
  {
    slug: 'transportation-logistics',
    nameKa: 'გადაზიდვები',
    nameEn: 'Transportation & Logistics',
    image: '/images/sectors/transport.jpg',
    descriptionKa:
      'სატრანსპორტო და ლოჯისტიკის სექტორში ვუზრუნველყოფთ კომპლექსურ სამართლებრივ მხარდაჭერას — სატრანსპორტო ხელშეკრულებების სტრუქტურირებიდან საერთაშორისო გადაზიდვების რეგულირებამდე.',
    descriptionEn:
      'In the transportation and logistics sector we provide comprehensive legal support — from structuring transportation contracts to regulating international freight.',
  },
  {
    slug: 'energy',
    nameKa: 'ენერგეტიკა',
    nameEn: 'Energy',
    image: '/images/sectors/energy.jpg',
    descriptionKa:
      'ენერგეტიკის სექტორში ვემსახურებით კომპანიებს განახლებადი ენერგიის პროექტებში, ინფრასტრუქტურის განვითარებაში, სახელმწიფო შესყიდვებსა და რეგულაციურ საკითხებში.',
    descriptionEn:
      'In the energy sector we serve companies in renewable energy projects, infrastructure development, public procurement, and regulatory matters.',
  },
  {
    slug: 'infrastructure',
    nameKa: 'ინფრასტრუქტურა',
    nameEn: 'Infrastructure',
    image: '/images/sectors/infrastructure.jpg',
    descriptionKa:
      'ინფრასტრუქტურული პროექტები მოითხოვს მრავალფეროვან სამართლებრივ ექსპერტიზას. ჩვენ ვეხმარებით კლიენტებს ხელშეკრულებების შედგენაში, რისკების შეფასებაში და დავების გადაწყვეტაში.',
    descriptionEn:
      'Infrastructure projects require diverse legal expertise. We help clients with contract drafting, risk assessment, and dispute resolution.',
  },
  {
    slug: 'medicine-healthcare',
    nameKa: 'მედიცინა',
    nameEn: 'Medicine & Healthcare',
    image: '/images/sectors/medicine.jpg',
    descriptionKa:
      'სამედიცინო სექტორის წარმომადგენლებს ვთავაზობთ სამართლებრივ მხარდაჭერას ლიცენზირების, შესაბამისობის, ადმინისტრაციული ზედამხედველობისა და პაციენტის უფლებების საკითხებში.',
    descriptionEn:
      'We offer legal support to medical sector representatives in licensing, compliance, administrative oversight, and patient rights matters.',
  },
  {
    slug: 'construction',
    nameKa: 'მშენებლობა',
    nameEn: 'Construction',
    image: '/images/sectors/construction.jpg',
    descriptionKa:
      'სამშენებლო სექტორში ვეხმარებით კომპანიებს ნებართვების მიღებაში, კონტრაქტების სტრუქტურირებაში, საპროექტო დოკუმენტაციაში და სახელმწიფო ზედამხედველობასთან დაკავშირებულ საკითხებში.',
    descriptionEn:
      'In the construction sector we help companies with permitting, contract structuring, project documentation, and matters related to state oversight.',
  },
] as const

export type SectorSlug = (typeof SECTORS)[number]['slug']

export function getSector(slug: string) {
  return SECTORS.find((s) => s.slug === slug)
}
