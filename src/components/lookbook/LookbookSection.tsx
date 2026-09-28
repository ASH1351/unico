import React, { useState } from 'react';
import { LOOKBOOK_ITEMS } from '../../data/lookbook';
import { LookbookItem, Product } from '../../types';
import { LookbookModal } from './LookbookModal';
import { GoldStar } from '../common/BrandMotifs';
import { Eye, Sparkles } from 'lucide-react';

interface LookbookSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  onSelectProduct
}) => {
  const [selectedLook, setSelectedLook] = useState<LookbookItem | null>(null);

  return (
    <section
      id="lookbook-section"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto"
      aria-labelledby="lookbook-heading"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 pb-6 border-b border-[#794653]/15">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <GoldStar className="w-3.5 h-3.5 text-[#B39664]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#794653] font-medium font-sans">
              Editorial Lookbook
            </span>
          </div>
          <h2
            id="lookbook-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#332B2B] font-normal tracking-tight"
          >
            The art of dressing.
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-sm md:text-base text-[#332B2B]/70 font-sans max-w-md font-light">
          An editorial portfolio exploring light, drapery, and tactile intimacy. Click any composition to view the ensemble breakdown.
        </p>
      </div>

      {/* Editorial Grid with Varied Scales and Negative Space */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        
        {/* Look 1: Large Featured Portrait (7 cols, tall) */}
        <div
          onClick={() => setSelectedLook(LOOKBOOK_ITEMS[0])}
          className="md:col-span-7 group relative rounded-3xl overflow-hidden cursor-pointer atelier-card-shadow bg-[#FFFCF8] border border-[#B39664]/20 min-h-[480px] md:min-h-[580px] flex flex-col justify-end p-6 md:p-10"
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={LOOKBOOK_ITEMS[0].image}
              alt={LOOKBOOK_ITEMS[0].title}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#332B2B]/85 via-[#332B2B]/20 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />
          </div>

          <div className="relative z-10 text-white">
            <span className="text-xs uppercase tracking-widest text-[#E7C7C0] font-sans block mb-2">
              {LOOKBOOK_ITEMS[0].subtitle}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FAF5EF] mb-2 font-normal">
              {LOOKBOOK_ITEMS[0].title}
            </h3>
            <p className="text-sm text-[#FAF5EF]/80 font-sans font-light max-w-md line-clamp-2 mb-4">
              {LOOKBOOK_ITEMS[0].description}
            </p>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#E7C7C0] group-hover:text-white transition-colors">
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Look Pieces ({LOOKBOOK_ITEMS[0].linkedProductIds.length})</span>
            </div>
          </div>
        </div>

        {/* Look 2 & 3: Staggered Right Column (5 cols) */}
        <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
          
          {/* Look 2 */}
          <div
            onClick={() => setSelectedLook(LOOKBOOK_ITEMS[1])}
            className="group relative rounded-3xl overflow-hidden cursor-pointer atelier-card-shadow bg-[#FFFCF8] border border-[#B39664]/20 min-h-[260px] md:min-h-[275px] flex flex-col justify-end p-6"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={LOOKBOOK_ITEMS[1].image}
                alt={LOOKBOOK_ITEMS[1].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#332B2B]/85 via-[#332B2B]/30 to-transparent" />
            </div>

            <div className="relative z-10 text-white">
              <span className="text-[11px] uppercase tracking-widest text-[#E7C7C0] font-sans block mb-1">
                {LOOKBOOK_ITEMS[1].subtitle}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#FAF5EF] mb-1 font-normal">
                {LOOKBOOK_ITEMS[1].title}
              </h3>
              <p className="text-xs text-[#FAF5EF]/75 font-sans font-light line-clamp-1">
                {LOOKBOOK_ITEMS[1].description}
              </p>
            </div>
          </div>

          {/* Look 3 */}
          <div
            onClick={() => setSelectedLook(LOOKBOOK_ITEMS[2])}
            className="group relative rounded-3xl overflow-hidden cursor-pointer atelier-card-shadow bg-[#FFFCF8] border border-[#B39664]/20 min-h-[260px] md:min-h-[275px] flex flex-col justify-end p-6"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={LOOKBOOK_ITEMS[2].image}
                alt={LOOKBOOK_ITEMS[2].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#332B2B]/85 via-[#332B2B]/30 to-transparent" />
            </div>

            <div className="relative z-10 text-white">
              <span className="text-[11px] uppercase tracking-widest text-[#E7C7C0] font-sans block mb-1">
                {LOOKBOOK_ITEMS[2].subtitle}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#FAF5EF] mb-1 font-normal">
                {LOOKBOOK_ITEMS[2].title}
              </h3>
              <p className="text-xs text-[#FAF5EF]/75 font-sans font-light line-clamp-1">
                {LOOKBOOK_ITEMS[2].description}
              </p>
            </div>
          </div>

        </div>

        {/* Look 4: Horizontal Full Width Panoramic Study */}
        <div
          onClick={() => setSelectedLook(LOOKBOOK_ITEMS[3])}
          className="md:col-span-12 group relative rounded-3xl overflow-hidden cursor-pointer atelier-card-shadow bg-[#FFFCF8] border border-[#B39664]/20 min-h-[300px] md:min-h-[340px] flex flex-col justify-end p-6 md:p-10"
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={LOOKBOOK_ITEMS[3].image}
              alt={LOOKBOOK_ITEMS[3].title}
              className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#332B2B]/90 via-[#332B2B]/30 to-transparent" />
          </div>

          <div className="relative z-10 text-white max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#E7C7C0] font-sans block mb-2">
              {LOOKBOOK_ITEMS[3].subtitle}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FAF5EF] mb-2 font-normal">
              {LOOKBOOK_ITEMS[3].title}
            </h3>
            <p className="text-sm text-[#FAF5EF]/80 font-sans font-light mb-4">
              {LOOKBOOK_ITEMS[3].description}
            </p>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#E7C7C0] group-hover:text-white transition-colors">
              <Eye className="w-3.5 h-3.5" />
              <span>Inspect Look Pieces ({LOOKBOOK_ITEMS[3].linkedProductIds.length})</span>
            </div>
          </div>
        </div>

      </div>

      {/* Lookbook Modal */}
      <LookbookModal
        look={selectedLook}
        onClose={() => setSelectedLook(null)}
        onSelectProduct={onSelectProduct}
      />
    </section>
  );
};
