import { Alfa_Slab_One, DM_Sans } from 'next/font/google';

export const alfaSlab = Alfa_Slab_One({
  subsets: ['latin'],
  variable: '--font-alfa',
  display: 'swap',
  weight: '400',
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});
