import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container, SectionHeading } from '@/components/ui/Container';
import { PinIcon, PhoneIcon, StoreIcon } from '@/components/ui/Icons';
import type { Content } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { business } from '@content/shared/business';
import { getPrimaryMapEmbedUrl, locations } from '@content/shared/locations';

type LocationsSectionProps = {
  locale: Locale;
  content: Content;
};

export function LocationsSection({ locale, content }: LocationsSectionProps) {
  const mapSrc = getPrimaryMapEmbedUrl();

  return (
    <section className="bg-cream py-16 md:py-24" aria-labelledby="locations-heading">
      <Container>
        <div className="mb-10 text-center md:mb-14">
          <SectionHeading id="locations-heading">{content.locations.heading}</SectionHeading>
          <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-red" aria-hidden="true" />
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-5">
            {locations.map((loc) => (
              <article key={loc.id} className="rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red text-white">
                    <StoreIcon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xl text-black sm:text-2xl">{loc.name[locale]}</h3>
                    <address className="mt-1 not-italic text-sm text-gray">
                      {loc.address.street}
                      <br />
                      {loc.address.city}, {loc.address.state} {loc.address.zip}
                    </address>
                    <p className="mt-2 text-sm text-black/70">{loc.hoursSummary[locale]}</p>
                    <p className="mt-1 text-xs italic text-gray">{content.locations.hoursNote}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button href={loc.directionsUrl} external variant="primary" size="sm">
                        <PinIcon className="h-4 w-4" />
                        {content.locations.getDirections}
                      </Button>
                      <Button href={business.phoneHref} variant="outline" size="sm">
                        <PhoneIcon className="h-4 w-4" />
                        {content.locations.call}
                      </Button>
                    </div>
                    <Link
                      href={`/${locale}/${loc.slug}`}
                      className="mt-3 inline-block text-sm font-semibold text-red hover:text-red-hover"
                    >
                      {content.locations.viewLocation} →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="min-h-[240px] overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:min-h-[360px] lg:min-h-full">
            <iframe
              title={content.a11y.mapEmbed}
              src={mapSrc}
              className="h-full min-h-[240px] w-full max-w-full border-0 grayscale-[20%] sm:min-h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
