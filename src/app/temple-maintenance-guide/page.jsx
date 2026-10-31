import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Marble Temple Care & Daily Cleaning Guide | A.F.G Marble & Arts',
  description:
    'Simple guidelines for cleaning and maintaining your white marble home temple. Safe tips for daily milk abhishek, diya oil, incense smoke, and zero-acid cleaning.',
};

export default function TempleMaintenanceGuidePage() {
  const protocols = [
    {
      num: '01',
      title: 'Daily Abhishek Care (Milk, Curd, Honey & Panchamrit)',
      rule: 'Rinse with clean lukewarm water within 30 minutes of ritual conclusion.',
      details:
        'Authentic Makrana marble never absorbs liquids. But dried milk can leave a light film on the surface. Simply wipe the deity platform with a soft cotton cloth dipped in clean lukewarm water after puja.',
      warning: 'Never use harsh kitchen detergents or dish soaps on pure marble.',
    },
    {
      num: '02',
      title: 'Diya Oil & Heat Protection',
      rule: 'Place a small brass plate or marble coaster under burning diyas.',
      details:
        'Hot metal diya bottoms transfer heat directly into the stone. Placing a small brass tray or marble coaster underneath protects the stone. If warm oil spills, simply wipe it clean with a soft dry cloth and rinse with plain water.',
      warning: 'Never use harsh chemical cleaning powders, acids, or bleach.',
    },
    {
      num: '03',
      title: 'Incense (Agarbatti) & Smoke Care',
      rule: 'Allow incense smoke to vent naturally through the temple roof.',
      details:
        'All A.F.G temples feature concealed roof vents. This allows dhoop and agarbatti smoke to flow out naturally without leaving black soot on the carved marble ceiling.',
      warning: 'Avoid burning low-quality chemical camphor tablets directly against the stone.',
    },
    {
      num: '04',
      title: 'Zero Acid Prohibition & Stone Polishing',
      rule: 'Strictly zero hydrochloric acid, harpic, vinegar, or lemon juice.',
      details:
        'Never use acid, toilet cleaners, vinegar, or lemon juice. Acid ruins natural marble shine instantly. For regular cleaning, plain warm water and a soft cloth are all you need.',
      warning: 'Acid damage requires professional diamond grit re-grinding to repair.',
    },
    {
      num: '05',
      title: 'Outdoor Fountain Seasonal Winterization',
      rule: 'Drain collection bowls if temperatures drop below freezing (-5°C).',
      details:
        'In freezing winter climates, drain water from fountain pipes and pumps so expanding ice does not crack the plumbing lines.',
      warning: 'Never add ethylene glycol automotive anti-freeze to fountain pools.',
    },
  ];

  return (
    <div className="subpage-container" style={{ paddingTop: '110px', background: '#fdfbf7', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '60px 24px 40px', textAlign: 'center', maxWidth: '960px', margin: '0 auto' }}>
        <span
          className="card-badge"
          style={{ position: 'static', display: 'inline-block', marginBottom: '14px', background: 'rgba(176, 138, 79, 0.15)', color: '#8c6a36' }}
        >
          EASY CARE GUIDE
        </span>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4vw, 52px)', color: '#1c1813', lineHeight: 1.2, marginBottom: '18px' }}>
          Easy Temple Cleaning &amp; Care Guide
        </h1>
        <div className="gold-rule center" style={{ margin: '14px auto 22px' }}></div>
        <p style={{ fontSize: '16px', color: '#6b5f52', lineHeight: 1.7, maxWidth: '780px', margin: '0 auto' }}>
          A genuine Makrana marble temple is made to last for generations. Follow these simple tips to keep your temple bright white, clean, and shining forever.
        </p>
      </section>

      {/* Protocols List */}
      <section style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {protocols.map((p) => (
            <div
              key={p.num}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '32px 36px',
                border: '1px solid rgba(176, 138, 79, 0.22)',
                boxShadow: '0 8px 24px rgba(28, 24, 19, 0.05)',
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '24px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '36px',
                  color: '#b08a4f',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  background: 'rgba(176, 138, 79, 0.1)',
                  height: '70px',
                  borderRadius: '10px',
                  lineHeight: '70px',
                }}
              >
                {p.num}
              </div>

              <div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: '#1c1813', marginBottom: '8px' }}>
                  {p.title}
                </h3>
                <div
                  style={{
                    display: 'inline-block',
                    background: '#fcfaf6',
                    borderLeft: '3px solid #b08a4f',
                    padding: '6px 12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#8c6a36',
                    marginBottom: '14px',
                    borderRadius: '0 6px 6px 0',
                  }}
                >
                  Golden Rule: {p.rule}
                </div>
                <p style={{ fontSize: '14px', color: '#52473c', lineHeight: 1.7, marginBottom: '14px' }}>
                  {p.details}
                </p>
                <div style={{ fontSize: '12px', color: '#9e2a2b', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                  <AlertTriangle size={13} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '6px', flexShrink: 0 }} /> Caution: {p.warning}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Care Kit & WhatsApp Sthapati Help */}
      <section style={{ background: '#1c1813', color: '#fdfbf7', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '30px', color: '#ecd39b', marginBottom: '14px' }}>
            Have a Specific Temple or Fountain Care Question?
          </h2>
          <p style={{ fontSize: '15px', color: '#d8ccb8', lineHeight: 1.7, marginBottom: '28px' }}>
            Our marble experts are available 7 days a week on WhatsApp to help you with any temple care or cleaning questions.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/917597417274?text=Namaste%20AFG%20Marble%2C%20I%20have%20a%20maintenance%20or%20cleaning%20inquiry%20regarding%20a%20marble%20mandir%20or%20fountain."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ background: '#25d366', color: '#ffffff', borderColor: '#20ba59' }}
            >
              <span>Consult Sthapati on WhatsApp</span>
            </a>
            <Link href="/materials-guide" className="btn-outline-gold" style={{ borderColor: '#d8bb84', color: '#ecd39b' }}>
              <span>Learn About Makrana Purity</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
