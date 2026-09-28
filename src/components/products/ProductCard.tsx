import React from 'react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <article
      className="group flex flex-col h-full bg-[#FFFCF8] rounded-2xl overflow-hidden border border-[#794653]/10 atelier-card-shadow transition-all duration-500 hover:border-[#B39664]/40 hover:-translate-y-1.5"
      aria-label={product.name}
    >
      {/* Portrait Image Container */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#F2ECE3] cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
            wishlisted
              ? 'bg-[#794653] text-[#FAF5EF] shadow-md'
              : 'bg-[#FFFCF8]/80 text-[#332B2B] hover:bg-[#794653] hover:text-[#FAF5EF]'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Category Label Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] tracking-wider uppercase font-sans font-medium bg-[#FAF5EF]/90 text-[#794653] border border-[#794653]/15 backdrop-blur-xs">
            {product.category}
          </span>
        </div>

        {/* Hover View Details Quick Overlay (Desktop) */}
        <div className="hidden sm:flex absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#332B2B]/70 via-[#332B2B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center">
          <button
            onClick={() => onSelectProduct(product)}
            className="w-full py-2.5 px-4 rounded-xl bg-[#FAF5EF] hover:bg-[#FFFCF8] text-[#794653] text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Color Indicators (Only shown when product data has colors) */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2.5" title="Available sample tones">
              {product.colors.map((c, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full border border-black/15 shadow-2xs"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              <span className="text-[10px] text-[#332B2B]/60 font-sans ml-1">
                {product.colors.length} {product.colors.length === 1 ? 'tone' : 'tones'}
              </span>
            </div>
          )}

          {/* Product Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-serif text-lg sm:text-xl font-normal text-[#332B2B] group-hover:text-[#794653] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="mt-1 text-xs text-[#332B2B]/70 font-sans font-light line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Bottom Action Area */}
        <div className="mt-4 pt-3 border-t border-[#794653]/10 flex items-center justify-between">
          <span className="text-[11px] text-[#B39664] tracking-wider uppercase font-medium font-sans">
            Bespoke Order
          </span>

          <button
            onClick={() => onSelectProduct(product)}
            className="text-xs uppercase tracking-wider font-semibold text-[#794653] hover:text-[#582F3B] underline underline-offset-4 decoration-[#B39664]/50 hover:decoration-[#794653] transition-all"
          >
            Details & Enquiry →
          </button>
        </div>
      </div>
    </article>
  );
};
