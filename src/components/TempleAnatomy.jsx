'use client';
import { useState } from 'react';

export default function TempleAnatomy() {
  const [activePart, setActivePart] = useState(0);

  const parts = [
    {
      name: 'Kalash & Top Dome (Spiritual Crown)',
      sanskrit: 'Top Crown',
      desc: 'The top of the temple, carved from pure Makrana white marble and finished with 24K pure gold leaf. In Indian temple architecture, the Kalash acts as the spiritual pinnacle channeling divine energy into your home.',
      spec: 'Solid hand-carved pure marble with gold leaf detailing',
      tag: 'Temple Top',
    },
    {
      name: 'Carved Spire (With Smoke Vents)',
      sanskrit: 'Carved Spire',
      desc: 'Hand-carved in stepped tiers. Each interlocking marble section fits together seamlessly without glue. Concealed roof vents allow dhoop and agarbatti smoke to vent naturally, keeping your ceiling bright.',
      spec: 'Interlocking marble tiers with built-in smoke vents',
      tag: 'Carved Spire',
    },
    {
      name: 'Peacock Arch & Jali Doors (Front Entrance)',
      sanskrit: 'Arch & Doors',
      desc: 'The front entrance features hand-carved peacocks and floral creepers, with openwork pierced jali screen doors that let in soft light while keeping your pooja space sacred and beautiful.',
      spec: 'Hand-carved pierced marble lattice with smooth brass hinges',
      tag: 'Front Arch & Doors',
    },
    {
      name: 'Deity Platform / Altar (100% Stain-Free)',
      sanskrit: 'Deity Platform',
      desc: 'The main chamber where idols are placed. Features an elevated marble platform with warm, heat-free LED backlighting. 100% stain-resistant: daily milk, water, and diya oil wipe off cleanly without marks.',
      spec: '100% milk-proof, oil-proof pure white marble (zero yellowing guarantee)',
      tag: 'Deity Platform',
    },
    {
      name: 'Base Platform & Drawers (Smooth Pull-Out)',
      sanskrit: 'Base & Drawers',
      desc: 'Heavy solid marble base carved with traditional elephant and lotus patterns. Houses smooth pull-out drawers lined with soft fabric for keeping puja books, cotton wicks, and aarti items neat and clean.',
      spec: 'Smooth soft-close sliding drawers and pull-out marble aarti tray',
      tag: 'Base & Storage',
    },
  ];

  return (
    <section className="sec-temple-anatomy" style={{ padding: '90px 0', background: '#1c1813', color: '#fff8eb' }}>
      <div className="sec-container">
        <div className="sec-header text-center" style={{ marginBottom: '48px' }}>
          <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px', background: 'rgba(212, 175, 55, 0.2)', color: '#ecd39b', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
            TEMPLE PARTS EXPLAINED
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#fff' }}>
            Parts of a Pure White Marble Temple
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px', background: 'linear-gradient(90deg, transparent, #ecd39b, transparent)' }}></div>
          <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#c9bfae', lineHeight: 1.6 }}>
            Understand how our marble temples are built, from the top golden crown to the carved pillars and storage drawers. Click each part below to learn more.
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
                  `Namaste AFG Marble, I want to ask about "${parts[activePart].name}" for my marble temple.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span className="btn-primary__text">Ask About This Part on WhatsApp</span>
                <span className="btn-primary__icon">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
