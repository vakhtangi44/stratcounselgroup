import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import Image from 'next/image'
import { sanitizeHtml } from '@/lib/sanitize'
import { formatDate, readTime } from '@/lib/utils'
import { unstable_noStore as noStore } from 'next/cache'
import VideoEmbed from '@/components/ui/VideoEmbed'

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  noStore()
  const { slug } = await params
  const locale = await getLocale()
  const prefix = locale === 'en' ? '/en' : ''
  const isKa = locale === 'ka'

  const post = await db.blogPost.findFirst({
    where: { slug, status: 'published' },
    include: { author: true, tags: true },
  })
  if (!post) notFound()

  const content = isKa ? post.contentKa : post.contentEn
  const title = isKa ? post.titleKa : post.titleEn
  const sanitized = sanitizeHtml(content)

  return (
    <div className="bg-white min-h-screen pt-[110px] md:pt-[200px]">
      <article className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-8">
          {post.coverImage && (
            <div
              className="relative h-72 md:h-96 rounded-lg overflow-hidden mb-[1.2rem]"
              style={post.coverImageHeight ? { height: `${post.coverImageHeight}px` } : undefined}
            >
              <Image src={post.coverImage} alt={title} fill className={post.coverImageHeight ? 'object-contain' : 'object-cover'} />
            </div>
          )}
          <h1 className="font-heading text-4xl text-dark mb-4">{title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-secondary">
            {post.author && <span>{isKa ? post.author.nameKa : post.author.nameEn}</span>}
            {post.publishedAt && <span>{formatDate(post.publishedAt, locale)}</span>}
            <span>{readTime(content)} {isKa ? 'წუთი' : 'min read'}</span>
          </div>
        </header>

        {post.videoUrl && (
          <div className="mb-10">
            <VideoEmbed url={post.videoUrl} title={title} />
          </div>
        )}

        {/* sanitized via DOMPurify in @/lib/sanitize */}
        <div
          className="max-w-none text-navy text-[0.9rem] md:text-lg leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0 [&_h2]:font-heading [&_h2]:text-dark [&_h2]:mt-8 [&_h2]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_li]:mb-1 [&_a]:text-gold [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: sanitized }}
        />

        {post.pdfUrl && (
          <div className="mt-10">
            <a
              href={post.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-gold text-gold px-6 py-3 rounded-sm hover:bg-gold hover:text-white transition-colors text-sm uppercase tracking-[0.1em]"
            >
              📄 {isKa ? 'PDF-ის ჩამოტვირთვა' : 'Download PDF'}
            </a>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center gap-4">
          <span className="text-sm text-secondary">{isKa ? 'გაზიარება:' : 'Share:'}</span>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://stratcounselgroup.com${prefix}/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent-orange hover:opacity-70 transition-opacity"
          >
            Facebook
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://stratcounselgroup.com${prefix}/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent-orange hover:opacity-70 transition-opacity"
          >
            LinkedIn
          </a>
        </div>
      </article>

    </div>
  )
}
