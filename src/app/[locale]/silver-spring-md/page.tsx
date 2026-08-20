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
  const location = getLocationBySlug('silver-spring-md');
  if (!location) return {};
  const seo = locationSeoCopy['silver-spring'][locale];
  return buildMetadata({
    locale,
    title: `Tortas El Chapín — ${location.name[locale]}`,
    description: seo.metaDescription,
    path: `/${locale}/silver-spring-md`,
    alternatePaths: {
      es: '/es/silver-spring-md',
      en: '/en/silver-spring-md',
    },
  });
}

export default async function SilverSpringPage({ params }: Props) {
  const { locale } = await params;
  const location = getLocationBySlug('silver-spring-md');
  if (!location) notFound();

  const content = getContent(locale);
  const seo = locationSeoCopy['silver-spring'][locale];

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
