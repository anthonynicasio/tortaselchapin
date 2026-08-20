import Link from 'next/link';
import type { Locale } from '@/lib/locale';
import { getNavHref } from '@/lib/locale';
import type { Content } from '@/lib/content';
import { business } from '@content/shared/business';
import { defaultDirectionsUrl } from '@content/shared/locations';

type MobileBarProps = {
  locale: Locale;
  content: Content;
};

export function MobileBar({ locale, content }: MobileBarProps) {
  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-white/10 bg-black pb-[env(safe-area-inset-bottom,0px)] md:hidden"
      aria-label={content.a11y.mainNav}
      style={{ minHeight: 'var(--mobile-bar-offset)' }}
    >
      <div className="grid h-16 grid-cols-3">
        <Link
          href={getNavHref(locale, 'menu')}
          className="flex min-h-11 flex-col items-center justify-center gap-1 text-cream/80 transition-colors active:bg-white/5"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="text-[11px] font-semibold sm:text-xs">{content.mobileBar.menu}</span>
        </Link>
        <a
          href={business.phoneHref}
          className="flex min-h-11 flex-col items-center justify-center gap-1 text-gold transition-colors active:bg-white/5"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-[11px] font-semibold sm:text-xs">{content.mobileBar.call}</span>
        </a>
        <a
          href={defaultDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 flex-col items-center justify-center gap-1 bg-red px-1 text-center text-white transition-colors active:bg-red-hover"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-[11px] font-semibold leading-tight sm:text-xs">{content.mobileBar.directions}</span>
        </a>
      </div>
    </nav>
  );
}
