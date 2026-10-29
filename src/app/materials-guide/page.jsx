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
            <span>Atelier Knowledge</span>
            <span>/</span>
            <span>Makrana Calcite Science</span>
          </div>
          <h1>The Makrana Calcite &amp; Noble Stone Guide</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Understanding pure Makrana calcite: why the Taj Mahal and historic royal sanctums built from this geological wonder remain pure white for centuries without degradation.
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
              <div className="media-caption-badge">99% Pure Calcite Bedrock</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">GEOLOGICAL EXCELLENCE</span>
              <h2>99% Pure Calcite Structure</h2>
              <div className="gold-rule"></div>
              <p>
                Unlike commercial imported marbles or dolomitic stones containing high levels of iron, magnesium, and clay, authentic Makrana marble quarried from Nagaur district, Rajasthan is composed of 98% to 99% pure calcium carbonate calcite crystals.
              </p>
              <ul className="spec-list-luxury">
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Zero Porosity Absorption:</strong> 0.01% porosity means it will not absorb milk, honey, sandalwood paste, or diya oil during sacred daily puja rituals.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Self-Polishing Luster:</strong> The more Makrana marble is touched, washed, and worshipped, the more brilliant its diamond-crystalline glow becomes over generations.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Zero Chemical Resins:</strong> Cut directly from monolithic bedrock without epoxy mesh backing, polyester adhesives, or synthetic resin hardening.</span>
                </li>
              </ul>
              <div className="info-actions" style={{ marginTop: '24px' }}>
                <a
                  href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20would%20like%20to%20learn%20more%20about%20Makrana%20White%20Blocks%20and%20authenticity%20certification."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span className="btn-primary__text">Inquire on Raw Quarry Blocks</span>
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
              <div className="media-caption-badge">Pristine Calcite &amp; Inlay</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">AUTHENTIC MATERIAL PALETTE</span>
              <h2>Our Strict 3-Stone Discipline</h2>
              <div className="gold-rule"></div>
              <p>
                In strict adherence to Vedic architectural tradition, stone purity, and hydraulic engineering, our atelier crafts exclusively with three certified noble white marbles — and no other stone:
              </p>
              <ul className="spec-list-luxury">
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>1. Makrana Pure White Marble:</strong> Mined from authentic quarries in Makrana, Rajasthan. 100% pure virgin calcite structure without spots or lines — the revered Taj Mahal stone with an absolute zero-yellowing lifetime guarantee and zero oil or milk absorption.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>2. Vietnam Pure White Marble:</strong> High-altitude Yen Bai quarries. 99.6% ultra-pure micro-crystalline snow calcite with spotless white brilliance and zero spots or lines. World-renowned for translucent light scatter and immaculate deity sculpture.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>3. Rajnagar White Marble:</strong> Mined from Rajsamand, Rajasthan. Heavy hydraulic dense calcite (2.72 g/cm³) with natural subtle mineral veining and authentic character. Engineered for monumental estate fountains, cascades, and outdoor courtyards.</span>
                </li>
              </ul>
              <div className="info-actions" style={{ marginTop: '24px' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleOpenInquiry('Request Certified Marble Physical Samples')}
                >
                  <span className="btn-primary__text">Request Material Samples</span>
                  <span className="btn-primary__icon">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Stone Qualities & Technical Breakdown */}
          <div style={{ marginTop: '80px' }}>
            <div className="sec-header text-center" style={{ marginBottom: '40px' }}>
              <span className="card-badge">LABORATORY &amp; ARCHITECTURAL BENCHMARKS</span>
              <h2>Scientific Properties of Our 3 Noble Stones</h2>
              <div className="gold-rule center"></div>
              <p className="sub-lead">
                Every slab is tested for chemical purity, mineral density, and water impermeability before carving commences in our Makrana yard.
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
              <span className="card-badge">TEMPLE INTEGRITY</span>
              <h3>Why Only Makrana &amp; Vietnam for Temples</h3>
              <p>
                Home mandirs encounter daily puja rituals with milk, water, and diya oil. Authentic Makrana white marble is completely non-porous, preventing stains, cracks, and yellowing for lifetimes.
              </p>
            </div>
            <div className="page-card-item">
              <span className="card-badge">HYDRAULIC INTEGRITY</span>
              <h3>Why Only Rajnagar for Fountains</h3>
              <p>
                Water fountains endure 24/7 pressurized water flow, dissolved minerals, and seasonal freeze-thaw cycles. Rajnagar high-density calcite withstands water erosion without pitting or algae adhesion.
              </p>
            </div>
            <div className="page-card-item">
              <span className="card-badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                ZERO COMPROMISE
              </span>
              <h3>No Porous Stone or Artificial Resin</h3>
              <p>
                A.F.G strictly refuses commercial dolomitic stones, sandstones, or epoxy resin-glued agglomerates. Every creation is sculpted exclusively from monolithic certified natural bedrock.
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
