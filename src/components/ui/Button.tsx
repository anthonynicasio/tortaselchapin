import { cn } from '@/lib/utils';
import Link from 'next/link';
import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'outlineLight' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-red text-white hover:bg-red-hover shadow-md hover:shadow-lg active:scale-[0.98]',
  secondary:
    'bg-gold text-black hover:bg-gold-light shadow-md hover:shadow-lg active:scale-[0.98]',
  outline:
    'border-2 border-black/15 text-black hover:bg-black/5 active:scale-[0.98]',
  outlineLight:
    'border-2 border-gold text-white hover:bg-gold/10 active:scale-[0.98]',
  ghost: 'text-cream hover:bg-white/10 active:scale-[0.98]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2.5 text-sm min-h-11',
  md: 'px-5 py-3 text-base min-h-12 sm:px-6',
  lg: 'px-6 py-3.5 text-base min-h-12 sm:px-8 sm:py-4 sm:text-lg sm:min-h-[52px]',
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, external, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
      variants[variant],
      sizes[size],
      className
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            className={classes}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
