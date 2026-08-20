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
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-black">
      <Image
        src="/images/hero-torta.jpg"
        alt={content.hero.imageAlt}
        fill
        priority
        className="object-cover object-[70%_center]"
        sizes="100vw"
      />
      <div className="hero-gradient absolute inset-0" aria-hidden="true" />

      <Container className="relative z-10 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {content.hero.headlineStart}{' '}
            <span className="text-gold">{content.hero.headlineAccent}</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-white/90 sm:text-lg md:mt-6">
            {content.hero.subheadlineStart}{' '}
            <span className="font-bold text-gold">{content.hero.subheadlineAccent}</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <Button href={getNavHref(locale, 'menu')} variant="primary" size="lg">
              <MenuListIcon className="h-5 w-5" />
              {content.hero.viewMenu}
            </Button>
            <Button href={defaultDirectionsUrl} external variant="outlineLight" size="lg">
              <PinIcon className="h-5 w-5" />
              {content.hero.getDirections}
            </Button>
          </div>

          <ul
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-white/80"
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
                className="inline-flex items-center gap-1.5 transition-colors hover:text-gold"
              >
                <TikTokIcon className="h-4 w-4" />
                {content.hero.trustTikTok}
              </a>
            </li>
            <li>
              <a href={business.phoneHref} className="inline-flex items-center gap-1.5 transition-colors hover:text-gold">
                <PhoneIcon className="h-4 w-4" />
                {business.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <PinIcon className="h-4 w-4 text-gold" />
              {content.hero.trustLocations}
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
