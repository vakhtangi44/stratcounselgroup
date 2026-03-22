import Link from 'next/link'
import { db } from '@/lib/db'

export default async function AdminFaqPage() {
  const faqs = await db.fAQ.findMany({ orderBy: { order: 'asc' } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-2xl text-dark">FAQ</h1>
        <Link href="/admin/faq/new" className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark">
          + New FAQ
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-alt text-secondary">
            <tr>
              <th className="text-left px-4 py-3">Question (KA)</th>
              <th className="text-left px-4 py-3">Practice Area</th>
              <th className="text-left px-4 py-3">Order</th>
              <th className="text-left px-4 py-3">Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {faqs.map((faq) => (
              <tr key={faq.id} className="hover:bg-bg-alt/50">
                <td className="px-4 py-3 font-medium max-w-xs truncate">{faq.questionKa}</td>
                <td className="px-4 py-3 text-secondary">{faq.practiceArea || '—'}</td>
                <td className="px-4 py-3 text-secondary">{faq.order}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${faq.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {faq.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/faq/${faq.id}/edit`} className="text-gold hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {faqs.length === 0 && (
          <p className="text-center text-secondary py-8">No FAQs yet.</p>
        )}
      </div>
    </div>
  )
}
