'use client';

import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { VideoItem } from '@content/shared/videos';
import type { Content } from '@/lib/content';
import { cn } from '@/lib/utils';

type VideoModalProps = {
  video: VideoItem | null;
  locale: 'es' | 'en';
  content: Content;
  onClose: () => void;
};

export function VideoModal({ video, locale, content, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!video) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [video, handleClose]);

  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.src = video.videoSrc;
      videoRef.current.load();
    }
  }, [video]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 pt-[calc(1rem+env(safe-area-inset-top,0px))] pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
      role="dialog"
      aria-modal="true"
      aria-label={video.title[locale]}
      onClick={handleClose}
    >
      <div
        className="relative flex max-h-full w-full max-w-sm flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={handleClose}
          className="mb-3 ml-auto flex h-11 w-11 items-center justify-center rounded-lg text-cream transition-colors hover:bg-white/10"
          aria-label={content.a11y.closeVideo}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="min-h-0 overflow-hidden rounded-xl bg-black shadow-2xl">
          <video
            ref={videoRef}
            className="max-h-[min(70dvh,calc(100dvh-10rem))] w-full bg-black object-contain"
            controls
            playsInline
            preload="none"
            poster={video.thumbnail}
          >
            <track kind="captions" />
          </video>
        </div>

        <p className="mt-3 text-center text-sm font-medium text-cream">
          {video.title[locale]}
        </p>

        {video.tiktokUrl && (
          <p className="mt-2 text-center">
            <a
              href={video.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-gold transition-colors hover:text-gold-light"
            >
              TikTok →
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

type VideoCardProps = {
  video: VideoItem;
  locale: 'es' | 'en';
  content: Content;
  onPlay: (video: VideoItem) => void;
  className?: string;
};

export function VideoCard({ video, locale, content, onPlay, className }: VideoCardProps) {
  return (
    <button
      type="button"
      onClick={() => onPlay(video)}
      className={cn(
        'group relative w-[min(42vw,200px)] shrink-0 snap-start overflow-hidden rounded-sm text-left sm:w-[220px]',
        className
      )}
      aria-label={`${content.a11y.playVideo}: ${video.title[locale]}`}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-black">
        <Image
          src={video.thumbnail}
          alt={video.thumbnailAlt[locale]}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="220px"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-cream backdrop-blur-sm transition-transform group-hover:scale-110">
            <svg className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium text-black">{video.title[locale]}</p>
    </button>
  );
}
