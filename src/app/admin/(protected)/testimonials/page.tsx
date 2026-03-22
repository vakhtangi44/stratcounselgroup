import Link from 'next/link'
import { db } from '@/lib/db'

export default async function AdminTestimonialsPage() {
  const testimonials = await db.testimonial.findMany({ orderBy: { date: 'desc' } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-2xl text-dark">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark">
          + New Testimonial
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-alt text-secondary">
            <tr>
              <th className="text-left px-4 py-3">Client</th>
              <th className="text-left px-4 py-3">Rating</th>
              <th className="text-left px-4 py-3">Practice Area</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {testimonials.map((t) => (
              <tr key={t.id} className="hover:bg-bg-alt/50">
                <td className="px-4 py-3 font-medium">{t.clientName}</td>
                <td className="px-4 py-3 text-secondary">{'★'.repeat(t.rating)}</td>
                <td className="px-4 py-3 text-secondary">{t.practiceArea || '—'}</td>
                <td className="px-4 py-3 text-secondary">{new Date(t.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${t.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {t.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/testimonials/${t.id}/edit`} className="text-gold hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {testimonials.length === 0 && (
          <p className="text-center text-secondary py-8">No testimonials yet.</p>
        )}
      </div>
    </div>
  )
}
