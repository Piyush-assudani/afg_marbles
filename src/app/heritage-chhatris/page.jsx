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
            <span>Catalog</span>
            <span>/</span>
            <span>Marble Chhatris &amp; Pavilions</span>
          </div>
          <h1>Handcrafted Marble Chhatris &amp; Garden Pavilions</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Handcrafted solid white marble pavilions and garden chhatris with carved pillars, domes, and jali railings. Built from 100% natural Makrana marble by traditional artisans for private gardens, estates, and memorials.
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
                  src="/gallery/royal-heritage-garden-pavilion.webp"
                  alt="Royal Heritage Garden Pavilion"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="card-badge product-badge" style={{ zIndex: 3 }}>Custom Made Design</span>
                <div className="angle-tag-pill" style={{ position: 'absolute', bottom: '12px', left: '14px', zIndex: 3, background: 'rgba(255, 255, 255, 0.92)', color: '#1c1813', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '4px' }}>
                  Garden Pavilion
                </div>
              </div>
              <div className="card-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#b08a4f', textTransform: 'uppercase', fontWeight: 600 }}>
                  100% Natural Makrana Marble
                </span>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: '#1c1813', margin: '6px 0 8px' }}>
                  Royal Heritage Garden Pavilion
                </h3>
                <p style={{ fontSize: '13px', color: '#6b5f52', lineHeight: 1.55, marginBottom: '14px' }}>
                  Carved pure white marble garden pavilion with handcrafted pillars, decorative arches, and weather-proof dome for outdoor luxury gardens and farmhouses.
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <button
                    type="button"
                    className="btn-whatsapp-pill"
                    onClick={() => {
                      const text = 'Namaste AFG Marble, I am inquiring about the Royal Heritage Garden Pavilion chhatri. Please share design drawings and price details.';
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
                    <span>Get Price &amp; Details</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="creation-card product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="card-media product-card__media">
                <img
                  src="/gallery/mandir-peacock-torana-8341.webp"
                  alt="Makrana White Marble Entrance Gate"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="card-badge product-badge" style={{ zIndex: 3 }}>Temple Entrance Gate</span>
                <div className="angle-tag-pill" style={{ position: 'absolute', bottom: '12px', left: '14px', zIndex: 3, background: 'rgba(255, 255, 255, 0.92)', color: '#1c1813', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '4px' }}>
                  Temple Entrance Gate
                </div>
              </div>
              <div className="card-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#b08a4f', textTransform: 'uppercase', fontWeight: 600 }}>
                  100% Natural Makrana Marble
                </span>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: '#1c1813', margin: '6px 0 8px' }}>
                  Makrana White Marble Entrance Gate
                </h3>
                <p style={{ fontSize: '13px', color: '#6b5f52', lineHeight: 1.55, marginBottom: '14px' }}>
                  Grand hand-carved pure white Makrana marble temple entrance gate with carved pillars, decorative peacock torana arches, and traditional stone lintels.
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <button
                    type="button"
                    className="btn-whatsapp-pill"
                    onClick={() => {
                      const text = 'Namaste AFG Marble, I am inquiring about the Makrana White Marble Entrance Gate. Please share design drawings and price details.';
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
                    <span>Get Price &amp; Details</span>
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
