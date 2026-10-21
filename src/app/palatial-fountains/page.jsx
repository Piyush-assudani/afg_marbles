'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';
import { PRODUCTS } from '../../products.js';

export default function PalatialFountainsPage() {
  const fountains = PRODUCTS.filter((p) => p.category === 'fountain');

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
            <span>Palatial Estate Fountains</span>
          </div>
          <h1>Palatial Cascading Fountains &amp; Water Architecture</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Monumental centerpieces handcrafted in solid Makrana marble, Nero Marquina, and Italian Calacatta. Engineered for silent hydraulic balance, laminar water flow, and lifelong frost resistance.
          </p>
        </div>
      </section>

      {/* ============ FOUNTAINS CATALOG GRID ============ */}
      <section className="subpage-body">
        <div className="sec-container">
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

                  <div className="card-mini-angles-row">
                    {product.angles.map((a, i) => (
                      <span key={i} className="mini-angle-pill" onClick={() => handleOpenProduct(product)}>
                        {a.tag || a.label}
                      </span>
                    ))}
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
        </div>
      </section>

      {/* ============ THE AFG DIFFERENCE ============ */}
      <DifferenceTable onOpenInquiry={handleOpenInquiry} />

      {/* ============ ALL WE NEED IS YOUR SPACE DIMENSIONS ============ */}
      <ConsultationCard onOpenInquiry={handleOpenInquiry} />
    </>
  );
}
