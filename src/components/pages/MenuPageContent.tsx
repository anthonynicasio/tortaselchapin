'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import type { Content } from '@/lib/content';
import { formatPrice } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import {
  getUsedCategories,
  getItemsByCategory,
  type MenuCategory,
} from '@content/shared/menu';

type MenuPageContentProps = {
  locale: Locale;
  content: Content;
};

export function MenuPageContent({ locale, content }: MenuPageContentProps) {
  const categories = getUsedCategories();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(categories[0]);

  useEffect(() => {
    const hash = window.location.hash.slice(1) as MenuCategory;
    if (!hash || !categories.includes(hash)) return;

    const el = document.getElementById(hash);
    if (!el) return;

    const offset = 132;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'instant' });
  }, [categories]);

  const scrollToCategory = (cat: MenuCategory) => {
    setActiveCategory(cat);
    const el = document.getElementById(cat);
    if (el) {
      const offset = 132;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Sticky category nav */}
      <nav
        className="sticky top-[var(--header-offset)] z-30 border-b border-black/10 bg-cream/95 backdrop-blur-md"
        aria-label={content.menuPage.categoryNav}
      >
        <Container>
          <div className="-mx-4 flex gap-1 overflow-x-auto px-4 py-2.5 scrollbar-hide sm:mx-0 sm:px-0 sm:py-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => scrollToCategory(cat)}
                className={`min-h-11 shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? 'bg-red text-white'
                    : 'text-black hover:bg-black/5'
                }`}
                aria-current={activeCategory === cat ? 'true' : undefined}
              >
                {content.menuCategories[cat]}
              </button>
            ))}
          </div>
        </Container>
      </nav>

      <Container className="py-12 md:py-16">
        {categories.map((cat) => {
          const items = getItemsByCategory(cat);
          if (items.length === 0) return null;

          return (
            <section key={cat} id={cat} className="mb-16 scroll-mt-[calc(var(--header-offset)+4.5rem)]">
              <h2 className="font-display text-3xl font-bold text-black">
                {content.menuCategories[cat]}
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => {
                  const price = formatPrice(item.price, locale);
                  return (
                    <article
                      key={item.id}
                      className="rounded-xl bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg font-bold">{item.name}</h3>
                        <span className="shrink-0 text-sm font-semibold text-red">
                          {price ?? content.menuPage.priceTbd}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray">
                        {item.description[locale]}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </Container>
    </>
  );
}
