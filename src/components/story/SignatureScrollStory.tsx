import React, { useState, useEffect, useRef } from 'react';
import { GoldStar } from '../common/BrandMotifs';

interface StoryChapter {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  copy: string;
  image: string;
  aspect: string;
  focusPoint: string;
}

const CHAPTERS: StoryChapter[] = [
  {
    id: 'texture',
    step: 'Chapter I',
    title: 'Texture',
    subtitle: 'Tactile depths & layered weaves',
    copy: 'A close appreciation of fabric surfaces — gossamer organzas, natural cotton-linens, and structured crepes that bring tactile dimension and quiet interest to every silhouette.',
    image: '/images/detail-texture.jpg',
    aspect: '3/4',
    focusPoint: 'Fabric Surface & Weave'
  },
  {
    id: 'detail',
    step: 'Chapter II',
    title: 'Detail',
    subtitle: 'Tonal threadwork & scalloped edges',
    copy: 'Subtle ornamentation informed by organic flora: micro-scallops, fine tonal needlework along plackets, and openwork borders that reward quiet, closer inspection.',
    image: '/images/detail-embroidery.jpg',
    aspect: '3/4',
    focusPoint: 'Botanical Needlework'
  },
  {
    id: 'silhouette',
    step: 'Chapter III',
    title: 'Silhouette',
    subtitle: 'Fluid lines & effortless composure',
    copy: 'Proportions sculpted for comfort and grace. Clean lines that drape naturally and move with ease, allowing personal poise to remain the focal point.',
    image: '/images/detail-silhouette.jpg',
    aspect: '3/4',
    focusPoint: 'Harmonious Form'
  }
];

export const SignatureScrollStory: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Desktop scroll-driven chapter activation & botanical SVG stroke draw
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if container is in view
      if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.2) {
        const totalHeight = rect.height - windowHeight;
        const currentProgress = Math.max(0, Math.min(1, -rect.top / (totalHeight || 1)));

        // Determine active chapter based on progress (0 to 1)
        const newIndex = Math.min(
          CHAPTERS.length - 1,
          Math.floor(currentProgress * CHAPTERS.length)
        );
        setActiveChapterIndex(newIndex);

        // Update botanical line stroke dashoffset
        if (pathRef.current) {
          const totalLength = 500;
          pathRef.current.style.strokeDasharray = `${totalLength}`;
          pathRef.current.style.strokeDashoffset = `${totalLength * (1 - currentProgress)}`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeChapter = CHAPTERS[activeChapterIndex];

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 bg-[#FFFCF8] border-y border-[#794653]/15 relative overflow-hidden"
      aria-label="Editorial Scroll Story: Beauty is in the details"
    >
      {/* Background Decorative Arc */}
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 rounded-full bg-[#E7C7C0]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <GoldStar className="w-3.5 h-3.5 text-[#B39664]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#794653] font-medium font-sans">
              Editorial Focus
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#332B2B] font-normal tracking-tight mb-4">
            Beauty is in the details.
          </h2>
          <p className="text-sm sm:text-base text-[#332B2B]/70 font-sans font-light">
            A quiet visual study into the tactile elements that define the UNICO dress aesthetic.
          </p>
        </div>

        {/* DESKTOP: Sticky 2-column Composition */}
        <div className="hidden lg:grid grid-cols-12 gap-12 items-center min-h-[580px]">
          
          {/* Left Column: Garment Detail Image with Smooth Crossfade */}
          <div className="col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden atelier-card-shadow border border-[#B39664]/30 bg-[#F2ECE3]">
              {CHAPTERS.map((chap, idx) => (
                <div
                  key={chap.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    idx === activeChapterIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={chap.image}
                    alt={`${chap.title} - ${chap.subtitle}`}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#332B2B]/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Badge */}
                  <div className="absolute bottom-5 left-5 px-3.5 py-1.5 rounded-full atelier-frost border border-white/30 text-xs font-sans font-medium text-[#794653]">
                    Focus: {chap.focusPoint}
                  </div>
                </div>
              ))}
            </div>

            {/* Botanical SVG Curve that draws on scroll */}
            <div className="absolute -bottom-8 -right-8 w-44 h-44 pointer-events-none">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#B39664]">
                <path
                  ref={pathRef}
                  d="M10 190 C60 160, 80 120, 110 80 C140 40, 170 30, 190 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
                <circle cx="190" cy="10" r="4" fill="#794653" />
              </svg>
            </div>
          </div>

          {/* Right Column: Editorial Captions and Interactive Stepper */}
          <div className="col-span-6 flex flex-col justify-center pl-6">
            
            {/* Step Indicators */}
            <div className="flex items-center gap-4 mb-8">
              {CHAPTERS.map((chap, idx) => (
                <button
                  key={chap.id}
                  onClick={() => setActiveChapterIndex(idx)}
                  className={`group flex items-center gap-2 text-xs uppercase tracking-widest font-sans transition-colors ${
                    idx === activeChapterIndex
                      ? 'text-[#794653] font-semibold'
                      : 'text-[#332B2B]/40 hover:text-[#794653]'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                      idx === activeChapterIndex
                        ? 'border-[#794653] bg-[#794653] text-[#FAF5EF]'
                        : 'border-[#794653]/30 group-hover:border-[#794653]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span>{chap.title}</span>
                </button>
              ))}
            </div>

            {/* Changing Editorial Content */}
            <div className="min-h-[220px]">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B39664] font-medium font-sans mb-2 block">
                {activeChapter.step}
              </span>
              <h3 className="font-serif text-3xl xl:text-4xl text-[#332B2B] font-normal mb-3">
                {activeChapter.title} — <span className="italic text-[#794653]">{activeChapter.subtitle}</span>
              </h3>
              <p className="text-base text-[#332B2B]/80 font-sans font-light leading-relaxed mb-6 max-w-lg">
                {activeChapter.copy}
              </p>
            </div>

            {/* Quote Accent */}
            <div className="pt-6 border-t border-[#794653]/15 flex items-center gap-3">
              <span className="font-script text-2xl text-[#794653]">
                "Every stitch carries a quiet intention."
              </span>
            </div>
          </div>

        </div>

        {/* MOBILE: 3 Clean Stacked Image-and-Copy Blocks (Per requirement: no sticky/pinned on mobile) */}
        <div className="lg:hidden flex flex-col gap-12">
          {CHAPTERS.map((chap, idx) => (
            <div
              key={chap.id}
              className="bg-[#FAF5EF] rounded-2xl overflow-hidden border border-[#794653]/15 atelier-card-shadow"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F2ECE3]">
                <img
                  src={chap.image}
                  alt={`${chap.title} - ${chap.subtitle}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#B39664] font-medium font-sans">
                    {chap.step}
                  </span>
                  <span className="text-[11px] text-[#794653] uppercase tracking-wider font-sans bg-[#E7C7C0]/30 px-2.5 py-0.5 rounded-full">
                    {chap.focusPoint}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-[#332B2B] font-normal mb-2">
                  {chap.title}
                </h3>
                <p className="text-sm text-[#332B2B]/75 font-sans font-light leading-relaxed">
                  {chap.copy}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
