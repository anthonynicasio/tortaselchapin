import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { getContent } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { pageSlugs } from '@/lib/locale';
import { Container, SectionHeading } from '@/components/ui/Container';
import { LocationsSection } from '@/components/sections/LocationsSection';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const content = getContent(locale);
  const slug = pageSlugs[locale].locations;
  return buildMetadata({
    locale,
    title: content.locationsPage.title,
    description: content.locationsPage.metaDescription,
    path: `/${locale}/${slug}`,
    alternatePaths: {
      es: '/es/ubicaciones',
      en: '/en/locations',
    },
  });
}

export default async function LocationsPageEn({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  const content = getContent(locale);

  return (
    <>
      <section className="bg-black pt-24 pb-8 md:pt-28">
        <Container>
          <SectionHeading as="h1" className="text-cream">
            {content.locationsPage.heading}
          </SectionHeading>
          <p className="mt-4 max-w-2xl text-lg text-cream/70">
            {content.locationsPage.subheading}
          </p>
        </Container>
      </section>
      <LocationsSection locale={locale} content={content} />
    </>
  );
}
