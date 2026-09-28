import React, { useState, useEffect, useRef } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useEnquiry } from '../../context/EnquiryContext';
import { Search, Heart, Menu, X, Calendar, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/config';
import { InfinityFlourish } from '../common/BrandMotifs';

interface NavbarProps {
  onOpenSearch: () => void;
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onNavigateHome
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { openEnquiry } = useEnquiry();

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll listener for smooth transition from transparent to solid ivory with fine border
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation & focus trap for mobile drawer
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus(); // Focus restoration
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF5EF]/95 backdrop-blur-md border-b border-[#794653]/15 shadow-2xs py-3.5'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          
          {/* Brand Label on Left */}
          <div
            onClick={onNavigateHome}
            className="group cursor-pointer flex flex-col items-start select-none"
            aria-label="UNICO Boutique Home"
          >
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.2em] text-[#794653] group-hover:text-[#582F3B] transition-colors leading-none">
              {BRAND_CONFIG.brandName}
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#B39664] font-medium font-sans mt-1">
              {BRAND_CONFIG.descriptor}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            <button
              onClick={() => scrollTo('featured-products-section')}
              className="text-xs uppercase tracking-[0.18em] font-sans font-medium text-[#332B2B]/85 hover:text-[#794653] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#794653] hover:after:w-full after:transition-all"
            >
              New Arrivals
            </button>
            <button
              onClick={() => scrollTo('collections-section')}
              className="text-xs uppercase tracking-[0.18em] font-sans font-medium text-[#332B2B]/85 hover:text-[#794653] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#794653] hover:after:w-full after:transition-all"
            >
              Collections
            </button>
            <button
              onClick={() => scrollTo('our-story-section')}
              className="text-xs uppercase tracking-[0.18em] font-sans font-medium text-[#332B2B]/85 hover:text-[#794653] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#794653] hover:after:w-full after:transition-all"
            >
              Our Story
            </button>
            <button
              onClick={() => scrollTo('lookbook-section')}
              className="text-xs uppercase tracking-[0.18em] font-sans font-medium text-[#332B2B]/85 hover:text-[#794653] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#794653] hover:after:w-full after:transition-all"
            >
              Lookbook
            </button>
            <button
              onClick={() => scrollTo('appointment-section')}
              className="text-xs uppercase tracking-[0.18em] font-sans font-medium text-[#332B2B]/85 hover:text-[#794653] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#794653] hover:after:w-full after:transition-all"
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right Controls: Search, Wishlist, Appointment CTA */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Open search catalog"
              className="p-2 rounded-full text-[#332B2B]/80 hover:text-[#794653] hover:bg-[#FFFCF8] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Button with Badge */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label={`View wishlist with ${wishlistCount} items`}
              className="relative p-2 rounded-full text-[#332B2B]/80 hover:text-[#794653] hover:bg-[#FFFCF8] transition-colors"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#794653] text-[#FAF5EF] text-[10px] flex items-center justify-center font-sans font-medium">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Restrained "Book an Appointment" CTA */}
            <button
              onClick={() => openEnquiry({ type: 'appointment' })}
              className="px-5 py-2.5 rounded-full border border-[#794653]/60 hover:border-[#794653] bg-transparent hover:bg-[#794653] text-[#794653] hover:text-[#FAF5EF] text-xs uppercase tracking-wider font-sans font-medium transition-all duration-300 shadow-2xs"
            >
              Book an Appointment
            </button>
          </div>

          {/* Mobile Right Controls: Search & Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#794653]"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
              className="min-w-[44px] min-h-[44px] relative flex items-center justify-center text-[#794653]"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#794653] text-[#FAF5EF] text-[10px] flex items-center justify-center font-sans">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              ref={menuButtonRef}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              aria-expanded={isMobileMenuOpen}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#794653]"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>
      </header>

      {/* Accessible Full-Height Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden overflow-hidden bg-[#332B2B]/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav-title"
        >
          <div
            ref={mobileMenuRef}
            className="absolute inset-y-0 right-0 w-full max-w-sm bg-[#FAF5EF] border-l border-[#B39664]/30 shadow-2xl flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#794653]/15">
              <div>
                <h3 id="mobile-nav-title" className="font-serif text-2xl font-normal text-[#794653] tracking-widest">
                  {BRAND_CONFIG.brandName}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-[#B39664] font-sans">
                  {BRAND_CONFIG.descriptor}
                </span>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  menuButtonRef.current?.focus();
                }}
                aria-label="Close menu"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-[#794653] hover:bg-[#FFFCF8]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Links with comfortable tap targets (>= 44px) */}
            <nav className="flex-1 py-8 flex flex-col justify-center space-y-2">
              <button
                onClick={() => scrollTo('featured-products-section')}
                className="min-h-[48px] w-full text-left font-serif text-2xl text-[#332B2B] hover:text-[#794653] transition-colors py-2 px-3 rounded-xl hover:bg-[#FFFCF8]"
              >
                New Arrivals
              </button>
              <button
                onClick={() => scrollTo('collections-section')}
                className="min-h-[48px] w-full text-left font-serif text-2xl text-[#332B2B] hover:text-[#794653] transition-colors py-2 px-3 rounded-xl hover:bg-[#FFFCF8]"
              >
                Collections
              </button>
              <button
                onClick={() => scrollTo('our-story-section')}
                className="min-h-[48px] w-full text-left font-serif text-2xl text-[#332B2B] hover:text-[#794653] transition-colors py-2 px-3 rounded-xl hover:bg-[#FFFCF8]"
              >
                Our Story
              </button>
              <button
                onClick={() => scrollTo('lookbook-section')}
                className="min-h-[48px] w-full text-left font-serif text-2xl text-[#332B2B] hover:text-[#794653] transition-colors py-2 px-3 rounded-xl hover:bg-[#FFFCF8]"
              >
                Lookbook
              </button>
              <button
                onClick={() => scrollTo('appointment-section')}
                className="min-h-[48px] w-full text-left font-serif text-2xl text-[#332B2B] hover:text-[#794653] transition-colors py-2 px-3 rounded-xl hover:bg-[#FFFCF8]"
              >
                Contact & Showroom
              </button>
            </nav>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#794653]/15 space-y-4">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openEnquiry({ type: 'appointment' });
                }}
                className="min-h-[48px] w-full py-3.5 px-6 rounded-full bg-[#794653] text-[#FAF5EF] text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>

              <div className="text-center">
                <span className="font-script text-xl text-[#794653]">
                  as unique as you
                </span>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
