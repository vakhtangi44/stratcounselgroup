import Link from 'next/link'
import { db } from '@/lib/db'

export default async function AdminGlossaryPage() {
  const terms = await db.glossaryTerm.findMany({ orderBy: { termEn: 'asc' } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading text-2xl text-dark">Glossary</h1>
        <Link href="/admin/glossary/new" className="bg-gold text-white px-4 py-2 rounded text-sm hover:bg-gold-dark">
          + New Term
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-alt text-secondary">
            <tr>
              <th className="text-left px-4 py-3">Term (EN)</th>
              <th className="text-left px-4 py-3">Term (KA)</th>
              <th className="text-left px-4 py-3">Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {terms.map((t) => (
              <tr key={t.id} className="hover:bg-bg-alt/50">
                <td className="px-4 py-3 font-medium">{t.termEn}</td>
                <td className="px-4 py-3 text-secondary">{t.termKa}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${t.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {t.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/glossary/${t.id}/edit`} className="text-gold hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {terms.length === 0 && (
          <p className="text-center text-secondary py-8">No glossary terms yet.</p>
        )}
      </div>
    </div>
  )
}
