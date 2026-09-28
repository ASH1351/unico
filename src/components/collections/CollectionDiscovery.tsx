import React from 'react';
import { CATEGORIES } from '../../data/products';
import { CollectionCategory } from '../../types';
import { ArrowUpRight } from 'lucide-react';
import { GoldStar } from '../common/BrandMotifs';

interface CollectionDiscoveryProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const CollectionDiscovery: React.FC<CollectionDiscoveryProps> = ({
  onSelectCategory
}) => {
  const primaryCategory = CATEGORIES[0]; // Everyday Elegance (Featured large card)
  const secondaryCategories = CATEGORIES.slice(1);

  return (
    <section
      id="collections-section"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto"
      aria-labelledby="collection-discovery-heading"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 pb-6 border-b border-[#794653]/15">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <GoldStar className="w-3.5 h-3.5 text-[#B39664]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#794653] font-medium font-sans">
              Collection Discovery
            </span>
          </div>
          <h2
            id="collection-discovery-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#332B2B] font-normal tracking-tight"
          >
            Find your expression.
          </h2>
        </div>
        <p className="mt-4 md:mt-0 text-sm md:text-base text-[#332B2B]/70 font-sans max-w-md font-light">
          Provisional wardrobe chapters curated for seamless transitions between daily grace and celebratory occasions.
        </p>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-stretch">
        
        {/* Large Primary Portrait Card (Desktop: 7 cols, tall) */}
        <div
          onClick={() => onSelectCategory(primaryCategory.slug)}
          className="md:col-span-7 group relative rounded-2xl overflow-hidden cursor-pointer atelier-card-shadow atelier-card-hover bg-[#FFFCF8] border border-[#B39664]/20 flex flex-col justify-end min-h-[460px] md:min-h-[600px]"
        >
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={primaryCategory.image}
              alt={primaryCategory.title}
              className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Elegant luxury overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#332B2B]/85 via-[#332B2B]/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />
          </div>

          {/* Card Content Overlay */}
          <div className="relative z-10 p-6 md:p-10 text-white">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FAF5EF]/20 backdrop-blur-xs text-[#FAF5EF] text-xs font-sans tracking-widest uppercase mb-4 border border-white/20">
              {primaryCategory.badge}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal mb-2 text-[#FAF5EF]">
              {primaryCategory.title}
            </h3>
            <p className="text-sm sm:text-base text-[#FAF5EF]/80 font-sans font-light max-w-md mb-6 line-clamp-2">
              {primaryCategory.description}
            </p>
            <div className="inline-flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest text-[#FAF5EF] font-medium group-hover:text-[#E7C7C0] transition-colors">
              <span className="relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#FAF5EF] group-hover:after:bg-[#E7C7C0] transition-all">
                Explore Edition
              </span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* 3 Supporting Cards Column (Desktop: 5 cols stacked) */}
        <div className="md:col-span-5 flex flex-col gap-6 md:gap-8">
          {secondaryCategories.map((cat: CollectionCategory) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer atelier-card-shadow atelier-card-hover bg-[#FFFCF8] border border-[#B39664]/20 flex-1 min-h-[220px] md:min-h-[185px] flex flex-col justify-end p-6"
            >
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#332B2B]/85 via-[#332B2B]/35 to-transparent transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-white">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] uppercase tracking-widest text-[#E7C7C0] font-sans">
                    {cat.badge}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#FAF5EF] mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#FAF5EF]/75 font-sans font-light line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
