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
            <span>Catalog</span>
            <span>/</span>
            <span>Marble Fountains</span>
          </div>
          <h1>Hand-Carved Marble Fountains &amp; Water Features</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Handmade outdoor and indoor marble fountains made from 100% natural, solid white marble. Built to handle flowing water in all weather conditions without staining or cracking. Click any design below to see photos, dimensions, and get direct workshop prices.
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
