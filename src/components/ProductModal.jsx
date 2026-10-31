'use client';
import { useState, useEffect } from 'react';
import { X, Maximize2 } from 'lucide-react';

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
    const text = `Look at this beautiful marble design from A.F.G Marble & Arts: "${product.title}" (${product.scale}, ${product.primaryStone}): ${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    const shareUrl = getProductUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        onToast?.('Link copied to clipboard!');
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
          <X size={18} />
        </button>

        {/* ============ TOP OVERVIEW: 2 COLUMNS (Gallery on left, Core Info & Inquiries on right) ============ */}
        <div className="product-modal__top-grid">
          {/* Left: Multi-Angle Interactive Gallery */}
          <div className="product-modal__gallery">
            <div
              className="gallery-main-view"
              style={{ position: 'relative', cursor: 'zoom-in' }}
              onClick={() => {
                if (typeof window !== 'undefined' && window.afgOpenLightbox) {
                  window.afgOpenLightbox({
                    src: currentAngle.src,
                    title: product.title,
                    tag: `${product.primaryStone || 'Makrana Calcite'} · ${currentAngle.tag || currentAngle.label}`
                  });
                }
              }}
            >
              <img
                src={currentAngle.src}
                alt={`${product.title} - ${currentAngle.label}`}
                className="gallery-main-img"
              />
              <span className="gallery-active-badge">{currentAngle.tag || currentAngle.label}</span>

              {/* Floating Fullscreen Trigger Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof window !== 'undefined' && window.afgOpenLightbox) {
                    window.afgOpenLightbox({
                      src: currentAngle.src,
                      title: product.title,
                      tag: `${product.primaryStone || 'Makrana Calcite'} · ${currentAngle.tag || currentAngle.label}`
                    });
                  }
                }}
                title="Fullscreen 4K Zoom"
                aria-label="Fullscreen 4K Zoom"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(26, 21, 16, 0.88)',
                  backdropFilter: 'blur(8px)',
                  color: '#ecd39b',
                  border: '1px solid rgba(212, 175, 55, 0.45)',
                  borderRadius: '999px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  zIndex: 3
                }}
              >
                <Maximize2 size={13} />
                <span>Zoom 4K</span>
              </button>

              {angles.length > 1 && (
                <>
                  <button
                    type="button"
                    className="modal-gallery-arrow modal-gallery-arrow--prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevAngle();
                    }}
                    aria-label="Previous angle"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="modal-gallery-arrow modal-gallery-arrow--next"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextAngle();
                    }}
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

          {/* Right: Product Details & Primary Inquiries */}
          <div className="product-modal__overview">
            <div className="pm-header">
              <span className="card-badge">{product.badge || 'Handmade Temple'}</span>
              <h2>{product.title}</h2>
              <p className="pm-tagline">{product.tagline}</p>
            </div>

            <div className="pm-meta-pills">
              <div className="pm-pill">
                <strong>Dimensions:</strong> {product.scale.replace(/^Size\s*=\s*/, '')}
              </div>
              <div className="pm-pill">
                <strong>Marble Type:</strong> {product.primaryStone}
              </div>
              <div className="pm-pill">
                <strong>Quality:</strong> 100% Pure Natural Marble
              </div>
            </div>

            {/* E-Commerce Live Stock & Atelier Availability Status */}
            <div className="pm-stock-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#128c7e', display: 'inline-block' }}></span>
                <span style={{ color: '#0b5c52', fontWeight: 600 }}>In Stock — Custom Made to Your Size</span>
              </div>
              <span style={{ color: '#0b5c52', fontSize: '11px', fontWeight: 500 }}>Crafting Time: 30–45 Days</span>
            </div>

            {/* Bespoke Sizing Notice & Interactive Space Calculator */}
            <div className="pm-bespoke-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ fontSize: '13px', color: '#1c1813' }}>
                  Made to Fit Your Exact Room Size
                </strong>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#8c6a36', background: 'rgba(176,138,79,0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                  Custom Size
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#6b5f52', margin: '0 0 10px', lineHeight: 1.5 }}>
                Share your room measurements with us. We will create a clear 2D design drawing showing front and side views within 24 hours.
              </p>
              
              {/* E-Commerce Quick Trust Hallmarks */}
              <div className="pm-trust-hallmarks">
                <div><span style={{ color: '#b08a4f' }}>✓</span> 100% Pure Natural Marble</div>
                <div><span style={{ color: '#b08a4f' }}>✓</span> Free 2D Design Drawing</div>
                <div><span style={{ color: '#b08a4f' }}>✓</span> Pre-Delivery Video Check</div>
                <div><span style={{ color: '#b08a4f' }}>✓</span> Safe Home Delivery &amp; Setup</div>
              </div>
            </div>

            {/* Top Primary Actions */}
            <div className="pm-top-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  onClose();
                  onInquire?.(product);
                }}
              >
                <span className="btn-primary__text">Get Price &amp; Details</span>
                <span className="btn-primary__icon">→</span>
              </button>
              <a
                href={`https://wa.me/917597417274?text=${encodeURIComponent(
                  `Hello AFG Marble, I am interested in "${product.title}" (${product.scale}, ${product.primaryStone}). Please share the exact price, dimensions, and drawings.\n\nProduct Link: ${getProductUrl()}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold"
              >
                <span>Get Price &amp; Details on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* ============ FULL-WIDTH DEEP DETAILS SECTION ============ */}
        <div className="product-modal__full-dossier">
          {/* Deep Specification Tabs */}
          <div className="pm-full-tabs">
            {[
              { id: 'specs', label: 'About & Size' },
              { id: 'vastu', label: 'Vastu & Marble Quality' },
              { id: 'shipping', label: 'Packing & Safe Delivery' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`pm-full-tab-btn ${activeTab === tab.id ? 'is-active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Architecture & Specs */}
          {activeTab === 'specs' && (
            <div className="pm-dossier-tab-pane">
              <div className="pm-narrative-box">
                <h4 className="pm-dossier-heading">About This Design</h4>
                <p className="pm-narrative-text">{product.fullDesc}</p>
              </div>

              {product.specs && (
                <div className="pm-specs-container">
                  <h4 className="pm-dossier-heading">Product Specifications</h4>
                  <div className="pm-specs-full-grid">
                    {product.specs.map((s, idx) => (
                      <div key={idx} className="pm-spec-card">
                        <span className="pm-spec-card__label">{s.label}:</span>
                        <span className="pm-spec-card__value">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Vastu & Mineral Science */}
          {activeTab === 'vastu' && (
            <div className="pm-dossier-tab-pane">
              <h4 className="pm-dossier-heading">Vastu Alignment &amp; Marble Quality</h4>
              <div className="pm-vastu-cards-grid">
                <div className="pm-feature-card">
                  <span className="pm-feature-card__badge">VASTU SHASTRA</span>
                  <h5>Built According to Vastu</h5>
                  <p>Designed strictly according to sacred Vastu principles to bring peace, prosperity, and positive spiritual energy to your home.</p>
                </div>
                <div className="pm-feature-card">
                  <span className="pm-feature-card__badge">100% STAIN-FREE</span>
                  <h5>Pure Makrana Marble — Never Turns Yellow</h5>
                  <p>Certified 100% pure white marble mined directly from Makrana. Completely stain-resistant and safe for daily puja with milk, water, and diya oil.</p>
                </div>
                <div className="pm-feature-card">
                  <span className="pm-feature-card__badge">EASY CLEANING</span>
                  <h5>Natural Smoke Ventilation</h5>
                  <p>Concealed roof vents allow dhoop and agarbatti smoke to vent naturally, keeping your white marble mandir ceiling bright and soot-free.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Crating & Assembly */}
          {activeTab === 'shipping' && (
            <div className="pm-dossier-tab-pane">
              <h4 className="pm-dossier-heading">Safe Packing &amp; Easy Home Delivery</h4>
              <div className="pm-vastu-cards-grid">
                <div className="pm-feature-card">
                  <span className="pm-feature-card__badge">SAFE PACKING</span>
                  <h5>Strong Wooden Box Packing</h5>
                  <p>Strong wooden boxes packed with thick protective foam to keep every marble piece 100% safe during shipping across India and worldwide.</p>
                </div>
                <div className="pm-feature-card">
                  <span className="pm-feature-card__badge">EASY ASSEMBLY</span>
                  <h5>Easy 4-Hour Assembly (No Mess)</h5>
                  <p>Numbered interlocking marble pieces fit together easily in just 4 to 6 hours. Completely clean setup with zero dust, cement, or chemical glue inside your home.</p>
                </div>
                <div className="pm-feature-card">
                  <span className="pm-feature-card__badge">WORLDWIDE DELIVERY</span>
                  <h5>Safe Doorstep Delivery Everywhere</h5>
                  <p>Safe doorstep delivery with professional setup assistance across India and abroad (USA, UK, UAE, Canada, Australia, and worldwide).</p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Bar: Direct Share Row & Secondary Actions */}
          <div className="pm-bottom-bar">
            <div className="pm-share-row">
              <span className="pm-share-label">Share This Design:</span>
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

            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                onClose();
                onInquire?.(product);
              }}
            >
              <span className="btn-primary__text">Get Price &amp; Details</span>
              <span className="btn-primary__icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
