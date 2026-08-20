import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { MenuListIcon, PinIcon } from '@/components/ui/Icons';
import type { Content } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { getNavHref } from '@/lib/locale';
import { defaultDirectionsUrl } from '@content/shared/locations';

type FinalCtaProps = {
  locale: Locale;
  content: Content;
};

export function FinalCtaSection({ locale, content }: FinalCtaProps) {
  return (
    <section className="bg-black py-16 md:py-20" aria-labelledby="final-cta-heading">
      <Container>
        <div className="max-w-2xl">
          <h2
            id="final-cta-heading"
            className="font-display text-3xl text-balance text-gold sm:text-5xl lg:text-6xl"
          >
            {content.finalCta.heading}
          </h2>
          <p className="mt-4 max-w-md text-lg text-white/75">{content.finalCta.body}</p>
          <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-start">
            <Button href={getNavHref(locale, 'menu')} variant="primary" size="lg" className="w-full sm:w-auto">
              <MenuListIcon className="h-5 w-5" />
              {content.finalCta.viewMenu}
            </Button>
            <Button href={defaultDirectionsUrl} external variant="outlineLight" size="lg" className="w-full sm:w-auto">
              <PinIcon className="h-5 w-5" />
              {content.finalCta.getDirections}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
