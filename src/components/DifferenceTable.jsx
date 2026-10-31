'use client';
import Link from 'next/link';

export default function DifferenceTable({ onOpenInquiry }) {
  const ROWS = [
    {
      feature: '1. Marble Purity',
      afg: '100% Pure Natural Makrana White Marble (Same stone as the Taj Mahal)',
      other: 'Cheap market marble mixed with chemicals that turn yellow'
    },
    {
      feature: '2. Stain Resistance',
      afg: '100% Stain-Free — Milk, water, and diya oil wipe off easily with a wet cloth',
      other: 'Absorbs oily puja liquids and leaves permanent dark marks'
    },
    {
      feature: '3. Lifetime White Shine',
      afg: 'Never Turns Yellow — Stays bright white and shines brighter with every wash',
      other: 'Turns dull and yellowish within 2 to 3 years'
    },
    {
      feature: '4. Hand Carving Quality',
      afg: 'Deep 3D hand-carving by master artisans with generations of experience',
      other: 'Rough machine cutting with flat edges and cheap plastic putty'
    },
    {
      feature: '5. How It Fits Together',
      afg: 'Pieces slot together firmly and easily (No smelly chemical glue)',
      other: 'Stuck together with cheap chemical glue that breaks over time'
    },
    {
      feature: '6. Workshop Testing Before Delivery',
      afg: 'We assemble your full temple in our workshop and send you clear videos before packing',
      other: 'Sent as loose pieces with fitting problems when delivered to your home'
    },
    {
      feature: '7. Packing & Delivery Safety',
      afg: 'Packed in strong wooden boxes with thick foam cushions and 100% insurance',
      other: 'Loaded loosely in trucks with high risk of cracks and broken corners'
    }
  ];

  return (
    <section className="sec-difference">
      <div className="sec-container">
        <div className="sec-header text-center">
          <span className="card-badge">HONEST COMPARISON</span>
          <h2>Why Choose A.F.G Marble Over Local Sellers</h2>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            See how our 100% pure Makrana marble and master hand carving compare to cheap local alternatives.
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
                      DIRECT WORKSHOP
                    </span>
                    <span style={{ display: 'block', fontSize: '15px', letterSpacing: '0.04em' }}>
                      A.F.G MARBLE &amp; ARTS
                    </span>
                  </th>
                  <th className="th-other" style={{ width: '34%' }}>
                    LOCAL COMMERCIAL SELLERS
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
