import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { useWishlist } from '../../context/WishlistContext';
import { useEnquiry } from '../../context/EnquiryContext';
import { X, Heart, Sparkles, Check, ChevronLeft, ChevronRight, ShieldCheck, Ruler } from 'lucide-react';
import { GoldStar } from '../common/BrandMotifs';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectProduct
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openEnquiry } = useEnquiry();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isZoomed, setIsZoomed] = useState(false);
  const [showFittingGuide, setShowFittingGuide] = useState(false);

  // Sync state when product opens
  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedColor(product.colors?.[0]?.name || '');
      setSelectedSize(product.sizes?.[0] || 'Custom Atelier Fit');
      setIsZoomed(false);
      setShowFittingGuide(false);
    }
  }, [product]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % product.images.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [product, onClose]);

  if (!product) return null;

  const wishlisted = isInWishlist(product.id);

  // Find related styles in the same or complementary category
  const relatedStyles = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.featured)
  ).slice(0, 3);

  const handleEnquiry = () => {
    onClose();
    openEnquiry({
      type: 'style',
      product,
      selectedColor,
      selectedSize
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 bg-[#332B2B]/60 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-name"
    >
      <div className="relative w-full max-w-5xl max-h-[94vh] overflow-y-auto bg-[#FAF5EF] rounded-3xl border border-[#B39664]/30 shadow-2xl p-4 sm:p-6 md:p-10 text-[#332B2B]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#FFFCF8] border border-[#794653]/15 flex items-center justify-center text-[#794653] hover:bg-[#794653] hover:text-[#FAF5EF] transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Product Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Main Image with Zoom */}
            <div
              onClick={() => setIsZoomed(!isZoomed)}
              className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-md border border-[#794653]/10 bg-[#F2ECE3] cursor-zoom-in"
            >
              <img
                src={product.images[activeImageIndex]}
                alt={`${product.name} detail view ${activeImageIndex + 1}`}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'
                }`}
              />

              {/* Prev / Next controls */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
                    }}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FFFCF8]/80 text-[#794653] flex items-center justify-center hover:bg-[#794653] hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev + 1) % product.images.length);
                    }}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FFFCF8]/80 text-[#794653] flex items-center justify-center hover:bg-[#794653] hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Category pill */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full text-xs font-sans font-medium uppercase tracking-wider bg-[#FFFCF8]/90 text-[#794653] border border-[#794653]/15">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      idx === activeImageIndex
                        ? 'border-[#794653] shadow-md scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Details & Enquiry Actions */}
          <div className="lg:col-span-6 flex flex-col">
            
            {/* Header */}
            <div className="pb-4 border-b border-[#794653]/15">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest text-[#B39664] font-medium font-sans">
                  UNICO Atelier Edit
                </span>
                <span className="text-xs text-[#794653] font-sans font-medium bg-[#E7C7C0]/30 px-3 py-0.5 rounded-full">
                  Sample ID: {product.id}
                </span>
              </div>

              <h2
                id="product-detail-name"
                className="font-serif text-3xl sm:text-4xl text-[#332B2B] font-normal mb-2"
              >
                {product.name}
              </h2>

              <p className="text-sm font-sans font-medium text-[#794653] italic">
                {product.tagline}
              </p>
            </div>

            {/* Description */}
            <div className="py-4">
              <p className="text-sm sm:text-base text-[#332B2B]/80 font-sans font-light leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Fabric & Silhouette Highlights */}
              <div className="bg-[#FFFCF8] rounded-xl p-4 border border-[#794653]/10 mb-4">
                <h4 className="text-xs uppercase tracking-wider font-sans font-semibold text-[#794653] mb-2">
                  Silhouette & Craft Notes
                </h4>
                <ul className="space-y-1.5 text-xs text-[#332B2B]/75 font-sans font-light">
                  {product.fabricDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#B39664] mt-0.5">✦</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Color Swatch Selectors (Only shown when product data exists) */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-[#332B2B]/80 font-sans font-medium">
                    Sample Palette: <strong className="text-[#794653]">{selectedColor}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans transition-all border ${
                        selectedColor === c.name
                          ? 'border-[#794653] bg-[#FFFCF8] shadow-xs'
                          : 'border-black/10 hover:border-[#794653]/40'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[#332B2B]">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizing Options */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-[#332B2B]/80 font-sans font-medium">
                    Fitting Option: <strong className="text-[#794653]">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setShowFittingGuide(!showFittingGuide)}
                    className="text-xs text-[#794653] underline font-sans flex items-center gap-1 hover:text-[#582F3B]"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Bespoke Fitting Notes</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-sans tracking-wide transition-all border ${
                        selectedSize === s
                          ? 'border-[#794653] bg-[#794653] text-[#FAF5EF]'
                          : 'border-[#794653]/20 bg-[#FFFCF8] text-[#332B2B]/80 hover:border-[#794653]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Fitting Guide drawer */}
                {showFittingGuide && (
                  <div className="mt-3 p-3 rounded-xl bg-[#FAF5EF] border border-[#B39664]/30 text-xs text-[#332B2B]/80 font-sans leading-relaxed">
                    <strong>Bespoke Consultation Notice:</strong> Because each UNICO silhouette is tailored to individual proportions, our atelier takes custom measurements during your private consultation. Standard size labels serve as provisional guidelines.
                  </div>
                )}
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#794653]/15">
              <button
                onClick={handleEnquiry}
                className="flex-1 py-3.5 px-6 rounded-full bg-[#794653] hover:bg-[#582F3B] text-[#FAF5EF] text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-[#E7C7C0]" />
                <span>Enquire About This Style</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`py-3.5 px-5 rounded-full border text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-colors ${
                  wishlisted
                    ? 'border-[#794653] bg-[#E7C7C0]/30 text-[#794653]'
                    : 'border-[#794653]/30 text-[#794653] hover:bg-[#FFFCF8]'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                <span>{wishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>

            {/* Related Styles Section */}
            {relatedStyles.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#794653]/10">
                <span className="text-xs uppercase tracking-widest text-[#B39664] font-sans font-medium block mb-3">
                  Complementary Atelier Styles
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {relatedStyles.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectProduct(rel)}
                      className="group cursor-pointer rounded-xl overflow-hidden bg-[#FFFCF8] border border-[#794653]/10 p-1.5 transition-all hover:border-[#B39664]/50"
                    >
                      <img
                        src={rel.images[0]}
                        alt={rel.name}
                        className="w-full h-20 object-cover rounded-lg group-hover:scale-105 transition-transform"
                      />
                      <p className="mt-1 text-[11px] font-serif text-[#332B2B] truncate group-hover:text-[#794653]">
                        {rel.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
