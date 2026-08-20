import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { MenuListIcon, PinIcon, PhoneIcon, TikTokIcon, Stars } from '@/components/ui/Icons';
import type { Content } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { getNavHref } from '@/lib/locale';
import { business } from '@content/shared/business';
import { defaultDirectionsUrl } from '@content/shared/locations';
import { social } from '@content/shared/social';

type HeroProps = {
  locale: Locale;
  content: Content;
};

export function Hero({ locale, content }: HeroProps) {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-black sm:items-center">
      <Image
        src="/images/hero-torta.jpg"
        alt={content.hero.imageAlt}
        fill
        priority
        className="object-cover object-[60%_center] sm:object-[70%_center]"
        sizes="100vw"
      />
      <div className="hero-gradient absolute inset-0" aria-hidden="true" />

      <Container className="relative z-10 pt-[calc(var(--header-offset)+1.25rem)] pb-[calc(var(--mobile-bar-offset)+1.5rem)] md:pt-32 md:pb-24">
        <div className="max-w-2xl">
          <h1 className="font-display text-[2.15rem] leading-[1.12] text-balance text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {content.hero.headlineStart}{' '}
            <span className="text-gold">{content.hero.headlineAccent}</span>
          </h1>
          <p className="mt-4 max-w-lg text-base text-pretty text-white/90 sm:mt-5 sm:text-lg md:mt-6">
            {content.hero.subheadlineStart}{' '}
            <span className="font-bold text-gold">{content.hero.subheadlineAccent}</span>
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href={getNavHref(locale, 'menu')} variant="primary" size="lg" className="w-full sm:w-auto">
              <MenuListIcon className="h-5 w-5" />
              {content.hero.viewMenu}
            </Button>
            <Button
              href={defaultDirectionsUrl}
              external
              variant="outlineLight"
              size="lg"
              className="w-full sm:w-auto"
            >
              <PinIcon className="h-5 w-5" />
              {content.hero.getDirections}
            </Button>
          </div>

          <ul
            className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-white/80 sm:mt-10 sm:gap-x-5 sm:gap-y-3"
            aria-label={content.a11y.rating}
          >
            <li>
              <Stars />
            </li>
            <li>
              <a
                href={social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-gold"
              >
                <TikTokIcon className="h-4 w-4" />
                {content.hero.trustTikTok}
              </a>
            </li>
            <li>
              <a
                href={business.phoneHref}
                className="inline-flex min-h-11 items-center gap-1.5 transition-colors hover:text-gold"
              >
                <PhoneIcon className="h-4 w-4" />
                {business.phone}
              </a>
            </li>
            <li className="inline-flex min-h-11 items-center gap-1.5">
              <PinIcon className="h-4 w-4 shrink-0 text-gold" />
              {content.hero.trustLocations}
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
