import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import { sanitizeHtml } from '@/lib/sanitize'
import { formatDate, readTime } from '@/lib/utils'

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  const locale = await getLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'

  const post = await db.blogPost.findFirst({
    where: { slug, status: 'published' },
    include: { author: true, tags: true },
  })
  if (!post) notFound()

  const relatedPosts = await db.blogPost.findMany({
    where: {
      status: 'published',
      id: { not: post.id },
      ...(post.tags.length > 0
        ? { tags: { some: { practiceArea: { in: post.tags.map((t) => t.practiceArea) } } } }
        : {}),
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  })

  const content = isKa ? post.contentKa : post.contentEn
  const title = isKa ? post.titleKa : post.titleEn
  const sanitized = sanitizeHtml(content)

  return (
    <div className="pt-16">
      <article className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-8">
          {post.coverImage && (
            <div className="relative h-72 md:h-96 rounded-lg overflow-hidden mb-8">
              <Image src={post.coverImage} alt={title} fill className="object-cover" />
            </div>
          )}
          <h1 className="font-heading text-4xl text-dark mb-4">{title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-secondary">
            {post.author && <span>{isKa ? post.author.nameKa : post.author.nameEn}</span>}
            {post.publishedAt && <span>{formatDate(post.publishedAt, locale)}</span>}
            <span>{readTime(content)} {isKa ? 'წუთი' : 'min read'}</span>
          </div>
        </header>

        {/* sanitized via DOMPurify in @/lib/sanitize */}
        <div
          className="prose prose-lg max-w-none text-secondary [&_h2]:font-heading [&_h2]:text-dark"
          dangerouslySetInnerHTML={{ __html: sanitized }}
        />

        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-4">
          <span className="text-sm text-secondary">{isKa ? 'გაზიარება:' : 'Share:'}</span>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://stratcounselgroup.com${prefix}/blog/${post.slug}`)}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary hover:text-gold transition-colors"
          >
            Twitter/X
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://stratcounselgroup.com${prefix}/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-secondary hover:text-gold transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-bg-alt py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="font-heading text-2xl text-dark mb-8">{isKa ? 'მსგავსი სტატიები' : 'Related Articles'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`${prefix}/blog/${rp.slug}`} className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-heading text-dark hover:text-gold transition-colors line-clamp-2">
                    {isKa ? rp.titleKa : rp.titleEn}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
