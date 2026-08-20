import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { alfaSlab, dmSans } from '@/lib/fonts';
import { isValidLocale, type Locale } from '@/lib/locale';
import { getContent } from '@/lib/content';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileBar } from '@/components/layout/MobileBar';
import { cn } from '@/lib/utils';
import '../globals.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};
  const content = getContent(localeParam);
  return {
    title: content.meta.defaultTitle,
    description: content.meta.defaultDescription,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const content = getContent(locale);

  return (
    <html lang={locale} className={cn(alfaSlab.variable, dmSans.variable)}>
      <body className="pb-mobile-bar font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-sm focus:bg-gold focus:px-4 focus:py-2 focus:text-black focus:outline-none"
        >
          {content.a11y.skipToContent}
        </a>
        <Header locale={locale} content={content} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} content={content} />
        <MobileBar locale={locale} content={content} />
      </body>
    </html>
  );
}
