'use client';
import React from 'react';
import { Sparkles, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

const MAKRANA_GALLERY = [
  {
    title: 'Grand Makrana Garbhagriha Mandir',
    subtitle: '99.2% Pure Calcite Monolith Carving with Hand-Sculpted Shikhara Arches',
    image: '/gallery/mandir-grand-makrana-8361.webp',
    tag: 'Flagship Temple',
    span: 'large',
  },
  {
    title: 'Peacock Torana & Filigree Archway',
    subtitle: 'Hand-chiseled pierced jali & royal Mayura pillars in pure white Makrana',
    image: '/gallery/mandir-peacock-torana-8341.webp',
    tag: 'Hand-Chiseled Detail',
    span: 'standard',
  },
  {
    title: 'Makrana Calcite Slab Texture',
    subtitle: 'Spotless crystalline grain · 0% porosity · Zero yellowing guarantee',
    image: '/gallery/stone-makrana-calcite-slab.webp',
    tag: 'Real Stone Texture',
    span: 'standard',
  },
  {
    title: 'Pure White Backlit Sanctum',
    subtitle: 'Luminescent translucent marble with Tree of Life medallion & gold gilding',
    image: '/gallery/mandir-backlit-tree-8342.webp',
    tag: 'Sanctum Glow',
    span: 'standard',
  },
  {
    title: 'Shree Ram Sanctum Mandir',
    subtitle: "Sacred golden 'राम' medallion, Kamadhenu bas-relief & lotus crest",
    image: '/gallery/mandir-shree-ram-7971.webp',
    tag: 'Sacred Sanctum',
    span: 'standard',
  },
  {
    title: 'Royal Pietra Dura Garbhagriha',
    subtitle: 'Handcrafted gemstone floral inlay with high-relief peacock & waterfall panels',
    image: '/gallery/mandir-pietra-dura-7794.webp',
    tag: 'Palatial Inlay Hall',
    span: 'standard',
  },
  {
    title: 'Parchin Kari Floral Archway Sanctum',
    subtitle: 'Taj Mahal stratum marble with floral inlay & crystal chandelier',
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
        stone: 'Makrana Pure White Marble (Temples & Mandirs)',
      });
    } else {
      onOpenInquiry?.({
        title: item.title,
        image: item.image,
        stone: 'Makrana Pure White Marble (Temples & Mandirs)',
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
              <span>THE TAJ MAHAL BEDROCK</span>
            </span>
            <h2 className="makrana-showcase__title">
              Makrana Pure White Marble
            </h2>
            <p className="makrana-showcase__subtitle">
              99% pure calcite stone that never turns yellow from daily puja ghee, abhishek milk, or weather. Mined directly from virgin seams in Makrana, Rajasthan.
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
                  <span>Click to Inquire</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Material Quick Distinction Strip */}
        <div className="materials-triad-strip">
          <div className="triad-card triad-card--active">
            <span className="triad-card__tag">TEMPLE CONSTRUCTION</span>
            <h4>Makrana Pure White Marble</h4>
            <p>99.2% Calcite purity · Taj Mahal stone · Zero yellowing guarantee</p>
          </div>

          <div className="triad-card">
            <span className="triad-card__tag">TEMPLE &amp; DEITIES</span>
            <h4>Vietnam Pure White Marble</h4>
            <p>Immaculate crystalline snow-white finish for contemporary sanctums</p>
          </div>

          <div className="triad-card">
            <span className="triad-card__tag">FOUNTAIN SPECIALIST</span>
            <h4>Rajnagar White Marble</h4>
            <p>High-density weather-resistant stone for monumental cascading fountains</p>
          </div>
        </div>
      </div>
    </section>
  );
}
