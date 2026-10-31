'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function MaterialsGuidePage() {
  const handleOpenInquiry = (topic) => {
    if (typeof window !== 'undefined' && window.afgOpenInquiry) {
      window.afgOpenInquiry({ title: topic || 'Noble Stone & Calcite Inquiry' });
    }
  };

  return (
    <>
      {/* ============ SUBPAGE HERO ============ */}
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Marble Guide</span>
            <span>/</span>
            <span>Pure Marble Guide</span>
          </div>
          <h1>The Complete Pure White Marble Guide</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Why pure Makrana marble stays bright white for hundreds of years: zero yellowing, zero stains from puja liquids, and 100% natural solid stone.
          </p>
        </div>
      </section>

      {/* ============ CONTENT SECTION ============ */}
      <section className="subpage-body">
        <div className="sec-container">
          <div className="page-grid-2">
            <div className="page-media-frame">
              <img
                src="/gallery/mandir-pure-makrana.webp"
                alt="Authentic Pure Makrana Calcite Marble"
                loading="lazy"
              />
              <div className="media-caption-badge">100% Natural Makrana Marble</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">100% PURE MARBLE</span>
              <h2>Why Makrana Marble Is World Famous</h2>
              <div className="gold-rule"></div>
              <p>
                Unlike ordinary market marbles that turn yellow or absorb oily stains, genuine Makrana marble from Rajasthan is 100% pure natural stone. It contains zero iron or artificial chemicals, so it never changes color.
              </p>
              <ul className="spec-list-luxury">
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Never Absorbs Stains:</strong> Daily puja items like milk, water, honey, chandan (sandalwood), and diya oil wipe clean without leaving any dark spots.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Gets Brighter Over Time:</strong> The more you touch, clean, and worship at the temple, the smoother and brighter it shines over the years.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Zero Artificial Resins or Chemicals:</strong> Cut directly from solid natural marble blocks without cheap glue backing, plastic coating, or synthetic fillers.</span>
                </li>
              </ul>
              <div className="info-actions" style={{ marginTop: '24px' }}>
                <a
                  href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20would%20like%20to%20learn%20more%20about%20Makrana%20White%20Blocks%20and%20authenticity%20certification."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span className="btn-primary__text">Ask About Our Marble Quality</span>
                  <span className="btn-primary__icon">→</span>
                </a>
              </div>
            </div>
          </div>

          <div className="page-grid-2 reverse" style={{ marginTop: '64px' }}>
            <div className="page-media-frame">
              <img
                src="/gallery/sanctum-ambient-glow.webp"
                alt="Sacred Makrana Calcite Marble and Noble Stone Inlay"
                loading="lazy"
              />
              <div className="media-caption-badge">Pure White Marble</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">OUR 3 CERTIFIED MARBLES</span>
              <h2>The 3 Marbles We Use</h2>
              <div className="gold-rule"></div>
              <p>
                To ensure lifelong durability and authentic purity, our workshop uses only three certified natural white marbles:
              </p>
              <ul className="spec-list-luxury">
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>1. Makrana Pure White Marble:</strong> The famous Taj Mahal stone from Makrana, Rajasthan. 100% natural pure white marble with lifetime zero-yellowing guarantee and zero oil or milk absorption.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>2. Vietnam Pure White Marble:</strong> Crystal-clear snow white marble with spotless finish. Ideal for modern home temples and deity statues with glowing light reflection.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>3. Rajnagar White Marble:</strong> Dense and durable white marble from Rajasthan with natural subtle grey veins. Specially selected for outdoor water fountains and garden chhatris to withstand flowing water and weather.</span>
                </li>
              </ul>
              <div className="info-actions" style={{ marginTop: '24px' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleOpenInquiry('Request Certified Marble Physical Samples')}
                >
                  <span className="btn-primary__text">Get Free Marble Advice on WhatsApp</span>
                  <span className="btn-primary__icon">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Stone Qualities & Technical Breakdown */}
          <div style={{ marginTop: '80px' }}>
            <div className="sec-header text-center" style={{ marginBottom: '40px' }}>
              <span className="card-badge">KEY MARBLE FACTS</span>
              <h2>Comparison of Our 3 Natural Marbles</h2>
              <div className="gold-rule center"></div>
              <p className="sub-lead">
                Every marble block is hand-inspected in our Makrana workshop before carving begins.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px'
            }}>
              {/* Stone 1: Makrana Pure White */}
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(176,138,79,0.3)',
                boxShadow: '0 8px 30px rgba(28,24,19,0.06)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ background: '#fdf8ee', color: '#b08a4f', padding: '6px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', border: '1px solid rgba(176,138,79,0.3)' }}>
                    EXCLUSIVE: TEMPLES &amp; MANDIRS
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#1c1813' }}>Grade AAA</span>
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: '#1c1813', marginBottom: '10px' }}>
                  Makrana Pure White Marble
                </h3>
                <p style={{ fontSize: '14px', color: '#6b5f52', lineHeight: 1.6, marginBottom: '20px' }}>
                  Quarried from the historic Chosira and Chak Dungri seams of Makrana, Rajasthan. Formed over 1,500 million years ago under extreme geological pressure, it is the purest natural calcite stone on Earth.
                </p>
                <div style={{ borderTop: '1px solid #ede8e0', paddingTop: '16px', marginTop: 'auto' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Calcite Purity:</strong>
                      <span style={{ color: '#b08a4f', fontWeight: 600 }}>99.2% CaCO₃</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Porosity:</strong>
                      <span style={{ color: '#22c55e', fontWeight: 600 }}>0.01% (Zero Stains)</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Yellowing:</strong>
                      <span style={{ color: '#1c1813' }}>Zero Lifetime</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Hardness:</strong>
                      <span style={{ color: '#1c1813' }}>3.5–4.0 Mohs</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Abhishek Proof:</strong>
                      <span style={{ color: '#22c55e', fontWeight: 600 }}>100% Resistant</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Vastu Energy:</strong>
                      <span style={{ color: '#1c1813' }}>Cooling Sattvic</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stone 2: Vietnam Pure White */}
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(176,138,79,0.3)',
                boxShadow: '0 8px 30px rgba(28,24,19,0.06)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ background: '#fdf8ee', color: '#b08a4f', padding: '6px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', border: '1px solid rgba(176,138,79,0.3)' }}>
                    EXCLUSIVE: TEMPLES &amp; DEITIES
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#1c1813' }}>Grade AAA+</span>
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: '#1c1813', marginBottom: '10px' }}>
                  Vietnam Pure White Marble
                </h3>
                <p style={{ fontSize: '14px', color: '#6b5f52', lineHeight: 1.6, marginBottom: '20px' }}>
                  Quarried from the high-altitude crystalline deposits of Luc Yen and Yen Bai, Northern Vietnam. Prized globally for its spotless snow-white uniformity and microscopic crystalline sugar matrix.
                </p>
                <div style={{ borderTop: '1px solid #ede8e0', paddingTop: '16px', marginTop: 'auto' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Calcite Purity:</strong>
                      <span style={{ color: '#b08a4f', fontWeight: 600 }}>99.6% CaCO₃</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Grain Structure:</strong>
                      <span style={{ color: '#22c55e', fontWeight: 600 }}>Micro-Crystalline</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Light Scatter:</strong>
                      <span style={{ color: '#1c1813' }}>Divine Radiance</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Hardness:</strong>
                      <span style={{ color: '#1c1813' }}>3.0–3.5 Mohs</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Deity Sculpting:</strong>
                      <span style={{ color: '#22c55e', fontWeight: 600 }}>Flawless Facial Lines</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Resin Content:</strong>
                      <span style={{ color: '#1c1813' }}>0% Pure Natural</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stone 3: Rajnagar White */}
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(176,138,79,0.3)',
                boxShadow: '0 8px 30px rgba(28,24,19,0.06)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ background: '#fdf8ee', color: '#b08a4f', padding: '6px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', border: '1px solid rgba(176,138,79,0.3)' }}>
                    EXCLUSIVE: PALATIAL FOUNTAINS
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#1c1813' }}>Hydraulic Grade</span>
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: '#1c1813', marginBottom: '10px' }}>
                  Rajnagar White Marble
                </h3>
                <p style={{ fontSize: '14px', color: '#6b5f52', lineHeight: 1.6, marginBottom: '20px' }}>
                  Quarried from the dense hydraulic seams of Rajnagar, Rajsamand. Specifically engineered by nature for outdoor hydraulic architecture, continuous water cascades, and all-weather estate fountain installations.
                </p>
                <div style={{ borderTop: '1px solid #ede8e0', paddingTop: '16px', marginTop: 'auto' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Mineral Type:</strong>
                      <span style={{ color: '#b08a4f', fontWeight: 600 }}>Hydraulic Calcite</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Bulk Density:</strong>
                      <span style={{ color: '#22c55e', fontWeight: 600 }}>2.72 g/cm³</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Water Erosion:</strong>
                      <span style={{ color: '#1c1813' }}>Zero Degradation</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Algae Resistance:</strong>
                      <span style={{ color: '#22c55e', fontWeight: 600 }}>Anti-Rooting</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Climate Range:</strong>
                      <span style={{ color: '#1c1813' }}>-10°C to +50°C</span>
                    </div>
                    <div>
                      <strong style={{ color: '#1c1813', display: 'block' }}>Application:</strong>
                      <span style={{ color: '#1c1813' }}>Tiered Cascades</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why We Reject All Other Stones */}
          <div className="page-cards-grid-3" style={{ marginTop: '64px' }}>
            <div className="page-card-item">
              <span className="card-badge">TEMPLE QUALITY</span>
              <h3>Why Makrana &amp; Vietnam for Home Temples</h3>
              <p>
                Home temples face daily puja rituals with milk, water, and diya oil. Authentic white marble prevents stains and yellowing, staying pure and clean forever.
              </p>
            </div>
            <div className="page-card-item">
              <span className="card-badge">FOUNTAIN QUALITY</span>
              <h3>Why Rajnagar Marble for Water Fountains</h3>
              <p>
                Water fountains face running water every day. Dense Rajnagar marble resists water wear, outdoor sun, and rain without pitting or fading.
              </p>
            </div>
            <div className="page-card-item">
              <span className="card-badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                ZERO COMPROMISE
              </span>
              <h3>No Fake Marble, No Chemical Mixes</h3>
              <p>
                A.F.G never uses composite plastic powders, glued tiles, or cheap commercial stones. Every single temple and fountain is carved from 100% solid natural marble.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE AFG DIFFERENCE ============ */}
      <DifferenceTable onOpenInquiry={handleOpenInquiry} />

      {/* ============ ALL WE NEED IS YOUR SPACE DIMENSIONS ============ */}
      <ConsultationCard onOpenInquiry={handleOpenInquiry} />
    </>
  );
}
