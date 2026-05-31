import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { getSettings } from '@/lib/settings'
import { getLocation, type SiteLocation } from '@/lib/location'

// Upserts so the panel works even on a database where the `location.*` rows
// were never seeded. `valueKa`/`valueEn` carry the two address translations;
// for single-value fields (link, coordinates) the same value is stored in both.
async function upsertSetting(key: string, valueKa: string, valueEn: string) {
  await db.siteSetting.upsert({
    where: { key },
    update: { valueKa, valueEn, category: 'location' },
    create: { key, valueKa, valueEn, category: 'location' },
  })
}

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const location = getLocation(await getSettings())
  return NextResponse.json(location)
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = (await req.json()) as Partial<SiteLocation>

  const addressKa = (body.addressKa ?? '').trim()
  const addressEn = (body.addressEn ?? '').trim()
  const mapLink = (body.mapLink ?? '').trim()
  const lat = Number(body.lat)
  const lng = Number(body.lng)

  if (!addressKa || !addressEn) {
    return NextResponse.json({ error: 'Address is required in both languages.' }, { status: 400 })
  }
  if (!Number.isFinite(lat) || lat < -90 || lat > 90 || !Number.isFinite(lng) || lng < -180 || lng > 180) {
    return NextResponse.json({ error: 'Invalid map coordinates.' }, { status: 400 })
  }

  await upsertSetting('location.address', addressKa, addressEn)
  await upsertSetting('location.mapLink', mapLink, mapLink)
  await upsertSetting('location.lat', String(lat), String(lat))
  await upsertSetting('location.lng', String(lng), String(lng))

  return NextResponse.json({ ok: true })
}
