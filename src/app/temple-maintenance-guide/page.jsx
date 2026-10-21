import Link from 'next/link';

export const metadata = {
  title: 'Sacred Marble Temple Care & Abhishek Maintenance Guide | A.F.G Marble & Arts',
  description:
    'Master artisan guidelines for maintaining consecrated Makrana marble home temples. Safe daily abhishek rituals, milk and ghee cleaning, smoke venting, and zero-acid preservation.',
};

export default function TempleMaintenanceGuidePage() {
  const protocols = [
    {
      num: '01',
      title: 'Daily Abhishek Care (Milk, Curd, Honey & Panchamrit)',
      rule: 'Rinse with clean lukewarm water within 30 minutes of ritual conclusion.',
      details:
        'Because authentic Makrana marble has a closed crystalline matrix (<0.04% porosity), milk and panchamrit will not penetrate the stone. However, drying milk proteins create an organic surface haze. Simply wipe the garbhagriha pedestal with a soft cotton muslin cloth soaked in clean warm water.',
      warning: 'Never use synthetic kitchen detergents or dish soaps on consecrated marble.',
    },
    {
      num: '02',
      title: 'Ghee & Mustard Oil Diya Protection',
      rule: 'Use pure brass or marble diya coasters with heat-insulated feet.',
      details:
        'Direct hot brass diya bottoms conduct heat into the marble surface, which can cause micro-fissuring over decades. Place a brass plate or Makrana diya coaster beneath the flame. If warm ghee spills, immediately blot with dry microfiber cloth — do not rub forcefully.',
      warning: 'Never use caustic degreasers or chlorine bleach.',
    },
    {
      num: '03',
      title: 'Camphor & Incense (Agarbatti) Smoke Mitigation',
      rule: 'Position dhoop burners 6 inches below the integrated shikhara draft flues.',
      details:
        'All AFG sanctums incorporate hidden convection flues at the shikhara spire apex. These natural convection currents draw hot camphor smoke upward and safely vent it outward, preventing black carbon deposits on intricate ceiling carvings.',
      warning: 'Avoid burning chemical petroleum-based camphor tablets inside the sanctum.',
    },
    {
      num: '04',
      title: 'Zero Acid Prohibition & Stone Polishing',
      rule: 'Strictly zero hydrochloric acid, harpic, vinegar, or lemon juice.',
      details:
        'Any acid, no matter how dilute, attacks calcium carbonate (CaCO3), permanently dissolving the crystalline glaze and leaving a dull chalky texture. To restore high mirror gloss, use our traditional Silawat water-honing compound or natural beeswax polish.',
      warning: 'Acid damage requires professional diamond grit re-grinding to repair.',
    },
    {
      num: '05',
      title: 'Outdoor Fountain Seasonal Winterization',
      rule: 'Drain collection bowls if temperatures drop below freezing (-5°C).',
      details:
        'While Makrana calcite withstands thermal frost effortlessly, trapped expanding ice inside the brass manifolds or narrow fountain nozzles can fracture plumbing lines. Clear water from pumps and drape the finial with a breathable canvas cover during deep winter freezes.',
      warning: 'Never add ethylene glycol automotive anti-freeze to sacred water pools.',
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
          SACRED STONECARE DISCIPLINE
        </span>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4vw, 52px)', color: '#1c1813', lineHeight: 1.2, marginBottom: '18px' }}>
          Temple Maintenance &amp; Ritual Care Guide
        </h1>
        <div className="gold-rule center" style={{ margin: '14px auto 22px' }}></div>
        <p style={{ fontSize: '16px', color: '#6b5f52', lineHeight: 1.7, maxWidth: '780px', margin: '0 auto' }}>
          A consecrated Makrana marble temple is an architectural sanctuary designed to endure for centuries. Preserving its luminous white sanctity requires adhering to ancient Silawat care disciplines and gentle natural cleaning protocols.
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
                <div style={{ fontSize: '12px', color: '#9e2a2b', fontWeight: 600 }}>
                  ⚠️ Caution: {p.warning}
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
            Our master stone conservators are available 7 days a week on WhatsApp to assist patrons with sacred temple upkeep, gold gilding touch-ups, or seasonal fountain service.
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
