import { db } from '@/lib/db'
import AboutPhotoUploader from './AboutPhotoUploader'

export default async function AdminAboutPage() {
  const setting = await db.siteSetting.findUnique({
    where: { key: 'section.about.image' },
  })

  return (
    <div className="max-w-2xl">
      <AboutPhotoUploader
        settingId={setting?.id ?? null}
        currentImage={setting?.valueEn || ''}
      />
    </div>
  )
}
