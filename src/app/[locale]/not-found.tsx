import Link from 'next/link';
import { getContent } from '@/lib/content';
import { defaultLocale } from '@/lib/locale';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  const locale = defaultLocale;
  const content = getContent(locale);

  return (
    <section className="flex min-h-[60vh] items-center bg-cream pt-24">
      <Container className="text-center">
        <h1 className="font-display text-4xl font-bold text-black">
          {content.errors.notFound}
        </h1>
        <p className="mt-4 text-lg text-gray">{content.errors.notFoundBody}</p>
        <Button href={`/${locale}`} variant="primary" size="lg" className="mt-8">
          {content.errors.goHome}
        </Button>
      </Container>
    </section>
  );
}
