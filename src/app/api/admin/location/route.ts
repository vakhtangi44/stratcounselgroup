import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { getSettings } from '@/lib/settings'
import { getLocation, type SiteLocation } from '@/lib/location'

// Upserts so the panel works even on a database where the `location.*` rows
// were never seeded. `valueKa`/`valueEn` carry the two address translations;
// for single-value fields (link, embed) the same value is stored in both.
async function upsertSetting(key: string, valueKa: string, valueEn: string) {
  await db.siteSetting.upsert({
    where: { key },
    update: { valueKa, valueEn, category: 'location' },
    create: { key, valueKa, valueEn, category: 'location' },
  })
}

/** If the admin pasted a full `<iframe …>`, pull the embed URL out of its `src`. */
function extractEmbedSrc(input: string): string {
  const trimmed = input.trim()
  const match = trimmed.match(/src=["']([^"']+)["']/i)
  return (match ? match[1] : trimmed).trim()
}

/** Only allow Google Maps URLs in the map iframe. */
function isGoogleMapsUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return (
      (u.protocol === 'https:') &&
      (u.hostname === 'www.google.com' || u.hostname === 'maps.google.com' || u.hostname === 'google.com') &&
      u.pathname.startsWith('/maps')
    )
  } catch {
    return false
  }
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
  const mapEmbed = extractEmbedSrc(body.mapEmbed ?? '')

  if (!addressKa || !addressEn) {
    return NextResponse.json({ error: 'Address is required in both languages.' }, { status: 400 })
  }
  if (mapEmbed && !isGoogleMapsUrl(mapEmbed)) {
    return NextResponse.json(
      { error: 'Map embed must be a Google Maps embed link. Leave it blank to auto-generate from the address.' },
      { status: 400 },
    )
  }

  await upsertSetting('location.address', addressKa, addressEn)
  await upsertSetting('location.mapLink', mapLink, mapLink)
  await upsertSetting('location.mapEmbed', mapEmbed, mapEmbed)

  return NextResponse.json({ ok: true, mapEmbed })
}
