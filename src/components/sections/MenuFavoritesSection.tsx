import { Button } from '@/components/ui/Button';
import { Container, SectionHeading } from '@/components/ui/Container';
import { ArrowRightIcon } from '@/components/ui/Icons';
import type { Content } from '@/lib/content';
import { formatPrice } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { getNavHref } from '@/lib/locale';
import { getFeaturedItems } from '@content/shared/menu';

type MenuFavoritesProps = {
  locale: Locale;
  content: Content;
};

export function MenuFavoritesSection({ locale, content }: MenuFavoritesProps) {
  const items = getFeaturedItems().slice(0, 6);

  return (
    <section className="bg-cream py-16 md:py-24" aria-labelledby="menu-favorites-heading">
      <Container>
        <div className="mb-10 text-center md:mb-14">
          <SectionHeading id="menu-favorites-heading">
            {content.menuFavorites.heading}
          </SectionHeading>
          <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-red" aria-hidden="true" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {items.map((item) => {
            const price = formatPrice(item.price, locale);
            return (
              <article
                key={item.id}
                className="rounded-xl bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
              >
                <h3 className="text-base font-bold text-black">{item.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray">
                  {item.description[locale]}
                </p>
                <p className="mt-3 text-sm font-bold text-red">
                  {price ?? content.menuFavorites.priceTbd}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button href={getNavHref(locale, 'menu')} variant="primary" size="lg">
            {content.menuFavorites.viewAll}
            <ArrowRightIcon className="h-5 w-5" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
