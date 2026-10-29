'use client';
import React from 'react';

const ROW_ONE = [
  {
    src: '/gallery/mandir-grand-makrana-8361.webp?v=real',
    alt: 'Grand Garbhagriha luxury pure Makrana marble mandir',
    caption: 'Grand Garbhagriha Mandir',
  },
  {
    src: '/gallery/fountain-palatial-triple-tier-base.webp?v=real',
    alt: 'Palatial three-tier cascading estate marble fountain',
    caption: 'Palatial Cascading Fountain',
  },
  {
    src: '/gallery/mandir-peacock-torana-8341.webp?v=real',
    alt: 'White marble sanctum with sculpted peacock torana and elephant pillars',
    caption: 'Peacock Torana Mandir',
  },
  {
    src: '/gallery/fountain-classical-scallop-four-tier-base.webp?v=real',
    alt: 'Classical four-tier scallop bowl estate marble fountain',
    caption: 'Classical Four-Tier Fountain',
  },
  {
    src: '/gallery/mandir-shree-ram-7971.webp?v=real',
    alt: 'Lord Rama sanctum with handcrafted jali screen and shikhara',
    caption: 'Shree Ram Mandir Sanctum',
  },
  {
    src: '/gallery/chhatri-fluted-monumental-lawn.webp?v=fluted8k',
    alt: 'Monumental octagonal fluted dome garden pavilion in pure white marble',
    caption: 'Monumental Fluted Chhatri',
  },
  {
    src: '/gallery/yard-dryfit-raw-calcite-mandir.webp?v=realphoto',
    alt: 'Pre-assembly trial dry-joint fitment in Makrana yard',
    caption: 'Makrana Yard Pre-Assembly Mandir',
  },
  {
    src: '/gallery/mandir-pietra-dura-7794.webp?v=real',
    alt: 'Parchin Kari Pietra Dura gemstone inlay marble mandir',
    caption: 'Pietra Dura Gemstone Mandir',
  },
];

const ROW_TWO = [
  {
    src: '/gallery/mandir-backlit-tree-8342.webp?v=real',
    alt: 'Bespoke marble sanctum with backlit tree of life medallion',
    caption: 'Backlit Tree of Life Sanctum',
  },
  {
    src: '/gallery/fountain-botanical-octagonal-base.webp?v=real',
    alt: 'Octagonal botanical carved white marble garden fountain',
    caption: 'Octagonal Botanical Fountain',
  },
  {
    src: '/gallery/mandir-parchin-kari-7975.webp?v=real',
    alt: 'Intricate floral mother-of-pearl gemstone inlay temple panel',
    caption: 'Mother-of-Pearl Inlay Mandir',
  },
  {
    src: '/gallery/fountain-courtyard-circular-base.webp?v=real',
    alt: 'Concentric circular basin white marble courtyard fountain',
    caption: 'Courtyard Concentric Fountain',
  },
  {
    src: '/gallery/sanctum-royal-mandir-room.webp?v=purewhite',
    alt: 'Living generational Silawat sculpted master mandir sanctum',
    caption: 'Generational Silawat Sanctum',
  },
  {
    src: '/gallery/mandir-finishing-onsite-installation.webp?v=realphoto',
    alt: 'White-glove diamond polish and mother-of-pearl peacock halo assembly',
    caption: 'Mother-of-Pearl Peacock Halo',
  },
  {
    src: '/gallery/royal-chhatri-dome-detail.webp?v=fluted8k',
    alt: 'Hand-carved ribbed marble dome apex and ceremonial kalash',
    caption: 'Fluted Marble Dome & Finial',
  },
  {
    src: '/gallery/mandir-grand-makrana-8361.webp?v=real',
    alt: 'Solid virgin Makrana white marble temple',
    caption: 'Pure Makrana Royal Mandir',
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
