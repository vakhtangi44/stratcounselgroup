import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import { unstable_noStore as noStore } from 'next/cache'
import { getSettings, s } from '@/lib/settings'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'
import RichText from '@/components/ui/RichText'

export default async function TeamPage() {
  noStore()
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
    <div className="pt-[110px] md:pt-[166px]">
      {/* Compact Hero */}
      <section className="relative bg-white pt-[4rem] md:pt-[9.1rem] pb-0 text-center px-4 lg:px-8 overflow-hidden">
        <div className="relative z-10">
          <div className="w-6 h-[1px] bg-gold mx-auto mb-3" />
          <RichText html={s(settings, 'page.team.subtitle', locale)} as="p" className="text-gold text-[12px] sm:text-[16.5px] uppercase tracking-[0.3em] mb-3" />
          <RichText html={s(settings, 'page.team', locale)} as="h1" className="font-heading tracking-[-0.02em]" style={{ fontSize: 'var(--typo-sectionTitle-size, 2.25rem)', color: 'var(--typo-sectionTitle-color, #1C122C)', fontFamily: 'var(--typo-sectionTitle-font)' }} />
        </div>
      </section>

      {/* Team Grid */}
      <section className="pt-[2rem] md:pt-[3rem] pb-[4rem] md:pb-[4rem] px-4 lg:px-8 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {members.map((member, i) => (
              <ScrollReveal key={member.id} delay={i * 150}>
                <Link href={`${prefix}/team/${member.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-4" style={{ background: '#ffffff' }}>
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={isKa ? member.nameKa : member.nameEn}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-dark to-navy" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-heading text-[13px] sm:text-[19.9px] text-dark group-hover:text-gold transition-colors duration-300 leading-snug font-bold tracking-tight">
                      {isKa ? member.nameKa : member.nameEn}
                    </h2>
                    <p className="text-dark group-hover:text-gold transition-colors duration-300 text-[11px] sm:text-[14.4px] mt-1 font-medium uppercase tracking-[0.02em] leading-snug">
                      {isKa ? member.titleKa : member.titleEn}
                    </p>
                    {member.gbaNumber && (
                      <p className="text-[10px] text-gold/70 mt-2 uppercase tracking-[0.15em]">
                        GBA #{member.gbaNumber}
                      </p>
                    )}
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
