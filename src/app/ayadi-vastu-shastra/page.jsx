'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function AyadiVastuPage() {
  const FORMULAS = [
    {
      name: 'Yoni (Directional Energy)',
      calc: '(Length × 3) ÷ 8',
      desc: 'Determines the energy direction of the temple. For domestic sanctums, Dhwaja Yoni (East) or Simha Yoni (South-East) is chosen to attract peace, vitality, and wealth.'
    },
    {
      name: 'Aya (Positive Inflow)',
      calc: '(Width × 8) ÷ 12',
      desc: 'Calculates the inflow of spiritual and material abundance. In sacred temple design, the Aya value must always strictly exceed the Vyaya (expenditure) value.'
    },
    {
      name: 'Vyaya (Outflow / Loss)',
      calc: '(Length × 9) ÷ 10',
      desc: 'Represents dissipation. Our Master Sthapatis calibrate width and length down to the millimeter so that Vyaya remains minimal.'
    },
    {
      name: 'Nakshatra (Constellation Resonance)',
      calc: '(Length × 8) ÷ 27',
      desc: 'Harmonizes the sanctum with the patron family’s birth nakshatras, ensuring personal spiritual resonance and divine tranquility.'
    },
    {
      name: 'Ayu (Lifespan of Consecration)',
      calc: '(Length × 27) ÷ 100',
      desc: 'Determines the permanence of spiritual consecration. An auspicious Ayu score ensures the sanctum bestows blessings across generations.'
    }
  ];

  return (
    <>
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Architectural Science</span>
            <span>/</span>
            <span>Ayadi Vastu Shastra</span>
          </div>
          <h1>Sacred Ayadi Vastu Mathematical Architecture</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            In Vedic temple engineering, a mandir is not merely furniture—it is an energetic transducer (Yantra). Our Master Sthapatis design every AFG sanctum in strict adherence to classical Ayadi Shastra formulas from the Manasara and Mayamata treatises.
          </p>
        </div>
      </section>

      {/* Vastu Architecture Deep Dive */}
      <section className="subpage-body" style={{ padding: '60px 0' }}>
        <div className="sec-container">
          <div className="page-grid-2" style={{ marginBottom: '60px' }}>
            <div className="page-media-frame">
              <img
                src="/gallery/vastu-dome-plan-topdown.webp"
                alt="Ayadi Vastu Purusha Mandala Temple Floor Plan"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="media-caption-badge">9-Grid Vastu Purusha Mandala</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">THE 6 SACRED MATHEMATICAL RATIOS</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: '#1c1813', margin: '12px 0 16px' }}>
                Why Commercial Temples Fail Spiritual Alignment
              </h2>
              <div className="gold-rule"></div>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '18px' }}>
                Commercial carpenters and casual stone carvers cut marble to arbitrary round numbers (like 5ft × 3ft) to minimize stone wastage. In Vastu Shastra, arbitrary dimensions frequently result in negative Yoni and high Vyaya, creating subtle energetic unrest in the household.
              </p>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '22px' }}>
                At A.F.G Marble &amp; Arts, every single client commission begins with custom Ayadi calculations based on your home’s orientation, ceiling clearance, and family Gotra.
              </p>
              <div className="info-actions">
                <a
                  href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20would%20like%20an%20Ayadi%20Vastu%20consultation%20with%20your%20Master%20Sthapati%20for%20my%20home%20sanctum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span className="btn-primary__text">Consult Master Sthapati</span>
                  <span className="btn-primary__icon">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Formulas Grid */}
          <div style={{ marginBottom: '60px' }}>
            <div className="sec-header text-center" style={{ marginBottom: '36px' }}>
              <span className="card-badge">AYADI SHASTRA METRICS</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '30px', color: '#1c1813' }}>
                The 5 Mathematical Pillars of Consecrated Sanctums
              </h2>
              <div className="gold-rule center"></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '22px' }}>
              {FORMULAS.map((f, i) => (
                <div key={i} className="creation-card" style={{ padding: '28px' }}>
                  <span style={{ fontSize: '11px', color: '#b08a4f', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    FORMULA {i + 1}
                  </span>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: '#1c1813', margin: '6px 0 10px' }}>
                    {f.name}
                  </h3>
                  <div style={{ display: 'inline-block', background: '#faf6ee', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', color: '#8c6220', fontWeight: 600, marginBottom: '12px', border: '1px solid rgba(184, 134, 63, 0.2)' }}>
                    Calculation: {f.calc}
                  </div>
                  <p style={{ fontSize: '13px', color: '#5c5246', lineHeight: 1.6, margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Difference Table & Consultation */}
      <DifferenceTable />
      <ConsultationCard />
    </>
  );
}
