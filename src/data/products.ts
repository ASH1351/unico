import { Product, CollectionCategory } from '../types';

export const CATEGORIES: CollectionCategory[] = [
  {
    id: 'everyday-elegance',
    title: 'Everyday Elegance',
    slug: 'everyday-elegance',
    subtitle: 'Pure ease & understated grace',
    description: 'Bespoke silhouettes designed for serene daily wear, combining breathable weaves with gentle tailored lines.',
    image: '/images/collection-everyday.jpg',
    aspectClass: 'md:col-span-8 md:row-span-2',
    badge: 'Curated Edit'
  },
  {
    id: 'festive-edit',
    title: 'Festive Edit',
    slug: 'festive-edit',
    subtitle: 'Luminous celebratory ensembles',
    description: 'Fine metallic zari borders and soft botanical motifs rendered in delicate champagne gold and blush tones.',
    image: '/images/collection-festive.jpg',
    aspectClass: 'md:col-span-4 md:row-span-1',
    badge: 'Seasonal Preview'
  },
  {
    id: 'occasion-wear',
    title: 'Occasion Wear',
    slug: 'occasion-wear',
    subtitle: 'Sculptural drapery & presence',
    description: 'Statement occasion pieces crafted with intentional poise, fluid movement, and timeless proportions.',
    image: '/images/collection-occasion.jpg',
    aspectClass: 'md:col-span-4 md:row-span-1',
    badge: 'Atelier Spotlight'
  },
  {
    id: 'signature-sets',
    title: 'Signature Sets',
    slug: 'signature-sets',
    subtitle: 'Coordinated boutique silhouettes',
    description: 'Harmonious two-piece ensembles celebrating tactile hand-embellished details and effortless layering.',
    image: '/images/collection-signature.jpg',
    aspectClass: 'md:col-span-12',
    badge: 'UNICO Icon'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'unico-01',
    name: 'Rosewater Organza Kurta Set',
    category: 'Signature Sets',
    categorySlug: 'signature-sets',
    tagline: 'Delicate floral sprays on gossamer sheer organza with tailored trousers',
    description: 'An ethereal ensemble inspired by morning dew in the atelier. Crafted in translucent rosewater tones with intricate tonal embroidery cascading down the neckline and hemline, paired with matching tapered trousers and a featherlight embroidered stole.',
    fabricDetails: [
      'Semi-sheer tissue organza tunic with soft cotton-mulberry slip',
      'Tone-on-tone resham thread embroidery with fine scalloped borders',
      'Straight-fit tailored cigarette pants with elasticated comfort back',
      'Embroidered sheer stole with delicate botanical sprigs'
    ],
    stylingNotes: 'Best paired with champagne gold drop earrings and soft metallic mules for daytime celebrations or intimate gatherings.',
    colors: [
      { name: 'Rosewater Blush', hex: '#E7C7C0' },
      { name: 'Porcelain Ivory', hex: '#FFFCF8' },
      { name: 'Champagne Sand', hex: '#D8C39B' }
    ],
    sizes: ['Custom Atelier Fit', 'UK 8 / XS', 'UK 10 / S', 'UK 12 / M', 'UK 14 / L'],
    images: [
      '/images/product-1.jpg',
      '/images/detail-embroidery.jpg',
      '/images/detail-texture.jpg'
    ],
    featured: true,
    sampleStatus: 'Sample Style — Available for Boutique Preview & Bespoke Enquiry'
  },
  {
    id: 'unico-02',
    name: 'Porcelain Embroidered Tunic',
    category: 'Everyday Elegance',
    categorySlug: 'everyday-elegance',
    tagline: 'Quiet ivory elegance with subtle openwork and refined side slits',
    description: 'Designed for effortless daytime poise. This porcelain tunic showcases minimalist geometry balanced with organic botanical accents along the placket, delivering an understated yet unmistakably bespoke presence.',
    fabricDetails: [
      'Breathable ivory cotton-linen weave with subtle slub texture',
      'Delicate needlework along collar and cuffs',
      'Comfortable relaxed A-line silhouette with deep side slits'
    ],
    stylingNotes: 'Complements structured ivory culottes or tailored denim with minimal gold jewelry.',
    colors: [
      { name: 'Porcelain White', hex: '#FFFCF8' },
      { name: 'Warm Ivory', hex: '#FAF5EF' }
    ],
    sizes: ['Bespoke Fit', 'Small', 'Medium', 'Large'],
    images: [
      '/images/product-2.jpg',
      '/images/detail-texture.jpg',
      '/images/product-7.jpg'
    ],
    featured: true,
    sampleStatus: 'Sample Style — Available for Boutique Preview & Bespoke Enquiry'
  },
  {
    id: 'unico-03',
    name: 'Champagne Zari Tissue Dupatta Set',
    category: 'Festive Edit',
    categorySlug: 'festive-edit',
    tagline: 'Lustrous champagne sheen accented with fine zari borders',
    description: 'A tribute to celebratory luminosity. Woven with subtle metallic threads that catch natural light with every step, this set pairs refined cutwork with a cascading sheer dupatta.',
    fabricDetails: [
      'Fine metallic tissue blend with soft inner lining',
      'Champagne gold resham and micro-sequin border detailing',
      'Generous length dupatta finished with handcrafted tassels'
    ],
    stylingNotes: 'Style with antique gold accents and an emerald or pearl clutch.',
    colors: [
      { name: 'Champagne Gold', hex: '#B39664' },
      { name: 'Dusty Rose', hex: '#E7C7C0' }
    ],
    sizes: ['Custom Atelier Fit', 'UK 8', 'UK 10', 'UK 12', 'UK 14'],
    images: [
      '/images/product-3.jpg',
      '/images/detail-embroidery.jpg',
      '/images/product-1.jpg'
    ],
    featured: true,
    sampleStatus: 'Sample Style — Available for Boutique Preview & Bespoke Enquiry'
  },
  {
    id: 'unico-04',
    name: 'Burgundy Velvet Accent Tunic',
    category: 'Occasion Wear',
    categorySlug: 'occasion-wear',
    tagline: 'Rich burgundy tone with heirloom metallic embroidery',
    description: 'Sumptuous depth meeting architectural restraint. The plush burgundy fabric provides an opulent canvas for gold needlework that frames the collar and sleeve cuffs.',
    fabricDetails: [
      'Silk-finish velvet with liquid drape',
      'Heritage dabka and thread embroidery motifs',
      'Smooth satin inner lining for effortless wear'
    ],
    stylingNotes: 'Ideal for evening soirées and autumn weddings; pair with statement polki earrings.',
    colors: [
      { name: 'Atelier Burgundy', hex: '#794653' },
      { name: 'Warm Charcoal', hex: '#332B2B' }
    ],
    sizes: ['Bespoke Fit', 'Small', 'Medium', 'Large'],
    images: [
      '/images/product-4.jpg',
      '/images/detail-silhouette.jpg',
      '/images/product-8.jpg'
    ],
    featured: true,
    sampleStatus: 'Sample Style — Available for Boutique Preview & Bespoke Enquiry'
  },
  {
    id: 'unico-05',
    name: 'Olive Sprig Silk-Blend Coord',
    category: 'Everyday Elegance',
    categorySlug: 'everyday-elegance',
    tagline: 'Muted olive tones punctuated by delicate botanical threadwork',
    description: 'Inspired by the olive leaves in the UNICO seal. A modern coordinated shirt-tunic and straight pant set rendered in earthy, understated tones with fine vine embroideries.',
    fabricDetails: [
      'Lightweight mulberry silk and modal blend',
      'Artisanal vine threadwork along the yoke and pocket details',
      'Tailored collar with mother-of-pearl buttons'
    ],
    stylingNotes: 'Wear with neutral leather slides or heels for relaxed gallery days or luncheons.',
    colors: [
      { name: 'Muted Olive', hex: '#8E9078' },
      { name: 'Warm Ivory', hex: '#FAF5EF' }
    ],
    sizes: ['Bespoke Fit', 'UK 8', 'UK 10', 'UK 12', 'UK 14'],
    images: [
      '/images/product-5.jpg',
      '/images/detail-texture.jpg',
      '/images/product-2.jpg'
    ],
    featured: true,
    sampleStatus: 'Sample Style — Available for Boutique Preview & Bespoke Enquiry'
  },
  {
    id: 'unico-06',
    name: 'Blush Chiffon Draped Ensemble',
    category: 'Festive Edit',
    categorySlug: 'festive-edit',
    tagline: 'Flowing sheer layers with pearlescent thread accents',
    description: 'A whisper-light silhouette engineered for movement. Layers of micro-pleated blush chiffon float gracefully, accented by pearlescent micro-embroidery along the hem.',
    fabricDetails: [
      'Pure georgette chiffon with delicate crushed texture',
      'Tonal threadwork with subtle micro-pearl highlights',
      'Includes detachable inner slip'
    ],
    stylingNotes: 'Pair with delicate pearl bracelets and a soft updo for twilight events.',
    colors: [
      { name: 'Dusty Blush', hex: '#E7C7C0' },
      { name: 'Porcelain Ivory', hex: '#FFFCF8' }
    ],
    sizes: ['Custom Atelier Fit', 'UK 8', 'UK 10', 'UK 12', 'UK 14'],
    images: [
      '/images/product-6.jpg',
      '/images/detail-embroidery.jpg',
      '/images/product-3.jpg'
    ],
    featured: true,
    sampleStatus: 'Sample Style — Available for Boutique Preview & Bespoke Enquiry'
  },
  {
    id: 'unico-07',
    name: 'Ivory Crepe Formal Slip & Overlay',
    category: 'Occasion Wear',
    categorySlug: 'occasion-wear',
    tagline: 'Minimalist warm ivory crepe with fluid sculptural overlay',
    description: 'An architectural study in draped luxury. Clean modern lines in heavy matte crepe pair with an asymmetric sheer silk cape overlay that billows gently as you walk.',
    fabricDetails: [
      'Heavy double matte crepe with wrinkle-resistant finish',
      'Sheer crêpe-de-chine overlay with blind-stitched hem',
      'Tailored minimalist silhouette'
    ],
    stylingNotes: 'Pair with sculptural gold cuff bracelets and sleek pointed pumps.',
    colors: [
      { name: 'Warm Ivory', hex: '#FAF5EF' },
      { name: 'Porcelain', hex: '#FFFCF8' }
    ],
    sizes: ['Bespoke Fit', 'Small', 'Medium', 'Large'],
    images: [
      '/images/product-7.jpg',
      '/images/detail-silhouette.jpg',
      '/images/product-2.jpg'
    ],
    featured: false,
    sampleStatus: 'Sample Style — Available for Boutique Preview & Bespoke Enquiry'
  },
  {
    id: 'unico-08',
    name: 'Atelier Heritage Embroidered Set',
    category: 'Signature Sets',
    categorySlug: 'signature-sets',
    tagline: 'The defining silhouette from the UNICO brand seal composition',
    description: 'The physical manifestation of our iconic seal artwork. An intricately embroidered dusty blush-ivory tunic with scalloped lace borders, tailored straight pants, and a sweeping sheer dupatta featuring delicate floral sprigs.',
    fabricDetails: [
      'Heirloom fine net and organza with all-over botanical jaal embroidery',
      'Artisanal scallop hemline with tonal thread cutwork',
      'Draped lightweight dupatta bordered in matching embroidery',
      'Comfort-waist tailored ivory silk pants'
    ],
    stylingNotes: 'The premier choice for signature milestone celebrations. Wear with delicate statement jewelry and a radiant smile.',
    colors: [
      { name: 'Atelier Blush & Ivory', hex: '#E7C7C0' },
      { name: 'Porcelain', hex: '#FFFCF8' },
      { name: 'Burgundy Accent', hex: '#794653' }
    ],
    sizes: ['Custom Atelier Fit', 'UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16'],
    images: [
      '/images/product-8.jpg',
      '/images/detail-embroidery.jpg',
      '/images/hero-atelier-garment.jpg'
    ],
    featured: true,
    sampleStatus: 'Sample Style — Available for Boutique Preview & Bespoke Enquiry'
  }
];
