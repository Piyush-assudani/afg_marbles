'use client';
import Link from 'next/link';

export default function DifferenceTable({ onOpenInquiry }) {
  const ROWS = [
    {
      feature: 'Stone Purity & Calcite Ratio',
      afg: '98%–99% Pure Makrana Calcite (Taj Mahal stratum, crystal density 2.71 g/cm³)',
      other: 'Dolomitic / Italian commercial marble with heavy iron content (<80% calcite)'
    },
    {
      feature: 'Puja Oil, Milk & Kumkum Absorption',
      afg: 'Zero Porosity (0.01%) — Liquids wipe away without leaving a single yellow stain',
      other: 'High Porosity (0.8%–2.5%) — Absorbs diya oil, ghee & abhishek milk, staining yellow'
    },
    {
      feature: 'Lifetime Yellowing Resistance',
      afg: 'Zero Yellowing Guarantee — Calcite structure grows brighter with generations of washing',
      other: 'Turns dull yellow/brown within 3–5 years due to internal iron oxide reactions'
    },
    {
      feature: 'Master Sculptor Heritage',
      afg: 'Generational Silawat Artisans with lineage tracing back to historic imperial shrines',
      other: 'Casual commercial stone-cutters utilizing rough angle-grinders and resin filler'
    },
    {
      feature: 'Structural Joint Engineering',
      afg: 'Sacred Ayadi Vastu proportions with interlocking dry-joint marble tenons',
      other: 'Glued together with toxic polyester adhesives and synthetic filler pastes'
    },
    {
      feature: 'Pre-Delivery Assembly & Fitment',
      afg: '100% complete trial assembly in our Jaipur yard with 4K video inspection before dispatch',
      other: 'Dispatched in unverified loose slabs; site fitting errors and unexpected gaps'
    },
    {
      feature: 'Global & Domestic Export Packing',
      afg: 'Treated ISPM-15 export wooden crates with multi-layer high-density EVA shock protection',
      other: 'Loose straw loading in open commercial trucks with high breakage vulnerability'
    }
  ];

  return (
    <section className="sec-difference">
      <div className="sec-container">
        <div className="sec-header text-center">
          <span className="card-badge">THE ARCHITECTURAL BENCHMARK</span>
          <h2>The A.F.G Difference vs Local Vendors</h2>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Why discerning royal families, temple trusts, and architectural connoisseurs across India, USA, UK, and UAE exclusively commission A.F.G Marble &amp; Arts.
          </p>
        </div>

        <div className="difference-table-card">
          <div className="diff-table-responsive">
            <table className="diff-table">
              <thead>
                <tr>
                  <th style={{ width: '28%' }}>FEATURE</th>
                  <th className="th-afg" style={{ width: '38%' }}>
                    <span className="th-badge" style={{ display: 'inline-block', marginBottom: '6px' }}>
                      OFFICIAL ATELIER
                    </span>
                    <span style={{ display: 'block', fontSize: '15px', letterSpacing: '0.04em' }}>
                      A.F.G MARBLE &amp; ARTS
                    </span>
                  </th>
                  <th className="th-other" style={{ width: '34%' }}>
                    LOCAL COMMERCIAL VENDORS
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, idx) => (
                  <tr key={idx}>
                    <td className="td-feature">
                      <strong>{row.feature}</strong>
                    </td>
                    <td className="td-afg">
                      <div className="diff-val">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#22c55e" strokeWidth="2.4">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{row.afg}</span>
                      </div>
                    </td>
                    <td className="td-other">
                      <div className="diff-val">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#ef4444" strokeWidth="2.4">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        <span>{row.other}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="diff-footer-action text-center" style={{ marginTop: '32px' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              if (onOpenInquiry) {
                onOpenInquiry({ title: 'Makrana Calcite Authenticity & Consultation' });
              } else {
                window.location.href = '/contact';
              }
            }}
          >
            <span className="btn-primary__text">Request Makrana Calcite Lab Authenticity Certificate</span>
            <span className="btn-primary__icon">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
