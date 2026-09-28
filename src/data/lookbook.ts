import { LookbookItem } from '../types';

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-01',
    title: 'The Atelier Solstice',
    subtitle: 'Chapter I: Light & Stillness',
    description: 'A study in early morning illumination. Soft natural daylight filtering across hand-embossed textures and sheer ivory layers, evoking a serene sanctuary.',
    image: '/images/hero-atelier-garment.jpg',
    spanClass: 'md:col-span-7 md:row-span-2',
    linkedProductIds: ['unico-08', 'unico-01']
  },
  {
    id: 'look-02',
    title: 'Botanical Whispers',
    subtitle: 'Chapter II: Quiet Embroidery',
    description: 'Subtle sprigs and fine needlework echoing the organic curves of the UNICO olive branch seal. Tactile poetry in thread.',
    image: '/images/detail-embroidery.jpg',
    spanClass: 'md:col-span-5 md:row-span-1',
    linkedProductIds: ['unico-01', 'unico-05']
  },
  {
    id: 'look-03',
    title: 'Sculptural Poise',
    subtitle: 'Chapter III: Fluid Movement',
    description: 'Tailored drape meeting contemporary ease. Structured cuts that soften into motion, designed for personal confidence.',
    image: '/images/detail-silhouette.jpg',
    spanClass: 'md:col-span-5 md:row-span-1',
    linkedProductIds: ['unico-04', 'unico-07']
  },
  {
    id: 'look-04',
    title: 'Gossamer Evenings',
    subtitle: 'Chapter IV: Celebratory Warmth',
    description: 'Luminous champagne weaves paired with dusty rose accents. Effortless festivity designed to feel entirely natural.',
    image: '/images/product-3.jpg',
    spanClass: 'md:col-span-12 md:row-span-1',
    linkedProductIds: ['unico-03', 'unico-06']
  }
];
