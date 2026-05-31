import { getSettings } from '@/lib/settings'
import { getLocation } from '@/lib/location'
import LocationEditor from './LocationEditor'

export const dynamic = 'force-dynamic'

export default async function AdminLocationPage() {
  const location = getLocation(await getSettings())

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl text-dark">Address &amp; Map</h1>
        <p className="text-secondary text-sm mt-1">
          Edit the office address and drop the map pin. Changes update the footer, the contact page,
          and the map in one place.
        </p>
      </div>
      <LocationEditor initial={location} />
    </div>
  )
}
