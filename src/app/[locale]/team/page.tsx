import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import { getSettings, s } from '@/lib/settings'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import RichText from '@/components/ui/RichText'

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
      {/* Compact Hero */}
      <section className="relative bg-navy text-white py-[3.9rem] md:py-[5.46rem] text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-dark-pattern" />
        <div className="relative z-10">
          <RichText html={s(settings, 'page.team.subtitle', locale)} as="p" className="text-gold text-[16.5px] uppercase tracking-[0.3em] mb-3" />
          <div className="gold-divider mx-auto mb-4" />
          <RichText html={s(settings, 'page.team', locale)} as="h1" className="font-heading text-[2.8rem] md:text-[3.4rem] tracking-[-0.02em]" />
        </div>
      </section>

      {/* Team Grid */}
      <section className="pt-[16rem] pb-[16rem] px-4 bg-cream bg-subtle-pattern">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[5rem]">
            {members.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 100}>
                <Link href={`${prefix}/team/${member.slug}`} className="group block w-full h-full" style={{ perspective: '900px' }}>
                  <div className="bg-white overflow-hidden flex flex-col h-full card-3d">
                    <div className="relative aspect-[10/9] bg-bg-alt overflow-hidden flex-shrink-0">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={isKa ? member.nameKa : member.nameEn}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-dark to-navy">
                          <span className="font-heading text-5xl text-gold/30 tracking-wider">
                            {getInitials(member.nameEn)}
                          </span>
                        </div>
                      )}
                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/25 transition-all duration-500" />
                      {/* Gold bottom line sweeping in */}
                      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>
                    <div className="pt-3 px-3 pb-4 border-l-[3px] border-transparent group-hover:border-gold transition-all duration-500 flex flex-col flex-1 min-h-[140px]">
                      <h2 className="font-heading text-2xl text-navy group-hover:text-gold transition-colors duration-300 leading-snug font-semibold line-clamp-2">
                        {isKa ? member.nameKa : member.nameEn}
                      </h2>
                      <p className="text-navy/70 text-[1.2rem] mt-1 font-bold tracking-wide leading-snug">
                        {isKa ? member.titleKa : member.titleEn}
                      </p>
                      {member.gbaNumber && (
                        <p className="text-[11px] text-gold/70 mt-2 uppercase tracking-[0.15em]">
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
