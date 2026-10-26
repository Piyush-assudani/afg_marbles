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

  const getProductUrl = () => {
    if (typeof window === 'undefined') return '';
    const origin = window.location.origin;
    const cat = product?.category;
    let path = '/pooja-sanctums';
    if (cat === 'fountain') path = '/palatial-fountains';
    else if (cat === 'chhatri') path = '/heritage-chhatris';
    else if (cat === 'murti') path = '/marble-deities';
    else if (cat === 'jaali') path = '/jaali-screens';
    else if (cat === 'inlay') path = '/pietra-dura-inlay';
    return `${origin}${path}#product/${product.id}`;
  };

  const handleShare = (e) => {
    e?.stopPropagation?.();
    const shareUrl = getProductUrl();
    const shareText = `Discover this architectural masterpiece from A.F.G Marble & Arts: "${product.title}" (${product.primaryStone}, Scale: ${product.scale}) — ${shareUrl}`;

    if (navigator.share) {
      navigator
        .share({
          title: `${product.title} — A.F.G Marble`,
          text: shareText,
          url: shareUrl,
        })
        .catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        if (typeof window !== 'undefined' && window.afgToast) {
          window.afgToast(`Link for "${product.title}" copied to clipboard!`);
        }
      });
    } else {
      const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(waUrl, '_blank');
    }
  };

  const handleShareWhatsAppDirect = (e) => {
    e?.stopPropagation?.();
    const shareUrl = getProductUrl();
    const shareText = `Look at this authentic creation from A.F.G Marble & Arts: "${product.title}" (${product.primaryStone}, Scale: ${product.scale}) — ${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleDirectWhatsApp = (e) => {
    e.stopPropagation();
    const shareUrl = getProductUrl();
    const text = `Namaste A.F.G Marble & Arts, I am inquiring about "${product.title}" (${product.primaryStone}, Scale: ${product.scale}). Please share bespoke pricing, Ayadi Vastu CAD blueprint, and dispatch details.\n\nProduct Link: ${shareUrl}`;
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
        style={{
          cursor: 'pointer',
          position: 'relative',
          width: '100%',
          height: '280px',
          overflow: 'hidden',
          backgroundColor: '#efe9df',
        }}
      >
        <img
          src={currentAngle.src}
          alt={`${product.title} - ${currentAngle.label}`}
          loading="lazy"
          className="product-card__main-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            display: 'block',
            transition: 'opacity 0.3s ease, transform 0.6s ease',
          }}
        />

        {/* Top Badges */}
        <span className="card-badge product-badge" style={{ zIndex: 3 }}>
          {product.badge || 'Atelier Masterpiece'}
        </span>

        {/* Floating 1-Click Share Button on Image */}
        <button
          type="button"
          onClick={handleShare}
          title="Direct Share Product"
          aria-label="Direct Share Product"
          style={{
            position: 'absolute',
            top: '14px',
            right: angles.length > 1 ? '108px' : '14px',
            zIndex: 4,
            background: 'rgba(20, 16, 12, 0.82)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: '#ecd39b',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(212, 175, 55, 0.45)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.background = 'rgba(28, 24, 19, 0.95)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = 'rgba(20, 16, 12, 0.82)';
          }}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>

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
            {activeAngleIdx + 1}/{angles.length}
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
          <span
            className="product-card__verified-badge"
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#8c6a36',
              background: 'rgba(176, 138, 79, 0.12)',
              padding: '2px 8px',
              borderRadius: '4px',
              letterSpacing: '0.03em',
            }}
          >
            ✓ Authentic Bedrock
          </span>
        </div>

        <h3
          className="product-card__title"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '19px',
            color: '#1c1813',
            marginBottom: '8px',
            cursor: 'pointer',
            lineHeight: 1.35,
            fontWeight: 500,
            minHeight: '52px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
          onClick={() => onOpenProduct?.(product)}
        >
          {product.title}
        </h3>

        <p
          className="product-card__desc"
          style={{
            fontSize: '13px',
            color: '#6b5f52',
            lineHeight: 1.5,
            marginBottom: '14px',
            minHeight: '40px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
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
            marginBottom: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div className="meta-spec-item" style={{ fontSize: '12px', color: '#4a4239' }}>
            <span style={{ color: '#8c6a36', fontWeight: 600 }}>Material:</span> Pure Makrana
          </div>
          <div className="meta-spec-item" style={{ fontSize: '12px', color: '#4a4239' }}>
            <span style={{ color: '#8c6a36', fontWeight: 600 }}>Scale:</span> {product.scale.replace(/^Size\s*=\s*/, '')}
          </div>
        </div>

        {/* E-Commerce Bespoke Pricing Statement (Direct clarity: No fixed checkout prices, custom to client space) */}
        <div
          style={{
            padding: '8px 12px',
            background: 'rgba(176, 138, 79, 0.08)',
            borderRadius: '6px',
            borderLeft: '3px solid #b08a4f',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8c6a36', fontWeight: 700, display: 'block' }}>
              Custom Commission
            </span>
            <span style={{ fontSize: '12px', color: '#1c1813', fontWeight: 600 }}>Bespoke to Your Space</span>
          </div>
          <span style={{ fontSize: '11px', color: '#7a6f62', fontWeight: 500 }}>2D CAD Blueprint</span>
        </div>

        {/* Multi-Angle Mini Thumbnails Strip */}
        <div
          className="product-card__thumbs-strip"
          style={{
            marginBottom: '18px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            height: '46px',
          }}
        >
          {angles.slice(0, 4).map((ang, idx) => (
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
                width: '44px',
                height: '44px',
                borderRadius: '6px',
                overflow: 'hidden',
                padding: 0,
                border: idx === activeAngleIdx ? '2px solid #b08a4f' : '1px solid rgba(176, 138, 79, 0.25)',
                outline: 'none',
                cursor: 'pointer',
                position: 'relative',
                flexShrink: 0,
                backgroundColor: '#efe9df',
              }}
            >
              <img src={ang.src} alt={ang.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>

        {/* ============ LUXURY ACTION BUTTONS & INSTANT SHARING ============ */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Primary Action: Open Tilak-Style Smart Inquiry Modal */}
          <button
            type="button"
            className="btn-inquire-pill"
            onClick={() => onOpenInquiry?.(product)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '9px',
              padding: '12px 20px',
              background: 'linear-gradient(135deg, #7c4d28 0%, #522f14 100%)',
              color: '#ffffff',
              borderRadius: '999px',
              fontSize: '12.5px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(124, 77, 40, 0.28)',
              transition: 'all 0.3s ease',
            }}
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Inquire &amp; Get Price</span>
          </button>

          {/* Secondary Triple Action Row: Direct WhatsApp, Share & View Dossier */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
            <button
              type="button"
              className="btn-whatsapp-pill"
              onClick={handleDirectWhatsApp}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '9px 12px',
                background: '#25D366',
                color: '#ffffff',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.074-1.803-.412-1.493-.623-2.457-2.148-2.531-2.249-.074-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.137-.149.3-.187.4-.187.1 0 .2.001.288.006.096.005.226-.036.353.27.13.315.444 1.085.483 1.164.039.08.065.174.013.277-.052.104-.078.169-.156.259-.078.091-.164.202-.234.271-.078.078-.16.162-.069.319.091.156.404.667.868 1.08.597.532 1.099.697 1.255.775.156.078.247.065.338-.039.091-.104.39-.455.494-.611.104-.156.208-.13.351-.078.143.052.909.429 1.065.507.156.078.26.117.299.182.039.065.039.378-.105.783z" />
              </svg>
              <span>WhatsApp</span>
            </button>
            {/* Direct Share Button */}
            <button
              type="button"
              className="btn-share-pill"
              onClick={handleShare}
              title="Share this product"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 12px',
                background: '#fcfaf6',
                color: '#1c1813',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 600,
                border: '1px solid rgba(176, 138, 79, 0.35)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#b08a4f" strokeWidth="2.2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              <span>Share</span>
            </button>

            {/* View Dossier Button */}
            <button
              type="button"
              className="btn-dossier-pill"
              onClick={() => onOpenProduct?.(product)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 12px',
                background: 'transparent',
                color: '#1c1813',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 600,
                border: '1px solid rgba(28, 24, 19, 0.22)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Dossier ({angles.length})</span>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
