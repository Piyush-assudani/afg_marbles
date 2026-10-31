'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function AyadiVastuPage() {
  const FORMULAS = [
    {
      name: 'Yoni (Directional Energy)',
      calc: '(Length × 3) ÷ 8',
      desc: 'Determines the best facing direction for your temple to bring peace, health, and positive energy into your home.'
    },
    {
      name: 'Aya (Positive Inflow)',
      calc: '(Width × 8) ÷ 12',
      desc: 'Calculates the inflow of prosperity and good fortune. In Vedic temple design, positive gain (Aya) is always kept higher than expenses.'
    },
    {
      name: 'Vyaya (Outflow / Loss)',
      calc: '(Length × 9) ÷ 10',
      desc: 'Represents expenses and loss. Our temple designers calculate the exact dimensions so that loss factors remain minimal.'
    },
    {
      name: 'Nakshatra (Constellation Resonance)',
      calc: '(Length × 8) ÷ 27',
      desc: 'Aligns the temple size with the family’s birth stars (Nakshatras) for harmony and family peace.'
    },
    {
      name: 'Ayu (Lifespan of Consecration)',
      calc: '(Length × 27) ÷ 100',
      desc: 'Represents long life and prosperity, ensuring the temple brings lifelong blessings to your family.'
    }
  ];

  return (
    <>
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Vastu Guide</span>
            <span>/</span>
            <span>Vastu &amp; Size Rules</span>
          </div>
          <h1>Temple Vastu &amp; Auspicious Dimensions Guide</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            A home temple is a sacred space for your family. We calculate every dimension (length, width, and height) according to authentic Vedic Vastu rules to bring peace, happiness, and prosperity to your home.
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
              <div className="media-caption-badge">Vastu Temple Layout</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">AUTHENTIC VASTU RULES</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: '#1c1813', margin: '12px 0 16px' }}>
                Why Temple Measurements Matter in Vastu
              </h2>
              <div className="gold-rule"></div>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '18px' }}>
                Ordinary market carpenters often cut marble to random sizes just to save stone. In traditional Vastu, every inch matters so that the home receives positive vibrations, good health, and peace.
              </p>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '22px' }}>
                At A.F.G Marble &amp; Arts, we design your temple dimensions based on your available room space and authentic Vastu guidelines.
              </p>
              <div className="info-actions">
                <a
                  href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20would%20like%20a%20free%20Vastu%20and%20size%20consultation%20for%20my%20home%20temple."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span className="btn-primary__text">Get Free Vastu Advice on WhatsApp</span>
                  <span className="btn-primary__icon">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Formulas Grid */}
          <div style={{ marginBottom: '60px' }}>
            <div className="sec-header text-center" style={{ marginBottom: '36px' }}>
              <span className="card-badge">VASTU PRINCIPLES</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '30px', color: '#1c1813' }}>
                The 5 Key Vastu Rules for Home Temples
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
