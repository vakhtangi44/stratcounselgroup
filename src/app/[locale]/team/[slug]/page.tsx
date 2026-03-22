import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { unstable_noStore as noStore } from 'next/cache'

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  noStore()
  const { slug } = await params
  const locale = await getLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'

  const member = await db.teamMember.findUnique({
    where: { slug, active: true },
    include: {
      posts: {
        where: { status: 'published' },
        orderBy: { publishedAt: 'desc' },
        take: 5,
      },
    },
  })
  if (!member) notFound()

  // Bio content is trusted (from our own database seed, not user input)
  const fullBio = isKa ? member.fullBioKa : member.fullBioEn

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-dark text-white py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <Link
            href={`${prefix}/team`}
            className="inline-flex items-center gap-2 text-white/50 hover:text-gold transition-colors text-sm uppercase tracking-wider mb-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {isKa ? 'გუნდი' : 'Team'}
          </Link>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-sm overflow-hidden shrink-0 bg-gray-700 border-2 border-gold/20 shadow-2xl">
              {member.photo && (
                <Image
                  src={member.photo}
                  alt={isKa ? member.nameKa : member.nameEn}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
            <div className="flex-1">
              <h1 className="font-heading text-4xl md:text-5xl mb-3">
                {isKa ? member.nameKa : member.nameEn}
              </h1>
              <div className="w-12 h-[2px] bg-gold mb-4" />
              <p className="text-white/60 text-lg mb-4">
                {isKa ? member.titleKa : member.titleEn}
              </p>
              {member.gbaNumber && (
                <p className="text-gold text-sm tracking-wider">GBA #{member.gbaNumber}</p>
              )}
              {member.shortBioKa && (
                <p className="text-white/70 mt-6 text-base font-light leading-relaxed max-w-xl">
                  {isKa ? member.shortBioKa : member.shortBioEn}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section - content is trusted, sourced from admin-controlled database seed */}
      {fullBio && (
        <section className="py-16 md:py-20 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div
              className="prose prose-lg max-w-none text-secondary
                prose-headings:font-heading prose-headings:text-dark prose-headings:mt-10 prose-headings:mb-4
                prose-h2:text-2xl prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-3
                prose-p:leading-relaxed prose-p:font-light prose-p:text-[15px]
                prose-ul:mt-3 prose-ul:space-y-1
                prose-li:text-[15px] prose-li:font-light prose-li:text-secondary
                prose-a:text-gold prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: fullBio }}
            />
          </div>
        </section>
      )}

      {/* Practice Areas */}
      {member.practiceAreas && member.practiceAreas.length > 0 && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-heading text-2xl text-dark mb-6">
              {isKa ? 'პრაქტიკის სფეროები' : 'Practice Areas'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {member.practiceAreas.map((area: string) => (
                <Link
                  key={area}
                  href={`${prefix}/practice-areas#${area}`}
                  className="px-4 py-2 bg-white border border-gray-200 text-secondary text-sm hover:border-gold hover:text-gold transition-colors"
                >
                  {area.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles */}
      {member.posts.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-heading text-2xl text-dark mb-8">
              {isKa ? 'სტატიები' : 'Articles'}
            </h2>
            <div className="space-y-4">
              {member.posts.map((post) => (
                <Link
                  key={post.id}
                  href={`${prefix}/blog/${post.slug}`}
                  className="block p-5 border border-gray-100 rounded-sm hover:border-gold/40 hover:shadow-sm transition-all duration-300"
                >
                  <h3 className="font-heading text-dark hover:text-gold transition-colors">
                    {isKa ? post.titleKa : post.titleEn}
                  </h3>
                  {post.publishedAt && (
                    <p className="text-xs text-secondary mt-2">
                      {formatDate(post.publishedAt, locale)}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
