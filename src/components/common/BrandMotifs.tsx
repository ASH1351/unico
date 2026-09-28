import React from 'react';

// Exact infinity flourish curve inspired by UNICO brand mark
export const InfinityFlourish: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-48 h-8 text-[#794653]',
  color = 'currentColor'
}) => (
  <svg
    viewBox="0 0 200 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M100 20 C125 5, 175 5, 185 20 C195 35, 135 35, 100 20 C65 5, 5 5, 15 20 C25 35, 75 35, 100 20 Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Four-pointed delicate star sparkle inspired by UNICO brand mark
export const GoldStar: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-4 h-4 text-[#B39664]',
  color = 'currentColor'
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 0L14 9.5L24 12L14 14.5L12 24L10 14.5L0 12L10 9.5L12 0Z" />
  </svg>
);

// Botanical Olive Leaf & Sprig motif inspired by left arc of UNICO brand seal
export const BotanicalBranch: React.FC<{ className?: string; color?: string; berryColor?: string }> = ({
  className = 'w-16 h-32 text-[#8E9078]',
  color = '#8E9078',
  berryColor = '#E7C7C0'
}) => (
  <svg
    viewBox="0 0 60 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Main organic stem */}
    <path
      d="M10 115 C15 85, 25 50, 48 10"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Leaves */}
    <path
      d="M20 90 C12 85, 8 75, 12 70 C18 68, 26 78, 22 88 Z"
      fill={color}
      opacity="0.85"
    />
    <path
      d="M23 75 C32 68, 42 70, 44 76 C42 84, 30 84, 25 77 Z"
      fill={color}
      opacity="0.85"
    />
    <path
      d="M28 55 C22 48, 18 38, 24 34 C30 32, 36 44, 30 53 Z"
      fill={color}
      opacity="0.85"
    />
    <path
      d="M34 40 C42 32, 52 35, 54 41 C51 49, 41 48, 36 42 Z"
      fill={color}
      opacity="0.85"
    />
    <path
      d="M44 18 C46 10, 52 8, 54 12 C54 18, 48 20, 45 19 Z"
      fill={color}
      opacity="0.9"
    />
    {/* Berries / rosebuds */}
    <circle cx="10" cy="78" r="3" fill={berryColor} />
    <circle cx="46" cy="72" r="3" fill={berryColor} />
    <circle cx="20" cy="42" r="3" fill={berryColor} />
  </svg>
);

// Symmetrical ornamental bottom flourish inspired by bottom of UNICO brand seal
export const BottomFlourish: React.FC<{ className?: string; goldColor?: string; burgundyColor?: string }> = ({
  className = 'w-64 h-12',
  goldColor = '#B39664',
  burgundyColor = '#794653'
}) => (
  <svg
    viewBox="0 0 240 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left scroll */}
    <path
      d="M20 22 C20 18, 25 14, 30 18 C35 22, 40 26, 55 24 C75 22, 95 16, 112 20"
      stroke={goldColor}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="20" cy="22" r="2" fill={goldColor} />
    
    {/* Right scroll */}
    <path
      d="M220 22 C220 18, 215 14, 210 18 C205 22, 200 26, 185 24 C165 22, 145 16, 128 20"
      stroke={goldColor}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="220" cy="22" r="2" fill={goldColor} />

    {/* Central diamond star */}
    <path
      d="M120 14 L123 20 L120 26 L117 20 Z"
      fill={burgundyColor}
    />
    <circle cx="120" cy="10" r="1.5" fill={goldColor} />
    <circle cx="120" cy="30" r="1.5" fill={goldColor} />
  </svg>
);

// Intact Circular Brand Seal Presentation
export const BrandSealImage: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  alt?: string;
}> = ({
  className = '',
  size = 'md',
  alt = 'UNICO — THE DRESS EDIT | Brand Seal'
}) => {
  const sizeClasses = {
    sm: 'w-24 h-24 md:w-28 md:h-28',
    md: 'w-48 h-48 md:w-60 md:h-60',
    lg: 'w-64 h-64 md:w-80 md:h-80',
    hero: 'w-72 h-72 md:w-96 md:h-96'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Subtle outer halo */}
      <div className="absolute inset-0 rounded-full bg-[#E7C7C0]/25 blur-xl transform scale-105 pointer-events-none" />
      <img
        src="/images/unico-brand-seal.png"
        alt={alt}
        className={`${sizeClasses[size]} rounded-full shadow-2xl border border-[#B39664]/30 object-contain bg-[#FFFCF8] relative z-10 transition-transform duration-700 hover:scale-[1.02]`}
        loading="lazy"
      />
    </div>
  );
};
