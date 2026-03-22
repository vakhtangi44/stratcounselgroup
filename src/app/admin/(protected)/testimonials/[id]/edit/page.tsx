import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import TestimonialForm from '../../TestimonialForm'

export default async function EditTestimonial({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const testimonial = await db.testimonial.findUnique({ where: { id: parseInt(id) } })
  if (!testimonial) notFound()
  return (
    <div>
      <h1 className="font-heading text-2xl text-dark mb-6">Edit Testimonial</h1>
      <TestimonialForm testimonial={testimonial} />
    </div>
  )
}
