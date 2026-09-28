import React, { useState, useEffect } from 'react';
import { WishlistProvider } from './context/WishlistContext';
import { EnquiryProvider } from './context/EnquiryContext';
import { Navbar } from './components/layout/Navbar';
import { HeroAtelier } from './components/hero/HeroAtelier';
import { CollectionDiscovery } from './components/collections/CollectionDiscovery';
import { ProductGrid } from './components/products/ProductGrid';
import { SignatureScrollStory } from './components/story/SignatureScrollStory';
import { OurStorySection } from './components/story/OurStorySection';
import { LookbookSection } from './components/lookbook/LookbookSection';
import { AppointmentSection } from './components/appointment/AppointmentSection';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';
import { WishlistDrawer } from './components/common/WishlistDrawer';
import { EnquiryModal } from './components/common/EnquiryModal';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { Product } from './types';

export function BoutiqueApp() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);

  // Global keyboard shortcut for search (Cmd+K, Ctrl+K, '/')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === 'k' && (e.metaKey || e.ctrlKey)) ||
        (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA')
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectCategory = (categorySlug: string) => {
    setActiveCategoryFilter(categorySlug);
    const element = document.getElementById('featured-products-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClearCategoryFilter = () => {
    setActiveCategoryFilter(null);
  };

  const handleNavigateHome = () => {
    setActiveCategoryFilter(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF5EF] text-[#332B2B] flex flex-col font-sans selection:bg-[#E7C7C0] selection:text-[#794653]">
      {/* Top Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateHome={handleNavigateHome}
      />

      <main className="flex-1">
        {/* 1. Hero Atelier with 3D Architectural Scene */}
        <HeroAtelier
          onExploreClick={() => {
            const el = document.getElementById('collections-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onDiscoverClick={() => {
            const el = document.getElementById('our-story-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 2. Collection Discovery (Find your expression) */}
        <CollectionDiscovery onSelectCategory={handleSelectCategory} />

        {/* 3. Featured Products Grid (The UNICO edit) */}
        <ProductGrid
          onSelectProduct={(p) => setSelectedProduct(p)}
          selectedCategoryFilter={activeCategoryFilter}
          onClearCategoryFilter={handleClearCategoryFilter}
        />

        {/* 4. Signature Scroll Story (Beauty is in the details) */}
        <SignatureScrollStory />

        {/* 5. Our Story & Intact Brand Seal (As unique as you) */}
        <OurStorySection />

        {/* 6. Editorial Lookbook (The art of dressing) */}
        <LookbookSection onSelectProduct={(p) => setSelectedProduct(p)} />

        {/* 7. Appointment & Contact (Let's find your next favourite) */}
        <AppointmentSection />
      </main>

      {/* Footer with intact seal and infinity flourish */}
      <Footer />

      {/* Global Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onSelectCategory={handleSelectCategory}
      />

      <WishlistDrawer
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      <EnquiryModal />
    </div>
  );
}

export default function App() {
  return (
    <WishlistProvider>
      <EnquiryProvider>
        <BoutiqueApp />
      </EnquiryProvider>
    </WishlistProvider>
  );
}
