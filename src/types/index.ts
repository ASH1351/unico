export type CategoryType = 
  | 'Everyday Elegance' 
  | 'Festive Edit' 
  | 'Occasion Wear' 
  | 'Signature Sets';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  categorySlug: string;
  tagline: string;
  description: string;
  fabricDetails: string[];
  stylingNotes: string;
  colors?: ProductColor[];
  sizes?: string[];
  images: string[];
  featured?: boolean;
  sampleStatus: string;
}

export interface CollectionCategory {
  id: string;
  title: CategoryType;
  slug: string;
  subtitle: string;
  description: string;
  image: string;
  aspectClass: string;
  badge: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  spanClass: string;
  linkedProductIds: string[];
}

export interface EnquiryRequest {
  type: 'style' | 'appointment';
  productName?: string;
  productCategory?: string;
  selectedColor?: string;
  selectedSize?: string;
  clientName: string;
  contact: string;
  preferredDate?: string;
  message?: string;
  createdAt: string;
}

export interface BrandConfig {
  brandName: string;
  descriptor: string;
  tagline: string;
  conceptNote: string;
  curationLabel: string;
  email: string;
  phoneDisplay: string;
  whatsAppEnabled: boolean;
  whatsAppNumber: string | null;
  studioAddress: string;
  openingHours: string;
  socials: {
    name: string;
    handle: string;
    url: string | null;
  }[];
}
