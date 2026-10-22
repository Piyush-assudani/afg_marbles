'use client';
import { useState } from 'react';
import Link from 'next/link';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import DifferenceTable from '../components/DifferenceTable';
import ConsultationCard from '../components/ConsultationCard';
import PricingPhilosophy from '../components/PricingPhilosophy';
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

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS.slice(0, 6)
    : PRODUCTS.filter((p) => {
        if (activeCategory === 'craft') {
          return p.category === 'murti' || p.category === 'jaali' || p.category === 'inlay';
        }
        return p.category === activeCategory;
      });

  const fountains = PRODUCTS.filter((p) => p.category === 'fountain').slice(0, 3);
  const chhatris = PRODUCTS.filter((p) => p.category === 'chhatri').slice(0, 2);
  const sanctums = PRODUCTS.filter((p) => p.category === 'sanctum').slice(0, 2);

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
    { id: 'all', label: 'All Masterpieces', count: PRODUCTS.length },
    { id: 'mandir', label: 'Mandirs & Temples', count: PRODUCTS.filter((p) => p.category === 'mandir').length },
    { id: 'fountain', label: 'Palatial Fountains', count: PRODUCTS.filter((p) => p.category === 'fountain').length },
    { id: 'chhatri', label: 'Heritage Chhatris', count: PRODUCTS.filter((p) => p.category === 'chhatri').length },
    { id: 'sanctum', label: 'Contemporary Sanctums', count: PRODUCTS.filter((p) => p.category === 'sanctum').length },
    { id: 'craft', label: 'Deities & Jaali Art', count: PRODUCTS.filter((p) => p.category === 'murti' || p.category === 'jaali' || p.category === 'inlay').length },
  ];

  return (
    <>
      {/* ============ EXACT 3D HERO SECTION (WITH ROTATING TEMPLE & STONE RAIL) ============ */}
      <HeroSection onOpenInquiry={handleOpenInquiry} />

      {/* ============ ROYAL PATRON TRUST BAR ============ */}
      <section className="sec-royal-trust-bar">
        <div className="sec-container">
          <div className="trust-pillars-grid">
            <div className="trust-pillar-card">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <div>
                <strong>Direct Makrana Bedrock</strong>
                <p>Mined from virgin calcite seams in Makrana with certified 99% CaCO3 purity.</p>
              </div>
            </div>

            <div className="trust-pillar-card">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <div>
                <strong>Zero-Yellowing Warranty</strong>
                <p>Pure crystalline structure never stains from daily puja ghee, abhishek milk, or oil lamps.</p>
              </div>
            </div>

            <div className="trust-pillar-card">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              <div>
                <strong>Generational Silawats</strong>
                <p>Hand-chiseling with strict Ayadi Vastu mathematical harmony since 1987.</p>
              </div>
            </div>

            <div className="trust-pillar-card">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <div>
                <strong>100% Pre-Assembly Trial</strong>
                <p>Assembled in our Jaipur yard with 4K walkthrough video before international export.</p>
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

      {/* ============ PRICING PHILOSOPHY & INVESTMENT TIERS (Tilak Reference) ============ */}
      <PricingPhilosophy onOpenInquiry={handleOpenInquiry} />

      {/* ============ ALL WE NEED IS YOUR SPACE DIMENSIONS ============ */}
      {/* ============ INTERACTIVE BESPOKE SANCTUM CONFIGURATOR (UNIQUE ATELIER STUDIO) ============ */}
      <SanctumConfigurator onOpenInquiry={handleOpenInquiry} />

      {/* ============ INTERACTIVE E-COMMERCE ARCHITECTURAL PORTFOLIO ============ */}
      <section className="sec-collections" id="collections" style={{ padding: '80px 0' }}>
        <div className="sec-container">
          <div className="sec-header text-center" style={{ marginBottom: '32px' }}>
            <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
              THE MASTERPIECE CATALOG
            </span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
              Architectural Portfolio &amp; Creations
            </h2>
            <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
            <p className="sub-lead" style={{ maxWidth: '760px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
              Inspect every angle, examine dry-joint stonework, or directly share any creation. Every piece is sculpted to order to your exact space dimensions.
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
                onClick={() => setActiveCategory(cat.id)}
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

          <div className="sec-cta-wrap text-center" style={{ marginTop: '48px', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/pooja-sanctums" className="btn-primary">
              <span className="btn-primary__text">Explore All 15+ Pooja Sanctums</span>
              <span className="btn-primary__icon">→</span>
            </Link>
            <Link href="/palatial-fountains" className="btn-outline-gold">
              <span>View Water Architecture</span>
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
              CENTRAL ESTATE WATER ARCHITECTURE
            </span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
              Palatial Cascading Fountains
            </h2>
            <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
            <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
              Handcrafted in solid Makrana marble and Nero Marquina. Engineered with precision water drainage lip, freeze-proof calcite resilience, and marine-grade 316 stainless steel delivery.
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
              <span className="btn-primary__text">Explore Palatial Water Architecture</span>
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
            <div className="page-media-frame">
              <img
                src="/gallery/mandir-pure-makrana.webp"
                alt="Silawat Master Sculptor Chiseling Makrana Marble"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="media-caption-badge" style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(20, 17, 14, 0.85)', color: '#ecd39b', padding: '6px 14px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                Jaipur &amp; Makrana Master Guild
              </div>
            </div>
            <div className="page-info-block">
              <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
                THE SILAWAT GUILD HERITAGE
              </span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '36px', color: '#1c1813', marginBottom: '12px' }}>
                Generational Master Sculptors Since 1987
              </h2>
              <div className="gold-rule" style={{ marginBottom: '18px' }}></div>
              <p style={{ color: '#4a4239', lineHeight: 1.6, marginBottom: '18px' }}>
                Our stone carvers belong to the historic Silawat guild of Rajasthan—the direct ancestral lineage responsible for shaping the Taj Mahal, the Victoria Memorial, and India’s most venerated temple shrines.
              </p>
              <ul className="spec-list-luxury" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#b08a4f" strokeWidth="2.4" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: '14px', color: '#383026' }}><strong>Quarry Selection at Bedrock:</strong> Every single marble slab is inspected with ultrasonic pulse velocity to guarantee zero micro-fractures.</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#b08a4f" strokeWidth="2.4" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: '14px', color: '#383026' }}><strong>100% Pre-Assembly Trial:</strong> We assemble your entire temple in our Jaipur yard, conduct dry-joint fitment checks, and send you 4K verification video before packing.</span>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#b08a4f" strokeWidth="2.4" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ fontSize: '14px', color: '#383026' }}><strong>ISPM-15 Certified Crating:</strong> Fumigated marine plywood crates lined with 50mm high-density shock EVA foam for seamless international delivery.</span>
                </li>
              </ul>

              <div className="info-actions" style={{ marginTop: '28px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link href="/atelier-workshop" className="btn-primary">
                  <span className="btn-primary__text">Discover Silawat 5-Stage Craft</span>
                  <span className="btn-primary__icon">→</span>
                </Link>
                <Link href="/materials-guide" className="btn-outline-gold">
                  <span>Makrana Calcite Science Guide</span>
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
              MONUMENTAL HERITAGE ARCHITECTURE
            </span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
              Heritage Chhatris &amp; Royal Pavilions
            </h2>
            <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
            <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
              Octagonal marble pavilions with ribbed domes, fluted monolith pillars, and pierced jali balustrades — Rajasthan&apos;s iconic gift to monumental garden and estate architecture.
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
              <span className="btn-primary__text">Explore All Heritage Chhatris</span>
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
              MODERN DEVOTIONAL SPACES
            </span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
              Contemporary Pooja Sanctums
            </h2>
            <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
            <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
              Clean-line minimalist marble sanctums designed for modern villas and penthouses — backlit Om mandalas, floating marble platforms, and concealed brass inlay work.
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
        </div>
      </section>

      {/* ============ NOBLE STONE LIBRARY VISUAL GALLERY ============ */}
      <section className="sec-stone-library" style={{ padding: '80px 0', background: '#f5eee1' }}>
        <div className="sec-container">
          <div className="sec-header text-center" style={{ marginBottom: '48px' }}>
            <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
              THE NOBLE STONE LIBRARY
            </span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
              Our Stone Collection
            </h2>
            <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
            <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
              From the virgin calcite seams of Makrana to the dramatic veined depths of Nero Marquina — every stone is hand-selected at the quarry face.
            </p>
          </div>

          <div className="stone-gallery-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px'
          }}>
            {[
              { src: '/gallery/stone-makrana-calcite-slab.webp', name: 'Pure Makrana Albeta', desc: '99% CaCO₃ purity · Taj Mahal calcite stratum' },
              { src: '/gallery/stone-nero-marquina-black.webp', name: 'Nero Marquina', desc: 'Deep black with white crystalline veining' },
              { src: '/gallery/stone-calacatta-oro-gold.webp', name: 'Calacatta Oro Gold', desc: 'Warm gold veins through pristine white base' },
              { src: '/gallery/stone-translucent-green-onyx.webp', name: 'Translucent Green Onyx', desc: 'Backlit translucent stone for sanctum glow' },
              { src: '/gallery/stone-botticino-classico.webp', name: 'Botticino Classico', desc: 'Warm ivory with delicate honey veining' }
            ].map((stone, idx) => (
              <div key={idx} className="stone-card" style={{
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 4px 24px rgba(28,24,19,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(28,24,19,0.14)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(28,24,19,0.08)'; }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img src={stone.src} alt={stone.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <h4 style={{ fontFamily: 'var(--serif)', fontSize: '16px', color: '#1c1813', marginBottom: '4px' }}>{stone.name}</h4>
                  <p style={{ fontSize: '12px', color: '#8a8073', lineHeight: 1.4 }}>{stone.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="sec-cta-wrap text-center" style={{ marginTop: '48px' }}>
            <Link href="/materials-guide" className="btn-primary">
              <span className="btn-primary__text">Explore Makrana Calcite Science Guide</span>
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
              FROM BEDROCK TO SANCTUM
            </span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
              The 5-Stage Silawat Process
            </h2>
            <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
          </div>

          <div className="craft-process-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px'
          }}>
            {[
              { step: '01', title: 'Quarry Selection', img: '/gallery/atelier-sculptor-chisel-block.webp', desc: 'Ultrasonic pulse velocity testing at virgin Makrana calcite seams to ensure zero micro-fractures.' },
              { step: '02', title: 'Master Sculpting', img: '/gallery/mandir-pure-makrana.webp', desc: '4th-generation Silawat guild artisans hand-chisel every motif using traditional hammer-and-flat-chisel technique.' },
              { step: '03', title: 'Pre-Assembly Trial', img: '/gallery/atelier-yard-preassembly.webp', desc: 'Complete dry-fit assembly in our Jaipur yard with 4K walkthrough video sent for client verification.' },
              { step: '04', title: 'ISPM-15 Export Crating', img: '/gallery/atelier-ispm15-crating-export.webp', desc: 'Fumigated marine plywood crates lined with 50mm high-density shock EVA foam for international dispatch.' }
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
                  }}>STAGE {item.step}</span>
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
              <span className="btn-primary__text">Discover the Full Atelier Process</span>
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
