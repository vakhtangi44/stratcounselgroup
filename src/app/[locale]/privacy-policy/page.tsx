// Privacy policy page — content managed via the `page.privacyPolicy` site setting.
import { getLocale } from 'next-intl/server'
import { unstable_noStore as noStore } from 'next/cache'

import RichText from '@/components/ui/RichText'
import { getSettings, s } from '@/lib/settings'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return {
    title: locale === 'ka'
      ? 'პერსონალურ მონაცემთა დამუშავების პოლიტიკა | Strategic Counsel Group'
      : 'Personal Data Processing Policy | Strategic Counsel Group',
  }
}

export default async function PrivacyPolicyPage() {
  noStore()
  const locale = await getLocale()
  const settings = await getSettings()

  const content = s(settings, 'page.privacyPolicy', locale)
  // s() returns the key itself when the setting is unset — treat that as empty.
  const hasContent = content && !content.startsWith('page.privacyPolicy')

  return (
    <div className="pt-[72px] md:pt-[166px]" style={{ background: 'white' }}>
      <section className="py-[4rem] md:py-[9.1rem] px-4 lg:px-8" style={{ background: 'white' }}>
        <div className="container mx-auto max-w-3xl">
          <div className="w-6 h-[1px] bg-gold mb-3" />
          <h1 className="font-heading mb-8" style={{ fontSize: 'var(--typo-sectionTitle-size, 2.25rem)', color: 'var(--typo-sectionTitle-color, #1C122C)', fontFamily: 'var(--typo-sectionTitle-font)' }}>
            {locale === 'ka' ? 'პერსონალურ მონაცემთა დამუშავების პოლიტიკა' : 'Personal Data Processing Policy'}
          </h1>
          {hasContent ? (
            <RichText
              html={content}
              as="div"
              className="text-navy text-[0.95rem] md:text-lg leading-relaxed text-justify [&_p]:mb-4 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:mt-8 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4"
            />
          ) : (
            <p className="text-secondary text-[0.95rem] md:text-lg leading-relaxed">
              {locale === 'ka'
                ? 'ტექსტი მალე დაემატება.'
                : 'Content coming soon.'}
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
