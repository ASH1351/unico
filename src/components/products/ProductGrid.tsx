import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { Product, CategoryType } from '../../types';
import { ProductCard } from './ProductCard';
import { GoldStar } from '../common/BrandMotifs';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

interface ProductGridProps {
  onSelectProduct: (product: Product) => void;
  selectedCategoryFilter?: string | null;
  onClearCategoryFilter?: () => void;
}

const FILTER_TABS: ('All' | CategoryType)[] = [
  'All',
  'Signature Sets',
  'Everyday Elegance',
  'Festive Edit',
  'Occasion Wear'
];

export const ProductGrid: React.FC<ProductGridProps> = ({
  onSelectProduct,
  selectedCategoryFilter,
  onClearCategoryFilter
}) => {
  const [activeTab, setActiveTab] = useState<'All' | CategoryType>('All');

  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategoryFilter) {
      return product.categorySlug === selectedCategoryFilter;
    }
    if (activeTab === 'All') return true;
    return product.category === activeTab;
  });

  return (
    <section
      id="featured-products-section"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto"
      aria-labelledby="product-grid-heading"
    >
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        
        {/* Unobtrusive Demo / Preview Notice required by prompt */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E7C7C0]/30 border border-[#B39664]/30 text-[#794653] text-[11px] uppercase tracking-widest font-sans font-medium mb-4">
          <Sparkles className="w-3 h-3 text-[#B39664]" />
          <span>Preview collection — sample styles</span>
        </div>

        <h2
          id="product-grid-heading"
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#332B2B] font-normal tracking-tight mb-4"
        >
          The UNICO edit.
        </h2>

        <p className="text-sm sm:text-base text-[#332B2B]/75 font-sans font-light max-w-xl mx-auto">
          An initial presentation of signature silhouettes, tactile hand-embellishments, and understated proportions available for bespoke consultation.
        </p>
      </div>

      {/* Filter Tabs / Active category status */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-[#794653]/15">
        
        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {FILTER_TABS.map((tab) => {
            const isActive = selectedCategoryFilter
              ? false
              : activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => {
                  if (selectedCategoryFilter && onClearCategoryFilter) {
                    onClearCategoryFilter();
                  }
                  setActiveTab(tab);
                }}
                className={`px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-[#794653] text-[#FAF5EF] shadow-xs'
                    : 'bg-[#FFFCF8] text-[#332B2B]/70 hover:text-[#794653] border border-[#794653]/10'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Selected external filter indicator if filtered from Collection section */}
        {selectedCategoryFilter && (
          <div className="flex items-center gap-2 text-xs font-sans text-[#794653] bg-[#E7C7C0]/30 px-3 py-1.5 rounded-full">
            <span>Filtered by category</span>
            <button
              onClick={onClearCategoryFilter}
              className="font-bold underline hover:text-[#582F3B]"
            >
              Reset
            </button>
          </div>
        )}

        <div className="text-xs text-[#332B2B]/60 font-sans hidden md:block">
          Showing {filteredProducts.length} sample {filteredProducts.length === 1 ? 'silhouette' : 'silhouettes'}
        </div>
      </div>

      {/* Responsive Product Grid: 4 cols on lg, 3 cols on md, 2 cols on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectProduct={onSelectProduct}
          />
        ))}
      </div>

      {/* Empty State Fallback */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 px-4 bg-[#FFFCF8] rounded-2xl border border-dashed border-[#794653]/20">
          <p className="font-serif text-xl text-[#332B2B] mb-2">No sample styles found in this category.</p>
          <p className="text-sm text-[#332B2B]/70 font-sans mb-4">View our full atelier catalog or enquire about a custom commission.</p>
          <button
            onClick={() => {
              setActiveTab('All');
              onClearCategoryFilter?.();
            }}
            className="px-6 py-2.5 rounded-full bg-[#794653] text-[#FAF5EF] text-xs uppercase tracking-wider font-medium"
          >
            Show All Styles
          </button>
        </div>
      )}
    </section>
  );
};
