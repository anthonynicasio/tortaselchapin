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
    if (hash && categories.includes(hash)) {
      setActiveCategory(hash);
    }
  }, [categories]);

  const scrollToCategory = (cat: MenuCategory) => {
    setActiveCategory(cat);
    const el = document.getElementById(cat);
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Sticky category nav */}
      <nav
        className="sticky top-16 z-30 border-b border-black/10 bg-cream/95 backdrop-blur-md"
        aria-label={content.menuPage.categoryNav}
      >
        <Container>
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => scrollToCategory(cat)}
                className={`shrink-0 rounded-sm px-4 py-2 text-sm font-semibold transition-colors ${
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
            <section key={cat} id={cat} className="mb-16 scroll-mt-32">
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
