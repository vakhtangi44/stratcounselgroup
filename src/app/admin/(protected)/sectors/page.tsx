import { db } from '@/lib/db'
import { SECTORS } from '@/lib/sectors'
import SectorsManager from './SectorsManager'

export default async function AdminSectorsPage() {
  const keys: string[] = ['sectors.enabled']
  for (const sector of SECTORS) {
    keys.push(
      `sector.${sector.slug}.enabled`,
      `sector.${sector.slug}.title`,
      `sector.${sector.slug}.description`,
    )
  }

  const settings = await db.siteSetting.findMany({ where: { key: { in: keys } } })
  const byKey = Object.fromEntries(settings.map((s) => [s.key, s]))

  const masterEnabled = byKey['sectors.enabled']
  const sectorRows = SECTORS.map((sector) => ({
    slug: sector.slug,
    defaultNameKa: sector.nameKa,
    defaultNameEn: sector.nameEn,
    image: sector.image,
    enabledSetting: byKey[`sector.${sector.slug}.enabled`] ?? null,
    titleSetting: byKey[`sector.${sector.slug}.title`] ?? null,
    descriptionSetting: byKey[`sector.${sector.slug}.description`] ?? null,
  }))

  return (
    <div className="max-w-4xl">
      <SectorsManager
        masterEnabledSettingId={masterEnabled?.id ?? null}
        masterEnabled={(masterEnabled?.valueEn || 'true') !== 'false'}
        sectors={sectorRows.map((row) => ({
          slug: row.slug,
          defaultNameKa: row.defaultNameKa,
          defaultNameEn: row.defaultNameEn,
          image: row.image,
          enabledSettingId: row.enabledSetting?.id ?? null,
          enabled: (row.enabledSetting?.valueEn || 'true') !== 'false',
          titleSettingId: row.titleSetting?.id ?? null,
          titleKa: row.titleSetting?.valueKa || '',
          titleEn: row.titleSetting?.valueEn || '',
          descriptionSettingId: row.descriptionSetting?.id ?? null,
          descriptionKa: row.descriptionSetting?.valueKa || '',
          descriptionEn: row.descriptionSetting?.valueEn || '',
        }))}
      />
    </div>
  )
}
