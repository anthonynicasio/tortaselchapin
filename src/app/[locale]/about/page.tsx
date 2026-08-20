import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { getContent } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { pageSlugs } from '@/lib/locale';
import { Container, SectionHeading } from '@/components/ui/Container';
import { AboutSection } from '@/components/sections/AboutSection';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const content = getContent(locale);
  const slug = pageSlugs[locale].about;
  return buildMetadata({
    locale,
    title: content.aboutPage.title,
    description: content.aboutPage.metaDescription,
    path: `/${locale}/${slug}`,
    alternatePaths: {
      es: '/es/nosotros',
      en: '/en/about',
    },
  });
}

export default async function AboutPageEn({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  const content = getContent(locale);

  return (
    <>
      <section className="bg-black pt-page pb-8">
        <Container>
          <SectionHeading as="h1" className="text-cream">
            {content.aboutPage.heading}
          </SectionHeading>
        </Container>
      </section>
      <AboutSection content={content} />
      <section className="bg-cream py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {content.aboutPage.values.map((value) => (
              <div key={value.title} className="rounded-sm bg-cream-dark p-6">
                <h2 className="font-display text-xl font-bold text-black">{value.title}</h2>
                <p className="mt-3 text-gray">{value.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
