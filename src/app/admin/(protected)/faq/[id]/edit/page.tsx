import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import FaqForm from '../../FaqForm'

export default async function EditFaq({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const faq = await db.fAQ.findUnique({ where: { id: parseInt(id) } })
  if (!faq) notFound()
  return (
    <div>
      <h1 className="font-heading text-2xl text-dark mb-6">Edit FAQ</h1>
      <FaqForm faq={faq} />
    </div>
  )
}
