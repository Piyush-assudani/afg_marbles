'use client';
import { useState } from 'react';
import Link from 'next/link';
import HeroSection from '../components/HeroSection';
import MakranaVisualShowcase from '../components/MakranaVisualShowcase';
import CinematicFilmShowcase from '../components/CinematicFilmShowcase';
import ProductCard from '../components/ProductCard';
import DifferenceTable from '../components/DifferenceTable';
import ConsultationCard from '../components/ConsultationCard';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import FiveStepJourney from '../components/FiveStepJourney';
import AyadiCalculator from '../components/AyadiCalculator';
import TempleAnatomy from '../components/TempleAnatomy';
import ExperienceCentre from '../components/ExperienceCentre';
import ArchitecturalFaq from '../components/ArchitecturalFaq';
import RoyalProjectsPreview from '../components/RoyalProjectsPreview';
import QuarryTimeline from '../components/QuarryTimeline';
import SanctumConfigurator from '../components/SanctumConfigurator';
import YardLiveFeed from '../components/YardLiveFeed';
import StonePurityLab from '../components/StonePurityLab';
import { PRODUCTS } from '../products.js';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(9);

  const allFilteredList = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => {
      if (activeCategory === 'craft') {
        return p.category === 'murti' || p.category === 'jaali' || p.category === 'inlay';
      }
      return p.category === activeCategory;
    });

  const filteredProducts = allFilteredList.slice(0, visibleCount);

  const fountains = PRODUCTS.filter((p) => p.category === 'fountain').slice(0, 3);
  const chhatris = PRODUCTS.filter((p) => p.category === 'chhatri').slice(0, 3);
  const sanctums = PRODUCTS.filter((p) => p.category === 'sanctum').slice(0, 3);

  const handleOpenProduct = (product) => {
    if (typeof window !== 'undefined' && window.afgOpenProduct) {
      window.afgOpenProduct(product);
    }
  };

  const handleOpenInquiry = (product) => {
    if (typeof window !== 'undefined' && window.afgOpenInquiry) {
      window.afgOpenInquiry(product);
    }
  };

  const categories = [
    { id: 'all', label: 'All Designs', count: PRODUCTS.length },
    { id: 'mandir', label: 'Mandirs & Temples', count: PRODUCTS.filter((p) => p.category === 'mandir').length },
    { id: 'fountain', label: 'Garden Fountains', count: PRODUCTS.filter((p) => p.category === 'fountain').length },
    { id: 'chhatri', label: 'Garden Pavilions (Chhatris)', count: PRODUCTS.filter((p) => p.category === 'chhatri').length },
    { id: 'sanctum', label: 'Modern Home Temples', count: PRODUCTS.filter((p) => p.category === 'sanctum').length },
    { id: 'craft', label: 'Statues & Jali Screens', count: PRODUCTS.filter((p) => p.category === 'murti' || p.category === 'jaali' || p.category === 'inlay').length },
  ];

  return (
    <>
      {/* ============ EXACT 3D HERO SECTION (WITH ROTATING TEMPLE & STONE RAIL) ============ */}
      <HeroSection onOpenInquiry={handleOpenInquiry} />

      {/* ============ MAKRANA PURE WHITE MARBLE VISUAL SHOWCASE ============ */}
      <MakranaVisualShowcase onOpenInquiry={handleOpenInquiry} />

      {/* ============ 4K CINEMATIC IMMERSION SHOWCASE ============ */}
      <CinematicFilmShowcase onOpenInquiry={handleOpenInquiry} />

      {/* ============ ROYAL PATRON TRUST BAR ============ */}
      <section className="sec-royal-trust-bar" aria-label="Imperial Stone Assurances">
        <div className="sec-container">
          <div className="royal-trust-flex">
            <div className="royal-trust-badge">
              <span className="royal-trust-badge__star">✦</span>
              <span className="royal-trust-badge__title">OUR QUALITY PROMISE</span>
            </div>
            <div className="royal-trust-hallmarks">
              <div className="hallmark-item">
                <span className="hallmark-item__dot">✦</span>
                <div className="hallmark-item__text">
                  <strong>100% Pure Makrana Marble</strong>
                  <span>Taj Mahal Grade Purity</span>
                </div>
              </div>
              <div className="hallmark-divider" aria-hidden="true"></div>
              <div className="hallmark-item">
                <span className="hallmark-item__dot">✦</span>
                <div className="hallmark-item__text">
                  <strong>Never Turns Yellow</strong>
                  <span>100% Stain-Free &amp; Washable</span>
                </div>
              </div>
              <div className="hallmark-divider" aria-hidden="true"></div>
              <div className="hallmark-item">
                <span className="hallmark-item__dot">✦</span>
                <div className="hallmark-item__text">
                  <strong>Master Carvers</strong>
                  <span>100% Hand-Chiseled Marble</span>
                </div>
              </div>
              <div className="hallmark-divider" aria-hidden="true"></div>
              <div className="hallmark-item">
                <span className="hallmark-item__dot">✦</span>
                <div className="hallmark-item__text">
                  <strong>Pre-Delivery Assembly</strong>
                  <span>Workshop Video Inspection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE AFG DIFFERENCE ============ */}
      <DifferenceTable onOpenInquiry={handleOpenInquiry} />

      {/* ============ INTERACTIVE BEFORE & AFTER SLIDER (Yard Dry-Fit to Consecrated Sanctum) ============ */}
      <BeforeAfterSlider />

      {/* ============ 5-STEP JOURNEY (Matching Tilak Feature) ============ */}
      <FiveStepJourney onOpenInquiry={handleOpenInquiry} />

      {/* ============ ALL WE NEED IS YOUR SPACE DIMENSIONS ============ */}
      {/* ============ INTERACTIVE BESPOKE SANCTUM CONFIGURATOR (UNIQUE ATELIER STUDIO) ============ */}
      <SanctumConfigurator onOpenInquiry={handleOpenInquiry} />

      {/* ============ INTERACTIVE E-COMMERCE ARCHITECTURAL PORTFOLIO ============ */}
      <section className="sec-collections" id="collections" style={{ padding: '80px 0' }}>
        <div className="sec-container">
          <div className="sec-header text-center" style={{ marginBottom: '32px' }}>
            <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
              OUR MARBLE COLLECTION
            </span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
              Browse Our Marble Temples &amp; Designs
            </h2>
            <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
            <p className="sub-lead" style={{ maxWidth: '760px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
              See photos from every side, check dimensions, and get exact prices on WhatsApp. We custom-make each temple to fit your room perfectly.
            </p>
          </div>

          {/* Interactive Category Filter Pills Bar */}
          <div
            className="portfolio-filter-tabs"
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              marginBottom: '40px',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(9);
                }}
                style={{
                  padding: '9px 18px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  border: activeCategory === cat.id ? '1px solid #b08a4f' : '1px solid rgba(28, 24, 19, 0.16)',
                  background: activeCategory === cat.id ? '#1c1813' : '#fcfaf6',
                  color: activeCategory === cat.id ? '#ecd39b' : '#383026',
                  boxShadow: activeCategory === cat.id ? '0 4px 16px rgba(28, 24, 19, 0.15)' : 'none',
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    marginLeft: '8px',
                    fontSize: '10px',
                    opacity: activeCategory === cat.id ? 0.9 : 0.6,
                    padding: '2px 6px',
                    borderRadius: '10px',
                    background: activeCategory === cat.id ? 'rgba(212, 175, 55, 0.25)' : 'rgba(0, 0, 0, 0.06)',
                  }}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="creations-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenProduct={handleOpenProduct}
                onOpenInquiry={handleOpenInquiry}
              />
            ))}
          </div>

          {/* E-Commerce Load More Trigger */}
          {visibleCount < allFilteredList.length && (
            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 9)}
                className="btn-outline-gold"
                style={{
                  padding: '13px 32px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  background: '#ffffff',
                  boxShadow: '0 4px 16px rgba(176, 138, 79, 0.12)',
                  cursor: 'pointer'
                }}
              >
                <span>View More Designs ({allFilteredList.length - visibleCount} More) ↓</span>
              </button>
            </div>
          )}

          <div className="sec-cta-wrap text-center" style={{ marginTop: '36px', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/pooja-sanctums" className="btn-primary">
              <span className="btn-primary__text">Explore All Home Temples</span>
              <span className="btn-primary__icon">→</span>
            </Link>
            <Link href="/palatial-fountains" className="btn-outline-gold">
              <span>View Marble Fountains</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ INTERACTIVE AYADI VASTU CALCULATOR & CAD REQUEST ============ */}
      <AyadiCalculator onOpenInquiry={handleOpenInquiry} />

      {/* ============ PALATIAL FOUNTAINS PREVIEW ============ */}
      <section className="sec-fountains-preview" style={{ padding: '80px 0', background: '#f5eee1' }}>
        <div className="sec-container">
          <div className="sec-header text-center" style={{ marginBottom: '48px' }}>
            <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
              GARDEN &amp; ESTATE WATER FOUNTAINS
            </span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
              Carved Marble Water Fountains
            </h2>
            <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
            <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
              Carved from heavy, durable white marble built specially for continuous flowing water, outdoor sun, and weather resistance.
            </p>
          </div>

          <div className="creations-grid">
            {fountains.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenProduct={handleOpenProduct}
                onOpenInquiry={handleOpenInquiry}
              />
            ))}
          </div>

          <div className="sec-cta-wrap text-center" style={{ marginTop: '48px' }}>
            <Link href="/palatial-fountains" className="btn-primary">
              <span className="btn-primary__text">Explore All Marble Fountains</span>
              <span className="btn-primary__icon">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ ROYAL HERITAGE LANDMARKS (COMPLETED COMMISSIONS) ============ */}
      <RoyalProjectsPreview />

      {/* ============ DIRECT JAIPUR YARD LIVE INSPECTION FEED & PROOF ============ */}
      <YardLiveFeed onOpenInquiry={handleOpenInquiry} />

      {/* ============ SILAWAT CRAFT & WORKSHOP TEASER ============ */}
      <section className="sec-workshop-teaser" style={{ padding: '80px 0' }}>
        <div className="sec-container">
          <div className="page-grid-2">
            <div
              className="page-media-frame"
              onClick={() => {
                if (typeof window !== 'undefined' && window.afgOpenLightbox) {
                  window.afgOpenLightbox({
                    src: '/gallery/sanctum-royal-mandir-room.webp?v=purewhite',
                    title: 'Generational Master Sculptors Workshop',
                    tag: 'Traditional Master Stone Carvers'
                  });
                }
              }}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(28,24,19,0.18)',
                cursor: 'zoom-in',
                position: 'relative'
              }}
            >
              <img
                src="/gallery/sanctum-royal-mandir-room.webp?v=purewhite"
                alt="Generational Master Sculptors Workshop"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof window !== 'undefined' && window.afgOpenLightbox) {
                    window.afgOpenLightbox({
                      src: '/gallery/sanctum-royal-mandir-room.webp?v=purewhite',
                      title: 'Generational Master Sculptors Workshop',
                      tag: 'Traditional Master Stone Carvers'
                    });
                  }
                }}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(20, 17, 14, 0.88)',
                  color: '#ecd39b',
                  border: '1px solid rgba(176,138,79,0.4)',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backdropFilter: 'blur(8px)',
                  cursor: 'pointer'
                }}
              >
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
                <span>Zoom 4K</span>
              </button>
              <div className="media-caption-badge" style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(20, 17, 14, 0.88)', color: '#ecd39b', padding: '7px 16px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', border: '1px solid rgba(176,138,79,0.35)' }}>
                ✦ Traditional Master Stone Carvers
              </div>
            </div>
            <div className="page-info-block">
              <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
                MASTER CRAFTSMEN HERITAGE
              </span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '36px', color: '#1c1813', marginBottom: '12px' }}>
                Generational Stone Carvers Since 1987
              </h2>
              <div className="gold-rule" style={{ marginBottom: '18px' }}></div>
              <p style={{ color: '#4a4239', lineHeight: 1.6, marginBottom: '18px' }}>
                Our stone carvers belong to the traditional Rajasthani craft families who have hand-carved India’s most famous marble temples and monuments for generations.
              </p>
              <ul className="spec-list-luxury" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#b08a4f" strokeWidth="2.4" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: '14px', color: '#383026' }}><strong>100% Pure Marble Blocks:</strong> Every single marble slab is inspected to guarantee zero internal cracks or iron impurities.</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#b08a4f" strokeWidth="2.4" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: '14px', color: '#383026' }}><strong>100% Pre-Assembly Trial:</strong> We assemble your entire temple in our workshop, check every fitting, and send you video proof before packing.</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#b08a4f" strokeWidth="2.4" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: '14px', color: '#383026' }}><strong>Safe Wooden Box Packing:</strong> Packed inside strong wooden boxes with thick foam cushions for safe delivery to your doorstep.</span>
                </li>
              </ul>

              <div className="info-actions" style={{ marginTop: '28px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/atelier-workshop" className="btn-primary">
                  <span className="btn-primary__text">Learn How We Make Temples</span>
                  <span className="btn-primary__icon">→</span>
                </Link>
                <Link href="/materials-guide" className="btn-outline-gold">
                  <span>Makrana Marble Guide</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MAKRANA PROVENANCE & CALCITE JOURNEY ============ */}
      <QuarryTimeline />

      {/* ============ HERITAGE CHHATRI & PAVILION SHOWCASE ============ */}
      <section className="sec-chhatris-preview" style={{ padding: '80px 0', background: '#fcfaf6' }}>
        <div className="sec-container">
          <div className="sec-header text-center" style={{ marginBottom: '48px' }}>
            <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
              GARDEN PAVILIONS &amp; CHHATRIS
            </span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
              Carved Marble Pavilions &amp; Chhatris
            </h2>
            <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
            <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
              Traditional carved marble pavilions with decorative pillars and domes, perfect for gardens, lawns, and farmhouse estates.
            </p>
          </div>

          <div className="creations-grid">
            {chhatris.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenProduct={handleOpenProduct}
                onOpenInquiry={handleOpenInquiry}
              />
            ))}
          </div>

          <div className="sec-cta-wrap text-center" style={{ marginTop: '48px' }}>
            <Link href="/heritage-chhatris" className="btn-primary">
              <span className="btn-primary__text">Explore All Pavilions</span>
              <span className="btn-primary__icon">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SACRED ANATOMY OF A MAKRANA SANCTUM ============ */}
      <TempleAnatomy />

      {/* ============ CONTEMPORARY SANCTUMS & POOJA ROOMS ============ */}
      <section className="sec-sanctums-preview" style={{ padding: '80px 0' }}>
        <div className="sec-container">
          <div className="sec-header text-center" style={{ marginBottom: '48px' }}>
            <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
              CONTEMPORARY HOME TEMPLES
            </span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
              Modern Apartment &amp; Villa Temples
            </h2>
            <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
            <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
              Clean modern marble temples designed for apartments and villas with backlit warm lighting and storage drawers.
            </p>
          </div>

          <div className="creations-grid">
            {sanctums.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenProduct={handleOpenProduct}
                onOpenInquiry={handleOpenInquiry}
              />
            ))}
          </div>

          <div className="sec-cta-wrap text-center" style={{ marginTop: '48px' }}>
            <Link href="/pooja-sanctums" className="btn-primary">
              <span className="btn-primary__text">Explore All Home Temples</span>
              <span className="btn-primary__icon">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ NOBLE STONE LIBRARY VISUAL GALLERY ============ */}
      <section className="sec-stone-library" style={{ padding: '80px 0', background: '#f5eee1' }}>
        <div className="sec-container">
          <div className="sec-header text-center" style={{ marginBottom: '48px' }}>
            <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
              OUR MARBLE VARIETIES
            </span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
              Our White Marble Collection
            </h2>
            <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
            <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
              We craft our temples and fountains strictly from 3 proven natural white marbles: Makrana Pure White, Vietnam White, and Rajnagar White.
            </p>
          </div>

          <div className="stone-gallery-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                src: '/gallery/stone-makrana-calcite-slab.webp?v=spotless100',
                name: 'Makrana Pure White Marble',
                category: 'TEMPLES & SANCTUMS',
                desc: '100% Pure Natural Makrana White Marble (the same stone used in the Taj Mahal). Completely spotless white, zero water absorption, guaranteed never to turn yellow from daily pooja oil or milk.'
              },
              {
                src: '/gallery/stone-vietnam-white-marble.webp',
                name: 'Vietnam Pure White Marble',
                category: 'TEMPLES & DEITIES',
                desc: 'Crystal Snow-White Marble. Super smooth, bright white surface with no stains or spots, perfect for beautiful god statues and modern home temples.'
              },
              {
                src: '/gallery/stone-rajnagar-white-marble.webp',
                name: 'Rajnagar White Marble',
                category: 'PALATIAL FOUNTAINS',
                desc: 'Heavy-duty natural white marble with delicate grey veins. Highly durable and weatherproof, ideal for large garden water fountains.'
              }
            ].map((stone, idx) => (
              <div key={idx} className="stone-card" style={{
                borderRadius: '14px',
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 6px 28px rgba(28,24,19,0.08)',
                border: '1px solid rgba(176,138,79,0.22)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 16px 44px rgba(28,24,19,0.15)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(28,24,19,0.08)'; }}
              >
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img src={stone.src} alt={stone.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
                  <span style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(28,24,19,0.85)', color: '#d4af37', padding: '5px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', border: '1px solid rgba(212,175,55,0.35)' }}>
                    {stone.category}
                  </span>
                </div>
                <div style={{ padding: '20px 22px' }}>
                  <h4 style={{ fontFamily: 'var(--serif)', fontSize: '19px', color: '#1c1813', marginBottom: '8px' }}>{stone.name}</h4>
                  <p style={{ fontSize: '13px', color: '#6b5f52', lineHeight: 1.6 }}>{stone.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="sec-cta-wrap text-center" style={{ marginTop: '48px' }}>
            <Link href="/materials-guide" className="btn-primary">
              <span className="btn-primary__text">Read Marble Guide</span>
              <span className="btn-primary__icon">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 100-YEAR CALCITE SCIENCE & PURITY LAB ============ */}
      <StonePurityLab onOpenInquiry={handleOpenInquiry} />

      {/* ============ ATELIER CRAFT PROCESS GALLERY ============ */}
      <section className="sec-craft-process" style={{ padding: '80px 0' }}>
        <div className="sec-container">
          <div className="sec-header text-center" style={{ marginBottom: '48px' }}>
            <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
              FROM RAW STONE TO TEMPLE
            </span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
              How We Hand-Carve Each Temple
            </h2>
            <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
          </div>

          <div className="craft-process-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                step: '01',
                title: 'Selecting Pure White Marble Blocks',
                img: '/gallery/stone-makrana-calcite-slab.webp?v=spotless100',
                desc: 'Careful selection of 100% pure virgin Makrana marble blocks, tested to ensure zero internal cracks or iron spots.'
              },
              {
                step: '02',
                title: 'Master Hand-Carving Work',
                img: '/gallery/mandir-peacock-torana-8341.webp?v=real',
                desc: 'Generational master stone carvers hand-chisel pillars, arches, and intricate jali screens using traditional steel tools.'
              },
              {
                step: '03',
                title: 'Full Workshop Assembly & Video Check',
                img: '/gallery/yard-dryfit-raw-calcite-mandir.webp?v=realphoto',
                desc: 'Every temple is 100% test-assembled in our workshop to verify every joint and measurement before packing.'
              },
              {
                step: '04',
                title: 'Polishing & Safe Home Setup',
                img: '/gallery/mandir-finishing-onsite-installation.webp?v=realphoto',
                desc: 'Finished with fine diamond water polish, gold leaf accents, and clean white-glove setup inside your home.'
              }
            ].map((item, idx) => (
              <div key={idx} className="craft-step-card" style={{
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#fcfaf6',
                border: '1px solid rgba(176, 138, 79, 0.15)',
                transition: 'transform 0.3s ease',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                  <img src={item.img} alt={item.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute', top: '12px', left: '12px',
                    background: 'rgba(20, 17, 14, 0.85)', color: '#ecd39b',
                    padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.08em'
                  }}>STEP {item.step}</span>
                </div>
                <div style={{ padding: '18px 20px' }}>
                  <h4 style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: '#1c1813', marginBottom: '8px' }}>{item.title}</h4>
                  <p style={{ fontSize: '13px', color: '#6b5f52', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="sec-cta-wrap text-center" style={{ marginTop: '48px' }}>
            <Link href="/atelier-workshop" className="btn-primary">
              <span className="btn-primary__text">See How Our Workshop Works</span>
              <span className="btn-primary__icon">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE CENTRES & GLOBAL REACH ============ */}
      <ExperienceCentre onOpenInquiry={handleOpenInquiry} />

      {/* ============ ARCHITECTURAL FREQUENTLY ASKED QUESTIONS ============ */}
      <ArchitecturalFaq onOpenInquiry={handleOpenInquiry} />
    </>
  );
}
