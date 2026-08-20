import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/locale';
import { Stars } from '@/components/ui/Icons';

const sizes = {
  sm: 'h-11 w-11 sm:h-12 sm:w-12',
  md: 'h-14 w-14 sm:h-16 sm:w-16',
  lg: 'h-20 w-20 sm:h-24 sm:w-24',
};

export function Logo({
  className,
  locale = 'es',
  size = 'sm',
  showWordmark = true,
}: {
  className?: string;
  locale?: Locale;
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}) {
  return (
    <Link
      href={`/${locale}`}
      className={cn('group inline-flex shrink-0 items-center gap-2.5', className)}
      aria-label="Tortas El Chapín"
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={512}
        height={461}
        className={cn(
          'object-contain transition-opacity group-hover:opacity-90',
          sizes[size]
        )}
        priority={size === 'sm'}
      />
      {showWordmark && (
        <span className="hidden flex-col leading-none sm:flex">
          <span className="font-display text-[15px] tracking-tight text-white sm:text-lg">
            Tortas El Chapín
          </span>
          <Stars className="mt-1 text-gold" />
        </span>
      )}
    </Link>
  );
}
