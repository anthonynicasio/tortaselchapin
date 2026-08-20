import { cn } from '@/lib/utils';

export function Container({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav' | 'main';
}) {
  return (
    <Tag className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </Tag>
  );
}

export function SectionHeading({
  children,
  className,
  id,
  as: Tag = 'h2',
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  return (
    <Tag
      id={id}
      className={cn(
        'font-display text-3xl tracking-tight text-black sm:text-4xl lg:text-[2.75rem]',
        className
      )}
    >
      {children}
    </Tag>
  );
}
