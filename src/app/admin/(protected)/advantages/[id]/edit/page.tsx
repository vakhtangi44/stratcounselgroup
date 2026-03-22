import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import AdvantageForm from '../../AdvantageForm'

export default async function EditAdvantage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const advantage = await db.advantage.findUnique({ where: { id: parseInt(id) } })
  if (!advantage) notFound()
  return (
    <div>
      <h1 className="font-heading text-2xl text-dark mb-6">Edit Advantage</h1>
      <AdvantageForm advantage={advantage} />
    </div>
  )
}
