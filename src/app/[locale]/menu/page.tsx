import { buildMetadata } from '@/lib/seo';
import { getContent } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { pageSlugs } from '@/lib/locale';
import { Container, SectionHeading } from '@/components/ui/Container';
import { JsonLd, buildMenuSchema } from '@/lib/structured-data';
import { MenuPageContent } from '@/components/pages/MenuPageContent';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const content = getContent(locale);
  return buildMetadata({
    locale,
    title: content.menuPage.title,
    description: content.menuPage.metaDescription,
    path: `/${locale}/menu`,
    alternatePaths: {
      es: '/es/menu',
      en: '/en/menu',
    },
  });
}

export default async function MenuPage({ params }: Props) {
  const { locale } = await params;
  const content = getContent(locale);

  return (
    <>
      <JsonLd data={buildMenuSchema(locale)} />
      <section className="bg-black pt-page pb-8">
        <Container>
          <SectionHeading as="h1" className="text-cream">
            {content.menuPage.heading}
          </SectionHeading>
          <p className="mt-4 max-w-2xl text-lg text-cream/70">
            {content.menuPage.subheading}
          </p>
        </Container>
      </section>
      <MenuPageContent locale={locale} content={content} />
    </>
  );
}
