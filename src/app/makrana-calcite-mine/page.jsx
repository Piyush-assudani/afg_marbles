import Link from 'next/link';

export const metadata = {
  title: 'Makrana Marble Quarry Provenance & 99% Calcite Mineral Science | A.F.G Marble & Arts',
  description:
    'Discover the geological science behind Makrana white marble bedrock. Learn why 99% pure CaCO3 calcite marble never yellows, resists milk/ghee rituals, and outlasts imported stone for centuries.',
};

export default function MakranaCalciteMinePage() {
  const quarries = [
    {
      name: 'Chak Dungri Quarry',
      depth: '280–350 feet subterranean bedrock',
      tone: 'Pure translucent white with delicate diagonal graphite pencil veins',
      density: '2,710 kg/m³ · 99.2% Calcite',
      usage: 'Ideal for monumental Nagara temple shikharas, Sanctum parikrama walls, and large deities.',
    },
    {
      name: 'Kumhari Quarry',
      depth: '220–290 feet bedrock',
      tone: 'Warm creamy milk white with soft grey clouding and micro-crystalline luster',
      density: '2,690 kg/m³ · 98.7% Calcite',
      usage: 'Favored for palatial courtyard fountains, fluted chhatri pillars, and pierced jaali lattices.',
    },
    {
      name: 'Albeta Quarry',
      depth: '300–420 feet deepest vein',
      tone: 'Pristine glowing white with emerald-tinted mineral veining and diamond-grade translucency',
      density: '2,730 kg/m³ · 99.4% Calcite',
      usage: 'The exact stone selected for the Taj Mahal and Victoria Memorial. Supreme sanctum garbhagrihas.',
    },
    {
      name: 'Dungri Quarry',
      depth: '180–240 feet bedrock',
      tone: 'Milky greyish-white with bold linear patterns and extreme compressive strength',
      density: '2,680 kg/m³ · 98.4% Calcite',
      usage: 'Heavy estate perimeter balustrades, stone foundation plinths, and outdoor architectural steps.',
    },
  ];

  const comparison = [
    {
      prop: 'Chemical Composition',
      makrana: '98%–99.4% Pure Crystalline Calcite (CaCO3)',
      vietnam: 'Dolomitic Limestone with heavy iron silicates',
      italian: 'Calcite with organic bituminous veins (Soft)',
    },
    {
      prop: 'Water Absorption',
      makrana: '< 0.04% (Virtually Non-Porous Glass Structure)',
      vietnam: '0.28% – 0.45% (High porosity, absorbs oils)',
      italian: '0.15% – 0.22% (Requires chemical sealants)',
    },
    {
      prop: 'Reaction to Puja Milk, Oil & Water',
      makrana: '100% Stain-Resistant & Non-Reactive for Generations',
      vietnam: 'Turns yellowish within 6 to 12 months of daily puja rituals',
      italian: 'Stains easily; loses shine and etches rapidly',
    },
    {
      prop: 'Outdoor Weather Endurance',
      makrana: 'Withstands -10°C frost to +50°C desert heat',
      vietnam: 'Micro-fissures develop in freeze-thaw cycles',
      italian: 'Sugar-crumbling in extreme outdoor frost',
    },
    {
      prop: 'Polishing Rejuvenation',
      makrana: 'Natural water-honing without artificial waxes',
      vietnam: 'Epoxy resin coatings required to fill pinholes',
      italian: 'Requires recurring chemical buffing',
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
          GEOLOGICAL PROVENANCE &amp; PURITY
        </span>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4vw, 52px)', color: '#1c1813', lineHeight: 1.2, marginBottom: '18px' }}>
          Makrana Calcite Quarry Science
        </h1>
        <div className="gold-rule center" style={{ margin: '14px auto 22px' }}></div>
        <p style={{ fontSize: '16px', color: '#6b5f52', lineHeight: 1.7, maxWidth: '780px', margin: '0 auto' }}>
          Mined in Nagaur District, Rajasthan, Makrana is not merely stone — it is Earth&apos;s rarest metamorphism of pure limestone into 99% crystalline calcite. Learn why kings and temple Sthapatis have chosen only Makrana for 800 years.
        </p>
      </section>

      {/* The 4 Makrana Veins */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: '#1c1813' }}>
            The Four Sacred Veins of Makrana
          </h2>
          <p style={{ fontSize: '14px', color: '#7a6f62' }}>Each subterranean seam yields a distinct character and harmonic frequency</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {quarries.map((q, idx) => (
            <div
              key={idx}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '28px 24px',
                border: '1px solid rgba(176, 138, 79, 0.22)',
                boxShadow: '0 8px 24px rgba(28, 24, 19, 0.05)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', color: '#b08a4f', textTransform: 'uppercase', marginBottom: '8px' }}>
                Vein 0{idx + 1}
              </span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: '#1c1813', marginBottom: '8px' }}>
                {q.name}
              </h3>
              <p style={{ fontSize: '12px', color: '#8c6a36', fontWeight: 600, marginBottom: '14px' }}>
                Extraction Depth: {q.depth}
              </p>
              <div style={{ fontSize: '13px', color: '#52473c', lineHeight: 1.6, marginBottom: '14px' }}>
                <strong>Appearance:</strong> {q.tone}
              </div>
              <div style={{ fontSize: '13px', color: '#52473c', lineHeight: 1.6, marginBottom: '14px' }}>
                <strong>Mineral Density:</strong> {q.density}
              </div>
              <div
                style={{
                  marginTop: 'auto',
                  padding: '10px 12px',
                  background: '#fcfaf6',
                  borderRadius: '8px',
                  border: '1px solid rgba(176, 138, 79, 0.16)',
                  fontSize: '12px',
                  color: '#4a4239',
                }}
              >
                <strong style={{ color: '#1c1813', display: 'block', marginBottom: '2px' }}>Recommended For:</strong>
                {q.usage}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scientific Comparison Table */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '10px' }}>
            LABORATORY ANALYSIS
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: '#1c1813' }}>
            Makrana vs. Vietnam White vs. Italian Carrara
          </h2>
          <p style={{ fontSize: '14px', color: '#7a6f62' }}>
            Why commercial imported marbles discolor when used for sacred home temples and outdoor water features
          </p>
        </div>

        <div style={{ overflowX: 'auto', background: '#ffffff', borderRadius: '16px', border: '1px solid rgba(176,138,79,0.25)', boxShadow: '0 12px 36px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: '#1c1813', color: '#ecd39b' }}>
                <th style={{ padding: '16px 20px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Metric</th>
                <th style={{ padding: '16px 20px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', background: '#2b241c', borderLeft: '2px solid #b08a4f' }}>
                  ✓ Authentic Makrana Calcite
                </th>
                <th style={{ padding: '16px 20px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Vietnam White (Commercial)</th>
                <th style={{ padding: '16px 20px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Italian Carrara</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, rIdx) => (
                <tr key={rIdx} style={{ borderBottom: '1px solid rgba(176,138,79,0.15)', background: rIdx % 2 === 0 ? '#ffffff' : '#fdfbf7' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600, fontSize: '13px', color: '#1c1813' }}>{row.prop}</td>
                  <td style={{ padding: '14px 20px', fontSize: '13px', color: '#1c1813', background: 'rgba(176, 138, 79, 0.08)', fontWeight: 600, borderLeft: '2px solid #b08a4f' }}>
                    {row.makrana}
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: '13px', color: '#6b5f52' }}>{row.vietnam}</td>
                  <td style={{ padding: '14px 20px', fontSize: '13px', color: '#6b5f52' }}>{row.italian}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Callout */}
      <section style={{ background: '#1c1813', color: '#fdfbf7', padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '30px', color: '#ecd39b', marginBottom: '14px' }}>
            Request Pure Marble Samples &amp; Certificates
          </h2>
          <p style={{ fontSize: '15px', color: '#d8ccb8', lineHeight: 1.7, marginBottom: '28px' }}>
            We send genuine Makrana marble sample pieces and quality certificates to customers and architects across India and worldwide. Feel the smooth finish and natural shine yourself.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/917597417274?text=Namaste%20AFG%20Marble%2C%20I%20would%20like%20to%20request%20Makrana%20marble%20samples%20and%20purity%20certificates."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ background: '#25d366', color: '#ffffff', borderColor: '#20ba59' }}
            >
              <span>Request Samples on WhatsApp</span>
            </a>
            <Link href="/materials-guide" className="btn-outline-gold" style={{ borderColor: '#d8bb84', color: '#ecd39b' }}>
              <span>Read Comprehensive Stone Guide</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
