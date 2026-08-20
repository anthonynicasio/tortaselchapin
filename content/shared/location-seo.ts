import type { Locale } from '@/lib/locale';

export const locationSeoCopy: Record<
  'silver-spring' | 'hyattsville',
  Record<Locale, { intro: string; metaDescription: string }>
> = {
  'silver-spring': {
    es: {
      intro:
        'Comida guatemalteca auténtica en Silver Spring, Maryland. Tortas, shukos y tacos hechos al momento en la plancha, a minutos de Langley Park y Takoma Park.',
      metaDescription:
        'Tortas El Chapín en Silver Spring, MD. Comida chapina, tortas, shukos y tacos en 701 University Blvd E. Horario, direcciones y menú.',
    },
    en: {
      intro:
        'Authentic Guatemalan food in Silver Spring, Maryland. Tortas, shukos and tacos made fresh on the griddle, minutes from Langley Park and Takoma Park.',
      metaDescription:
        'Tortas El Chapín in Silver Spring, MD. Guatemalan tortas, shukos and tacos at 701 University Blvd E. Hours, directions and menu.',
    },
  },
  hyattsville: {
    es: {
      intro:
        'Sabor chapino en Hyattsville, Maryland. Visítanos en Merrimac Dr para tortas, shukos y tacos recién preparados, cerca de Riverdale Park y College Park.',
      metaDescription:
        'Tortas El Chapín en Hyattsville, MD. Comida guatemalteca en 1409 Merrimac Dr. Tortas, shukos, tacos. Horario y direcciones.',
    },
    en: {
      intro:
        'Guatemalan flavor in Hyattsville, Maryland. Visit us on Merrimac Dr for freshly prepared tortas, shukos and tacos, near Riverdale Park and College Park.',
      metaDescription:
        'Tortas El Chapín in Hyattsville, MD. Guatemalan food at 1409 Merrimac Dr. Tortas, shukos, tacos. Hours and directions.',
    },
  },
};
