export type DayHours = {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
};

export type Location = {
  id: 'silver-spring' | 'hyattsville';
  slug: 'silver-spring-md' | 'hyattsville-md';
  name: {
    es: string;
    en: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  /** Full formatted address for display */
  formatted: string;
  /** Google Maps place URL — update with official GBP links */
  mapsUrl: string;
  /** Google Maps directions URL */
  directionsUrl: string;
  /** Google reviews URL — update when available */
  reviewsUrl: string;
  /** Coordinates for embedded maps */
  coordinates: {
    lat: number;
    lng: number;
  };
  /** Placeholder hours — update with actual hours */
  hours: DayHours[];
  hoursSummary: {
    es: string;
    en: string;
  };
  /** Placeholder until owner provides photo */
  image: string;
  imageAlt: {
    es: string;
    en: string;
  };
  /** Nearby geographic references for local SEO */
  nearbyAreas: {
    es: string[];
    en: string[];
  };
};

export const locations: Location[] = [
  {
    id: 'silver-spring',
    slug: 'silver-spring-md',
    name: {
      es: 'Silver Spring',
      en: 'Silver Spring',
    },
    address: {
      street: '701 University Blvd E',
      city: 'Silver Spring',
      state: 'MD',
      zip: '20903',
    },
    formatted: '701 University Blvd E, Silver Spring, MD 20903',
    mapsUrl: 'https://maps.google.com/?q=701+University+Blvd+E+Silver+Spring+MD+20903',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=701+University+Blvd+E,+Silver+Spring,+MD+20903',
    reviewsUrl:
      'https://www.google.com/maps/search/?api=1&query=701+University+Blvd+E+Silver+Spring+MD+20903',
    coordinates: { lat: 39.0052, lng: -76.9787 },
    hours: [
      { day: 'monday', open: '11:00', close: '21:00' },
      { day: 'tuesday', open: '11:00', close: '21:00' },
      { day: 'wednesday', open: '11:00', close: '21:00' },
      { day: 'thursday', open: '11:00', close: '21:00' },
      { day: 'friday', open: '11:00', close: '22:00' },
      { day: 'saturday', open: '10:00', close: '22:00' },
      { day: 'sunday', open: '10:00', close: '21:00' },
    ],
    hoursSummary: {
      es: 'Lun – Dom · 11:00 AM – 9:00 PM',
      en: 'Mon – Sun · 11:00 AM – 9:00 PM',
    },
    image: '/images/locations/silver-spring.jpg',
    imageAlt: {
      es: 'Ubicación de Tortas El Chapín en Silver Spring, Maryland',
      en: 'Tortas El Chapín location in Silver Spring, Maryland',
    },
    nearbyAreas: {
      es: [
        'Langley Park',
        'Takoma Park',
        'University Blvd',
        'Prince George\'s County',
      ],
      en: [
        'Langley Park',
        'Takoma Park',
        'University Blvd',
        'Prince George\'s County',
      ],
    },
  },
  {
    id: 'hyattsville',
    slug: 'hyattsville-md',
    name: {
      es: 'Hyattsville',
      en: 'Hyattsville',
    },
    address: {
      street: '1409 Merrimac Dr',
      city: 'Hyattsville',
      state: 'MD',
      zip: '20783',
    },
    formatted: '1409 Merrimac Dr, Hyattsville, MD 20783',
    mapsUrl: 'https://maps.google.com/?q=1409+Merrimac+Dr+Hyattsville+MD+20783',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=1409+Merrimac+Dr,+Hyattsville,+MD+20783',
    reviewsUrl:
      'https://www.google.com/maps/search/?api=1&query=1409+Merrimac+Dr+Hyattsville+MD+20783',
    coordinates: { lat: 38.9554, lng: -76.9455 },
    hours: [
      { day: 'monday', open: '11:00', close: '21:00' },
      { day: 'tuesday', open: '11:00', close: '21:00' },
      { day: 'wednesday', open: '11:00', close: '21:00' },
      { day: 'thursday', open: '11:00', close: '21:00' },
      { day: 'friday', open: '11:00', close: '22:00' },
      { day: 'saturday', open: '10:00', close: '22:00' },
      { day: 'sunday', open: '10:00', close: '21:00' },
    ],
    hoursSummary: {
      es: 'Lun – Dom · 11:00 AM – 9:00 PM',
      en: 'Mon – Sun · 11:00 AM – 9:00 PM',
    },
    image: '/images/locations/hyattsville.jpg',
    imageAlt: {
      es: 'Ubicación de Tortas El Chapín en Hyattsville, Maryland',
      en: 'Tortas El Chapín location in Hyattsville, Maryland',
    },
    nearbyAreas: {
      es: [
        'Riverdale Park',
        'College Park',
        'Adelphi',
        'Prince George\'s County',
      ],
      en: [
        'Riverdale Park',
        'College Park',
        'Adelphi',
        'Prince George\'s County',
      ],
    },
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getLocationById(id: Location['id']): Location | undefined {
  return locations.find((l) => l.id === id);
}

/** Default directions URL — Silver Spring as primary */
export const defaultDirectionsUrl = locations[0].directionsUrl;
