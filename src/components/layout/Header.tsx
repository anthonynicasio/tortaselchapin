'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { PinIcon } from '@/components/ui/Icons';
import type { Locale } from '@/lib/locale';
import { getNavHref, headerNavRoutes, navRoutes } from '@/lib/locale';
import type { Content } from '@/lib/content';
import { defaultDirectionsUrl } from '@content/shared/locations';
import { cn } from '@/lib/utils';

type HeaderProps = {
  locale: Locale;
  content: Content;
};

export function Header({ locale, content }: HeaderProps) {
  const pathname = usePathname();
  const currentSlug = pathname.split('/').slice(2).join('/');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLabels: Record<string, string> = {
    home: content.nav.home,
    menu: content.nav.menu,
    locations: content.nav.locations,
    about: content.nav.about,
    contact: content.nav.contact,
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 left-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300',
          scrolled || menuOpen ? 'bg-black/95 shadow-lg backdrop-blur-md' : 'bg-transparent'
        )}
      >
        <Container as="nav" aria-label={content.a11y.mainNav}>
          <div className="flex h-[var(--header-height)] items-center justify-between gap-2 sm:gap-4">
            <Logo className="shrink-0" locale={locale} size="sm" />

            <ul className="hidden items-center gap-8 md:flex">
              {headerNavRoutes.map(({ key, labelKey }) => {
                const href = getNavHref(locale, key);
                const isActive =
                  (key === 'home' && currentSlug === '') ||
                  (key !== 'home' && getNavHref(locale, key).endsWith(`/${currentSlug}`));
                return (
                  <li key={key}>
                    <Link
                      href={href}
                      className={cn(
                        'text-sm font-medium tracking-wide text-white/90 transition-colors hover:text-gold',
                        isActive && 'text-gold'
                      )}
                    >
                      {navLabels[labelKey]}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-1 sm:gap-3">
              <LanguageSwitcher
                locale={locale}
                currentSlug={currentSlug}
                content={content}
              />
              <Button
                href={defaultDirectionsUrl}
                external
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex"
              >
                <PinIcon className="h-4 w-4" />
                {content.nav.getDirections}
              </Button>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-white md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? content.a11y.closeMenu : content.a11y.openMenu}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 overflow-y-auto bg-black/95 pt-[var(--header-offset)] pb-[var(--mobile-bar-offset)] md:hidden">
          <nav className="flex flex-col gap-1 p-6" aria-label={content.a11y.mainNav}>
            {navRoutes.map(({ key, labelKey }) => (
              <Link
                key={key}
                href={getNavHref(locale, key)}
                className="rounded-lg px-4 py-4 text-xl font-semibold text-white hover:bg-white/5"
                onClick={() => setMenuOpen(false)}
              >
                {navLabels[labelKey]}
              </Link>
            ))}
            <Button
              href={defaultDirectionsUrl}
              external
              variant="primary"
              size="lg"
              className="mt-4 w-full"
            >
              <PinIcon className="h-4 w-4" />
              {content.nav.getDirections}
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}
