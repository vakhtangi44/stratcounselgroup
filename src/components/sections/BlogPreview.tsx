import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@prisma/client'
import { formatDate, readTime } from '@/lib/utils'

interface Props {
  posts: BlogPost[]
  locale: string
}

export default function BlogPreview({ posts, locale }: Props) {
  const prefix = locale === 'en' ? '/en' : ''
  if (posts.length === 0) return null

  return (
    <section className="py-16 bg-bg-alt">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl text-dark text-center mb-12">
          {locale === 'ka' ? 'ბლოგი' : 'Latest Articles'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`${prefix}/blog/${post.slug}`}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {post.coverImage && (
                <div className="relative h-48">
                  <Image
                    src={post.coverImage}
                    alt={locale === 'ka' ? post.titleKa : post.titleEn}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="font-heading text-lg text-dark mb-2 group-hover:text-gold transition-colors line-clamp-2">
                  {locale === 'ka' ? post.titleKa : post.titleEn}
                </h3>
                <p className="text-secondary text-sm line-clamp-2 mb-4">
                  {locale === 'ka' ? post.excerptKa : post.excerptEn}
                </p>
                <div className="flex items-center gap-3 text-xs text-secondary">
                  {post.publishedAt && <span>{formatDate(post.publishedAt, locale)}</span>}
                  <span>{readTime(locale === 'ka' ? post.contentKa : post.contentEn)} min</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href={`${prefix}/blog`} className="text-gold hover:underline text-sm font-medium">
            {locale === 'ka' ? 'ყველა სტატია →' : 'All articles →'}
          </Link>
        </div>
      </div>
    </section>
  )
}
