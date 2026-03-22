import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import BlogForm from '../../BlogForm'

export default async function EditBlogPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await db.blogPost.findUnique({
    where: { id: parseInt(id) },
    include: { tags: true },
  })
  if (!post) notFound()
  return (
    <div>
      <h1 className="font-heading text-2xl text-dark mb-6">Edit Blog Post</h1>
      <BlogForm post={post} />
    </div>
  )
}
