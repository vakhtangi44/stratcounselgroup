import { db } from '@/lib/db'
import { getLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
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

  return (
    <div className="pt-16">
      <section className="bg-dark text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl flex flex-col md:flex-row gap-8 items-start">
          <div className="relative w-48 h-48 rounded-full overflow-hidden shrink-0 bg-gray-700">
            {member.photo && <Image src={member.photo} alt={member.nameEn} fill className="object-cover" />}
          </div>
          <div>
            <h1 className="font-heading text-4xl mb-2">{isKa ? member.nameKa : member.nameEn}</h1>
            <p className="text-white/70 text-lg mb-4">{isKa ? member.titleKa : member.titleEn}</p>
            {member.gbaNumber && <p className="text-gold text-sm">GBA #{member.gbaNumber}</p>}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none text-secondary mb-16">
            <p>{isKa ? member.fullBioKa : member.fullBioEn}</p>
          </div>

          {member.posts.length > 0 && (
            <div>
              <h2 className="font-heading text-2xl text-dark mb-6">{isKa ? 'სტატიები' : 'Articles'}</h2>
              <div className="space-y-4">
                {member.posts.map((post) => (
                  <Link key={post.id} href={`${prefix}/blog/${post.slug}`} className="block p-4 border border-gray-100 rounded-lg hover:border-gold transition-colors">
                    <h3 className="font-heading text-dark hover:text-gold transition-colors">
                      {isKa ? post.titleKa : post.titleEn}
                    </h3>
                    {post.publishedAt && <p className="text-xs text-secondary mt-1">{formatDate(post.publishedAt, locale)}</p>}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
