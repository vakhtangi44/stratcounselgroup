import Link from 'next/link'
import { db } from '@/lib/db'

export default async function AdminBlogPage() {
  const posts = await db.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { nameEn: true } } },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-2xl text-dark">Blog Posts</h1>
        <Link href="/admin/blog/new" className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark">
          + New Post
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-alt text-secondary">
            <tr>
              <th className="text-left px-4 py-3">Title (KA)</th>
              <th className="text-left px-4 py-3">Author</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-bg-alt/50">
                <td className="px-4 py-3 font-medium">{post.titleKa}</td>
                <td className="px-4 py-3 text-secondary">{post.author?.nameEn || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-secondary">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/blog/${post.id}/edit`} className="text-gold hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && (
          <p className="text-center text-secondary py-8">No blog posts yet.</p>
        )}
      </div>
    </div>
  )
}
