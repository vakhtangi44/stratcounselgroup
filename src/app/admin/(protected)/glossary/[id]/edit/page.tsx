import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import GlossaryForm from '../../GlossaryForm'

export default async function EditGlossaryTerm({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const term = await db.glossaryTerm.findUnique({ where: { id: parseInt(id) } })
  if (!term) notFound()
  return (
    <div>
      <h1 className="font-heading text-2xl text-dark mb-6">Edit Glossary Term</h1>
      <GlossaryForm term={term} />
    </div>
  )
}
