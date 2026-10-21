'use client';
import { useState } from 'react';

export default function ProductCard({ product, onOpenProduct, onOpenInquiry }) {
  const [activeAngleIdx, setActiveAngleIdx] = useState(0);

  const angles = product.angles || [
    {
      label: 'Main View',
      tag: 'Front',
      src: product.image || '/gallery/mandir-pure-makrana.webp',
      desc: product.title
    }
  ];

  const currentAngle = angles[activeAngleIdx] || angles[0];

  return (
    <div className="product-card">
      <div className="product-card__media">
        <img
          src={currentAngle.src}
          alt={`${product.title} - ${currentAngle.label}`}
          loading="lazy"
          className="product-card__main-img"
          onClick={() => onOpenProduct?.(product)}
        />
        <span className="product-badge">{product.badge || 'Atelier Creation'}</span>
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

      <div className="product-card__content">
        <div className="product-card__top-meta">
          <span className="product-card__category">{product.primaryStone}</span>
          <span className="product-card__rating">★ 5.0</span>
        </div>

        <h3 className="product-card__title" onClick={() => onOpenProduct?.(product)}>
          {product.title}
        </h3>
        <p className="product-card__desc">{product.tagline}</p>

        <div className="product-card__specs-row">
          <div className="meta-spec-item">
            <span className="lbl">Scale:</span>
            <span className="val">{product.scale}</span>
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

        <div className="product-card__actions">
          <button
            type="button"
            className="btn-primary-sm"
            onClick={() => onOpenProduct?.(product)}
          >
            <span>Architectural Dossier ({angles.length} Angles)</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="btn-outline-sm"
            onClick={() => onOpenInquiry?.(product)}
          >
            <span>Inquire</span>
          </button>
        </div>
      </div>
    </div>
  );
}
