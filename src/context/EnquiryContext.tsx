import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types';
import { BRAND_CONFIG } from '../data/config';

export interface EnquiryModalData {
  type: 'style' | 'appointment';
  product?: Product;
  selectedColor?: string;
  selectedSize?: string;
}

interface EnquiryContextType {
  isOpen: boolean;
  data: EnquiryModalData;
  openEnquiry: (options?: Partial<EnquiryModalData>) => void;
  closeEnquiry: () => void;
  generateEnquiryText: (formData: {
    clientName: string;
    contact: string;
    preferredDate?: string;
    message?: string;
  }) => string;
  createMailtoUrl: (formData: {
    clientName: string;
    contact: string;
    preferredDate?: string;
    message?: string;
  }) => string;
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export const EnquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<EnquiryModalData>({
    type: 'appointment'
  });

  const openEnquiry = (options?: Partial<EnquiryModalData>) => {
    setData({
      type: options?.type || (options?.product ? 'style' : 'appointment'),
      product: options?.product,
      selectedColor: options?.selectedColor || options?.product?.colors?.[0]?.name,
      selectedSize: options?.selectedSize || options?.product?.sizes?.[0]
    });
    setIsOpen(true);
  };

  const closeEnquiry = () => {
    setIsOpen(false);
  };

  const generateEnquiryText = (formData: {
    clientName: string;
    contact: string;
    preferredDate?: string;
    message?: string;
  }) => {
    const lines = [
      `✦ UNICO BOUTIQUE ENQUIRY ✦`,
      `Type: ${data.type === 'style' ? 'Product & Bespoke Style Enquiry' : 'Private Atelier Appointment Request'}`,
      `Client: ${formData.clientName}`,
      `Contact: ${formData.contact}`
    ];

    if (data.product) {
      lines.push(`Product: ${data.product.name} (${data.product.id})`);
      lines.push(`Category: ${data.product.category}`);
      if (data.selectedColor) lines.push(`Selected Tone: ${data.selectedColor}`);
      if (data.selectedSize) lines.push(`Selected Sizing: ${data.selectedSize}`);
    }

    if (formData.preferredDate) {
      lines.push(`Preferred Date / Timeframe: ${formData.preferredDate}`);
    }

    if (formData.message) {
      lines.push(`Notes / Preferences: ${formData.message}`);
    }

    lines.push(`\nSubmitted via UNICO Atelier Portal — ${new Date().toLocaleDateString()}`);
    return lines.join('\n');
  };

  const createMailtoUrl = (formData: {
    clientName: string;
    contact: string;
    preferredDate?: string;
    message?: string;
  }) => {
    const subject = encodeURIComponent(
      data.type === 'style' && data.product
        ? `UNICO Style Enquiry: ${data.product.name} — ${formData.clientName}`
        : `UNICO Atelier Appointment Request — ${formData.clientName}`
    );
    const body = encodeURIComponent(generateEnquiryText(formData));
    return `mailto:${BRAND_CONFIG.email}?subject=${subject}&body=${body}`;
  };

  return (
    <EnquiryContext.Provider
      value={{
        isOpen,
        data,
        openEnquiry,
        closeEnquiry,
        generateEnquiryText,
        createMailtoUrl
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = () => {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used within EnquiryProvider');
  return ctx;
};
