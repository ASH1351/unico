import React, { useEffect, useRef } from 'react';
import { AtelierCanvas } from './AtelierCanvas';
import { GoldStar, InfinityFlourish } from '../common/BrandMotifs';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';

interface HeroAtelierProps {
  onExploreClick?: () => void;
  onDiscoverClick?: () => void;
}

export const HeroAtelier: React.FC<HeroAtelierProps> = ({
  onExploreClick,
  onDiscoverClick
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { openEnquiry } = useEnquiry();

  const handleScrollToCollections = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('collections-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDiscoverStory = () => {
    if (onDiscoverClick) {
      onDiscoverClick();
    } else {
      const el = document.getElementById('our-story-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-between pt-24 md:pt-28 pb-8 px-4 sm:px-6 lg:px-12 overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EF] to-[#FAF5EF]"
      aria-label="UNICO Atelier Hero Showcase"
    >
      {/* Background Architectural Ambience */}
      <div className="absolute top-0 right-0 w-[55vw] h-full pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[800px] rounded-full bg-gradient-to-br from-[#E7C7C0]/30 to-transparent blur-3xl" />
      </div>

      {/* Main Grid: ~45% Text / 55% Visual */}
      <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
        
        {/* Left Column: Editorial Typography & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left order-2 lg:order-1 pt-4 lg:pt-0">
          
          {/* Eyebrow with gold star */}
          <div className="inline-flex items-center gap-2 mb-4 animate-fade-in">
            <GoldStar className="w-3.5 h-3.5 text-[#B39664]" />
            <span className="text-xs md:text-sm uppercase tracking-[0.28em] text-[#794653] font-medium font-sans">
              UNICO — THE DRESS EDIT
            </span>
          </div>

          {/* Headline with high-contrast serif typography */}
          <h1
            ref={headlineRef}
            className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-normal leading-[1.08] text-[#332B2B] tracking-tight mb-6"
          >
            Elegance,{' '}
            <span className="italic font-normal text-[#794653] block sm:inline">
              uniquely yours.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-[#332B2B]/80 font-sans leading-relaxed max-w-lg mb-8 font-light">
            Discover thoughtful silhouettes and delicate details, made for your individual style.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
            <button
              onClick={handleScrollToCollections}
              className="px-7 py-3.5 rounded-full bg-[#794653] hover:bg-[#582F3B] text-[#FFFCF8] text-sm font-medium tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] text-center"
            >
              Explore the Collection
            </button>

            <button
              onClick={handleDiscoverStory}
              className="px-6 py-3.5 rounded-full border border-[#B39664]/60 hover:border-[#794653] text-[#794653] hover:bg-[#E7C7C0]/20 text-sm font-medium tracking-wider uppercase transition-all duration-300 text-center"
            >
              Discover UNICO
            </button>
          </div>

          {/* Small Brand Tagline Line */}
          <div className="flex items-center gap-3 pt-2 border-t border-[#794653]/10">
            <InfinityFlourish className="w-20 h-5 text-[#794653]" />
            <span className="font-script text-2xl text-[#794653] tracking-wide">
              as unique as you
            </span>
          </div>

        </div>

        {/* Right Column: 3D Atelier Scene */}
        <div className="lg:col-span-7 h-[420px] sm:h-[500px] md:h-[580px] lg:h-[650px] w-full order-1 lg:order-2 relative flex items-center justify-center">
          
          {/* Subtle Atelier Frame Badge */}
          <div className="absolute top-3 right-3 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full atelier-frost border border-[#B39664]/30 shadow-xs pointer-events-none">
            <Sparkles className="w-3 h-3 text-[#B39664]" />
            <span className="text-[11px] uppercase tracking-widest text-[#794653] font-medium font-sans">
              Interactive Atelier
            </span>
          </div>

          <div className="w-full h-full rounded-3xl overflow-hidden">
            <AtelierCanvas />
          </div>

          {/* Mobile Caption Indicator */}
          <div className="lg:hidden absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 text-[11px] text-[#794653]/70 font-sans tracking-widest uppercase bg-[#FAF5EF]/90 px-3 py-1 rounded-full border border-[#B39664]/20">
            Swipe to inspect garment
          </div>

        </div>

      </div>

      {/* Bottom Scroll Anchor */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-6 border-t border-[#794653]/10 z-10 text-xs text-[#794653]/70 font-sans">
        <span className="hidden sm:inline-block tracking-wider uppercase">
          Curated Couturier & Atelier
        </span>
        <button
          onClick={handleScrollToCollections}
          className="flex items-center gap-2 mx-auto sm:mx-0 text-xs uppercase tracking-widest text-[#794653] hover:text-[#582F3B] transition-colors py-2 px-3 rounded-full hover:bg-[#E7C7C0]/30"
          aria-label="Scroll to collections"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
        <span className="hidden sm:inline-block tracking-wider uppercase">
          Private Showroom Enquiries
        </span>
      </div>
    </section>
  );
};
