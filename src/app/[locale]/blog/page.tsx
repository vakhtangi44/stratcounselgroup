import { getLocale } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/lib/db'
import { getSettings, s } from '@/lib/settings'
import { PRACTICE_AREAS } from '@/lib/practice-areas'
import { formatDate, readTime } from '@/lib/utils'
import RichText from '@/components/ui/RichText'

interface BlogPost {
  id: string
  slug: string
  titleKa: string
  titleEn: string
  excerptKa: string
  excerptEn: string
  contentKa: string
  contentEn: string
  coverImage: string | null
  publishedAt: Date | null
}

interface Props {
  searchParams: Promise<{ q?: string; area?: string; page?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const { q, area, page } = await searchParams
  const locale = await getLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'
  const currentPage = parseInt(page || '1') || 1
  const PAGE_SIZE = 9

  const [posts, settings]: [BlogPost[], Awaited<ReturnType<typeof getSettings>>] = await Promise.all([
    db.blogPost.findMany({
      where: {
        status: 'published',
        ...(area ? { tags: { some: { practiceArea: area } } } : {}),
        ...(q ? {
          OR: [
            { titleKa: { contains: q, mode: 'insensitive' } },
            { titleEn: { contains: q, mode: 'insensitive' } },
            { excerptKa: { contains: q, mode: 'insensitive' } },
            { excerptEn: { contains: q, mode: 'insensitive' } },
          ],
        } : {}),
      },
      orderBy: { publishedAt: 'desc' },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE + 1,
    }),
    getSettings(),
  ])

  const hasMore = posts.length > PAGE_SIZE
  const displayPosts = hasMore ? posts.slice(0, PAGE_SIZE) : posts

  return (
    <div className="pt-16">
      <section className="bg-dark text-white py-24 text-center px-4">
        <RichText html={s(settings, 'page.blog', locale)} as="h1" className="font-heading text-4xl mb-4" />
      </section>

      <section className="py-8 px-4 bg-bg-alt border-b border-gray-100">
        <div className="container mx-auto flex flex-wrap gap-3 items-center">
          <form method="GET" action={`${prefix}/blog`} className="flex gap-2 flex-1 min-w-48">
            <input
              name="q"
              defaultValue={q}
              placeholder={isKa ? 'ძიება...' : 'Search...'}
              className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm"
            />
            {area && <input type="hidden" name="area" value={area} />}
            <button type="submit" className="bg-gold text-white px-4 py-2 rounded text-sm">
              {isKa ? 'ძიება' : 'Search'}
            </button>
          </form>
          <div className="flex flex-wrap gap-2">
            <Link href={`${prefix}/blog${q ? `?q=${q}` : ''}`} className={`text-xs px-3 py-1.5 rounded border transition-colors ${!area ? 'bg-gold text-white border-gold' : 'border-gray-200 text-secondary hover:border-gold'}`}>
              {isKa ? 'ყველა' : 'All'}
            </Link>
            {PRACTICE_AREAS.map((pa) => (
              <Link key={pa.slug} href={`${prefix}/blog?area=${pa.slug}${q ? `&q=${q}` : ''}`}
                className={`text-xs px-3 py-1.5 rounded border transition-colors ${area === pa.slug ? 'bg-gold text-white border-gold' : 'border-gray-200 text-secondary hover:border-gold'}`}>
                {isKa ? pa.nameKa : pa.nameEn}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          {displayPosts.length === 0 ? (
            <p className="text-center text-secondary py-16">{isKa ? 'სტატია ვერ მოიძებნა' : 'No articles found'}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayPosts.map((post) => (
                <Link key={post.id} href={`${prefix}/blog/${post.slug}`} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {post.coverImage && (
                    <div className="relative h-48">
                      <Image src={post.coverImage} alt={isKa ? post.titleKa : post.titleEn} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="font-heading text-lg text-dark mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {isKa ? post.titleKa : post.titleEn}
                    </h2>
                    <p className="text-secondary text-sm line-clamp-2 mb-4">{isKa ? post.excerptKa : post.excerptEn}</p>
                    <div className="flex items-center gap-3 text-xs text-secondary">
                      {post.publishedAt && <span>{formatDate(post.publishedAt, locale)}</span>}
                      <span>{readTime(isKa ? post.contentKa : post.contentEn)} min</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-4 mt-12">
            {currentPage > 1 && (
              <Link href={`${prefix}/blog?page=${currentPage - 1}${q ? `&q=${q}` : ''}${area ? `&area=${area}` : ''}`}
                className="px-6 py-2 border border-gold text-gold rounded hover:bg-gold hover:text-white transition-colors text-sm">
                ← {isKa ? 'წინა' : 'Previous'}
              </Link>
            )}
            {hasMore && (
              <Link href={`${prefix}/blog?page=${currentPage + 1}${q ? `&q=${q}` : ''}${area ? `&area=${area}` : ''}`}
                className="px-6 py-2 bg-gold text-white rounded hover:bg-gold-dark transition-colors text-sm">
                {isKa ? 'შემდეგი' : 'Next'} →
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
