'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function AboutAFGPage() {
  const TIMELINE = [
    {
      year: '1987',
      title: 'Foundation in Makrana',
      desc: 'Started working directly with pure white marble from the historic quarries of Makrana, Rajasthan—the same natural stone used in the Taj Mahal.'
    },
    {
      year: '1998',
      title: 'Workshop & Artisan Studio',
      desc: 'Set up our central hand-carving workshop, bringing together skilled traditional stone-carving artisans with generations of experience.'
    },
    {
      year: '2008',
      title: 'Custom 2D Design Drawings',
      desc: 'Introduced custom 2D drawings matching room dimensions, letting families across India and overseas see their exact temple design before carving begins.'
    },
    {
      year: '2016',
      title: 'Safe Worldwide Delivery',
      desc: 'Expanded to safe export-grade wooden crate packing with foam cushioning, safely delivering temples to over 28 countries.'
    },
    {
      year: 'Today',
      title: 'Trusted by Over 5,000 Families',
      desc: 'Over 5,000 handcrafted marble temples, fountains, and monuments built for homes, temples, and estates worldwide.'
    }
  ];

  return (
    <>
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>About Us</span>
            <span>/</span>
            <span>About A.F.G Marble &amp; Arts</span>
          </div>
          <h1>Handcrafting Pure White Marble Temples Since 1987</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Founded in 1987, A.F.G Marble &amp; Arts is a family-owned marble workshop in Rajasthan. We work directly with pure Makrana marble and traditional master artisans to create long-lasting, beautifully hand-carved home temples.
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
              <div className="media-caption-badge">Master Artisan Hand-Carving Marble</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">TRADITIONAL CRAFTSMANSHIP</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: '#1c1813', margin: '12px 0 16px' }}>
                Generations of Hand-Carved Marble Mastery
              </h2>
              <div className="gold-rule"></div>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '18px' }}>
                Our stone artisans come from families that have carved Rajasthan&rsquo;s most iconic temples and palaces for generations.
              </p>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '20px' }}>
                While commercial factories use fast machine cutting that leaves rough edges and micro-cracks, our craftsmen hand-chisel every peacock arch, top dome, and jali screen with gentle care and water polishing.
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
                  <span className="btn-primary__text">See Our 5-Step Craft Process</span>
                  <span className="btn-primary__icon">→</span>
                </Link>
                <Link href="/contact" className="btn-outline-gold">
                  <span>Visit Our Workshop</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Heritage Timeline */}
          <div style={{ marginBottom: '60px' }}>
            <div className="sec-header text-center" style={{ marginBottom: '40px' }}>
              <span className="card-badge">SINCE 1987</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '30px', color: '#1c1813' }}>
                Our Journey Over the Past 35+ Years
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
