import React, { useState } from 'react';
import { BrandSealImage, InfinityFlourish, BottomFlourish } from '../common/BrandMotifs';
import { BRAND_CONFIG } from '../../data/config';
import { ArrowUp, Mail, MapPin, Clock, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFFDF9] border-t border-[#794653]/15 pt-16 md:pt-24 pb-12 px-4 sm:px-6 lg:px-12 text-[#332B2B] relative overflow-hidden">
      
      {/* Background Soft Blush Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E7C7C0]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Showcase: Intact Brand Artwork Seal */}
        <div className="flex flex-col items-center text-center pb-16 border-b border-[#794653]/10">
          <BrandSealImage
            size="md"
            className="mb-6"
            alt="UNICO — THE DRESS EDIT brand seal intact in footer"
          />
          
          <h3 className="font-serif text-3xl sm:text-4xl text-[#794653] font-medium tracking-[0.15em] uppercase mb-1">
            {BRAND_CONFIG.brandName}
          </h3>
          <span className="text-xs uppercase tracking-[0.35em] text-[#B39664] font-sans font-medium mb-3">
            {BRAND_CONFIG.descriptor}
          </span>
          <p className="font-script text-3xl text-[#794653] mb-6">
            as unique as you
          </p>

          {/* Infinity Flourish Finishing Detail */}
          <InfinityFlourish className="w-48 h-8 text-[#794653]" />
        </div>

        {/* Middle Navigation & Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-16 border-b border-[#794653]/10">
          
          {/* Col 1: About the Atelier (4 cols) */}
          <div className="md:col-span-4 text-left">
            <h4 className="font-serif text-xl text-[#332B2B] font-normal mb-3">
              The UNICO Atelier
            </h4>
            <p className="text-xs sm:text-sm text-[#332B2B]/75 font-sans font-light leading-relaxed mb-6">
              A bespoke boutique celebrating refined silhouettes, tactile botanical embroideries, and thoughtful details tailored for your individuality.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-sans text-[#794653]">
              <Sparkles className="w-3.5 h-3.5 text-[#B39664]" />
              <span>Private Showroom Consultations</span>
            </div>
          </div>

          {/* Col 2: Navigation (3 cols) */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-xs uppercase tracking-widest text-[#B39664] font-sans font-semibold mb-4">
              Explore Atelier
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#332B2B]/80 font-light">
              <li>
                <button
                  onClick={() => scrollTo('featured-products-section')}
                  className="hover:text-[#794653] transition-colors"
                >
                  New Arrivals & Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('collections-section')}
                  className="hover:text-[#794653] transition-colors"
                >
                  Collections Discovery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('our-story-section')}
                  className="hover:text-[#794653] transition-colors"
                >
                  Our Story & Seal
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('lookbook-section')}
                  className="hover:text-[#794653] transition-colors"
                >
                  Editorial Lookbook
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('appointment-section')}
                  className="hover:text-[#794653] transition-colors"
                >
                  Book an Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact Information (5 cols) */}
          <div className="md:col-span-5 text-left">
            <h4 className="text-xs uppercase tracking-widest text-[#B39664] font-sans font-semibold mb-4">
              Showroom Inquiries
            </h4>
            <div className="space-y-3 text-xs sm:text-sm font-sans text-[#332B2B]/80 font-light">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#794653] shrink-0" />
                <a
                  href={`mailto:${BRAND_CONFIG.email}`}
                  className="text-[#794653] hover:underline"
                >
                  {BRAND_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#794653] shrink-0" />
                <span>{BRAND_CONFIG.studioAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#794653] shrink-0" />
                <span>{BRAND_CONFIG.openingHours}</span>
              </div>
            </div>

            {/* Social channels: only shown when configured (no dead '#' links) */}
            <div className="mt-6 pt-4 border-t border-[#794653]/10">
              <span className="text-[11px] uppercase tracking-wider text-[#332B2B]/60 font-sans block mb-2">
                Official Channels
              </span>
              <div className="flex flex-wrap gap-3">
                {BRAND_CONFIG.socials.map((s) =>
                  s.url ? (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#794653] hover:underline font-medium font-sans"
                    >
                      {s.name} ({s.handle})
                    </a>
                  ) : (
                    <span
                      key={s.name}
                      className="text-xs text-[#332B2B]/50 font-sans"
                      title="Channel link pending official brand launch"
                    >
                      {s.name}: {s.handle}
                    </span>
                  )
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#332B2B]/60 font-sans">
          <div>
            © {new Date().getFullYear()} UNICO — THE DRESS EDIT. All rights reserved.
          </div>

          {/* Policy Links prepared for real content */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActivePolicyModal('Boutique Consultation Policy: Bespoke fittings are arranged by advance reservation. All garments are handcrafted to order based on verified client specifications.')}
              className="hover:text-[#794653] transition-colors"
            >
              Consultation Terms
            </button>
            <span>•</span>
            <button
              onClick={() => setActivePolicyModal('Atelier Privacy Notice: Client details, measurements, and consultation requests are strictly confidential and used solely for bespoke garment preparation.')}
              className="hover:text-[#794653] transition-colors"
            >
              Privacy Policy
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#794653] transition-colors"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Policy Modal */}
      {activePolicyModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#332B2B]/60 backdrop-blur-xs"
          role="dialog"
        >
          <div className="bg-[#FAF5EF] rounded-2xl p-6 max-w-md w-full border border-[#B39664]/30 shadow-xl">
            <h4 className="font-serif text-xl text-[#332B2B] mb-3">Policy Note</h4>
            <p className="text-xs text-[#332B2B]/80 font-sans leading-relaxed mb-5">
              {activePolicyModal}
            </p>
            <div className="text-right">
              <button
                onClick={() => setActivePolicyModal(null)}
                className="px-5 py-2 rounded-full bg-[#794653] text-[#FAF5EF] text-xs font-sans uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
