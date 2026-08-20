import { Button } from '@/components/ui/Button';
import { Container, SectionHeading } from '@/components/ui/Container';
import type { Content } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { getNavHref } from '@/lib/locale';

type FeaturedTortaProps = {
  locale: Locale;
  content: Content;
};

export function FeaturedTortaSection({ locale, content }: FeaturedTortaProps) {
  return (
    <section className="bg-black py-16 md:py-24" aria-labelledby="featured-torta-heading">
      <Container>
        <div className="max-w-2xl">
          <SectionHeading
            id="featured-torta-heading"
            as="h2"
            className="text-white"
          >
            {content.featuredTorta.headline}
          </SectionHeading>
          <p className="mt-6 text-lg leading-relaxed text-white/75">
            {content.featuredTorta.body}
          </p>
          <Button
            href={getNavHref(locale, 'menu')}
            variant="secondary"
            size="lg"
            className="mt-8"
          >
            {content.featuredTorta.cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}
