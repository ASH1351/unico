import React, { useEffect } from 'react';
import { LookbookItem, Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

interface LookbookModalProps {
  look: LookbookItem | null;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  look,
  onClose,
  onSelectProduct
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    if (!look) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [look, onClose]);

  if (!look) return null;

  // Resolve linked sample pieces
  const linkedPieces = PRODUCTS.filter((p) =>
    look.linkedProductIds.includes(p.id)
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#332B2B]/60 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lookbook-modal-title"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FAF5EF] rounded-3xl border border-[#B39664]/30 shadow-2xl p-6 sm:p-8 md:p-10 text-[#332B2B]">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close lookbook modal"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#FFFCF8] border border-[#794653]/15 flex items-center justify-center text-[#794653] hover:bg-[#794653] hover:text-[#FAF5EF] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Large Image Column */}
          <div className="md:col-span-6 rounded-2xl overflow-hidden shadow-lg border border-[#B39664]/20 bg-[#F2ECE3]">
            <img
              src={look.image}
              alt={look.title}
              className="w-full h-[380px] sm:h-[480px] object-cover"
            />
          </div>

          {/* Details & Featured Pieces Column */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B39664] font-medium font-sans block mb-1">
                {look.subtitle}
              </span>
              <h3
                id="lookbook-modal-title"
                className="font-serif text-3xl sm:text-4xl text-[#332B2B] font-normal mb-3"
              >
                {look.title}
              </h3>
              <p className="text-sm text-[#332B2B]/80 font-sans font-light leading-relaxed mb-6">
                {look.description}
              </p>

              {/* Linked Sample Pieces Section */}
              <div className="pt-4 border-t border-[#794653]/15">
                <div className="flex items-center gap-1.5 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#B39664]" />
                  <span className="text-xs uppercase tracking-widest font-sans font-medium text-[#794653]">
                    Featured Sample Pieces
                  </span>
                </div>

                <div className="space-y-3">
                  {linkedPieces.map((piece) => (
                    <div
                      key={piece.id}
                      onClick={() => {
                        onClose();
                        onSelectProduct(piece);
                      }}
                      className="group flex items-center gap-3 p-2.5 rounded-xl bg-[#FFFCF8] border border-[#794653]/10 hover:border-[#B39664]/50 cursor-pointer transition-all hover:bg-[#FAF5EF]"
                    >
                      <img
                        src={piece.images[0]}
                        alt={piece.name}
                        className="w-14 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-[#B39664] font-sans block">
                          {piece.category}
                        </span>
                        <h4 className="font-serif text-base text-[#332B2B] group-hover:text-[#794653] truncate">
                          {piece.name}
                        </h4>
                        <span className="text-[11px] text-[#794653] font-sans flex items-center gap-1 mt-0.5">
                          View details & enquiry <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#794653]/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full border border-[#794653]/30 text-xs uppercase tracking-wider text-[#794653] hover:bg-[#794653] hover:text-[#FAF5EF] transition-colors"
              >
                Close Look
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
