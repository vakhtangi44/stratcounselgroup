import Link from 'next/link'
import Image from 'next/image'
import type { TeamMember } from '@prisma/client'

interface Props {
  members: TeamMember[]
  locale: string
}

export default function TeamPreview({ members, locale }: Props) {
  const prefix = locale === 'en' ? '/en' : ''
  if (members.length === 0) return null

  return (
    <section className="py-16 bg-bg-alt">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl text-dark text-center mb-12">
          {locale === 'ka' ? 'ჩვენი გუნდი' : 'Our Team'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {members.map((member) => (
            <Link key={member.id} href={`${prefix}/team/${member.slug}`} className="group text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-200">
                {member.photo ? (
                  <Image src={member.photo} alt={member.nameEn} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
                    👤
                  </div>
                )}
              </div>
              <p className="font-heading text-lg text-dark group-hover:text-gold transition-colors">
                {locale === 'ka' ? member.nameKa : member.nameEn}
              </p>
              <p className="text-sm text-secondary mt-1">
                {locale === 'ka' ? member.titleKa : member.titleEn}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href={`${prefix}/team`} className="text-gold hover:underline text-sm font-medium">
            {locale === 'ka' ? 'მთელი გუნდი →' : 'Meet the full team →'}
          </Link>
        </div>
      </div>
    </section>
  )
}
