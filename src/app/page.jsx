'use client';
import Link from 'next/link';
import MandirHeroCanvas from '../components/MandirHeroCanvas';
import ProductCard from '../components/ProductCard';
import DifferenceTable from '../components/DifferenceTable';
import ConsultationCard from '../components/ConsultationCard';
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
      {/* ============ HERO SECTION ============ */}
      <section className="hero" id="hero">
        <div className="hero__split">
          {/* Left Text Block */}
          <div className="hero__content">
            <div className="hero__eyebrow">
              <span className="hero__badge">ROYAL MAKRANA BEDROCK · ESTD 1987</span>
            </div>

            <h1 className="hero__title">
              Connoisseurs of Pure <span className="gold-text">Makrana Calcite</span> Temple Sanctums
            </h1>

            <div className="gold-rule"></div>

            <p className="hero__lead">
              Hand-sculpted in the sacred calcite stone of the Taj Mahal. Designed in rigorous accordance with ancient Ayadi Vastu Shastra principles by generational Silawat master artisans in Makrana and Jaipur.
            </p>

            <div className="hero__cta-group">
              <Link href="/pooja-sanctums" className="btn-primary">
                <span className="btn-primary__text">Explore Pooja Sanctums</span>
                <span className="btn-primary__icon">→</span>
              </Link>
              <button
                type="button"
                className="btn-outline-gold"
                onClick={() => handleOpenInquiry({ title: 'Hero Space Consultation' })}
              >
                <span>Free Space Consultation</span>
              </button>
            </div>

            {/* Noble Trust Indicators */}
            <div className="hero__stats-row">
              <div className="stat-item">
                <strong>99%</strong>
                <span>Pure Calcite</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <strong>0%</strong>
                <span>Yellowing Risk</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <strong>38+</strong>
                <span>Years Heritage</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <strong>ISPM-15</strong>
                <span>Global Crating</span>
              </div>
            </div>
          </div>

          {/* Right 3D Temple Hero Scene */}
          <div className="hero__canvas-container">
            <MandirHeroCanvas />
          </div>
        </div>
      </section>

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

      {/* ============ ALL WE NEED IS YOUR SPACE DIMENSIONS ============ */}
      <ConsultationCard onOpenInquiry={handleOpenInquiry} />

      {/* ============ FEATURED POOJA SANCTUMS (INTERACTIVE MULTI-ANGLE CARDS) ============ */}
      <section className="sec-collections" id="collections">
        <div className="sec-container">
          <div className="sec-header text-center">
            <span className="card-badge">THE ARCHITECTURAL PORTFOLIO</span>
            <h2>Consecrated Pooja Sanctums &amp; Mandirs</h2>
            <div className="gold-rule center"></div>
            <p className="sub-lead">
              Every sanctum is sculpted from flawless monolithic blocks of Makrana Albeta marble. Hover or click the angle tabs to inspect front, 3/4 perspective, jali doors, and architectural elevations directly on each creation.
            </p>
          </div>

          <div className="products-grid-3">
            {mandirs.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenProduct={handleOpenProduct}
                onOpenInquiry={handleOpenInquiry}
              />
            ))}
          </div>

          <div className="sec-cta-wrap text-center" style={{ marginTop: '40px' }}>
            <Link href="/pooja-sanctums" className="btn-primary">
              <span className="btn-primary__text">View All Pooja Sanctums &amp; Mandirs</span>
              <span className="btn-primary__icon">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ PALATIAL FOUNTAINS PREVIEW ============ */}
      <section className="sec-fountains-preview">
        <div className="sec-container">
          <div className="sec-header text-center">
            <span className="card-badge">CENTRAL ESTATE WATER ARCHITECTURE</span>
            <h2>Palatial Cascading Fountains</h2>
            <div className="gold-rule center"></div>
            <p className="sub-lead">
              Handcrafted in solid Makrana marble and Nero Marquina. Engineered with precision water drainage lip, freeze-proof calcite resilience, and marine-grade 316 stainless steel delivery.
            </p>
          </div>

          <div className="products-grid-2">
            {fountains.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenProduct={handleOpenProduct}
                onOpenInquiry={handleOpenInquiry}
              />
            ))}
          </div>

          <div className="sec-cta-wrap text-center" style={{ marginTop: '40px' }}>
            <Link href="/palatial-fountains" className="btn-primary">
              <span className="btn-primary__text">Explore Palatial Water Architecture</span>
              <span className="btn-primary__icon">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SILAWAT CRAFT & WORKSHOP TEASER ============ */}
      <section className="sec-workshop-teaser">
        <div className="sec-container">
          <div className="page-grid-2">
            <div className="page-media-frame">
              <img
                src="/gallery/mandir-pure-makrana.webp"
                alt="Silawat Master Sculptor Chiseling Makrana Marble"
                loading="lazy"
              />
              <div className="media-caption-badge">Jaipur &amp; Makrana Master Guild</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">THE SILAWAT GUILD HERITAGE</span>
              <h2>Generational Master Sculptors Since 1987</h2>
              <div className="gold-rule"></div>
              <p>
                Our stone carvers belong to the historic Silawat guild of Rajasthan—the direct ancestral lineage responsible for shaping the Taj Mahal, the Victoria Memorial, and India’s most venerated temple shrines.
              </p>
              <ul className="spec-list-luxury">
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Quarry Selection at Bedrock:</strong> Every single marble slab is inspected with ultrasonic pulse velocity to guarantee zero micro-fractures.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>100% Pre-Assembly Trial:</strong> We assemble your entire temple in our Jaipur yard, conduct dry-joint fitment checks, and send you 4K verification video before packing.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>ISPM-15 Certified Crating:</strong> Fumigated marine plywood crates lined with 50mm high-density shock EVA foam for seamless international delivery.</span>
                </li>
              </ul>

              <div className="info-actions" style={{ marginTop: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
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
      <section className="sec-reviews">
        <div className="sec-container">
          <div className="sec-header text-center">
            <span className="card-badge">ESTEEMED PATRONS</span>
            <h2>Commissioned Across the World</h2>
            <div className="gold-rule center"></div>
            <p className="sub-lead">
              From historic grand estates in Rajasthan to private penthouses in London, Manhattan, and Dubai.
            </p>
          </div>

          <div className="page-cards-grid-3">
            <div className="page-card-item">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                &ldquo;The purity of the Makrana Albeta marble is unmatched. When our home mandir arrived in London, perfectly crated without a single scratch, our entire family was moved to tears by the detail of the peacock arches.&rdquo;
              </p>
              <div className="review-author">
                <strong>Dr. Vikram &amp; Sunita Patel</strong>
                <span>Highgate, London, UK · Royal Garbhagriha Commission</span>
              </div>
            </div>

            <div className="page-card-item">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                &ldquo;We wanted a courtyard cascading fountain in deep Nero Marquina and Makrana marble for our Alibaug villa. The water balance and stone chiseling are beyond palace quality.&rdquo;
              </p>
              <div className="review-author">
                <strong>Ananya &amp; Sameer Mehta</strong>
                <span>Worli, Mumbai &amp; Alibaug · 3-Tier Palatial Fountain</span>
              </div>
            </div>

            <div className="page-card-item">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">
                &ldquo;AFG’s 3D CAD team incorporated our exact space dimensions down to the centimeter. The dry-fit trial video they sent before shipping gave us 100% confidence. Truly India’s premier marble atelier.&rdquo;
              </p>
              <div className="review-author">
                <strong>Harshavardhan Singhania</strong>
                <span>Emirates Hills, Dubai, UAE · Bespoke Ayadi Sanctum</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
