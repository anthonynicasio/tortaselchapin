import { Button } from '@/components/ui/Button';
import { Container, SectionHeading } from '@/components/ui/Container';
import type { Content } from '@/lib/content';
import { social } from '@content/shared/social';

type SocialProofProps = {
  content: Content;
};

export function SocialProofSection({ content }: SocialProofProps) {
  return (
    <section className="bg-black py-16 md:py-20" aria-labelledby="social-proof-heading">
      <Container>
        <div className="flex flex-col items-center text-center">
          <SectionHeading id="social-proof-heading" className="text-cream">
            {content.socialProof.heading}
          </SectionHeading>
          <p className="mt-4 max-w-xl text-cream/70">
            {content.socialProof.subheading}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/20">
                <svg className="h-7 w-7 text-gold" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gold">{social.tiktok.followers}</p>
                <p className="text-sm text-cream/60">{content.socialProof.followersLabel}</p>
              </div>
            </div>

            <Button href={social.tiktok.url} external variant="secondary" size="lg">
              {content.socialProof.cta}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
