'use client';
import { useState } from 'react';

export default function ProductCard({ product, onOpenProduct, onOpenInquiry }) {
  const [activeAngleIdx, setActiveAngleIdx] = useState(0);

  const angles = product.angles || [
    {
      label: 'Main View',
      tag: 'Front',
      src: product.image || '/gallery/mandir-pure-makrana.webp',
      desc: product.title,
    },
  ];

  const currentAngle = angles[activeAngleIdx] || angles[0];

  return (
    <div className="creation-card product-card">
      <div className="card-media product-card__media">
        <img
          src={currentAngle.src}
          alt={`${product.title} - ${currentAngle.label}`}
          loading="lazy"
          className="product-card__main-img"
          onClick={() => onOpenProduct?.(product)}
        />
        <span className="card-badge product-badge">{product.badge || 'Atelier Creation'}</span>
        <span className="product-angles-count-badge">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>{angles.length} Angles</span>
        </span>

        {/* Quick Angle Switcher Overlay on Hover */}
        <div className="product-card__angle-selector">
          {angles.map((ang, idx) => (
            <button
              key={idx}
              type="button"
              className={`angle-dot-btn ${idx === activeAngleIdx ? 'is-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveAngleIdx(idx);
              }}
              title={ang.label}
            >
              <span></span>
            </button>
          ))}
        </div>
      </div>

      <div className="product-card__content" style={{ padding: '20px 24px' }}>
        <div className="product-card__top-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span className="product-card__category" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: '#b08a4f', textTransform: 'uppercase' }}>
            {product.primaryStone}
          </span>
          <span className="product-card__rating" style={{ fontSize: '12px', fontWeight: 700, color: '#b08a4f' }}>
            ★ 5.0
          </span>
        </div>

        <h3
          className="product-card__title"
          style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: '#1c1813', marginBottom: '8px', cursor: 'pointer', lineHeight: 1.3 }}
          onClick={() => onOpenProduct?.(product)}
        >
          {product.title}
        </h3>
        <p className="product-card__desc" style={{ fontSize: '13px', color: '#6b5f52', lineHeight: 1.5, marginBottom: '14px' }}>
          {product.tagline}
        </p>

        <div className="product-card__specs-row" style={{ padding: '8px 12px', background: '#fcfaf6', borderRadius: '6px', border: '1px solid rgba(176, 138, 79, 0.15)', marginBottom: '14px' }}>
          <div className="meta-spec-item" style={{ fontSize: '12px', color: '#4a4239' }}>
            <strong style={{ color: '#8c6a36' }}>Dimensions:</strong> {product.scale}
          </div>
        </div>

        {/* Interactive Multi-Angle Thumbnail Strip */}
        <div className="product-card__thumbs-strip">
          {angles.slice(0, 5).map((ang, idx) => (
            <button
              key={idx}
              type="button"
              className={`mini-thumb-btn ${idx === activeAngleIdx ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveAngleIdx(idx)}
              onClick={() => setActiveAngleIdx(idx)}
              title={ang.label}
            >
              <img src={ang.src} alt={ang.label} />
              <span className="mini-tag">{ang.tag || `Angle ${idx + 1}`}</span>
            </button>
          ))}
          {angles.length > 5 && (
            <button
              type="button"
              className="mini-thumb-btn mini-thumb-more"
              onClick={() => onOpenProduct?.(product)}
              title="View all angles"
            >
              <span>+{angles.length - 5}</span>
            </button>
          )}
        </div>

        <div className="product-card__actions" style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
          <button
            type="button"
            className="btn-primary-sm"
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px 14px', background: 'linear-gradient(135deg, #1c1813, #383026)', color: '#f7f3ec', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}
            onClick={() => onOpenProduct?.(product)}
          >
            <span>Dossier ({angles.length} Angles)</span>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="btn-outline-sm"
            style={{ padding: '10px 14px', border: '1px solid #b08a4f', color: '#8c6a36', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}
            onClick={() => onOpenInquiry?.(product)}
          >
            <span>Inquire</span>
          </button>
        </div>
      </div>
    </div>
  );
}
