export type MenuCategory =
  | 'tortas'
  | 'shukos'
  | 'tacos'
  | 'carne-asada'
  | 'pollo'
  | 'mixtas'
  | 'quesadillas'
  | 'sides'
  | 'drinks';

export type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string; // Authentic dish name — same in both languages when appropriate
  description: {
    es: string;
    en: string;
  };
  image: string;
  imageAlt: {
    es: string;
    en: string;
  };
  /** null = price not yet confirmed — do not display fabricated prices */
  price: number | null;
  featured: boolean;
  available: boolean;
};

export const menuCategories: MenuCategory[] = [
  'tortas',
  'shukos',
  'tacos',
  'carne-asada',
  'pollo',
  'mixtas',
  'quesadillas',
  'sides',
  'drinks',
];

export const menuItems: MenuItem[] = [
  {
    id: 'torta-mixta',
    category: 'tortas',
    name: 'Torta Mixta',
    description: {
      es: 'Nuestra torta más popular. Pan tostado en la plancha con carne, queso y vegetales frescos.',
      en: 'Our most popular torta. Griddle-toasted bread with meat, cheese and fresh vegetables.',
    },
    image: '/images/menu/torta-mixta.jpg',
    imageAlt: {
      es: 'Torta Mixta recién preparada con carne asada, queso derretido y vegetales',
      en: 'Freshly prepared Torta Mixta with grilled steak, melted cheese and vegetables',
    },
    price: null,
    featured: true,
    available: true,
  },
  {
    id: 'shuko-especial',
    category: 'shukos',
    name: 'Shuko Especial',
    description: {
      es: 'Pan salvadoreño con carne a la plancha, repollo, salsa y todos los extras.',
      en: 'Salvadoran-style bun with griddled meat, cabbage, sauce and all the fixings.',
    },
    image: '/images/menu/shuko-especial.jpg',
    imageAlt: {
      es: 'Shuko Especial con carne a la plancha y vegetales frescos',
      en: 'Shuko Especial with griddled meat and fresh toppings',
    },
    price: null,
    featured: true,
    available: true,
  },
  {
    id: 'tacos-asada',
    category: 'tacos',
    name: 'Tacos de Asada',
    description: {
      es: 'Tacos de carne asada recién hechos con tortilla caliente y cilantro.',
      en: 'Freshly made grilled steak tacos with warm tortilla and cilantro.',
    },
    image: '/images/menu/tacos-asada.jpg',
    imageAlt: {
      es: 'Tacos de carne asada con cilantro y cebolla',
      en: 'Grilled steak tacos with cilantro and onion',
    },
    price: null,
    featured: true,
    available: true,
  },
  {
    id: 'pollo-papas',
    category: 'pollo',
    name: 'Pollo con Papas',
    description: {
      es: 'Pollo a la plancha servido con papas fritas crujientes.',
      en: 'Griddled chicken served with crispy fries.',
    },
    image: '/images/menu/pollo-papas.jpg',
    imageAlt: {
      es: 'Pollo con papas fritas recién preparado',
      en: 'Freshly prepared chicken with crispy fries',
    },
    price: null,
    featured: true,
    available: true,
  },
  {
    id: 'mixta',
    category: 'mixtas',
    name: 'Mixta',
    description: {
      es: 'Combinación de sabores chapines con carne, queso y vegetales a la plancha.',
      en: 'A combination of Guatemalan flavors with griddled meat, cheese and vegetables.',
    },
    image: '/images/menu/mixta.jpg',
    imageAlt: {
      es: 'Mixta con carne a la plancha y queso derretido',
      en: 'Mixta with griddled meat and melted cheese',
    },
    price: null,
    featured: false,
    available: true,
  },
  {
    id: 'quesadilla',
    category: 'quesadillas',
    name: 'Quesadilla',
    description: {
      es: 'Tortilla de maíz con queso derretido y tu proteína favorita.',
      en: 'Corn tortilla with melted cheese and your choice of protein.',
    },
    image: '/images/menu/quesadilla.jpg',
    imageAlt: {
      es: 'Quesadilla con queso derretido recién hecha',
      en: 'Freshly made quesadilla with melted cheese',
    },
    price: null,
    featured: true,
    available: true,
  },
  {
    id: 'torta-asada',
    category: 'tortas',
    name: 'Torta de Asada',
    description: {
      es: 'Torta con carne asada a la plancha, aguacate, queso y salsa de la casa.',
      en: 'Torta with griddled steak, avocado, cheese and house sauce.',
    },
    image: '/images/menu/torta-asada.jpg',
    imageAlt: {
      es: 'Torta de carne asada con aguacate y queso',
      en: 'Steak torta with avocado and cheese',
    },
    price: null,
    featured: false,
    available: true,
  },
  {
    id: 'shuko-clasico',
    category: 'shukos',
    name: 'Shuko Clásico',
    description: {
      es: 'El clásico shuko chapino con carne, repollo y salsa especial.',
      en: 'The classic Guatemalan shuko with meat, cabbage and special sauce.',
    },
    image: '/images/menu/shuko-clasico.jpg',
    imageAlt: {
      es: 'Shuko clásico con carne y repollo',
      en: 'Classic shuko with meat and cabbage',
    },
    price: null,
    featured: false,
    available: true,
  },
  {
    id: 'carne-asada-plato',
    category: 'carne-asada',
    name: 'Carne Asada',
    description: {
      es: 'Carne asada a la plancha con arroz, frijoles y tortillas.',
      en: 'Griddled steak plate with rice, beans and tortillas.',
    },
    image: '/images/menu/carne-asada.jpg',
    imageAlt: {
      es: 'Plato de carne asada con arroz y frijoles',
      en: 'Grilled steak plate with rice and beans',
    },
    price: null,
    featured: true,
    available: true,
  },
  {
    id: 'papas-fritas',
    category: 'sides',
    name: 'Papas Fritas',
    description: {
      es: 'Papas fritas crujientes, perfectas para acompañar.',
      en: 'Crispy fries, perfect on the side.',
    },
    image: '/images/menu/papas-fritas.jpg',
    imageAlt: {
      es: 'Papas fritas crujientes',
      en: 'Crispy golden fries',
    },
    price: null,
    featured: false,
    available: true,
  },
  {
    id: 'horchata',
    category: 'drinks',
    name: 'Horchata',
    description: {
      es: 'Bebida tradicional refrescante.',
      en: 'Traditional refreshing drink.',
    },
    image: '/images/menu/horchata.jpg',
    imageAlt: {
      es: 'Vaso de horchata fresca',
      en: 'Glass of fresh horchata',
    },
    price: null,
    featured: false,
    available: true,
  },
];

export function getFeaturedItems(): MenuItem[] {
  const featuredIds = [
    'torta-mixta',
    'shuko-especial',
    'tacos-asada',
    'pollo-papas',
    'carne-asada-plato',
    'quesadilla',
  ];
  return featuredIds
    .map((id) => menuItems.find((item) => item.id === id && item.featured && item.available))
    .filter((item): item is MenuItem => Boolean(item));
}

export function getItemsByCategory(category: MenuCategory): MenuItem[] {
  return menuItems.filter((item) => item.category === category && item.available);
}

export function getUsedCategories(): MenuCategory[] {
  const used = new Set(menuItems.filter((i) => i.available).map((i) => i.category));
  return menuCategories.filter((c) => used.has(c));
}
