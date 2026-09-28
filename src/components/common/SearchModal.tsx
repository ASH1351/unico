import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { Product } from '../../types';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (categorySlug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectCategory
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Global shortcut Cmd+K or Ctrl+K or '/' handled in root
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchedProducts = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.tagline.toLowerCase().includes(trimmed) ||
          p.fabricDetails.some((d) => d.toLowerCase().includes(trimmed))
      )
    : [];

  const matchedCategories = trimmed
    ? CATEGORIES.filter(
        (c) =>
          c.title.toLowerCase().includes(trimmed) ||
          c.description.toLowerCase().includes(trimmed)
      )
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#332B2B]/60 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-heading"
    >
      <div className="relative w-full max-w-2xl bg-[#FAF5EF] rounded-3xl border border-[#B39664]/30 shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#794653]/15 bg-[#FFFCF8]">
          <Search className="w-5 h-5 text-[#794653]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search silhouettes, fabrics, occasions, or categories..."
            className="w-full bg-transparent border-none text-base text-[#332B2B] placeholder-[#332B2B]/40 focus:outline-hidden font-sans"
            aria-label="Search the UNICO catalog"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#332B2B]/50 hover:text-[#794653]"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1 rounded-full text-[#794653] hover:bg-[#FAF5EF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {!trimmed ? (
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B39664] font-medium font-sans block mb-3">
                Suggested Curations
              </span>
              <div className="flex flex-wrap gap-2 mb-6">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onClose();
                      onSelectCategory(cat.slug);
                    }}
                    className="px-4 py-2 rounded-full bg-[#FFFCF8] border border-[#794653]/15 text-xs text-[#794653] hover:bg-[#794653] hover:text-white transition-colors"
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              <span className="text-xs uppercase tracking-widest text-[#B39664] font-medium font-sans block mb-3">
                Popular Sample Silhouettes
              </span>
              <div className="space-y-2">
                {PRODUCTS.slice(0, 3).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onSelectProduct(p);
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFCF8] border border-black/5 hover:border-[#794653]/30 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-10 h-12 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="font-serif text-base text-[#332B2B]">{p.name}</h4>
                        <span className="text-[11px] text-[#794653] font-sans">{p.category}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#794653]" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Matched Categories */}
              {matchedCategories.length > 0 && (
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-widest text-[#B39664] font-sans font-medium block mb-2">
                    Matching Categories ({matchedCategories.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {matchedCategories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          onClose();
                          onSelectCategory(c.slug);
                        }}
                        className="px-4 py-2 rounded-full bg-[#794653] text-[#FAF5EF] text-xs font-sans tracking-wide"
                      >
                        {c.title} →
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Products */}
              {matchedProducts.length > 0 ? (
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#B39664] font-sans font-medium block mb-3">
                    Matching Silhouettes ({matchedProducts.length})
                  </span>
                  <div className="space-y-3">
                    {matchedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onClose();
                          onSelectProduct(p);
                        }}
                        className="flex items-center justify-between p-3 rounded-2xl bg-[#FFFCF8] border border-[#794653]/10 hover:border-[#B39664]/50 cursor-pointer transition-all hover:bg-white"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-14 h-16 object-cover rounded-xl"
                          />
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#B39664] font-sans block">
                              {p.category}
                            </span>
                            <h4 className="font-serif text-lg text-[#332B2B]">{p.name}</h4>
                            <p className="text-xs text-[#332B2B]/70 font-sans line-clamp-1">
                              {p.tagline}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs uppercase tracking-wider text-[#794653] font-medium hidden sm:inline">
                          View →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="font-serif text-xl text-[#332B2B] mb-2">No matching silhouettes found</p>
                  <p className="text-xs text-[#332B2B]/70 font-sans max-w-sm mx-auto">
                    Try searching for "organza", "ivory", "festive", or request a custom bespoke consultation.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#FFFCF8] border-t border-[#794653]/10 flex items-center justify-between text-[11px] text-[#332B2B]/60 font-sans px-6">
          <span>Press <kbd className="px-1.5 py-0.5 rounded-sm bg-[#FAF5EF] border text-xs">ESC</kbd> to close</span>
          <span>UNICO Atelier Edit</span>
        </div>

      </div>
    </div>
  );
};
