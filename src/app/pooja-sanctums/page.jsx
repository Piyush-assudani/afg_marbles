'use client';
import { useState } from 'react';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
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
            Every sanctum is sculpted from flawless monolithic blocks of authentic Makrana Calcite marble. Designed in strict mathematical accordance with Ayadi Vastu Shastra for lifelong divine energy. Hover or tap the thumbnail angles below to inspect front, 3/4 perspective, jali doors, and architectural elevation.
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
