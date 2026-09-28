import React, { useState } from 'react';
import { BrandSealImage, BotanicalBranch, InfinityFlourish, GoldStar } from '../common/BrandMotifs';
import { BRAND_CONFIG } from '../../data/config';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { FullStoryModal } from './FullStoryModal';

export const OurStorySection: React.FC = () => {
  const [isFullStoryOpen, setIsFullStoryOpen] = useState(false);

  return (
    <section
      id="our-story-section"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden"
      aria-labelledby="our-story-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Intact Brand Artwork & Complementary Imagery */}
        <div className="lg:col-span-6 relative flex flex-col items-center">
          
          {/* Subtle Botanical Sprig Background Motif */}
          <div className="absolute -top-12 -left-8 pointer-events-none opacity-40 hidden sm:block">
            <BotanicalBranch className="w-24 h-48 text-[#8E9078]" />
          </div>

          <div className="relative w-full max-w-md mx-auto flex flex-col items-center">
            
            {/* INTACT ORIGINAL BRAND ARTWORK DISPLAYED IN FULL PROMINENCE */}
            <div className="relative z-20 group">
              <BrandSealImage
                size="hero"
                className="transition-transform duration-700 hover:rotate-1"
                alt="UNICO — THE DRESS EDIT original brand mark with botanical leaf and couture ensemble"
              />
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full atelier-frost border border-[#B39664]/40 text-[11px] uppercase tracking-widest text-[#794653] font-sans font-medium whitespace-nowrap shadow-xs">
                Official Atelier Seal
              </div>
            </div>

            {/* Complementary Craft Photography Card Offset Behind */}
            <div className="mt-8 sm:-mt-12 sm:ml-auto w-full sm:w-64 rounded-2xl overflow-hidden shadow-xl border border-[#B39664]/30 z-10 bg-[#FFFCF8] p-2">
              <img
                src="/images/story-craft.jpg"
                alt="Complementary fashion craftsmanship and drapery"
                className="w-full h-48 sm:h-56 object-cover rounded-xl"
                loading="lazy"
              />
              <p className="p-2 text-center text-[11px] uppercase tracking-wider text-[#332B2B]/70 font-sans">
                Atelier Silhouette Study
              </p>
            </div>

          </div>
        </div>

        {/* Right Column: Editorial Typography and Narrative */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          
          <div className="inline-flex items-center gap-2 mb-4">
            <GoldStar className="w-3.5 h-3.5 text-[#B39664]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#794653] font-medium font-sans">
              Our Story & Philosophy
            </span>
          </div>

          {/* Heading strictly matching prompt requirement */}
          <h2
            id="our-story-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#332B2B] font-normal leading-[1.12] mb-6"
          >
            As unique <span className="italic text-[#794653]">as you.</span>
          </h2>

          {/* Suggested introductory brand copy strictly preserved */}
          <p className="font-serif text-xl sm:text-2xl text-[#794653] italic font-normal mb-6 leading-relaxed">
            “A personal approach to dressing, with expressive silhouettes and thoughtful details.”
          </p>

          <p className="text-base text-[#332B2B]/80 font-sans font-light leading-relaxed mb-6">
            At UNICO, every silhouette is approached as a quiet dialogue between fabric, form, and individual character. Our identity is rooted in botanical grace, understated elegance, and pieces tailored to celebrate personal distinction without ostentation.
          </p>

          <p className="text-sm text-[#332B2B]/70 font-sans font-light leading-relaxed mb-8">
            Whether for serene daily dressing or treasured celebrations, each design edit reflects a commitment to tactile comfort, delicate needlework, and timeless presence.
          </p>

          {/* Infinity flourish accent */}
          <div className="mb-8">
            <InfinityFlourish className="w-40 h-6 text-[#794653]" />
          </div>

          {/* Action Link to Full Story Modal */}
          <div>
            <button
              onClick={() => setIsFullStoryOpen(true)}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#794653] text-[#794653] hover:bg-[#794653] hover:text-[#FAF5EF] transition-all duration-300 text-xs uppercase tracking-wider font-medium shadow-2xs group"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read The Atelier Chronicle</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>

      {/* Full Story Modal */}
      <FullStoryModal
        isOpen={isFullStoryOpen}
        onClose={() => setIsFullStoryOpen(false)}
      />
    </section>
  );
};
