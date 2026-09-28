import { BrandConfig } from '../types';

export const BRAND_CONFIG: BrandConfig = {
  brandName: 'UNICO',
  descriptor: 'THE DRESS EDIT',
  tagline: 'as unique as you',
  conceptNote: 'A quiet journey through the UNICO atelier.',
  curationLabel: 'Preview collection — sample styles',
  
  // Real or provisional contact placeholders (no fake phone numbers fabricated)
  email: 'atelier@unicodressedit.com',
  phoneDisplay: 'Available upon appointment request',
  
  // Per requirement: WhatsApp disabled until real business number supplied
  whatsAppEnabled: false,
  whatsAppNumber: null,

  studioAddress: 'Private Atelier Showroom (By Prior Appointment)',
  openingHours: 'Tuesday – Saturday: 11:00 AM – 6:30 PM',

  // Only real or null links (no dead '#' links)
  socials: [
    {
      name: 'Instagram',
      handle: '@unico.thedressedit',
      url: null // Awaiting verified official profile link
    },
    {
      name: 'Pinterest',
      handle: 'unicodressedit',
      url: null // Awaiting verified official profile link
    }
  ]
};

export const COLOR_PALETTE = {
  warmIvory: '#FAF5EF',
  porcelain: '#FFFCF8',
  dustyBlush: '#E7C7C0',
  burgundy: '#794653',
  champagneGold: '#B39664',
  mutedOlive: '#8E9078',
  warmCharcoal: '#332B2B',
};
