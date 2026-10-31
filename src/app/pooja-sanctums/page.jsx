'use client';
import { useState } from 'react';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';
import PricingPhilosophy from '../../components/PricingPhilosophy';
import { PRODUCTS } from '../../products.js';

export default function PoojaSanctumsPage() {
  const allMandirs = PRODUCTS.filter((p) => p.category === 'mandir' || p.category === 'sanctum');
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? allMandirs
    : filter === 'contemporary'
    ? allMandirs.filter((m) => m.category === 'sanctum')
    : filter === 'traditional'
    ? allMandirs.filter((m) => m.category === 'mandir')
    : allMandirs.filter((m) => (m.primaryStone || '').toLowerCase().includes(filter));

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
            <span>Collections</span>
            <span>/</span>
            <span>Marble Temples</span>
          </div>
          <h1>Handcrafted Pure White Marble Temples</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Every temple is hand-carved from 100% pure Makrana white marble that never turns yellow and resists all puja stains. Click any design below to see all photos, check measurements, and get exact prices on WhatsApp.
          </p>

          {/* Filter Pills */}
          <div className="catalog-filter-bar">
            <button
              type="button"
              className={`filter-pill ${filter === 'all' ? 'is-active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Temples ({allMandirs.length})
            </button>
            <button
              type="button"
              className={`filter-pill ${filter === 'contemporary' ? 'is-active' : ''}`}
              onClick={() => setFilter('contemporary')}
            >
              Modern Home Temples
            </button>
            <button
              type="button"
              className={`filter-pill ${filter === 'traditional' ? 'is-active' : ''}`}
              onClick={() => setFilter('traditional')}
            >
              Traditional Spire Temples
            </button>
            <button
              type="button"
              className={`filter-pill ${filter === 'albeta' ? 'is-active' : ''}`}
              onClick={() => setFilter('albeta')}
            >
              Pure Makrana Marble
            </button>
          </div>
        </div>
      </section>

      {/* ============ SANCTUMS CATALOG GRID ============ */}
      <section className="subpage-body">
        <div className="sec-container">
          <div className="creations-grid">
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

      {/* ============ PRICING PHILOSOPHY & INVESTMENT TIERS ============ */}
      <PricingPhilosophy onOpenInquiry={handleOpenInquiry} />

      {/* ============ ALL WE NEED IS YOUR SPACE DIMENSIONS ============ */}
      <ConsultationCard onOpenInquiry={handleOpenInquiry} />
    </>
  );
}
