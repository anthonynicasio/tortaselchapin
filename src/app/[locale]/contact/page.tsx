import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { getContent } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { pageSlugs } from '@/lib/locale';
import { Container, SectionHeading } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { LocationsSection } from '@/components/sections/LocationsSection';
import { business } from '@content/shared/business';
import { social } from '@content/shared/social';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const content = getContent(locale);
  const slug = pageSlugs[locale].contact;
  return buildMetadata({
    locale,
    title: content.contactPage.title,
    description: content.contactPage.metaDescription,
    path: `/${locale}/${slug}`,
    alternatePaths: {
      es: '/es/contacto',
      en: '/en/contact',
    },
  });
}

export default async function ContactPageEn({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  const content = getContent(locale);

  return (
    <>
      <section className="bg-black pt-page pb-8">
        <Container>
          <SectionHeading as="h1" className="text-cream">
            {content.contactPage.heading}
          </SectionHeading>
          <p className="mt-4 max-w-2xl text-lg text-cream/70">
            {content.contactPage.subheading}
          </p>
        </Container>
      </section>

      <section className="bg-cream py-16">
        <Container>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="rounded-xl bg-cream-dark p-6 text-center sm:p-8">
              <h2 className="font-display text-xl font-bold">{content.contactPage.callUs}</h2>
              <p className="mt-4">
                <a
                  href={business.phoneHref}
                  className="text-xl font-bold break-all text-red transition-colors hover:text-red-hover sm:text-2xl"
                >
                  {business.phone}
                </a>
              </p>
              <Button href={business.phoneHref} variant="primary" size="md" className="mt-6 w-full">
                {content.locations.call}
              </Button>
            </div>

            <div className="rounded-xl bg-cream-dark p-6 text-center sm:p-8">
              <h2 className="font-display text-xl font-bold">{content.contactPage.visitUs}</h2>
              <p className="mt-4 text-gray">{content.contactPage.subheading}</p>
            </div>

            <div className="rounded-xl bg-cream-dark p-6 text-center sm:p-8">
              <h2 className="font-display text-xl font-bold">{content.contactPage.followUs}</h2>
              <div className="mt-4 space-y-2">
                <a
                  href={social.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-semibold text-red transition-colors hover:text-red-hover"
                >
                  TikTok {social.tiktok.handle}
                </a>
                <a
                  href={social.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray transition-colors hover:text-black"
                >
                  Facebook
                </a>
                <a
                  href={social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray transition-colors hover:text-black"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <LocationsSection locale={locale} content={content} />
    </>
  );
}
