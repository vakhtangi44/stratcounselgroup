import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import AboutValueForm from '../../AboutValueForm'

export default async function EditAboutValue({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const value = await db.aboutValue.findUnique({ where: { id: parseInt(id) } })
  if (!value) notFound()
  return (
    <div>
      <h1 className="font-heading text-2xl text-dark mb-6">Edit Value</h1>
      <AboutValueForm value={value} />
    </div>
  )
}
