'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Container, SectionHeading } from '@/components/ui/Container';
import { VideoModal } from '@/components/ui/VideoPlayer';
import { PlayIcon, TikTokIcon, ArrowRightIcon } from '@/components/ui/Icons';
import type { Content } from '@/lib/content';
import type { Locale } from '@/lib/locale';
import { social } from '@content/shared/social';
import { socialVideos, type VideoItem } from '@content/shared/videos';
import { cn } from '@/lib/utils';

type MadeFreshSectionProps = {
  locale: Locale;
  content: Content;
};

export function MadeFreshSection({ locale, content }: MadeFreshSectionProps) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [featured, ...rest] = socialVideos;
  const sideVideos = rest.slice(0, 3);

  if (!featured) return null;

  return (
    <>
      <section className="bg-black py-16 md:py-24" aria-labelledby="made-fresh-heading">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <SectionHeading id="made-fresh-heading" className="text-white">
                {content.socialProof.heading}
              </SectionHeading>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
                {content.socialProof.subheading}
              </p>
              <a
                href={social.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 text-white transition-colors hover:text-gold"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <TikTokIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold">{social.tiktok.handle}</span>
                  <span className="text-sm text-white/60">
                    {social.tiktok.followers} {content.socialProof.followersLabel}
                  </span>
                </span>
                <ArrowRightIcon className="h-4 w-4 text-gold" />
              </a>
            </div>

            <div className="grid grid-cols-[1.4fr_0.7fr] gap-3">
              <VideoThumb
                video={featured}
                locale={locale}
                content={content}
                onPlay={setActiveVideo}
                featured
              />
              <div className="grid gap-3">
                {sideVideos.map((video) => (
                  <VideoThumb
                    key={video.id}
                    video={video}
                    locale={locale}
                    content={content}
                    onPlay={setActiveVideo}
                  />
                ))}
              </div>
            </div>
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

function VideoThumb({
  video,
  locale,
  content,
  onPlay,
  featured = false,
}: {
  video: VideoItem;
  locale: Locale;
  content: Content;
  onPlay: (video: VideoItem) => void;
  featured?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onPlay(video)}
      className={cn(
        'group relative overflow-hidden rounded-xl bg-black text-left',
        featured ? 'aspect-[4/5] sm:aspect-[3/4]' : 'aspect-[9/16]'
      )}
      aria-label={`${content.a11y.playVideo}: ${video.title[locale]}`}
    >
      <Image
        src={video.thumbnail}
        alt={video.thumbnailAlt[locale]}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes={featured ? '(max-width: 1024px) 60vw, 360px' : '140px'}
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-3">
        <p className={cn('font-medium text-white', featured ? 'text-sm' : 'text-[11px]')}>
          {video.title[locale]}
        </p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            'flex items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm',
            featured ? 'h-14 w-14' : 'h-8 w-8'
          )}
        >
          <PlayIcon className={featured ? 'ml-0.5 h-6 w-6' : 'ml-0.5 h-3.5 w-3.5'} />
        </span>
      </div>
    </button>
  );
}
