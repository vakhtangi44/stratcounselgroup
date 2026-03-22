import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@prisma/client'
import { formatDate, readTime } from '@/lib/utils'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface Props {
  posts: BlogPost[]
  locale: string
}

export default function BlogPreview({ posts, locale }: Props) {
  const prefix = locale === 'en' ? '/en' : ''
  if (posts.length === 0) return null

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-[12px] uppercase tracking-[0.3em] mb-4">
            {locale === 'ka' ? 'სიახლეები' : 'Insights'}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-dark gold-underline inline-block">
            {locale === 'ka' ? 'ბლოგი' : 'Latest Articles'}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 150}>
              <Link
                href={`${prefix}/blog/${post.slug}`}
                className="group block bg-white overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-dark/5"
              >
                {post.coverImage && (
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={locale === 'ka' ? post.titleKa : post.titleEn}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
                  </div>
                )}
                <div className="p-7">
                  {/* Category chip */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] uppercase tracking-[0.15em] text-gold bg-gold/8 px-3 py-1 font-medium">
                      {locale === 'ka' ? 'სტატია' : 'Article'}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg text-dark mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2 leading-snug">
                    {locale === 'ka' ? post.titleKa : post.titleEn}
                  </h3>
                  <p className="text-secondary text-sm line-clamp-2 mb-5 font-light leading-relaxed">
                    {locale === 'ka' ? post.excerptKa : post.excerptEn}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-secondary/60 uppercase tracking-[0.1em] pt-4 border-t border-gray-100">
                    {post.publishedAt && <span>{formatDate(post.publishedAt, locale)}</span>}
                    <span className="w-1 h-1 rounded-full bg-gold/40" />
                    <span>{readTime(locale === 'ka' ? post.contentKa : post.contentEn)} min</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-14">
          <Link
            href={`${prefix}/blog`}
            className="inline-flex items-center gap-2 text-gold hover:text-gold-dark text-sm font-medium uppercase tracking-[0.15em] transition-colors duration-300"
          >
            {locale === 'ka' ? 'ყველა სტატია' : 'All articles'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
