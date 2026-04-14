import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import CaseForm from '../../CaseForm'

export default async function EditCase({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const caseItem = await db.successfulCase.findUnique({ where: { id: parseInt(id) } })
  if (!caseItem) notFound()
  return (
    <div>
      <h1 className="font-heading text-2xl text-dark mb-6">Edit Case</h1>
      <CaseForm caseItem={caseItem} />
    </div>
  )
}
