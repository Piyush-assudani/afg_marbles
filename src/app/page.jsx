'use client';
import Link from 'next/link';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import DifferenceTable from '../components/DifferenceTable';
import ConsultationCard from '../components/ConsultationCard';
import PricingPhilosophy from '../components/PricingPhilosophy';
import { PRODUCTS } from '../products.js';

export default function HomePage() {
  const mandirs = PRODUCTS.filter((p) => p.category === 'mandir').slice(0, 3);
  const fountains = PRODUCTS.filter((p) => p.category === 'fountain').slice(0, 2);

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

      {/* ============ PRICING PHILOSOPHY & INVESTMENT TIERS (Tilak Reference) ============ */}
      <PricingPhilosophy onOpenInquiry={handleOpenInquiry} />

      {/* ============ ALL WE NEED IS YOUR SPACE DIMENSIONS ============ */}
      <ConsultationCard onOpenInquiry={handleOpenInquiry} />

      {/* ============ FEATURED POOJA SANCTUMS (INTERACTIVE MULTI-ANGLE CARDS) ============ */}
      <section className="sec-collections" id="collections" style={{ padding: '80px 0' }}>
        <div className="sec-container">
          <div className="sec-header text-center" style={{ marginBottom: '48px' }}>
            <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
              THE ARCHITECTURAL PORTFOLIO
            </span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
              Consecrated Pooja Sanctums &amp; Mandirs
            </h2>
            <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
            <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
              Every sanctum is sculpted from flawless monolithic blocks of Makrana Albeta marble. Hover or click the angle tabs to inspect front, 3/4 perspective, jali doors, and architectural elevations directly on each creation.
            </p>
          </div>

          <div className="creations-grid">
            {mandirs.map((product) => (
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
              <span className="btn-primary__text">View All Pooja Sanctums &amp; Mandirs</span>
              <span className="btn-primary__icon">→</span>
            </Link>
          </div>
        </div>
      </section>

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

      {/* ============ CLIENT REVIEWS & GLOBAL REACH ============ */}
      <section className="sec-reviews" style={{ padding: '80px 0', background: '#fcfaf6' }}>
        <div className="sec-container">
          <div className="sec-header text-center" style={{ marginBottom: '48px' }}>
            <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
              ESTEEMED PATRONS
            </span>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
              Commissioned Across the World
            </h2>
            <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
            <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
              From historic grand estates in Rajasthan to private penthouses in London, Manhattan, and Dubai.
            </p>
          </div>

          <div className="creations-grid">
            <div className="creation-card" style={{ padding: '28px' }}>
              <div className="review-stars" style={{ color: '#b08a4f', fontSize: '18px', marginBottom: '14px' }}>★★★★★</div>
              <p className="review-text" style={{ fontStyle: 'italic', color: '#383026', fontSize: '14px', lineHeight: 1.6, marginBottom: '18px' }}>
                &ldquo;The purity of the Makrana Albeta marble is unmatched. When our home mandir arrived in London, perfectly crated without a single scratch, our entire family was moved to tears by the detail of the peacock arches.&rdquo;
              </p>
              <div className="review-author">
                <strong style={{ display: 'block', color: '#1c1813', fontSize: '14px' }}>Dr. Vikram &amp; Sunita Patel</strong>
                <span style={{ fontSize: '12px', color: '#8a8073' }}>Highgate, London, UK · Royal Garbhagriha Commission</span>
              </div>
            </div>

            <div className="creation-card" style={{ padding: '28px' }}>
              <div className="review-stars" style={{ color: '#b08a4f', fontSize: '18px', marginBottom: '14px' }}>★★★★★</div>
              <p className="review-text" style={{ fontStyle: 'italic', color: '#383026', fontSize: '14px', lineHeight: 1.6, marginBottom: '18px' }}>
                &ldquo;We wanted a courtyard cascading fountain in deep Nero Marquina and Makrana marble for our Alibaug villa. The water balance and stone chiseling are beyond palace quality.&rdquo;
              </p>
              <div className="review-author">
                <strong style={{ display: 'block', color: '#1c1813', fontSize: '14px' }}>Ananya &amp; Sameer Mehta</strong>
                <span style={{ fontSize: '12px', color: '#8a8073' }}>Worli, Mumbai &amp; Alibaug · 3-Tier Palatial Fountain</span>
              </div>
            </div>

            <div className="creation-card" style={{ padding: '28px' }}>
              <div className="review-stars" style={{ color: '#b08a4f', fontSize: '18px', marginBottom: '14px' }}>★★★★★</div>
              <p className="review-text" style={{ fontStyle: 'italic', color: '#383026', fontSize: '14px', lineHeight: 1.6, marginBottom: '18px' }}>
                &ldquo;AFG’s 3D CAD team incorporated our exact space dimensions down to the centimeter. The dry-fit trial video they sent before shipping gave us 100% confidence. Truly India’s premier marble atelier.&rdquo;
              </p>
              <div className="review-author">
                <strong style={{ display: 'block', color: '#1c1813', fontSize: '14px' }}>Harshavardhan Singhania</strong>
                <span style={{ fontSize: '12px', color: '#8a8073' }}>Emirates Hills, Dubai, UAE · Bespoke Ayadi Sanctum</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
