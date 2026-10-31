'use client';
import { useState } from 'react';
import { Droplets, Flame, Building2, Crown, AlertTriangle, PackageCheck } from 'lucide-react';

const TESTS = [
  {
    id: 'abhishek',
    title: 'Daily Milk, Water & Diya Oil Test',
    subtitle: 'Tested Under 365 Days of Daily Puja Liquids',
    makranaValue: 'Zero Absorption (100% Non-Porous)',
    makranaResult: 'Pure white stone stays bright. Milk, water, honey, and diya oil wipe off completely with a wet cotton cloth. Guaranteed never to turn yellow or smell.',
    makranaStatus: 'NEVER TURNS YELLOW',
    commercialValue: 'Absorbs Liquids & Spills',
    commercialResult: 'Absorbs milk and oil deep inside the stone pores. Creates permanent brownish-yellow spots and bad smell within a few months.',
    commercialStatus: 'HIGH STAINING RISK',
    icon: Droplets
  },
  {
    id: 'aarti',
    title: 'Camphor & Diya Flame Heat Test',
    subtitle: 'Safe for Diya Flames and Aarti Fire',
    makranaValue: '100% Solid Natural Stone',
    makranaResult: 'Natural stone handles heat safely. No plastic or chemical glue to melt, burn, or turn black from diya flames.',
    makranaStatus: 'FIRE & HEAT SAFE',
    commercialValue: 'Filled With Chemical Resin/Glue',
    commercialResult: 'Cheap commercial stones use glue and resin fillers. Diya heat melts the glue, creating black burn marks and cracks.',
    commercialStatus: 'CAN BURN & CRACK',
    icon: Flame
  },
  {
    id: 'longevity',
    title: 'Sunlight, Washing & Long Life Test',
    subtitle: 'Proven to Last for Centuries',
    makranaValue: 'Used in Taj Mahal Since 1632',
    makranaResult: 'Pure Makrana marble gets shinier and whiter the more it is touched and washed with water. Built to last for generations.',
    makranaStatus: 'STAYS SHINY FOREVER',
    commercialValue: 'Turns Yellow From Air & Light',
    commercialResult: 'Fake or low-grade marbles contain iron particles that react with air and turn yellowish within 2 to 3 years.',
    commercialStatus: 'TURNS YELLOW & DULL',
    icon: Building2
  }
];

export default function StonePurityLab({ onOpenInquiry }) {
  const [activeTest, setActiveTest] = useState(TESTS[0]);

  const handleRequestSampleBox = () => {
    const text = `*AFG MARBLE & ARTS — MARBLE SAMPLE BOX REQUEST*\n\n` +
      `Hello, I would like to request a Free Marble Sample Box delivered to my home to check the pure white Makrana marble before ordering our temple.\n\n` +
      `Please let me know where to provide my delivery address.`;

    const url = `https://wa.me/917597417274?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="sec-stone-purity-lab" style={{ padding: '90px 0', background: '#faf8f5' }}>
      <div className="sec-container">
        {/* Header */}
        <div className="sec-header text-center" style={{ marginBottom: '44px' }}>
          <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
            MARBLE PURITY TESTS
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.8vw, 44px)', color: '#1c1813', letterSpacing: '-0.01em' }}>
            Why Pure Makrana Marble Stays White Forever
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
          <p className="sub-lead" style={{ maxWidth: '760px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
            The Taj Mahal has stayed bright white for nearly 400 years because it was built using 100% pure Makrana marble. See the test results below to understand why it never absorbs stains or turns yellow.
          </p>
        </div>

        {/* Interactive Lab Comparison Board */}
        <div className="purity-lab-console" style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: 'clamp(20px, 3.5vw, 44px)',
          boxShadow: '0 20px 60px -15px rgba(28, 24, 19, 0.08), 0 0 0 1px rgba(184, 134, 63, 0.2) inset'
        }}>
          {/* Test Category Tabs */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            marginBottom: '36px'
          }}>
            {TESTS.map((test) => {
              const isActive = activeTest.id === test.id;
              return (
                <button
                  key={test.id}
                  type="button"
                  onClick={() => setActiveTest(test)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 22px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    border: isActive ? '1px solid #b08a4f' : '1px solid rgba(28, 24, 19, 0.15)',
                    background: isActive ? '#1c1813' : '#fcfaf6',
                    color: isActive ? '#ecd39b' : '#3c342b',
                    boxShadow: isActive ? '0 6px 20px rgba(28, 24, 19, 0.18)' : 'none'
                  }}
                >
                  <span style={{ display: 'grid', placeItems: 'center' }}><test.icon size={16} /></span>
                  <span>{test.title.split('&')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Test Detail Banner */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: '#1c1813', margin: '0 0 6px' }}>
              {activeTest.title}
            </h3>
            <p style={{ fontSize: '13.5px', color: '#88542c', fontWeight: 600, margin: 0 }}>
              {activeTest.subtitle}
            </p>
          </div>

          {/* Side-by-Side Dual Comparison Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '36px'
          }}>
            {/* CARD 1: PURE MAKRANA CALCITE (WINNER) */}
            <div style={{
              background: 'linear-gradient(180deg, #fdfbf7 0%, #f6efe4 100%)',
              border: '2px solid #b08a4f',
              borderRadius: '18px',
              padding: '28px',
              boxShadow: '0 12px 35px rgba(176, 138, 79, 0.14)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: '#88542c',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '6px 16px',
                borderBottomLeftRadius: '12px'
              }}>
                AFG AUTHENTIC STANDARD
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '2px solid #d4af37',
                  boxShadow: '0 3px 10px rgba(212, 175, 55, 0.3)',
                  display: 'grid',
                  placeItems: 'center'
                }}>
                  <Crown size={20} color="#d4af37" />
                </span>
                <div>
                  <h4 style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: '#1c1813', margin: 0 }}>
                    Pure Makrana Natural White Marble
                  </h4>
                  <span style={{ fontSize: '11px', color: '#27ae60', fontWeight: 700 }}>
                    ● {activeTest.makranaStatus}
                  </span>
                </div>
              </div>

              <div style={{
                background: '#ffffff',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '16px',
                border: '1px solid rgba(184, 134, 63, 0.2)'
              }}>
                <div style={{ fontSize: '10.5px', color: '#7a7065', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Laboratory Reading
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#88542c', marginTop: '2px' }}>
                  {activeTest.makranaValue}
                </div>
              </div>

              <p style={{ fontSize: '13.5px', color: '#383026', lineHeight: 1.6, margin: 0 }}>
                {activeTest.makranaResult}
              </p>
            </div>

            {/* CARD 2: COMMERCIAL / IMPORTED MARBLE (WARNING) */}
            <div style={{
              background: '#f9f9f9',
              border: '1px solid rgba(0, 0, 0, 0.12)',
              borderRadius: '18px',
              padding: '28px',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: '#7f8c8d',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '6px 16px',
                borderBottomLeftRadius: '12px'
              }}>
                COMMERCIAL / IMPORTED
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#fee2e2',
                  border: '1px solid #ef4444',
                  display: 'grid',
                  placeItems: 'center'
                }}>
                  <AlertTriangle size={18} color="#dc2626" />
                </span>
                <div>
                  <h4 style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: '#555555', margin: 0 }}>
                    Commercial / Foreign Dolomitic Marble
                  </h4>
                  <span style={{ fontSize: '11px', color: '#c0392b', fontWeight: 700 }}>
                    ● {activeTest.commercialStatus}
                  </span>
                </div>
              </div>

              <div style={{
                background: '#ffffff',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '16px',
                border: '1px solid rgba(0, 0, 0, 0.08)'
              }}>
                <div style={{ fontSize: '10.5px', color: '#7a7065', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Laboratory Reading
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#c0392b', marginTop: '2px' }}>
                  {activeTest.commercialValue}
                </div>
              </div>

              <p style={{ fontSize: '13.5px', color: '#666666', lineHeight: 1.6, margin: 0 }}>
                {activeTest.commercialResult}
              </p>
            </div>
          </div>

          {/* Bottom Trust Assurance & Free Sample Box CTA */}
          <div style={{
            background: '#fcf8f0',
            borderRadius: '16px',
            padding: '20px 24px',
            border: '1px dashed #b08a4f',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ display: 'grid', placeItems: 'center', color: '#b08a4f' }}><PackageCheck size={28} /></span>
              <div>
                <strong style={{ fontSize: '14px', color: '#1c1813', display: 'block' }}>
                  Inspect the Crystalline Calcite Before You Commission
                </strong>
                <span style={{ fontSize: '12px', color: '#7a6a57' }}>
                  We dispatch a physical Makrana Albeta stone sample tile directly to your doorstep anywhere in India, UK, USA, or UAE.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRequestSampleBox}
              className="btn-primary"
              style={{ padding: '0 20px', height: '42px', fontSize: '11px', whiteSpace: 'nowrap' }}
            >
              <span className="btn-primary__text">Request Free Stone Sample Box</span>
              <span className="btn-primary__icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
