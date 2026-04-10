import { db } from '@/lib/db'
import AboutPhotoUploader from './AboutPhotoUploader'

export default async function AdminAboutPage() {
  const settings = await db.siteSetting.findMany({
    where: {
      key: {
        in: [
          'section.about.image',
          'section.about.imagePosition',
          'section.about.imageSize',
          'section.about.stat',
          'section.about.statLabel',
        ],
      },
    },
  })

  const byKey = Object.fromEntries(settings.map((s) => [s.key, s]))

  return (
    <div className="max-w-2xl">
      <AboutPhotoUploader
        imageSettingId={byKey['section.about.image']?.id ?? null}
        positionSettingId={byKey['section.about.imagePosition']?.id ?? null}
        sizeSettingId={byKey['section.about.imageSize']?.id ?? null}
        statSettingId={byKey['section.about.stat']?.id ?? null}
        statLabelSettingId={byKey['section.about.statLabel']?.id ?? null}
        currentImage={byKey['section.about.image']?.valueEn || ''}
        currentPosition={byKey['section.about.imagePosition']?.valueEn || 'right'}
        currentSize={byKey['section.about.imageSize']?.valueEn || 'medium'}
        currentStat={byKey['section.about.stat']?.valueEn || ''}
        currentStatLabelKa={byKey['section.about.statLabel']?.valueKa || ''}
        currentStatLabelEn={byKey['section.about.statLabel']?.valueEn || ''}
      />
    </div>
  )
}
