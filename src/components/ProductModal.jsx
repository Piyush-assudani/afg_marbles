'use client';
import { useState, useEffect } from 'react';

export default function ProductModal({ product, onClose, onInquire, onToast }) {
  const [activeAngleIdx, setActiveAngleIdx] = useState(0);

  const angles = product?.angles || [];

  const nextAngle = () => {
    if (angles.length > 1) {
      setActiveAngleIdx((prev) => (prev + 1) % angles.length);
    }
  };

  const prevAngle = () => {
    if (angles.length > 1) {
      setActiveAngleIdx((prev) => (prev - 1 + angles.length) % angles.length);
    }
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    setActiveAngleIdx(0);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextAngle();
      if (e.key === 'ArrowLeft') prevAngle();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose, angles.length]);

  if (!product) return null;

  const currentAngle = product.angles?.[activeAngleIdx] || product.angles?.[0] || {
    src: product.image || '/gallery/mandir-pure-makrana.webp',
    label: 'Primary Elevation',
    tag: 'Elevation',
    desc: product.title
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

  const handleShareWhatsApp = () => {
    const shareUrl = getProductUrl();
    const text = `Look at this architectural masterpiece from A.F.G Marble & Arts: "${product.title}" (${product.scale}, ${product.primaryStone}): ${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    const shareUrl = getProductUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        onToast?.('Dossier link copied to clipboard!');
      });
    } else {
      prompt('Copy product link:', shareUrl);
    }
  };

  const handleNativeShare = () => {
    const shareUrl = getProductUrl();
    if (navigator.share) {
      navigator
        .share({
          title: `${product.title} — A.F.G Marble & Arts`,
          text: product.tagline || product.fullDesc,
          url: shareUrl
        })
        .catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const [activeTab, setActiveTab] = useState('specs');

  return (
    <div className="product-modal-backdrop is-open" onClick={onClose}>
      <div className="product-modal is-open" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close product view">
          ✕
        </button>

        <div className="product-modal__grid">
          {/* Left: Multi-Angle Interactive Gallery */}
          <div className="product-modal__gallery">
            <div className="gallery-main-view" style={{ position: 'relative' }}>
              <img
                src={currentAngle.src}
                alt={`${product.title} - ${currentAngle.label}`}
                className="gallery-main-img"
              />
              <span className="gallery-active-badge">{currentAngle.tag || currentAngle.label}</span>
              {angles.length > 1 && (
                <>
                  <button
                    type="button"
                    className="modal-gallery-arrow modal-gallery-arrow--prev"
                    onClick={prevAngle}
                    aria-label="Previous angle"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="modal-gallery-arrow modal-gallery-arrow--next"
                    onClick={nextAngle}
                    aria-label="Next angle"
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            <p className="gallery-angle-desc">{currentAngle.desc}</p>

            {/* Thumbnails Row */}
            <div className="gallery-thumbs-row">
              {product.angles?.map((angle, idx) => (
                <button
                  key={idx}
                  className={`gallery-thumb ${idx === activeAngleIdx ? 'is-active' : ''}`}
                  onClick={() => setActiveAngleIdx(idx)}
                  type="button"
                >
                  <img src={angle.src} alt={angle.label} />
                  <span className="thumb-label">{angle.tag || angle.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Architectural Dossier & Inquiries */}
          <div className="product-modal__info">
            <div className="pm-header">
              <span className="card-badge">{product.badge || 'Atelier Masterpiece'}</span>
              <h2>{product.title}</h2>
              <p className="pm-tagline">{product.tagline}</p>
            </div>

            <div className="pm-meta-pills">
              <div className="pm-pill">
                <strong>Dimensions:</strong> {product.scale}
              </div>
              <div className="pm-pill">
                <strong>Primary Stone:</strong> {product.primaryStone}
              </div>
              <div className="pm-pill">
                <strong>Certification:</strong> Certified 99% Calcite Bedrock
              </div>
            </div>

            {/* Bespoke Sizing Notice (Direct clarity: No fixed checkout prices, custom to client space) */}
            <div
              style={{
                padding: '10px 14px',
                background: 'rgba(176, 138, 79, 0.08)',
                borderRadius: '8px',
                borderLeft: '3px solid #b08a4f',
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong style={{ fontSize: '12px', color: '#1c1813', display: 'block' }}>
                  Commissioned to Your Exact Space Dimensions
                </strong>
                <span style={{ fontSize: '11px', color: '#6b5f52' }}>
                  3D CAD elevations &amp; marble volume estimates provided within 24 hours
                </span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#8c6a36' }}>Bespoke</span>
            </div>

            {/* Deep Specification Tabs */}
            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid rgba(28, 24, 19, 0.14)',
                marginBottom: '16px',
                gap: '8px',
              }}
            >
              {[
                { id: 'specs', label: 'Architecture & Specs' },
                { id: 'vastu', label: 'Vastu & Mineral Science' },
                { id: 'shipping', label: 'Crating & Assembly' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === tab.id ? '2px solid #b08a4f' : '2px solid transparent',
                    color: activeTab === tab.id ? '#1c1813' : '#8a8073',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Architecture & Specs */}
            {activeTab === 'specs' && (
              <>
                <div className="pm-section">
                  <h4>Architectural Narrative</h4>
                  <p>{product.fullDesc}</p>
                </div>

                {product.specs && (
                  <div className="pm-section">
                    <h4>Architectural Specifications</h4>
                    <div className="pm-specs-grid">
                      {product.specs.map((s, idx) => (
                        <div key={idx} className="pm-spec-row">
                          <span className="pm-spec-label">{s.label}:</span>
                          <span className="pm-spec-value">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Tab 2: Vastu & Mineral Science */}
            {activeTab === 'vastu' && (
              <div className="pm-section">
                <h4>Sacred Sthapatya Veda &amp; Calcite Purity</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#4a4239', lineHeight: 1.6 }}>
                  <div style={{ background: '#fcfaf6', padding: '12px 14px', borderRadius: '6px', border: '1px solid rgba(176,138,79,0.15)' }}>
                    <strong style={{ color: '#1c1813', display: 'block', marginBottom: '4px' }}>Ayadi Metric: Dhana &amp; Vriddhi Aya</strong>
                    <span>Perimeter and height conform to sacred Golden Ratio harmonic frequencies to ensure maximum auspiciousness for home worship.</span>
                  </div>
                  <div style={{ background: '#fcfaf6', padding: '12px 14px', borderRadius: '6px', border: '1px solid rgba(176,138,79,0.15)' }}>
                    <strong style={{ color: '#1c1813', display: 'block', marginBottom: '4px' }}>Zero-Yellowing Calcite Mineral Structure</strong>
                    <span>Certified 99% pure CaCO3 calcite mined directly from Makrana. Completely non-porous (absorption &lt; 0.04%). Safe for daily milk, honey, ghee, and oil lamp rituals.</span>
                  </div>
                  <div style={{ background: '#fcfaf6', padding: '12px 14px', borderRadius: '6px', border: '1px solid rgba(176,138,79,0.15)' }}>
                    <strong style={{ color: '#1c1813', display: 'block', marginBottom: '4px' }}>Smoke Dissipation Spire Engineering</strong>
                    <span>Concealed draft flues at the shikhara apex allow camphor and agarbatti smoke to naturally vent without blackening the marble.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Crating & Assembly */}
            {activeTab === 'shipping' && (
              <div className="pm-section">
                <h4>International Crating &amp; White-Glove Installation</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#4a4239', lineHeight: 1.6 }}>
                  <div style={{ background: '#fcfaf6', padding: '12px 14px', borderRadius: '6px', border: '1px solid rgba(176,138,79,0.15)' }}>
                    <strong style={{ color: '#1c1813', display: 'block', marginBottom: '4px' }}>ISPM-15 Certified Pine Crates</strong>
                    <span>Custom fumigated marine plywood casing with 50mm high-density shock EVA foam lining and external Tip-N-Tell shock monitors.</span>
                  </div>
                  <div style={{ background: '#fcfaf6', padding: '12px 14px', borderRadius: '6px', border: '1px solid rgba(176,138,79,0.15)' }}>
                    <strong style={{ color: '#1c1813', display: 'block', marginBottom: '4px' }}>4 to 6 Hour Dry-Joint Assembly</strong>
                    <span>Interlocking modular stone blocks are discretely numbered. Requires zero wet mortar or cement, enabling clean indoor setup.</span>
                  </div>
                  <div style={{ background: '#fcfaf6', padding: '12px 14px', borderRadius: '6px', border: '1px solid rgba(176,138,79,0.15)' }}>
                    <strong style={{ color: '#1c1813', display: 'block', marginBottom: '4px' }}>Worldwide Customs Clearance</strong>
                    <span>Seamless doorstep transit across USA, UK, UAE, Australia, Canada, Singapore, and pan-India.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Share Dossier Row */}
            <div className="pm-share-row" style={{ marginTop: '16px' }}>
              <span className="pm-share-label">Direct Share Creation:</span>
              <button
                type="button"
                className="btn-share-icon"
                onClick={handleShareWhatsApp}
                title="Share on WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
                </svg>
                <span>WhatsApp</span>
              </button>
              <button
                type="button"
                className="btn-share-icon"
                onClick={handleCopyLink}
                title="Copy Link"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>Copy Link</span>
              </button>
              {typeof navigator !== 'undefined' && navigator.share && (
                <button
                  type="button"
                  className="btn-share-icon"
                  onClick={handleNativeShare}
                  title="More Sharing Options"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  <span>Share</span>
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="pm-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  onClose();
                  onInquire?.(product);
                }}
              >
                <span className="btn-primary__text">Inquire on This Masterpiece</span>
                <span className="btn-primary__icon">→</span>
              </button>
              <a
                href={`https://wa.me/917597417274?text=${encodeURIComponent(
                  `Namaste AFG Marble, I am inquiring about "${product.title}" (${product.scale}, ${product.primaryStone}). Please share 3D CAD drawings and bespoke volume-based estimate.\n\nProduct Link: ${getProductUrl()}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold"
              >
                <span>Instant WhatsApp 3D CAD &amp; Pricing</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
