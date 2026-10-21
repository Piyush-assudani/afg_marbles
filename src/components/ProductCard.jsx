'use client';
import { useState, useRef } from 'react';

export default function ProductCard({ product, onOpenProduct, onOpenInquiry }) {
  const [activeAngleIdx, setActiveAngleIdx] = useState(0);
  const touchStartX = useRef(null);

  const angles = product.angles || [
    {
      label: 'Main View',
      tag: 'Front Elevation',
      src: product.image || '/gallery/mandir-pure-makrana.webp',
      desc: product.title,
    },
  ];

  const currentAngle = angles[activeAngleIdx] || angles[0];

  const nextAngle = (e) => {
    e?.stopPropagation?.();
    setActiveAngleIdx((prev) => (prev + 1) % angles.length);
  };

  const prevAngle = (e) => {
    e?.stopPropagation?.();
    setActiveAngleIdx((prev) => (prev - 1 + angles.length) % angles.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextAngle();
      else prevAngle();
    }
    touchStartX.current = null;
  };

  const handleDirectWhatsApp = (e) => {
    e.stopPropagation();
    const text = `Namaste A.F.G Marble & Arts, I am inquiring about "${product.title}" (${product.primaryStone}, Scale: ${product.scale}). Please share pricing, Ayadi Vastu CAD drawings, and international dispatch details.`;
    const url = `https://wa.me/917597417274?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="creation-card product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* ============ INTERACTIVE MULTI-ANGLE MEDIA SLIDER ============ */}
      <div
        className="card-media product-card__media"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => onOpenProduct?.(product)}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        <img
          src={currentAngle.src}
          alt={`${product.title} - ${currentAngle.label}`}
          loading="lazy"
          className="product-card__main-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s ease' }}
        />

        {/* Top Badges */}
        <span className="card-badge product-badge" style={{ zIndex: 3 }}>
          {product.badge || 'Atelier Masterpiece'}
        </span>

        <span
          className="product-angles-count-badge"
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            zIndex: 3,
            background: 'rgba(20, 16, 12, 0.78)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#fff8eb',
            fontSize: '11px',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '999px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#d8bb84" strokeWidth="2.4">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>
            Angle {activeAngleIdx + 1}/{angles.length}
          </span>
        </span>

        {/* Overlay Arrow Buttons for Direct On-Card Sliding */}
        {angles.length > 1 && (
          <>
            <button
              type="button"
              className="card-slider-arrow card-slider-arrow--prev"
              onClick={prevAngle}
              aria-label="Previous angle"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="card-slider-arrow card-slider-arrow--next"
              onClick={nextAngle}
              aria-label="Next angle"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Angle Tag Floating Pill */}
        <div
          className="angle-tag-pill"
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '14px',
            zIndex: 3,
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#1c1813',
            fontSize: '11px',
            fontWeight: 600,
            padding: '3px 10px',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            letterSpacing: '0.04em',
          }}
        >
          {currentAngle.tag || currentAngle.label}
        </div>
      </div>

      {/* ============ CARD CONTENT ============ */}
      <div className="product-card__content" style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div
          className="product-card__top-meta"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}
        >
          <span
            className="product-card__category"
            style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: '#b08a4f', textTransform: 'uppercase' }}
          >
            {product.primaryStone}
          </span>
          <span className="product-card__rating" style={{ fontSize: '12px', fontWeight: 700, color: '#b08a4f' }}>
            ★ 5.0
          </span>
        </div>

        <h3
          className="product-card__title"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '20px',
            color: '#1c1813',
            marginBottom: '8px',
            cursor: 'pointer',
            lineHeight: 1.3,
            fontWeight: 500,
          }}
          onClick={() => onOpenProduct?.(product)}
        >
          {product.title}
        </h3>

        <p className="product-card__desc" style={{ fontSize: '13px', color: '#6b5f52', lineHeight: 1.5, marginBottom: '14px' }}>
          {product.tagline}
        </p>

        {/* Two-Column Specification Box (Matching Client Reference) */}
        <div
          className="product-card__specs-row"
          style={{
            padding: '10px 14px',
            background: '#fcfaf6',
            borderRadius: '6px',
            border: '1px solid rgba(176, 138, 79, 0.18)',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div className="meta-spec-item" style={{ fontSize: '12px', color: '#4a4239' }}>
            <span style={{ color: '#8c6a36', fontWeight: 600 }}>Material:</span> Pure Makrana
          </div>
          <div className="meta-spec-item" style={{ fontSize: '12px', color: '#4a4239' }}>
            <span style={{ color: '#8c6a36', fontWeight: 600 }}>Scale:</span> {product.scale}
          </div>
        </div>

        {/* Multi-Angle Mini Thumbnails Strip */}
        <div className="product-card__thumbs-strip" style={{ marginBottom: '18px' }}>
          {angles.map((ang, idx) => (
            <button
              key={idx}
              type="button"
              className={`mini-thumb-btn ${idx === activeAngleIdx ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveAngleIdx(idx)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveAngleIdx(idx);
              }}
              title={ang.label}
              style={{
                outline: 'none',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <img src={ang.src} alt={ang.label} />
              <span className="mini-tag">{ang.tag || `Angle ${idx + 1}`}</span>
            </button>
          ))}
        </div>

        {/* ============ LUXURY ACTION BUTTONS (Matching Client Reference) ============ */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Primary Pill: Inquire on WhatsApp */}
          <button
            type="button"
            className="btn-whatsapp-pill"
            onClick={handleDirectWhatsApp}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '12px 20px',
              background: '#25D366',
              color: '#ffffff',
              borderRadius: '999px',
              fontSize: '12.5px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
              transition: 'all 0.3s ease',
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.074-1.803-.412-1.493-.623-2.457-2.148-2.531-2.249-.074-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.137-.149.3-.187.4-.187.1 0 .2.001.288.006.096.005.226-.036.353.27.13.315.444 1.085.483 1.164.039.08.065.174.013.277-.052.104-.078.169-.156.259-.078.091-.164.202-.234.271-.078.078-.16.162-.069.319.091.156.404.667.868 1.08.597.532 1.099.697 1.255.775.156.078.247.065.338-.039.091-.104.39-.455.494-.611.104-.156.208-.13.351-.078.143.052.909.429 1.065.507.156.078.26.117.299.182.039.065.039.378-.105.783z" />
            </svg>
            <span>Inquire on WhatsApp</span>
          </button>

          {/* Secondary: View Architectural Dossier */}
          <button
            type="button"
            className="btn-dossier-pill"
            onClick={() => onOpenProduct?.(product)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 18px',
              background: 'transparent',
              color: '#1c1813',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 600,
              border: '1px solid rgba(28, 24, 19, 0.22)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <span>View Dossier ({angles.length} Angles)</span>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
