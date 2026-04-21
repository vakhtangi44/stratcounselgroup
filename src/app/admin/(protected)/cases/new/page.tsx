import CaseForm from '../CaseForm'

export default async function NewCase({ searchParams }: { searchParams: Promise<{ section?: string }> }) {
  const { section } = await searchParams
  const defaultFeatured = section === 'featured'

  return (
    <div>
      <h1 className="font-heading text-2xl text-dark mb-6">New Case</h1>
      <CaseForm defaultFeatured={defaultFeatured} />
    </div>
  )
}
