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
            Monumental centerpieces handcrafted in solid Makrana marble, Nero Marquina, and Italian Calacatta. Engineered for silent hydraulic balance, laminar water flow, and lifelong frost resistance. Hover or tap the angle thumbnails below to preview multiple fountain views.
          </p>
        </div>
      </section>

      {/* ============ FOUNTAINS CATALOG GRID ============ */}
      <section className="subpage-body">
        <div className="sec-container">
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
        </div>
      </section>

      {/* ============ THE AFG DIFFERENCE ============ */}
      <DifferenceTable onOpenInquiry={handleOpenInquiry} />

      {/* ============ ALL WE NEED IS YOUR SPACE DIMENSIONS ============ */}
      <ConsultationCard onOpenInquiry={handleOpenInquiry} />
    </>
  );
}
