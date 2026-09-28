import React, { useEffect } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { useEnquiry } from '../../context/EnquiryContext';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { X, Trash2, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { GoldStar } from './BrandMotifs';

interface WishlistDrawerProps {
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  onSelectProduct
}) => {
  const {
    wishlistIds,
    removeFromWishlist,
    clearWishlist,
    isWishlistOpen,
    setIsWishlistOpen
  } = useWishlist();

  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    if (!isWishlistOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsWishlistOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isWishlistOpen, setIsWishlistOpen]);

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleEnquireAll = () => {
    setIsWishlistOpen(false);
    openEnquiry({
      type: 'appointment',
      product: wishlistedProducts[0] // Primary highlighted product
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-[#332B2B]/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-drawer-title"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF5EF] border-l border-[#B39664]/30 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#794653]/15 bg-[#FFFCF8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#794653] fill-current" />
              <h3
                id="wishlist-drawer-title"
                className="font-serif text-2xl text-[#332B2B] font-normal"
              >
                Saved Silhouettes ({wishlistIds.length})
              </h3>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              aria-label="Close wishlist"
              className="p-1 rounded-full text-[#794653] hover:bg-[#FAF5EF] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List of items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-12 h-12 rounded-full bg-[#E7C7C0]/30 mx-auto flex items-center justify-center text-[#794653] mb-4">
                  <Heart className="w-6 h-6 stroke-current" />
                </div>
                <h4 className="font-serif text-xl text-[#332B2B] mb-2 font-normal">
                  Your curated edit is empty
                </h4>
                <p className="text-xs text-[#332B2B]/70 font-sans max-w-xs mx-auto mb-6">
                  Save pieces while exploring the atelier to compare styles or prepare a bespoke consultation request.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#794653] text-[#FAF5EF] text-xs uppercase tracking-wider font-medium"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="group flex gap-4 p-3 rounded-2xl bg-[#FFFCF8] border border-[#794653]/10 hover:border-[#B39664]/40 transition-all shadow-2xs"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-18 h-24 object-cover rounded-xl cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      onSelectProduct(product);
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-[#B39664] font-sans font-medium">
                          {product.category}
                        </span>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          aria-label={`Remove ${product.name} from wishlist`}
                          className="text-[#332B2B]/40 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4
                        onClick={() => {
                          setIsWishlistOpen(false);
                          onSelectProduct(product);
                        }}
                        className="font-serif text-base text-[#332B2B] group-hover:text-[#794653] cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h4>
                    </div>

                    <button
                      onClick={() => {
                        setIsWishlistOpen(false);
                        onSelectProduct(product);
                      }}
                      className="text-xs text-[#794653] font-sans font-medium flex items-center gap-1 hover:underline"
                    >
                      <span>Inspect details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {wishlistedProducts.length > 0 && (
            <div className="p-6 border-t border-[#794653]/15 bg-[#FFFCF8] space-y-3">
              <button
                onClick={handleEnquireAll}
                className="w-full py-3.5 px-6 rounded-full bg-[#794653] hover:bg-[#582F3B] text-[#FAF5EF] text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-[#E7C7C0]" />
                <span>Enquire About Saved Styles</span>
              </button>

              <div className="flex items-center justify-between text-xs text-[#332B2B]/60 font-sans px-2">
                <span>{wishlistIds.length} items preserved locally</span>
                <button
                  onClick={clearWishlist}
                  className="text-xs text-[#794653] hover:underline"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
