'use client';
import Link from 'next/link';
import ProductCard from '../../components/ProductCard';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';
import { PRODUCTS } from '../../products.js';

export default function HeritageChhatrisPage() {
  const chhatris = PRODUCTS.filter((p) => p.category === 'chhatri');

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
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Masterpiece Catalog</span>
            <span>/</span>
            <span>Royal Chhatris &amp; Pavilions</span>
          </div>
          <h1>Royal Makrana Chhatris &amp; Garden Pavilions</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Monumental octagonal pavilions, fluted ribbed domes, and pierced jali balustrades handcrafted in pure Makrana marble and Bansi Paharpur stone. Hand-sculpted by Silawat master stone-masons for palace gardens, luxury estates, and memorial sanctums.
          </p>
        </div>
      </section>

      {/* Chhatri Showcase Grid */}
      <section className="subpage-body">
        <div className="sec-container">
          <div className="creations-grid">
            {chhatris.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenProduct={handleOpenProduct}
                onOpenInquiry={handleOpenInquiry}
              />
            ))}

            {/* Additional Chhatri Models */}
            <div className="creation-card product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="card-media product-card__media">
                <img
                  src="/gallery/chhatri-garden-pavilion.webp"
                  alt="Udaipur Royal Lakefront Pavilion"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="card-badge product-badge" style={{ zIndex: 3 }}>Imperial Commission</span>
                <div className="angle-tag-pill" style={{ position: 'absolute', bottom: '12px', left: '14px', zIndex: 3, background: 'rgba(255, 255, 255, 0.92)', color: '#1c1813', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '4px' }}>
                  Estate Pavilion
                </div>
              </div>
              <div className="card-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#b08a4f', textTransform: 'uppercase', fontWeight: 600 }}>
                  Makrana &amp; Sandstone Plinth
                </span>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: '#1c1813', margin: '6px 0 8px' }}>
                  The Amber Palace Garden Pavilion
                </h3>
                <p style={{ fontSize: '13px', color: '#6b5f52', lineHeight: 1.55, marginBottom: '14px' }}>
                  Hexagonal carved pavilion with solid monolithic pillars, decorative brackets, and deep-chiseled eaves designed for outdoor weather resilience.
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <button
                    type="button"
                    className="btn-whatsapp-pill"
                    onClick={() => {
                      const text = 'Namaste AFG Marble, I am inquiring about The Amber Palace Garden Pavilion chhatri. Please share scale drawings and estimates.';
                      window.open(`https://wa.me/917597417274?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '9px',
                      padding: '12px 20px',
                      background: 'linear-gradient(135deg, #1c1813 0%, #2b241c 100%)',
                      color: '#ecd39b',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(212, 175, 55, 0.45)',
                      cursor: 'pointer',
                    }}
                  >
                    <span>Inquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="creation-card product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="card-media product-card__media">
                <img
                  src="/gallery/chhatri-torana-monumental-gate.webp"
                  alt="Ceremonial Torana Gateway"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="card-badge product-badge" style={{ zIndex: 3 }}>Architectural Gateway</span>
                <div className="angle-tag-pill" style={{ position: 'absolute', bottom: '12px', left: '14px', zIndex: 3, background: 'rgba(255, 255, 255, 0.92)', color: '#1c1813', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '4px' }}>
                  Torana Arch
                </div>
              </div>
              <div className="card-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#b08a4f', textTransform: 'uppercase', fontWeight: 600 }}>
                  Pure Makrana White Marble
                </span>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: '#1c1813', margin: '6px 0 8px' }}>
                  The Royal Torana Ceremonial Arch
                </h3>
                <p style={{ fontSize: '13px', color: '#6b5f52', lineHeight: 1.55, marginBottom: '14px' }}>
                  Ornate ceremonial gateway sculpted with sacred makara toranas, celestial musicians, and interlocking dry-joint stone lintels.
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <button
                    type="button"
                    className="btn-whatsapp-pill"
                    onClick={() => {
                      const text = 'Namaste AFG Marble, I am inquiring about The Royal Torana Ceremonial Arch. Please share CAD plans and estimates.';
                      window.open(`https://wa.me/917597417274?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '9px',
                      padding: '12px 20px',
                      background: 'linear-gradient(135deg, #1c1813 0%, #2b241c 100%)',
                      color: '#ecd39b',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(212, 175, 55, 0.45)',
                      cursor: 'pointer',
                    }}
                  >
                    <span>Inquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Difference Table & Consultation */}
      <DifferenceTable onOpenInquiry={handleOpenInquiry} />
      <ConsultationCard onOpenInquiry={handleOpenInquiry} />
    </>
  );
}
