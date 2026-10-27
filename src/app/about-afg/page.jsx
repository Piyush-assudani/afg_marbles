'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function AboutAFGPage() {
  const TIMELINE = [
    {
      year: '1987',
      title: 'Foundation at Makrana Bedrock',
      desc: 'Established with direct quarry concessions in the historic Makrana calcite belt—the geological seam renowned for supplying stone to the Taj Mahal and Victoria Memorial.'
    },
    {
      year: '1998',
      title: 'Jaipur Master Sculptor Yard',
      desc: 'Opened our central pre-assembly and stone sculpting atelier in Jaipur, bringing together senior 4th and 5th-generation Silawat guild carvers under one roof.'
    },
    {
      year: '2008',
      title: 'Architectural CAD Precision Standards',
      desc: 'Integrated sacred Vedic architectural formulas with precision 2D CAD elevation drafting, allowing patrons worldwide to verify proportions prior to chiseling.'
    },
    {
      year: '2016',
      title: 'ISPM-15 Global White-Glove Export',
      desc: 'Expanded international logistics infrastructure with specialized shock-absorbing export crating, shipping turnkey sanctums to over 28 countries.'
    },
    {
      year: 'Today',
      title: 'India’s Premier Marble Atelier',
      desc: 'Over 5,000 sanctums, monumental temples, and palatial fountains consecrated across royal estates, temple trusts, and private luxury residences globally.'
    }
  ];

  return (
    <>
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>The Atelier</span>
            <span>/</span>
            <span>About A.F.G Marble &amp; Arts</span>
          </div>
          <h1>Crafting Sacred Eternity in Pure Makrana Marble</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Founded in 1987, A.F.G Marble &amp; Arts is Rajasthan’s premier family-owned stone atelier. We unite direct Makrana quarry bedrock mining with generational Silawat master sculpting to create consecrated sanctums that endure for centuries.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="subpage-body" style={{ padding: '60px 0' }}>
        <div className="sec-container">
          <div className="page-grid-2" style={{ marginBottom: '60px' }}>
            <div className="page-media-frame">
              <img
                src="/gallery/atelier-sculptor-chisel-block.webp"
                alt="Silawat Master Sculptor Chiseling Makrana Bedrock"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="media-caption-badge">Master Silawat Sculptor at Work</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">THE SILAWAT GUILD LINEAGE</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: '#1c1813', margin: '12px 0 16px' }}>
                Custodians of Rajasthan’s Imperial Stonecraft
              </h2>
              <div className="gold-rule"></div>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '18px' }}>
                Our stone sculptors belong to the historic Silawat community—the direct architectural lineage commissioned by Mughal emperors and Rajput Maharajas to shape India’s most iconic stone monuments.
              </p>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '20px' }}>
                While modern mass fabricators rely on high-speed CNC routers that burn marble edges and cause microscopic thermal fractures, our master craftsmen shape every peacock arch, kalash spire, and jali screen using hand diamond chisels and water honing.
              </p>
              <blockquote
                style={{
                  borderLeft: '3px solid #b8863f',
                  paddingLeft: '18px',
                  margin: '0 0 24px',
                  fontFamily: 'var(--serif)',
                  fontSize: '15px',
                  color: '#2a2218',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  background: 'rgba(184, 134, 63, 0.05)',
                  padding: '14px 18px',
                  borderRadius: '0 8px 8px 0',
                }}
              >
                “There may be a little more expenditure in the creation being made for God, but the result should be such that there is no scope for any shortage.”
              </blockquote>
              <div className="info-actions">
                <Link href="/atelier-workshop" className="btn-primary">
                  <span className="btn-primary__text">Explore Our 5-Stage Craft</span>
                  <span className="btn-primary__icon">→</span>
                </Link>
                <Link href="/contact" className="btn-outline-gold">
                  <span>Visit Our Jaipur Yard</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Heritage Timeline */}
          <div style={{ marginBottom: '60px' }}>
            <div className="sec-header text-center" style={{ marginBottom: '40px' }}>
              <span className="card-badge">35+ YEARS OF MASTERY</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '30px', color: '#1c1813' }}>
                Our Historic Milestones Since 1987
              </h2>
              <div className="gold-rule center"></div>
            </div>

            <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {TIMELINE.map((item, idx) => (
                <div key={idx} className="creation-card" style={{ padding: '26px 30px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#b08a4f', fontWeight: 700, minWidth: '70px', paddingTop: '2px' }}>
                    {item.year}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: '#1c1813', margin: '0 0 6px' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#5c5246', lineHeight: 1.6, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
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
