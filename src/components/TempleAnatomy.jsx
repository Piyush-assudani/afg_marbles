'use client';
import { useState } from 'react';

export default function TempleAnatomy() {
  const [activePart, setActivePart] = useState(0);

  const parts = [
    {
      name: 'Kalash & Amalaka Finial',
      sanskrit: 'Shikhar Kalash',
      desc: 'The apex of the sanctum, sculpted from dense Makrana marble and gilded in 24K pure gold leaf. In temple architecture, the Kalash acts as the cosmic focal point channeling spiritual energy directly down into the Garbhagriha.',
      spec: 'Solid hand-turned calcite with concealed lightning dissipation grounding',
      tag: 'Spiritual Apex',
    },
    {
      name: 'Multi-Tier Nagara Shikhara',
      sanskrit: 'Urushringa Spire',
      desc: 'Rising in stepped harmonic tiers, each interlocking stone ring is dry-joint fitted without visible mortar seams. The spire incorporates hidden thermal draft flues allowing smoke from dhoop and camphor aarti to naturally dissipate.',
      spec: 'Modular seismic-lock rings with internal draft ventilation',
      tag: 'Vertical Axis',
    },
    {
      name: 'Peacock Torana & Pierced Jalis',
      sanskrit: 'Kirtimukha & Gavaksha',
      desc: 'The ornate entrance archway is hand-chiseled with dancing peacocks, floral creepers, and openwork pierced lattice (jali) folding doors that filter morning sunlight into a soft devotional glow.',
      spec: '40mm single-slab pierced lattice with heavy brass internal pivot hinges',
      tag: 'Sacred Gateway',
    },
    {
      name: 'Garbhagriha & Backlit Onyx Halo',
      sanskrit: 'Brahmasthana',
      desc: 'The innermost holy chamber. Features an elevated stepped marble singhasan for deities, framed by translucent green onyx or alabaster stone backlit with heat-free, 3000K warm gold LED illumination.',
      spec: '100% milk-proof, oil-proof pure calcite platform (zero staining guarantee)',
      tag: 'Sanctum Sanctorum',
    },
    {
      name: 'Adhishthana Base & Velvet Drawers',
      sanskrit: 'Upapitha Plinth',
      desc: 'The structural foundation chiseled from monolithic blocks with elephant and lotus bas-relief friezes. Conceals handleless push-to-open velvet-lined drawers and pull-out marble prasadam trays.',
      spec: 'Concealed German soft-close runners rated for 45 kg load capacity',
      tag: 'Foundation & Utility',
    },
  ];

  return (
    <section className="sec-temple-anatomy" style={{ padding: '90px 0', background: '#1c1813', color: '#fff8eb' }}>
      <div className="sec-container">
        <div className="sec-header text-center" style={{ marginBottom: '48px' }}>
          <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px', background: 'rgba(212, 175, 55, 0.2)', color: '#ecd39b', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
            ARCHITECTURAL DISSECTION
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#fff' }}>
            Sacred Anatomy of a Makrana Sanctum
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px', background: 'linear-gradient(90deg, transparent, #ecd39b, transparent)' }}></div>
          <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#c9bfae', lineHeight: 1.6 }}>
            Every structural component of our temples serves both an ancient Sthapatya Veda spiritual purpose and modern engineered utility. Click through the architectural anatomy below.
          </p>
        </div>

        <div
          style={{
            maxWidth: '1040px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Interactive Part Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {parts.map((p, idx) => {
              const isSelected = idx === activePart;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePart(idx)}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '10px',
                    border: isSelected ? '1px solid #ecd39b' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: isSelected ? 'rgba(236, 211, 155, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    color: isSelected ? '#ecd39b' : '#c4b8a7',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', color: isSelected ? '#ecd39b' : '#8a8073', display: 'block', fontWeight: 600 }}>
                      0{idx + 1} · {p.sanskrit}
                    </span>
                    <strong style={{ fontSize: '15px', color: isSelected ? '#fff' : '#e0d8cc' }}>
                      {p.name}
                    </strong>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: isSelected ? 'rgba(212, 175, 55, 0.3)' : 'rgba(255, 255, 255, 0.06)',
                      color: isSelected ? '#ecd39b' : '#8a8073',
                    }}
                  >
                    {p.tag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Part Deep Dive */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '16px',
              padding: 'clamp(24px, 4vw, 36px)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.4)',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#ecd39b',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              ANATOMY DETAIL · {parts[activePart].sanskrit}
            </span>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '26px', color: '#fff', marginBottom: '14px' }}>
              {parts[activePart].name}
            </h3>
            <p style={{ fontSize: '14px', color: '#ded7cd', lineHeight: 1.7, marginBottom: '22px' }}>
              {parts[activePart].desc}
            </p>

            <div
              style={{
                background: 'rgba(20, 16, 12, 0.8)',
                padding: '14px 18px',
                borderRadius: '8px',
                borderLeft: '3px solid #ecd39b',
                marginBottom: '24px',
              }}
            >
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#ecd39b', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                Engineering Specification
              </span>
              <p style={{ fontSize: '13px', color: '#c4b8a7', margin: 0, lineHeight: 1.5 }}>
                {parts[activePart].spec}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href={`https://wa.me/917597417274?text=${encodeURIComponent(
                  `Namaste AFG Marble, I am interested in custom specifications for "${parts[activePart].name}" on my bespoke mandir.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span className="btn-primary__text">Inquire on This Component</span>
                <span className="btn-primary__icon">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
