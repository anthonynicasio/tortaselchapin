'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { Logo } from '@/components/ui/Logo';
import { TikTokIcon, FacebookIcon, InstagramIcon } from '@/components/ui/Icons';
import type { Locale } from '@/lib/locale';
import { getNavHref, navRoutes } from '@/lib/locale';
import type { Content } from '@/lib/content';
import { business } from '@content/shared/business';
import { locations } from '@content/shared/locations';
import { social } from '@content/shared/social';

type FooterProps = {
  locale: Locale;
  content: Content;
};

export function Footer({ locale, content }: FooterProps) {
  const pathname = usePathname();
  const currentSlug = pathname.split('/').slice(2).join('/');
  const year = new Date().getFullYear();

  const navLabels: Record<string, string> = {
    home: content.nav.home,
    menu: content.nav.menu,
    locations: content.nav.locations,
    about: content.nav.about,
    contact: content.nav.contact,
  };

  return (
    <footer className="bg-black text-white">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4">
            <Logo locale={locale} size="md" />
            <p className="text-sm text-white/60">{content.footer.tagline}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold">
              {content.footer.links}
            </h3>
            <ul className="space-y-2 text-sm text-white/75">
              {navRoutes.map(({ key, labelKey }) => (
                <li key={key}>
                  <Link href={getNavHref(locale, key)} className="transition-colors hover:text-gold">
                    {navLabels[labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold">
              {content.footer.followUs}
            </h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li>
                <a
                  href={social.tiktok.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gold"
                >
                  <TikTokIcon className="h-4 w-4" />
                  {social.tiktok.handle}
                </a>
              </li>
              <li>
                <a
                  href={social.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gold"
                >
                  <FacebookIcon className="h-4 w-4" />
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-gold"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold">
              {content.footer.contact}
            </h3>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <a href={business.phoneHref} className="hover:text-gold">
                  {business.phone}
                </a>
              </li>
              {locations.map((loc) => (
                <li key={loc.id}>
                  <Link href={`/${locale}/${loc.slug}`} className="hover:text-gold">
                    {loc.name[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold">
              {content.footer.hours}
            </h3>
            <p className="text-sm text-white/75">{locations[0].hoursSummary[locale]}</p>
            <div className="mt-6">
              <LanguageSwitcher
                locale={locale}
                currentSlug={currentSlug}
                content={content}
                variant="footer"
              />
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 bg-[#0a0a0a]">
        <Container className="flex flex-col gap-2 py-4 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. {content.footer.copyright}
          </p>
          <p>{content.footer.legal}</p>
        </Container>
      </div>
    </footer>
  );
}
