export type Day =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type LocationId = 'silver-spring' | 'hyattsville';

export type HoursGroup = {
  days: Day[];
  opens: string;
  closes: string;
};

export type BusinessLocation = {
  id: LocationId;
  name: string;
  street: string;
  city: string;
  state: 'MD';
  postalCode: string;
  ordering: boolean;
  verification?: string;
};

export type SocialProfile = {
  title: string;
  handle: string;
  url: string;
};

export type Business = {
  name: string;
  phoneDisplay: string;
  phoneE164: string;
  phoneHref: string;
  siteUrl: string;
  orderingLocationId: LocationId;
  hours: HoursGroup[];
  locations: BusinessLocation[];
  social: {
    tiktok: SocialProfile;
    facebook: SocialProfile;
  };
};

const hours: HoursGroup[] = [
  {
    days: ['monday', 'tuesday', 'wednesday', 'thursday'],
    opens: '17:00',
    closes: '22:30',
  },
  {
    days: ['friday'],
    opens: '17:00',
    closes: '23:00',
  },
  {
    days: ['saturday', 'sunday'],
    opens: '12:00',
    closes: '23:00',
  },
];

export const business: Business = {
  name: 'Tortas El Chapín',
  phoneDisplay: '(240) 423-7602',
  phoneE164: '+12404237602',
  phoneHref: 'tel:+12404237602',
  siteUrl: 'https://PLACEHOLDER-DOMAIN.com',
  orderingLocationId: 'silver-spring',
  hours,
  locations: [
    {
      id: 'silver-spring',
      name: 'Silver Spring',
      street: '701 University Blvd E',
      city: 'Silver Spring',
      state: 'MD',
      postalCode: '20903',
      ordering: true,
    },
    {
      id: 'hyattsville',
      name: 'Hyattsville',
      street: '1410 Merrimac Dr',
      city: 'Hyattsville',
      state: 'MD',
      postalCode: '20783',
      ordering: false,
      verification: '[VERIFY: Confirm 1410 Merrimac Dr. Owner posts also show 1409.]',
    },
  ],
  social: {
    tiktok: {
      title: 'Tortas El Chapín on TikTok',
      handle: '@tortaselchapin',
      url: 'https://www.tiktok.com/@tortaselchapin',
    },
    facebook: {
      title: 'Tortas el Chapin',
      handle: '',
      url: '',
    },
  },
};

export function getLocation(id: LocationId): BusinessLocation {
  const location = business.locations.find((entry) => entry.id === id);

  if (!location) {
    throw new Error(`Unknown business location: ${id}`);
  }

  return location;
}

export function formatAddress(location: BusinessLocation): string {
  return `${location.street}, ${location.city}, ${location.state} ${location.postalCode}`;
}

export function getNap(id: LocationId): string {
  return `${business.name}, ${formatAddress(getLocation(id))}, ${business.phoneDisplay}`;
}
