import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { getContent } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { getLocationBySlug } from '@content/shared/locations';
import { locationSeoCopy } from '@content/shared/location-seo';
import { LocationPageContent } from '@/components/pages/LocationPageContent';
import { JsonLd, buildLocalBusinessSchema } from '@/lib/structured-data';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const location = getLocationBySlug('hyattsville-md');
  if (!location) return {};
  const seo = locationSeoCopy['hyattsville'][locale];
  return buildMetadata({
    locale,
    title: `Tortas El Chapín — ${location.name[locale]}`,
    description: seo.metaDescription,
    path: `/${locale}/hyattsville-md`,
    alternatePaths: {
      es: '/es/hyattsville-md',
      en: '/en/hyattsville-md',
    },
  });
}

export default async function HyattsvillePage({ params }: Props) {
  const { locale } = await params;
  const location = getLocationBySlug('hyattsville-md');
  if (!location) notFound();

  const content = getContent(locale);
  const seo = locationSeoCopy['hyattsville'][locale];

  return (
    <>
      <JsonLd data={buildLocalBusinessSchema(location, locale)} />
      <LocationPageContent
        locale={locale}
        content={content}
        location={location}
        intro={seo.intro}
      />
    </>
  );
}
