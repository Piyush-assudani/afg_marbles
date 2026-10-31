'use client';
import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Maximize2 } from 'lucide-react';

const LANDMARKS = [
  {
    id: 'lake-pichola',
    title: 'The Lake Pichola Private Estate Fountain & Pavilions',
    city: 'Udaipur, Rajasthan',
    type: 'Palatial Water & Heritage Pavilion',
    stone: 'Solid Makrana White & Bidasar Green Marble',
    scale: '16ft Diameter Basin · 12ft Chhatri Pair',
    image: '/gallery/fountain-courtyard-circular.webp',
    stat1: '24 Tonnes',
    stat1Label: 'Solid Marble Block',
    stat2: '14 Weeks',
    stat2Label: 'Artisan Chiseling',
    desc: 'Commissioned for a heritage lakefront estate. Features a monolithic 16-petal lotus overflow bowl flanked by twin octagonal carved chhatris with gold finials.',
  },
  {
    id: 'mayfair-london',
    title: 'The Mayfair Penthouse Pure White Marble Temple',
    city: 'Mayfair, London, UK',
    type: 'Modern Home Temple',
    stone: 'Pure Makrana White Marble with 24K Gold Work',
    scale: '8.5ft W × 4.2ft D × 9.0ft H',
    image: '/gallery/mandir-grand-makrana-8361.webp',
    stat1: '100% Pure',
    stat1Label: 'Pure Natural Stone',
    stat2: 'Easy Fit',
    stat2Label: 'Quick Setup',
    desc: 'Custom made temple designed for an apartment in London. Features built-in smoke vent, soft LED lighting, and easy modular assembly.',
  },
  {
    id: 'palm-jumeirah',
    title: 'The Palm Jumeirah Multi-Tier Cascading Fountain',
    city: 'Palm Jumeirah, Dubai, UAE',
    type: 'Estate Water Architecture',
    stone: '100% Rajnagar Hydraulic White Marble',
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
    <section className="sec-royal-landmarks" id="royal-projects" style={{ padding: 'clamp(110px, 10vw, 150px) 0 90px', scrollMarginTop: '110px', background: '#1c1813', color: '#fdfbf7' }}>
      <div className="sec-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        <div className="sec-header text-center" style={{ marginBottom: '48px' }}>
          <span
            className="card-badge"
            style={{ position: 'static', display: 'inline-block', marginBottom: '12px', background: 'rgba(212, 175, 55, 0.2)', color: '#ecd39b' }}
          >
            OUR COMPLETED WORK
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#fff9ed', marginBottom: '12px' }}>
            Completed Custom Temples &amp; Fountains
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px', backgroundColor: '#b08a4f' }}></div>
          <p style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#d8ccb8', lineHeight: 1.6 }}>
            Real projects handcrafted and delivered to homes, estates, and temples across India and worldwide.
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
              <MapPin size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
              {item.city}
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
          <div
            onClick={() => {
              if (typeof window !== 'undefined' && window.afgOpenLightbox) {
                window.afgOpenLightbox({
                  src: current.image,
                  title: `${current.title} (${current.city})`,
                  tag: `${current.type} · ${current.stone}`
                });
              }
            }}
            style={{ position: 'relative', minHeight: '360px', backgroundColor: '#181511', cursor: 'zoom-in' }}
          >
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

            {/* Floating Fullscreen Trigger Badge */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (typeof window !== 'undefined' && window.afgOpenLightbox) {
                  window.afgOpenLightbox({
                    src: current.image,
                    title: `${current.title} (${current.city})`,
                    tag: `${current.type} · ${current.stone}`
                  });
                }
              }}
              title="Fullscreen 4K Zoom"
              aria-label="Fullscreen 4K Zoom"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(28, 24, 19, 0.85)',
                backdropFilter: 'blur(8px)',
                color: '#ecd39b',
                padding: '6px 12px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 600,
                border: '1px solid rgba(212, 175, 55, 0.4)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Maximize2 size={12} />
              <span>Zoom 4K</span>
            </button>
          </div>

          {/* Details Side */}
          <div style={{ padding: '38px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', color: '#ecd39b', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={13} /> {current.city}
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
                style={{
                  background: 'rgba(26, 21, 16, 0.88)',
                  borderColor: '#d8bb84',
                  color: '#ffffff',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#d4af37">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.074-1.803-.412-1.493-.623-2.457-2.148-2.531-2.249-.074-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.137-.149.3-.187.4-.187.1 0 .2.001.288.006.096.005.226-.036.353.27.13.315.444 1.085.483 1.164.039.08.065.174.013.277-.052.104-.078.169-.156.259-.078.091-.164.202-.234.271-.078.078-.16.162-.069.319.091.156.404.667.868 1.08.597.532 1.099.697 1.255.775.156.078.247.065.338-.039.091-.104.39-.455.494-.611.104-.156.208-.13.351-.078.143.052.909.429 1.065.507.156.078.26.117.299.182.039.065.039.378-.105.783z" />
                </svg>
                <span style={{ fontWeight: 600, color: '#ffffff' }}>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
