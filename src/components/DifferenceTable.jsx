'use client';
import Link from 'next/link';

export default function DifferenceTable({ onOpenInquiry }) {
  const ROWS = [
    {
      feature: 'Stone Purity & Marble Quality',
      afg: '98%–99% Pure Makrana White Marble (The same pure stone used in the Taj Mahal)',
      other: 'Commercial marble with iron impurities that turn yellow over time'
    },
    {
      feature: 'Stain Resistance (Oil, Milk & Water)',
      afg: '100% Non-Porous — Daily puja milk, diya oil, and water wipe off cleanly without any stains',
      other: 'Porous stone that absorbs liquids and develops permanent dark yellow spots'
    },
    {
      feature: 'Lifetime Color & Shine Guarantee',
      afg: 'Zero-Yellowing Guarantee — Stays brilliant white and looks newer with every wash',
      other: 'Turns dull, yellowish, and lifeless within 2 to 3 years'
    },
    {
      feature: 'Artisan Hand-Carving',
      afg: 'Hand-chiseled by traditional master sculptors with generations of temple-building heritage',
      other: 'Rough machine cutting and angle grinders with cheap synthetic fillers'
    },
    {
      feature: 'Interlocking Joints & Assembly',
      afg: 'Interlocking marble joints built to accurate Vastu guidelines (No harmful chemical glue)',
      other: 'Glued together with toxic adhesives and putty that loosen over time'
    },
    {
      feature: 'Pre-Delivery Inspection',
      afg: 'Full trial assembly in our Makrana workshop with HD video review sent to you before dispatch',
      other: 'Dispatched as loose unverified pieces with fitting issues and uneven gaps on-site'
    },
    {
      feature: 'Packaging & Transit Safety',
      afg: 'Heavy-duty wooden crates with multi-layer shock protection and full transit insurance',
      other: 'Loose loading in open trucks with high risk of cracks and chipped edges'
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
            Why temple trusts, architects, and families across India and worldwide trust A.F.G Marble &amp; Arts for their home temples.
          </p>
        </div>

        <div className="difference-table-card">
          <div className="diff-scroll-hint">
            <span>⇄ Swipe horizontally to compare all features</span>
          </div>
          <div className="diff-table-responsive">
            <table className="diff-table">
              <thead>
                <tr>
                  <th>FEATURE</th>
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
