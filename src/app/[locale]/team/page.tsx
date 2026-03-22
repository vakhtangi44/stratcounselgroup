import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'

export default async function TeamPage() {
  const locale = await getLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'

  const members = await db.teamMember.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  })

  return (
    <div className="pt-16">
      <section className="bg-dark text-white py-24 text-center px-4">
        <h1 className="font-heading text-4xl mb-4">{isKa ? 'ჩვენი გუნდი' : 'Our Team'}</h1>
      </section>
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <Link key={member.id} href={`${prefix}/team/${member.slug}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-72 bg-gray-100">
                    {member.photo ? (
                      <Image src={member.photo} alt={member.nameEn} fill className="object-cover object-top" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-6xl text-gray-300">👤</div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="font-heading text-lg text-dark group-hover:text-gold transition-colors">
                      {isKa ? member.nameKa : member.nameEn}
                    </h2>
                    <p className="text-secondary text-sm mt-1">{isKa ? member.titleKa : member.titleEn}</p>
                    {member.gbaNumber && (
                      <p className="text-xs text-gold mt-2">GBA #{member.gbaNumber}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
