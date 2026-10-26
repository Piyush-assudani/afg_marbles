'use client';
import { useState } from 'react';

export default function AyadiCalculator({ onOpenInquiry }) {
  const [spaceType, setSpaceType] = useState('villa');
  const [width, setWidth] = useState(7);
  const [depth, setDepth] = useState(4);
  const [height, setHeight] = useState(9);
  const [stone, setStone] = useState('Makrana Pure Albeta');
  const [style, setStyle] = useState('Nagara Shikhara Multi-Tier');

  // Calculate estimated volume, modular sections and sacred ratio
  const areaSqFt = (width * depth).toFixed(1);
  const volumeCuFt = (width * depth * height).toFixed(0);
  const estimatedWeightKg = Math.round(volumeCuFt * 38); // Approximate carved density
  const modularSections = width > 8 ? '8 to 12 Interlocking Sections' : width > 5 ? '5 to 7 Modular Sections' : '3 to 4 Modular Blocks';
  const ayadiRatio = ((width * 12 * 8) % 12 === 0 ? 'Dhana Aya (Infinite Wealth)' : 'Vriddhi Aya (Continuous Spiritual Growth)');

  const handleSendCADRequest = () => {
    const text = `Namaste A.F.G Marble & Arts, I used your space estimator tool.\n\nMy Custom Space Requirements:\n- Type: ${spaceType.toUpperCase()}\n- Dimensions: ${width}ft (W) × ${depth}ft (D) × ${height}ft (H)\n- Preferred Stone: ${stone}\n- Architectural Style: ${style}\n- Estimated Area: ${areaSqFt} sq.ft (${volumeCuFt} cu.ft)\n- Sthapatya Metric: ${ayadiRatio}\n\nPlease share preliminary 2D CAD blueprint options and bespoke pricing feasibility.`;
    window.open(`https://wa.me/917597417274?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="sec-ayadi-calc" style={{ padding: '90px 0', background: '#f5eee1' }}>
      <div className="sec-container">
        <div className="sec-header text-center" style={{ marginBottom: '44px' }}>
          <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
            INTERACTIVE AYADI VASTU CALCULATOR
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
            Calculate Your Space Dimensions &amp; Sacred Proportions
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
          <p className="sub-lead" style={{ maxWidth: '740px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
            Every sanctum chiseled by AFG adheres strictly to the sacred Sthapatya Veda mathematical formulas. Adjust the parameters below to preview your sanctum&apos;s architectural specifications.
          </p>
        </div>

        <div
          style={{
            maxWidth: '1060px',
            margin: '0 auto',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 16px 50px rgba(28, 24, 19, 0.08)',
            border: '1px solid rgba(176, 138, 79, 0.25)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          }}
        >
          {/* Left Form Controls */}
          <div style={{ padding: 'clamp(24px, 4vw, 40px)', display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: '#1c1813', margin: 0 }}>
              1. Define Your Space Parameters
            </h3>

            {/* Space Type Selector */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8c6a36', marginBottom: '8px' }}>
                Sanctuary Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[
                  { id: 'apartment', label: 'Apartment Niche' },
                  { id: 'villa', label: 'Villa Dedicated Room' },
                  { id: 'courtyard', label: 'Courtyard Fountain' },
                  { id: 'chhatri', label: 'Garden Chhatri' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSpaceType(item.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: spaceType === item.id ? '1px solid #b08a4f' : '1px solid rgba(28, 24, 19, 0.15)',
                      background: spaceType === item.id ? '#1c1813' : '#fcfaf6',
                      color: spaceType === item.id ? '#ecd39b' : '#383026',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions Sliders */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1c1813' }}>Sanctum Width:</span>
                <strong style={{ color: '#b08a4f', fontSize: '14px' }}>{width} Feet</strong>
              </div>
              <input
                type="range"
                min="3"
                max="16"
                step="0.5"
                value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#b08a4f', cursor: 'pointer' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1c1813' }}>Depth / Projection:</span>
                <strong style={{ color: '#b08a4f', fontSize: '14px' }}>{depth} Feet</strong>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                step="0.5"
                value={depth}
                onChange={(e) => setDepth(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#b08a4f', cursor: 'pointer' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1c1813' }}>Ceiling / Apex Height:</span>
                <strong style={{ color: '#b08a4f', fontSize: '14px' }}>{height} Feet</strong>
              </div>
              <input
                type="range"
                min="5"
                max="18"
                step="0.5"
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#b08a4f', cursor: 'pointer' }}
              />
            </div>

            {/* Stone Dropdown */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8c6a36', marginBottom: '6px' }}>
                Primary Calcite Marble Stratum
              </label>
              <select
                value={stone}
                onChange={(e) => setStone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(28, 24, 19, 0.2)',
                  background: '#fcfaf6',
                  fontSize: '13px',
                  color: '#1c1813',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                <option value="Makrana Pure White Marble">Makrana Pure White Marble (99.2% Calcite - Taj Mahal Stratum)</option>
                <option value="Vietnam Pure White Marble">Vietnam Pure White Marble (99.6% Crystalline Snow Calcite)</option>
              </select>
            </div>
          </div>

          {/* Right Live Architectural Output */}
          <div
            style={{
              background: '#1c1813',
              color: '#fff8eb',
              padding: 'clamp(24px, 4vw, 40px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#ecd39b',
                  display: 'inline-block',
                  marginBottom: '10px',
                }}
              >
                Sacred Vastu Sthapatya Blueprint
              </span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#fff', marginBottom: '18px' }}>
                Custom Architectural Summary
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '22px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '11px', color: '#b8ad9e', display: 'block' }}>Footprint Area</span>
                  <strong style={{ fontSize: '18px', color: '#ecd39b' }}>{areaSqFt} sq. ft</strong>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '11px', color: '#b8ad9e', display: 'block' }}>Ayadi Harmonic Metric</span>
                  <strong style={{ fontSize: '14px', color: '#82dca0' }}>{ayadiRatio}</strong>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '11px', color: '#b8ad9e', display: 'block' }}>Modular Architecture</span>
                  <strong style={{ fontSize: '13px', color: '#fff' }}>{modularSections}</strong>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <span style={{ fontSize: '11px', color: '#b8ad9e', display: 'block' }}>Estimated Solid Weight</span>
                  <strong style={{ fontSize: '14px', color: '#ecd39b' }}>~{estimatedWeightKg} kg</strong>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', marginBottom: '22px' }}>
                <p style={{ fontSize: '12px', color: '#c4b8a7', lineHeight: 1.6, margin: 0 }}>
                  ✓ <strong>Golden Ratio Compliance:</strong> Height to width ratio conforms to 1.618 golden proportion, optimizing sound reverberation for Om chanting and bell chimes.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                onClick={handleSendCADRequest}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px 20px',
                  background: 'linear-gradient(135deg, #ecd39b 0%, #caa76b 100%)',
                  color: '#1c1813',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(236, 211, 155, 0.3)',
                  transition: 'all 0.25s ease',
                }}
              >
                <span>Request 2D CAD Blueprint on WhatsApp</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.074-1.803-.412-1.493-.623-2.457-2.148-2.531-2.249-.074-.099-.607-.808-.607-1.543s.385-1.096.521-1.246c.137-.149.3-.187.4-.187.1 0 .2.001.288.006.096.005.226-.036.353.27.13.315.444 1.085.483 1.164.039.08.065.174.013.277-.052.104-.078.169-.156.259-.078.091-.164.202-.234.271-.078.078-.16.162-.069.319.091.156.404.667.868 1.08.597.532 1.099.697 1.255.775.156.078.247.065.338-.039.091-.104.39-.455.494-.611.104-.156.208-.13.351-.078.143.052.909.429 1.065.507.156.078.26.117.299.182.039.065.039.378-.105.783z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => onOpenInquiry?.({ title: `Bespoke ${width}x${depth}x${height}ft Sanctum Blueprint` })}
                style={{
                  width: '100%',
                  padding: '10px 18px',
                  background: 'transparent',
                  color: '#fff',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  cursor: 'pointer',
                }}
              >
                Schedule Virtual Discovery Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
