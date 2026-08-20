'use client';

import { useState } from 'react';
import { Container, SectionHeading } from '@/components/ui/Container';
import { VideoCard, VideoModal } from '@/components/ui/VideoPlayer';
import type { Content } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { socialVideos, type VideoItem } from '@content/shared/videos';
import { social } from '@content/shared/social';

type SocialVideosProps = {
  locale: Locale;
  content: Content;
  videos?: VideoItem[];
};

export function SocialVideosSection({ locale, content, videos = socialVideos }: SocialVideosProps) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <>
      <section className="bg-cream py-16 md:py-24" aria-labelledby="social-videos-heading">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading id="social-videos-heading">
              {content.socialVideos.heading}
            </SectionHeading>
            <a
              href={social.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-red transition-colors hover:text-red-hover"
            >
              {content.socialVideos.viewProfile} →
            </a>
          </div>

          <div
            className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide"
            aria-label={content.a11y.scrollVideos}
          >
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                locale={locale}
                content={content}
                onPlay={setActiveVideo}
              />
            ))}
          </div>
        </Container>
      </section>

      <VideoModal
        video={activeVideo}
        locale={locale}
        content={content}
        onClose={() => setActiveVideo(null)}
      />
    </>
  );
}
