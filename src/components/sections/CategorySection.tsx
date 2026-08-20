import Link from 'next/link';
import { Container, SectionHeading } from '@/components/ui/Container';
import type { Content } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { getNavHref } from '@/lib/locale';

type CategorySectionProps = {
  locale: Locale;
  content: Content;
};

export function CategorySection({ locale, content }: CategorySectionProps) {
  return (
    <section className="bg-cream py-16 md:py-24" aria-labelledby="categories-heading">
      <Container>
        <SectionHeading id="categories-heading" className="mb-8 md:mb-12">
          {content.categories.heading}
        </SectionHeading>

        <div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
          role="list"
          aria-label={content.a11y.scrollCategories}
        >
          {content.categories.items.map((cat) => (
            <Link
              key={cat.id}
              href={`${getNavHref(locale, 'menu')}#${cat.id}`}
              className="rounded-xl bg-white px-4 py-6 text-center shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-colors hover:bg-black hover:text-white"
              role="listitem"
            >
              <h3 className="font-display text-xl">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
