'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/locale';
import { getLocalizedPath } from '@/lib/locale';
import type { Content } from '@/lib/content';
import { cn } from '@/lib/utils';

type LanguageSwitcherProps = {
  locale: Locale;
  currentSlug: string;
  content: Content;
  variant?: 'header' | 'footer';
};

export function LanguageSwitcher({
  locale,
  currentSlug,
  content,
  variant = 'header',
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const slug = pathname.split('/').slice(2).join('/') || '';

  const esPath = getLocalizedPath('es', locale, slug || currentSlug);
  const enPath = getLocalizedPath('en', locale, slug || currentSlug);

  const baseClasses =
    variant === 'header'
      ? 'text-sm font-medium'
      : 'text-sm font-medium text-cream/70';

  return (
    <nav aria-label={content.a11y.languageSelector} className="flex items-center gap-1">
      <Link
        href={esPath}
        className={cn(
          baseClasses,
          'rounded-sm px-2 py-1 transition-colors hover:text-gold',
          locale === 'es' ? 'text-gold' : 'text-white/55'
        )}
        aria-current={locale === 'es' ? 'true' : undefined}
        lang="es"
      >
        ES
      </Link>
      <span className="text-cream/30" aria-hidden="true">
        |
      </span>
      <Link
        href={enPath}
        className={cn(
          baseClasses,
          'rounded-sm px-2 py-1 transition-colors hover:text-gold',
          locale === 'en' ? 'text-gold' : 'text-white/55'
        )}
        aria-current={locale === 'en' ? 'true' : undefined}
        lang="en"
      >
        EN
      </Link>
    </nav>
  );
}
