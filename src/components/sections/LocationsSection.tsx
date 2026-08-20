import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container, SectionHeading } from '@/components/ui/Container';
import { PinIcon, PhoneIcon, StoreIcon } from '@/components/ui/Icons';
import type { Content } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { business } from '@content/shared/business';
import { locations } from '@content/shared/locations';

type LocationsSectionProps = {
  locale: Locale;
  content: Content;
};

export function LocationsSection({ locale, content }: LocationsSectionProps) {
  const mapSrc =
    'https://maps.google.com/maps?q=Tortas+El+Chapin+Silver+Spring+Hyattsville&ll=38.98,-76.96&z=11&output=embed';

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
              <article key={loc.id} className="rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red text-white">
                    <StoreIcon className="h-6 w-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-2xl text-black">{loc.name[locale]}</h3>
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

          <div className="min-h-[360px] overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] lg:min-h-full">
            <iframe
              title={content.a11y.mapEmbed}
              src={mapSrc}
              className="h-full min-h-[360px] w-full border-0 grayscale-[20%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
