'use client';
import React from 'react';

const ROW_ONE = [
  {
    src: '/gallery/mandir-pure-makrana.webp',
    alt: 'Handcrafted Makrana marble mandir collection',
    caption: 'Pure Makrana Calcite Mandir',
  },
  {
    src: '/gallery/fountain-palatial-night.webp',
    alt: 'Palatial multi-tier fountain illuminated at night with waterfalls',
    caption: 'Palatial Fountain at Night',
  },
  {
    src: '/gallery/mandir-peacock-halo.webp',
    alt: 'White marble sanctum with sculpted peacock jali arch',
    caption: 'Peacock Jali Sanctum',
  },
  {
    src: '/gallery/fountain-classical-four-tier.webp',
    alt: 'Classical four-tier estate marble fountain in garden',
    caption: 'Palatial Four-Tier Fountain',
  },
  {
    src: '/gallery/mandir-grand-makrana-8361.webp',
    alt: 'Grand Garbhagriha luxury marble mandir with ornate pillars',
    caption: 'Grand Garbhagriha Mandir',
  },
  {
    src: '/gallery/fountain-sculpted-horses.webp',
    alt: 'Monumental marble fountain with sculpted rearing horses',
    caption: 'Sculpted Horses Fountain',
  },
  {
    src: '/gallery/chhatri-makrana-dome.webp',
    alt: 'Heritage Makrana marble carved chhatri dome',
    caption: 'Makrana Heritage Dome',
  },
  {
    src: '/gallery/mandir-monumental-temple.webp',
    alt: 'Monumental consecrated marble temple complex',
    caption: 'Monumental Calcite Mandir',
  },
];

const ROW_TWO = [
  {
    src: '/gallery/sanctum-wall-integrated-niche.webp',
    alt: 'Architectural wall-integrated carved marble temple niche',
    caption: 'Wall-Integrated Sanctum',
  },
  {
    src: '/gallery/sanctum-grand-mandap.webp',
    alt: 'Royal pooja sanctum with illuminated deities and brass lamps',
    caption: 'Majestic Puja Mandap',
  },
  {
    src: '/gallery/fountain-octagonal-topdown.webp',
    alt: 'Aerial top-down concentric rings white marble courtyard fountain',
    caption: 'Concentric Calcite Fountain',
  },
  {
    src: '/gallery/mandir-backlit-tree-8342.webp',
    alt: 'Bespoke marble sanctum with backlit tree of life medallion',
    caption: 'Backlit Tree of Life Sanctum',
  },
  {
    src: '/gallery/fountain-estate-triple.webp',
    alt: 'Triple-tier palatial estate marble fountain',
    caption: 'Triple Tier Estate Fountain',
  },
  {
    src: '/gallery/mandir-radha-krishna.webp',
    alt: 'Delicately carved Radha Krishna marble sanctum',
    caption: 'Radha Krishna Sanctum',
  },
  {
    src: '/gallery/fountain-lotus-topdown.webp',
    alt: 'Top-down view of hand-carved lotus petal marble fountain',
    caption: 'Lotus Water Sanctum',
  },
  {
    src: '/gallery/sanctum-inlay-floor.webp',
    alt: 'Intricate Pietra Dura semi-precious stone inlay marble flooring',
    caption: 'Pietra Dura Inlay',
  },
];

export default function AtelierRibbon() {
  return (
    <section className="sec-ribbon" id="ribbon" aria-label="Four decades of stone portfolio">
      <div className="sec-container">
        <div className="ribbon__head">
          <h2 className="ribbon__title">
            Four decades of stone,<br />
            <em>one continuous devotion.</em>
          </h2>
        </div>
      </div>

      {/* Row 1 — Moving Left */}
      <div className="ribbon__row ribbon__row--left" tabIndex={0} aria-label="Portfolio gallery row 1">
        <div className="ribbon__track">
          {ROW_ONE.concat(ROW_ONE).map((item, idx) => (
            <figure
              className="ribbon__item is-clickable"
              key={`r1-${idx}`}
              aria-hidden={idx >= ROW_ONE.length ? 'true' : undefined}
              onClick={() => {
                if (typeof window !== 'undefined' && window.afgOpenInquiry) {
                  window.afgOpenInquiry({ title: item.caption, image: item.src });
                }
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading={idx < 4 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <div className="ribbon__item-scrim" aria-hidden="true" />
              <figcaption className="ribbon__caption">
                <span>{item.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Row 2 — Moving Right */}
      <div className="ribbon__row ribbon__row--right" tabIndex={0} aria-label="Portfolio gallery row 2">
        <div className="ribbon__track">
          {ROW_TWO.concat(ROW_TWO).map((item, idx) => (
            <figure
              className="ribbon__item is-clickable"
              key={`r2-${idx}`}
              aria-hidden={idx >= ROW_TWO.length ? 'true' : undefined}
              onClick={() => {
                if (typeof window !== 'undefined' && window.afgOpenInquiry) {
                  window.afgOpenInquiry({ title: item.caption, image: item.src });
                }
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
              />
              <div className="ribbon__item-scrim" aria-hidden="true" />
              <figcaption className="ribbon__caption">
                <span>{item.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
