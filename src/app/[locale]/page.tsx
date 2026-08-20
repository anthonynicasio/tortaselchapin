import { buildMetadata } from '@/lib/seo';
import { getContent } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { JsonLd, buildOrganizationSchema } from '@/lib/structured-data';
import { Hero } from '@/components/sections/Hero';
import { MenuFavoritesSection } from '@/components/sections/MenuFavoritesSection';
import { MadeFreshSection } from '@/components/sections/MadeFreshSection';
import { LocationsSection } from '@/components/sections/LocationsSection';
import { FinalCtaSection } from '@/components/sections/FinalCtaSection';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const content = getContent(locale);
  return buildMetadata({
    locale,
    path: `/${locale}`,
    alternatePaths: { es: '/es', en: '/en' },
    description: content.meta.defaultDescription,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const content = getContent(locale);

  return (
    <>
      <JsonLd data={buildOrganizationSchema(locale)} />
      <Hero locale={locale} content={content} />
      <MenuFavoritesSection locale={locale} content={content} />
      <MadeFreshSection locale={locale} content={content} />
      <LocationsSection locale={locale} content={content} />
      <FinalCtaSection locale={locale} content={content} />
    </>
  );
}
