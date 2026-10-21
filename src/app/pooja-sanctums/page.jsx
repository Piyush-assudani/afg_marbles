'use client';
import { useState } from 'react';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';
import { PRODUCTS } from '../../products.js';

export default function PoojaSanctumsPage() {
  const allMandirs = PRODUCTS.filter((p) => p.category === 'mandir');
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? allMandirs : allMandirs.filter((m) => m.primaryStone.toLowerCase().includes(filter));

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
      {/* ============ SUBPAGE HERO ============ */}
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Masterpiece Catalog</span>
            <span>/</span>
            <span>Pooja Sanctums &amp; Mandirs</span>
          </div>
          <h1>Handcrafted Marble Mandirs &amp; Pooja Sanctums</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Every sanctum is sculpted from flawless monolithic blocks of authentic Makrana Calcite marble. Designed in strict mathematical accordance with Ayadi Vastu Shastra for lifelong divine energy.
          </p>

          {/* Filter Pills */}
          <div className="catalog-filter-bar">
            <button
              type="button"
              className={`filter-pill ${filter === 'all' ? 'is-active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Sanctums ({allMandirs.length})
            </button>
            <button
              type="button"
              className={`filter-pill ${filter === 'albeta' ? 'is-active' : ''}`}
              onClick={() => setFilter('albeta')}
            >
              Pure Makrana Albeta
            </button>
            <button
              type="button"
              className={`filter-pill ${filter === 'dungri' ? 'is-active' : ''}`}
              onClick={() => setFilter('dungri')}
            >
              Makrana Dungri Natural Vein
            </button>
            <button
              type="button"
              className={`filter-pill ${filter === 'pink' ? 'is-active' : ''}`}
              onClick={() => setFilter('pink')}
            >
              Bansi Paharpur Pink Stone
            </button>
          </div>
        </div>
      </section>

      {/* ============ SANCTUMS CATALOG GRID ============ */}
      <section className="subpage-body">
        <div className="sec-container">
          <div className="products-grid-3">
            {filtered.map((product) => (
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
                      <strong>Dimensions:</strong> {product.scale}
                    </div>
                  </div>

                  {/* Multi-angle preview thumbnails */}
                  <div className="card-mini-angles-row">
                    {product.angles.slice(0, 4).map((a, i) => (
                      <span key={i} className="mini-angle-pill" onClick={() => handleOpenProduct(product)}>
                        {a.tag || a.label}
                      </span>
                    ))}
                    {product.angles.length > 4 && (
                      <span className="mini-angle-pill more" onClick={() => handleOpenProduct(product)}>
                        +{product.angles.length - 4} more
                      </span>
                    )}
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
        </div>
      </section>

      {/* ============ THE AFG DIFFERENCE ============ */}
      <DifferenceTable onOpenInquiry={handleOpenInquiry} />

      {/* ============ ALL WE NEED IS YOUR SPACE DIMENSIONS ============ */}
      <ConsultationCard onOpenInquiry={handleOpenInquiry} />
    </>
  );
}
