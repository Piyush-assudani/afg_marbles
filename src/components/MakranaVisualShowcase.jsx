'use client';
import React from 'react';
import { Sparkles, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

const MAKRANA_GALLERY = [
  {
    title: 'Grand White Marble Home Temple',
    subtitle: 'Pure White Marble Temple with Hand-Carved Domes & Pillars',
    image: '/gallery/mandir-grand-makrana-8361.webp',
    tag: 'Home Temple',
    span: 'large',
  },
  {
    title: 'Hand-Carved Peacock Arch Temple',
    subtitle: 'Carved peacock pillars and floral jali doors in pure white marble',
    image: '/gallery/mandir-peacock-torana-8341.webp',
    tag: 'Hand-Carved Detail',
    span: 'standard',
  },
  {
    title: '100% Natural White Marble Texture',
    subtitle: 'Spotless natural white marble · Never stains · Guaranteed never to turn yellow',
    image: '/gallery/stone-makrana-calcite-slab.webp',
    tag: 'Real Marble Quality',
    span: 'standard',
  },
  {
    title: 'Pure White Backlit Home Temple',
    subtitle: 'Warm glowing marble backdrop with Tree of Life and pure gold work',
    image: '/gallery/mandir-backlit-tree-8342.webp',
    tag: 'Backlit Glow',
    span: 'standard',
  },
  {
    title: 'Shree Ram Home Temple',
    subtitle: "Golden 'राम' design with carved holy cow and lotus base",
    image: '/gallery/mandir-shree-ram-7971.webp',
    tag: 'Home Temple',
    span: 'standard',
  },
  {
    title: 'Royal Gemstone Flower Inlay Temple',
    subtitle: 'Colorful stone flower inlay with carved peacock designs',
    image: '/gallery/mandir-pietra-dura-7794.webp',
    tag: 'Stone Inlay Temple',
    span: 'standard',
  },
  {
    title: 'Floral Inlay White Marble Temple',
    subtitle: 'Taj Mahal quality white marble with colorful flower inlay work',
    image: '/gallery/mandir-parchin-kari-7975.webp',
    tag: 'Floral Inlay Art',
    span: 'standard',
  },
];

export default function MakranaVisualShowcase({ onOpenInquiry }) {
  const handleItemClick = (item) => {
    if (typeof window !== 'undefined' && window.afgOpenInquiry) {
      window.afgOpenInquiry({
        title: item.title,
        image: item.image,
        stone: 'Makrana Pure White Marble',
      });
    } else {
      onOpenInquiry?.({
        title: item.title,
        image: item.image,
        stone: 'Makrana Pure White Marble',
      });
    }
  };

  return (
    <section className="sec-makrana-showcase" id="makrana-showcase" aria-label="Makrana Pure White Marble Showcase">
      <div className="sec-container">
        {/* Header — Clean, minimal English per brief */}
        <div className="makrana-showcase__header">
          <div className="makrana-showcase__title-col">
            <span className="makrana-showcase__badge">
              <ShieldCheck size={14} />
              <span>100% PURE WHITE MARBLE</span>
            </span>
            <h2 className="makrana-showcase__title">
              Makrana Pure White Marble
            </h2>
            <p className="makrana-showcase__subtitle">
              100% pure white marble that never turns yellow from milk, oil, or water. Sourced directly from our quarries in Makrana, Rajasthan.
            </p>
          </div>

          <div className="makrana-showcase__cta-col">
            <button
              type="button"
              className="tilak-btn tilak-btn--primary"
              onClick={() =>
                handleItemClick({
                  title: 'Makrana Pure White Temple Consultation',
                  image: '/gallery/mandir-grand-makrana-8361.webp',
                })
              }
            >
              <span>Get Custom Mandir Quote</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Sacred Atelier Devotion Pledge Banner */}
        <div
          style={{
            margin: '0 0 32px',
            padding: '16px 24px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(250, 246, 238, 0.95))',
            border: '1px solid rgba(184, 134, 63, 0.35)',
            boxShadow: '0 6px 24px rgba(184, 134, 63, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <span style={{ fontSize: '28px', color: '#b8863f', lineHeight: 1, fontFamily: 'serif' }}>“</span>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              color: '#2a2218',
              fontStyle: 'italic',
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            There may be a little more expenditure in the creation being made for God, but the result should be such that there is no scope for any shortage.
          </p>
        </div>

        {/* Big HD Visual Gallery Grid */}
        <div className="makrana-showcase__grid">
          {MAKRANA_GALLERY.map((item, idx) => (
            <div
              key={idx}
              className={`makrana-card makrana-card--${item.span}`}
              onClick={() => handleItemClick(item)}
              role="button"
              tabIndex={0}
              aria-label={`Inquire about ${item.title}`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading={idx < 2 ? 'eager' : 'lazy'}
                className="makrana-card__img"
              />
              <div className="makrana-card__overlay">
                <span className="makrana-card__tag">{item.tag}</span>
                <h3 className="makrana-card__title">{item.title}</h3>
                <p className="makrana-card__desc">{item.subtitle}</p>
                <div className="makrana-card__action">
                  <span>Click for Price &amp; Details</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Material Quick Distinction Strip */}
        <div className="materials-triad-strip">
          <div className="triad-card triad-card--active">
            <span className="triad-card__tag">BEST FOR HOME TEMPLES</span>
            <h4>Makrana Pure White Marble</h4>
            <p>100% natural white marble · Zero yellowing · Never absorbs puja oil, milk, or water</p>
          </div>

          <div className="triad-card">
            <span className="triad-card__tag">FOR TEMPLES &amp; STATUES</span>
            <h4>Vietnam Pure White Marble</h4>
            <p>Pure snow-white marble · Smooth crystal finish · Ideal for god statues and modern home temples</p>
          </div>

          <div className="triad-card">
            <span className="triad-card__tag">FOR WATER FOUNTAINS</span>
            <h4>Rajnagar White Marble</h4>
            <p>Strong natural white marble · Built for running water · Perfect for garden and courtyard fountains</p>
          </div>
        </div>
      </div>
    </section>
  );
}
