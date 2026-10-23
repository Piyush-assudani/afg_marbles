'use client';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
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
            Monumental estate centerpieces sculpted exclusively from authentic Rajnagar White Marble—the revered hydraulic heavy calcite stone (2.72 g/cm³) engineered for continuous pressurized water cascades, zero algae adherence, and all-weather frost resilience. Hover or tap the angle thumbnails below to preview multiple fountain views.
          </p>
        </div>
      </section>

      {/* ============ FOUNTAINS CATALOG GRID ============ */}
      <section className="subpage-body">
        <div className="sec-container">
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
        </div>
      </section>

      {/* ============ THE AFG DIFFERENCE ============ */}
      <DifferenceTable onOpenInquiry={handleOpenInquiry} />

      {/* ============ ALL WE NEED IS YOUR SPACE DIMENSIONS ============ */}
      <ConsultationCard onOpenInquiry={handleOpenInquiry} />
    </>
  );
}
