'use client';
import { useState, useEffect } from 'react';

export default function ProductModal({ product, onClose, onInquire, onToast }) {
  const [activeAngleIdx, setActiveAngleIdx] = useState(0);

  useEffect(() => {
    setActiveAngleIdx(0);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const currentAngle = product.angles?.[activeAngleIdx] || product.angles?.[0] || {
    src: product.image || '/gallery/mandir-pure-makrana.webp',
    label: 'Primary Elevation',
    tag: 'Elevation',
    desc: product.title
  };

  const handleShareWhatsApp = () => {
    const shareUrl = `${window.location.origin}/pooja-sanctums#product/${product.id}`;
    const text = `Take a look at this breathtaking ${product.title} from A.F.G Marble & Arts: ${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/pooja-sanctums#product/${product.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        onToast?.('Dossier link copied to clipboard!');
      });
    } else {
      prompt('Copy product link:', shareUrl);
    }
  };

  const handleNativeShare = () => {
    const shareUrl = `${window.location.origin}/pooja-sanctums#product/${product.id}`;
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

  return (
    <div className="product-modal-backdrop" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close product view">
          ✕
        </button>

        <div className="product-modal__grid">
          {/* Left: Multi-Angle Interactive Gallery */}
          <div className="product-modal__gallery">
            <div className="gallery-main-view">
              <img
                src={currentAngle.src}
                alt={`${product.title} - ${currentAngle.label}`}
                className="gallery-main-img"
              />
              <span className="gallery-active-badge">{currentAngle.tag || currentAngle.label}</span>
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
                <strong>Rating:</strong> {product.rating || '5.0 (Artisan Verified)'}
              </div>
            </div>

            <div className="pm-section">
              <h4>Architectural Narrative</h4>
              <p>{product.fullDesc}</p>
            </div>

            {product.specs && (
              <div className="pm-section">
                <h4>Noble Specifications &amp; Shastra Compliance</h4>
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

            {/* Share Dossier Row */}
            <div className="pm-share-row">
              <span className="pm-share-label">Share Creation:</span>
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
                  `Hello AFG Marble, I am interested in inquiring about the "${product.title}" (${product.scale}, ${product.primaryStone}). Please share pricing and CAD elevation details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold"
              >
                <span>Instant WhatsApp Price &amp; CAD</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
