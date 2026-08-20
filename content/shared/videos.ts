export type VideoItem = {
  id: string;
  thumbnail: string;
  thumbnailAlt: {
    es: string;
    en: string;
  };
  /** Local video file in /public/videos/ */
  videoSrc: string;
  /** Optional TikTok link for the same or related content */
  tiktokUrl?: string;
  title: {
    es: string;
    en: string;
  };
  /** Optional location association for location pages */
  locationId?: 'silver-spring' | 'hyattsville';
};

export const socialVideos: VideoItem[] = [
  {
    id: 'griddle-1',
    thumbnail: '/images/videos/griddle-1.jpg',
    videoSrc: '/videos/griddle-1.mp4',
    thumbnailAlt: {
      es: 'Carne y comida cocinándose en la plancha de Tortas El Chapín',
      en: 'Meat and food sizzling on the Tortas El Chapín griddle',
    },
    tiktokUrl: 'https://www.tiktok.com/@tortaselchapin',
    title: {
      es: 'En la plancha',
      en: 'On the griddle',
    },
  },
  {
    id: 'griddle-2',
    thumbnail: '/images/videos/griddle-2.jpg',
    videoSrc: '/videos/griddle-2.mp4',
    thumbnailAlt: {
      es: 'Preparación de comida chapina en la plancha',
      en: 'Guatemalan food being prepared on the griddle',
    },
    tiktokUrl: 'https://www.tiktok.com/@tortaselchapin',
    title: {
      es: 'Hecho al momento',
      en: 'Made fresh to order',
    },
  },
  {
    id: 'ready-to-serve',
    thumbnail: '/images/videos/ready-to-serve.jpg',
    videoSrc: '/videos/ready-to-serve.mp4',
    thumbnailAlt: {
      es: 'Tortas El Chapín listos para servir en Silver Spring',
      en: 'Tortas El Chapín ready to serve in Silver Spring',
    },
    locationId: 'silver-spring',
    title: {
      es: 'Listos para servirte',
      en: 'Ready to serve you',
    },
  },
  {
    id: 'silver-spring-location',
    thumbnail: '/images/videos/silver-spring-location.jpg',
    videoSrc: '/videos/silver-spring-location.mp4',
    thumbnailAlt: {
      es: 'Ubicación de Tortas El Chapín en University Blvd E, Silver Spring',
      en: 'Tortas El Chapín location on University Blvd E, Silver Spring',
    },
    locationId: 'silver-spring',
    title: {
      es: 'Silver Spring',
      en: 'Silver Spring',
    },
  },
  {
    id: 'silver-spring-hours',
    thumbnail: '/images/videos/silver-spring-hours.jpg',
    videoSrc: '/videos/silver-spring-hours.mp4',
    thumbnailAlt: {
      es: 'Horario y ubicación en Silver Spring, Maryland',
      en: 'Hours and location in Silver Spring, Maryland',
    },
    locationId: 'silver-spring',
    title: {
      es: 'Horario Silver Spring',
      en: 'Silver Spring hours',
    },
  },
  {
    id: 'both-locations',
    thumbnail: '/images/videos/both-locations.jpg',
    videoSrc: '/videos/both-locations.mp4',
    thumbnailAlt: {
      es: 'Ubicaciones en Merrimac Dr Hyattsville y University Blvd E Silver Spring',
      en: 'Locations on Merrimac Dr Hyattsville and University Blvd E Silver Spring',
    },
    title: {
      es: 'Nuestras ubicaciones',
      en: 'Our locations',
    },
  },
];

export function getVideosForLocation(locationId: 'silver-spring' | 'hyattsville'): VideoItem[] {
  return socialVideos.filter(
    (v) => v.locationId === locationId || v.id === 'both-locations'
  );
}

export type FoodCategory = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  href: string;
};
