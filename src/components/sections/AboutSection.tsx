import { Container, SectionHeading } from '@/components/ui/Container';
import type { Content } from '@/lib/content';

type AboutSectionProps = {
  content: Content;
};

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section className="relative overflow-hidden bg-cream-dark py-16 md:py-24" aria-labelledby="about-heading">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading id="about-heading" className="text-balance">
            {content.about.heading}
          </SectionHeading>
          <p className="mt-6 text-lg leading-relaxed text-gray">
            {content.about.body}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray">
            {content.about.body2}
          </p>
        </div>
      </Container>
      {/* Decorative griddle line */}
      <div
        className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
