import React, { useEffect, useRef } from 'react';
import { X, Sparkles } from 'lucide-react';
import { BrandSealImage, BotanicalBranch, BottomFlourish } from '../common/BrandMotifs';
import { BRAND_CONFIG } from '../../data/config';

interface FullStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FullStoryModal: React.FC<FullStoryModalProps> = ({
  isOpen,
  onClose
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation & focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#332B2B]/60 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="full-story-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FAF5EF] rounded-3xl border border-[#B39664]/30 shadow-2xl p-6 sm:p-10 md:p-12 text-[#332B2B]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close story modal"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#FFFCF8] border border-[#794653]/15 flex items-center justify-center text-[#794653] hover:bg-[#794653] hover:text-[#FAF5EF] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7C7C0]/30 text-[#794653] text-[11px] uppercase tracking-widest font-sans font-medium mb-3">
            <Sparkles className="w-3 h-3 text-[#B39664]" />
            <span>The UNICO Atelier Journal</span>
          </div>

          <h3
            id="full-story-title"
            className="font-serif text-3xl sm:text-4xl text-[#332B2B] font-normal mb-2"
          >
            A Quiet Journey Through the Atelier
          </h3>
          <p className="font-script text-2xl text-[#794653]">
            as unique as you
          </p>
        </div>

        {/* Brand Seal Centerpiece */}
        <div className="flex justify-center mb-8">
          <BrandSealImage size="md" />
        </div>

        {/* Narrative Chapters */}
        <div className="space-y-6 text-sm sm:text-base font-sans font-light leading-relaxed text-[#332B2B]/85">
          <div className="p-5 rounded-2xl bg-[#FFFCF8] border border-[#794653]/10">
            <h4 className="font-serif text-xl text-[#794653] mb-2 font-normal">
              1. The Creative Concept
            </h4>
            <p>
              “A quiet journey through the UNICO atelier.” Rather than chasing transient trends or fast-paced spectacle, UNICO is conceived as a serene sanctuary where textiles, fine hand-finishing, and bespoke consultations coalesce into garments that feel naturally aligned with the wearer.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFCF8] border border-[#794653]/10">
            <h4 className="font-serif text-xl text-[#794653] mb-2 font-normal">
              2. The Visual Identity
            </h4>
            <p>
              Our circular brand seal embodies our aesthetic tenets: the botanical olive branch representing natural grace and renewal, the infinity flourish symbolizing enduring personal style, and the embroidered ensemble on its champagne hanger reminding us that beauty resides in every detail.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFCF8] border border-[#794653]/10">
            <h4 className="font-serif text-xl text-[#794653] mb-2 font-normal">
              3. The Atelier Process
            </h4>
            <p>
              Each sample silhouette is developed through deliberate iterations. From selecting breathable cotton-linens and sheer organzas to refining scalloped borders and tonal threadwork, our pieces are made to be cherished, tailored, and experienced in person.
            </p>
          </div>
        </div>

        {/* Flourish Divider */}
        <div className="flex justify-center my-8">
          <BottomFlourish className="w-56 h-8" />
        </div>

        {/* Close Action */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-full bg-[#794653] text-[#FAF5EF] text-xs uppercase tracking-wider font-medium hover:bg-[#582F3B] transition-colors"
          >
            Return to Boutique
          </button>
        </div>

      </div>
    </div>
  );
};
