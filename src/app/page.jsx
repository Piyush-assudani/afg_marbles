'use client';
import Link from 'next/link';
import MandirHeroCanvas from '../components/MandirHeroCanvas';
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

      {/* ============ THE AFG DIFFERENCE ============ */}
      <DifferenceTable onOpenInquiry={handleOpenInquiry} />

      {/* ============ ALL WE NEED IS YOUR SPACE DIMENSIONS ============ */}
      <ConsultationCard onOpenInquiry={handleOpenInquiry} />

      {/* ============ FEATURED POOJA SANCTUMS ============ */}
      <section className="sec-collections" id="collections">
        <div className="sec-container">
          <div className="sec-header text-center">
            <span className="card-badge">THE ARCHITECTURAL PORTFOLIO</span>
            <h2>Consecrated Pooja Sanctums &amp; Mandirs</h2>
            <div className="gold-rule center"></div>
            <p className="sub-lead">
              Every sanctum is sculpted from flawless monolithic blocks of Makrana Albeta marble, featuring Ayadi Vastu proportions, jali filigree, and illuminated sanctums.
            </p>
          </div>

          <div className="products-grid-3">
            {mandirs.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-card__media" onClick={() => handleOpenProduct(product)}>
                  <img
                    src={product.angles[0]?.src || '/gallery/mandir-pure-makrana.webp'}
                    alt={product.title}
                    loading="lazy"
                  />
                  <span className="product-badge">{product.badge}</span>
                  <div className="product-card__overlay">
                    <span className="btn-view-dossier">View Multi-Angle Dossier ({product.angles.length} Angles) →</span>
                  </div>
                </div>

                <div className="product-card__content">
                  <div className="product-card__category">{product.primaryStone}</div>
                  <h3 className="product-card__title" onClick={() => handleOpenProduct(product)}>
                    {product.title}
                  </h3>
                  <p className="product-card__desc">{product.tagline}</p>

                  <div className="product-card__meta">
                    <div className="meta-dim">
                      <strong>Scale:</strong> {product.scale}
                    </div>
                  </div>

                  <div className="product-card__actions">
                    <button
                      type="button"
                      className="btn-primary-sm"
                      onClick={() => handleOpenProduct(product)}
                    >
                      <span>Explore Multi-Angle ({product.angles.length} Views)</span>
                      <span>→</span>
                    </button>
                    <button
                      type="button"
                      className="btn-outline-sm"
                      onClick={() => handleOpenInquiry(product)}
                    >
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>
              </div>
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
              <div key={product.id} className="product-card product-card--wide">
                <div className="product-card__media" onClick={() => handleOpenProduct(product)}>
                  <img
                    src={product.angles[0]?.src || '/gallery/fountain-monolithic-fluted-basin.webp'}
                    alt={product.title}
                    loading="lazy"
                  />
                  <span className="product-badge">{product.badge}</span>
                  <div className="product-card__overlay">
                    <span className="btn-view-dossier">View Fountain Dossier ({product.angles.length} Angles) →</span>
                  </div>
                </div>

                <div className="product-card__content">
                  <div className="product-card__category">{product.primaryStone}</div>
                  <h3 className="product-card__title" onClick={() => handleOpenProduct(product)}>
                    {product.title}
                  </h3>
                  <p className="product-card__desc">{product.tagline}</p>

                  <div className="product-card__meta">
                    <div className="meta-dim">
                      <strong>Dimensions:</strong> {product.scale}
                    </div>
                  </div>

                  <div className="product-card__actions">
                    <button
                      type="button"
                      className="btn-primary-sm"
                      onClick={() => handleOpenProduct(product)}
                    >
                      <span>Multi-Angle Water Flow ({product.angles.length} Views)</span>
                      <span>→</span>
                    </button>
                    <button
                      type="button"
                      className="btn-outline-sm"
                      onClick={() => handleOpenInquiry(product)}
                    >
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>
              </div>
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
