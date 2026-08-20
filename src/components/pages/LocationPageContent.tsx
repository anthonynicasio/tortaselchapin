import { Button } from '@/components/ui/Button';
import { Container, SectionHeading } from '@/components/ui/Container';
import type { Content } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { getNavHref } from '@/lib/locale';
import { business } from '@content/shared/business';
import type { Location } from '@content/shared/locations';
import { social } from '@content/shared/social';
import { getVideosForLocation } from '@content/shared/videos';
import { SocialVideosSection } from '@/components/sections/SocialVideosSection';

type LocationPageContentProps = {
  locale: Locale;
  content: Content;
  location: Location;
  /** Unique localized SEO intro copy */
  intro: string;
};

export function LocationPageContent({
  locale,
  content,
  location,
  intro,
}: LocationPageContentProps) {
  const days = content.locations.days;

  return (
    <>
      <section className="bg-black pt-32 pb-12">
        <Container>
          <h1 className="font-display text-4xl text-white sm:text-5xl md:text-6xl">
            Tortas El Chapín — {location.name[locale]}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{intro}</p>
        </Container>
      </section>

      <Container className="py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading as="h2" className="text-2xl sm:text-3xl">
              {location.name[locale]}
            </SectionHeading>
            <address className="mt-4 not-italic text-lg text-gray">
              <p>{location.address.street}</p>
              <p>
                {location.address.city}, {location.address.state} {location.address.zip}
              </p>
            </address>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={location.directionsUrl} external variant="primary" size="md">
                {content.locationPage.directionsCta}
              </Button>
              <Button href={business.phoneHref} variant="secondary" size="md">
                {content.locationPage.callCta}
              </Button>
              <Button href={getNavHref(locale, 'menu')} variant="outline" size="md">
                {content.locationPage.menuCta}
              </Button>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-red">
                {content.locationPage.hoursHeading}
              </h3>
              <ul className="mt-3 space-y-2">
                {location.hours.map((h) => (
                  <li key={h.day} className="flex justify-between text-gray">
                    <span>{days[h.day as keyof typeof days]}</span>
                    <span>
                      {h.closed
                        ? content.locations.closed
                        : `${h.open} – ${h.close}`}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs italic text-gray/70">
                {content.locations.hoursNote}
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-red">
                {content.locationPage.nearbyHeading}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {location.nearbyAreas[locale].map((area) => (
                  <li
                    key={area}
                    className="rounded-sm bg-cream-dark px-3 py-1 text-sm text-gray"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <a
                href={location.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-red transition-colors hover:text-red-hover"
              >
                {content.locationPage.reviewsCta} →
              </a>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-sm shadow-lg">
              <iframe
                title={`${content.a11y.mapEmbed} — ${location.name[locale]}`}
                src={`https://maps.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}&z=15&output=embed`}
                className="aspect-[4/3] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-black transition-colors hover:text-red"
              >
                TikTok {social.tiktok.handle}
              </a>
            </div>
          </div>
        </div>
      </Container>

      {getVideosForLocation(location.id).length > 0 && (
        <SocialVideosSection
          locale={locale}
          content={content}
          videos={getVideosForLocation(location.id)}
        />
      )}
    </>
  );
}
