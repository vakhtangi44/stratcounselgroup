import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import { getSettings, s } from '@/lib/settings'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default async function TeamPage() {
  const locale = await getLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'

  const [members, settings] = await Promise.all([
    db.teamMember.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    }),
    getSettings(),
  ])

  return (
    <div className="pt-[82px]">
      {/* Hero */}
      <section className="relative bg-navy text-white py-24 md:py-32 text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-pattern" />
        <div className="relative z-10">
          <p className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4">
            {s(settings, 'page.team.subtitle', locale)}
          </p>
          <div className="gold-divider mx-auto mb-8" />
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em]">
            {s(settings, 'page.team', locale)}
          </h1>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 md:py-28 px-4 bg-cream bg-subtle-pattern">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {members.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 100}>
                <Link href={`${prefix}/team/${member.slug}`} className="group block">
                  <div className="bg-white overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-dark/5">
                    <div className="relative h-80 bg-bg-alt overflow-hidden">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={isKa ? member.nameKa : member.nameEn}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-dark to-navy">
                          <span className="font-heading text-5xl text-gold/30 tracking-wider">
                            {getInitials(member.nameEn)}
                          </span>
                        </div>
                      )}
                      {/* Gold accent on hover */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>
                    <div className="p-6 border-l-2 border-transparent group-hover:border-gold transition-colors duration-500">
                      <h2 className="font-heading text-lg text-dark group-hover:text-gold transition-colors duration-300">
                        {isKa ? member.nameKa : member.nameEn}
                      </h2>
                      <p className="text-secondary text-sm mt-1 font-light tracking-wide">
                        {isKa ? member.titleKa : member.titleEn}
                      </p>
                      {member.gbaNumber && (
                        <p className="text-[11px] text-gold/70 mt-3 uppercase tracking-[0.15em]">
                          GBA #{member.gbaNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
