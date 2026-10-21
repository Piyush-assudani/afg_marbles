'use client';
import { useState } from 'react';
import Link from 'next/link';

const LANDMARKS = [
  {
    id: 'lake-pichola',
    title: 'The Lake Pichola Private Estate Fountain & Pavilions',
    city: 'Udaipur, Rajasthan',
    type: 'Palatial Water & Heritage Pavilion',
    stone: 'Solid Makrana Calcite & Bidasar Green Bedrock',
    scale: '16ft Diameter Basin · 12ft Chhatri Pair',
    image: '/gallery/fountain-courtyard-circular.webp',
    stat1: '24 Tonnes',
    stat1Label: 'Bedrock Block',
    stat2: '14 Weeks',
    stat2Label: 'Artisan Chiseling',
    desc: 'Commissioned for a heritage lakefront estate. Features a monolithic 16-petal lotus overflow bowl flanked by twin octagonal carved chhatris with gold finials.',
  },
  {
    id: 'mayfair-london',
    title: 'The Mayfair Penthouse Pure Calcite Mandir Sanctum',
    city: 'Mayfair, London, UK',
    type: 'Contemporary Pooja Sanctum',
    stone: 'Makrana 99% Pure Calcite & 24K Pure Gold Leaf Inlay',
    scale: '8.5ft W × 4.2ft D × 9.0ft H',
    image: '/gallery/mandir-pure-white-om.webp',
    stat1: '100% Calcite',
    stat1Label: 'Zero-Porosity Stone',
    stat2: '5 Hours',
    stat2Label: 'Dry-Joint Setup',
    desc: 'Bespoke sanctum engineered for a Grade II listed London penthouse. Features sound-dampened garbhagriha, concealed smoke draft flues, and modular dry-joint assembly.',
  },
  {
    id: 'palm-jumeirah',
    title: 'The Palm Jumeirah Multi-Tier Cascading Fountain',
    city: 'Palm Jumeirah, Dubai, UAE',
    type: 'Estate Water Architecture',
    stone: 'Crystalline Makrana White & Nero Marquina',
    scale: '14ft Outer Basin · 8.5ft Height',
    image: '/gallery/fountain-black-marquina-cascade.webp',
    stat1: '50°C UV Proof',
    stat1Label: 'Thermal Resistance',
    stat2: '4 Guardians',
    stat2Label: 'Lion Spouts',
    desc: 'Monumental courtyard centerpiece for a beachfront estate. Engineered with high-flow marine brass manifolds and non-staining calcite resilience.',
  },
];

export default function RoyalProjectsPreview() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = LANDMARKS[activeIdx];

  return (
    <section className="sec-royal-landmarks" style={{ padding: '80px 0', background: '#1c1813', color: '#fdfbf7' }}>
      <div className="sec-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        <div className="sec-header text-center" style={{ marginBottom: '48px' }}>
          <span
            className="card-badge"
            style={{ position: 'static', display: 'inline-block', marginBottom: '12px', background: 'rgba(212, 175, 55, 0.2)', color: '#ecd39b' }}
          >
            GLOBAL PATRON LANDMARKS
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#fff9ed', marginBottom: '12px' }}>
            Royal Heritage &amp; Private Estate Portfolio
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px', backgroundColor: '#b08a4f' }}></div>
          <p style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#d8ccb8', lineHeight: 1.6 }}>
            Completed architectural commissions across private residences, royal estates, and spiritual sanctuaries worldwide.
          </p>
        </div>

        {/* Project Selector Pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '36px',
          }}
        >
          {LANDMARKS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              style={{
                padding: '10px 20px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                border: activeIdx === idx ? '1px solid #d8bb84' : '1px solid rgba(255, 255, 255, 0.18)',
                background: activeIdx === idx ? 'linear-gradient(135deg, #b08a4f 0%, #8c6a36 100%)' : 'rgba(255, 255, 255, 0.05)',
                color: activeIdx === idx ? '#ffffff' : '#d8ccb8',
                transition: 'all 0.25s ease',
              }}
            >
              📍 {item.city}
            </button>
          ))}
        </div>

        {/* Featured Showcase Card */}
        <div
          style={{
            background: '#241f18',
            borderRadius: '20px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1.15fr 1fr',
            minHeight: '440px',
          }}
        >
          {/* Image Side */}
          <div style={{ position: 'relative', minHeight: '360px', backgroundColor: '#181511' }}>
            <img
              src={current.image}
              alt={current.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <span
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(28, 24, 19, 0.85)',
                backdropFilter: 'blur(8px)',
                color: '#ecd39b',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 600,
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              {current.type}
            </span>
          </div>

          {/* Details Side */}
          <div style={{ padding: '38px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', color: '#ecd39b', textTransform: 'uppercase', marginBottom: '8px' }}>
              📍 {current.city}
            </span>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '26px', color: '#fffdf8', lineHeight: 1.3, marginBottom: '14px' }}>
              {current.title}
            </h3>

            <p style={{ fontSize: '14px', color: '#d8ccb8', lineHeight: 1.6, marginBottom: '22px' }}>
              {current.desc}
            </p>

            {/* Quick Stat Badges */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '26px',
                background: 'rgba(0, 0, 0, 0.25)',
                padding: '14px 18px',
                borderRadius: '10px',
                border: '1px solid rgba(212, 175, 55, 0.2)',
              }}
            >
              <div>
                <strong style={{ fontSize: '18px', color: '#ecd39b', display: 'block', fontFamily: 'var(--serif)' }}>
                  {current.stat1}
                </strong>
                <span style={{ fontSize: '11px', color: '#a89d8f', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {current.stat1Label}
                </span>
              </div>
              <div>
                <strong style={{ fontSize: '18px', color: '#ecd39b', display: 'block', fontFamily: 'var(--serif)' }}>
                  {current.stat2}
                </strong>
                <span style={{ fontSize: '11px', color: '#a89d8f', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {current.stat2Label}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                href="/royal-projects"
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #b08a4f 0%, #8c6a36 100%)', color: '#ffffff', borderColor: '#d8bb84' }}
              >
                <span>View Full Landmark Portfolio</span>
                <span>→</span>
              </Link>
              <a
                href={`https://wa.me/917597417274?text=${encodeURIComponent(
                  `Namaste AFG Marble, I am interested in commissioning an estate feature similar to "${current.title}" (${current.city}). Please share CAD elevations.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold"
                style={{ borderColor: 'rgba(212, 175, 55, 0.4)', color: '#ecd39b' }}
              >
                <span>WhatsApp Sthapati</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
