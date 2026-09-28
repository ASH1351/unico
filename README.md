# UNICO — THE DRESS EDIT
> *as unique as you*

A bespoke luxury boutique website celebrating graceful silhouettes, tactile botanical embroideries, and thoughtful details tailored for individual distinction.

---

## ✦ Brand Identity & Creative Concept

**Creative Concept**: *"A quiet journey through the UNICO atelier."*

- **Brand**: UNICO
- **Descriptor**: THE DRESS EDIT
- **Tagline**: as unique as you
- **Palette**: Warm Ivory (`#FAF5EF`), Porcelain (`#FFFCF8`), Dusty Blush (`#E7C7C0`), Burgundy (`#794653`), Champagne Gold (`#B39664`), Muted Olive (`#8E9078`), and Warm Charcoal (`#332B2B`).
- **Typography**: Editorial serif (*Cormorant Garamond*), clean modern sans-serif (*Manrope*), and delicate cursive accents (*Pinyon Script*).

---

## ✦ Features & Architecture

1. **Immersive 3D Atelier Scene**:
   - Architectural plaster arch, suspended champagne gold clothing rail, soft daylighting, ambient motes, and draped blush silk.
   - Genuine suspended UNICO embroidered ensemble artwork on the hanger.
   - Subtle interactive perspective tilt and depth shift with automatic GPU pause when offscreen.
   - Built-in 2.5D layered CSS fallback when WebGL is unsupported or `prefers-reduced-motion` is active.

2. **Collection Discovery**:
   - Asymmetric editorial grid featuring 4 provisional categories: *Everyday Elegance*, *Festive Edit*, *Occasion Wear*, and *Signature Sets*.
   - Filter links directly into the product catalog.

3. **Featured Products Edit**:
   - Responsive 4/3/2 column product grid with clear sample preview indicators.
   - Tone swatches, wishlist heart toggle, and click-to-view details.

4. **Signature Scroll Story**:
   - Editorial three-chapter visual journey: *Texture*, *Detail*, and *Silhouette*.
   - Animated SVG botanical line drawing dynamically linked to scroll progress.

5. **Our Story & Brand Seal**:
   - Intact display of the official circular UNICO brand artwork.
   - Dedicated Atelier Journal chronicle modal.

6. **Editorial Lookbook**:
   - Magazine-inspired layout with interactive lookbook breakdown modal and linked sample pieces.

7. **Boutique Concierge & Consultation**:
   - Dual-mode appointment booking & style inquiry form with inline validation.
   - Formatted email client launch & working copy-to-clipboard action with clear preview notice.

8. **Accessible Common Modals & State Persistence**:
   - **Live Search Modal**: Keyboard shortcut `/` or `Cmd+K` / `Ctrl+K`.
   - **Wishlist Drawer**: Persisted locally in `localStorage`.
   - **Product Detail Modal**: Multi-angle gallery with zoom, tone swatches, size options, and bespoke fitting notes.
   - **Accessible Mobile Drawer**: Min 44px touch targets, focus trapping, and `Escape` key close.

---

## ✦ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 6 (with manual chunk splitting)
- **Styling**: Tailwind CSS v4
- **3D Engine**: Three.js
- **Icons**: Lucide React
- **Animations**: CSS custom keyframes & Three.js animation loop

---

## ✦ Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm

### Installation
```bash
git clone https://github.com/ASH1351/unico.git
cd unico
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build & Preview
```bash
npm run build
npm run preview
```

---

## ✦ License & Copyright
© UNICO — THE DRESS EDIT. All rights reserved.
