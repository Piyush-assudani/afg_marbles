'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function PrivateCommissionsPage() {
  const COMMISSIONS = [
    {
      title: 'The Highgate Private Sanctum',
      location: 'Highgate, North London, United Kingdom',
      type: 'Royal Garbhagriha Peacock Mandir (8.5ft W × 11.2ft H)',
      stone: '100% Pure Makrana White Albeta with 24K Gold Gilding',
      img: '/gallery/mandir-peacock-torana-8341.webp',
      desc: 'Commissioned for a bespoke prayer wing in a historic North London residence. The patron requested an authentic Rajasthani peacock torana arch with concealed 110V–240V LED lighting and soft-close velvet storage. Fully pre-assembled in our Jaipur yard, crated in ISPM-15 pine, and installed by our artisans in London within 48 hours of doorstep delivery.',
      patron: 'Dr. Vikram & Sunita Patel'
    },
    {
      title: 'The Emirates Hills Nagara Shrine',
      location: 'Emirates Hills, Dubai, United Arab Emirates',
      type: 'Monumental Shikhar Sanctum (10.2ft W × 13.5ft H)',
      stone: 'Quarry-Select Makrana Calcite Bedrock',
      img: '/gallery/sanctum-tall-shikhara.webp',
      desc: 'Designed for a central courtyard sanctuary under desert conditions. Engineered with thermal expansion dry-joints and high-density calcite marble that reflects solar radiation without heating. Features five-tiered Nagara spires crowned with amalaka finials and hand-sculpted elephant plinths.',
      patron: 'Harshavardhan Singhania'
    },
    {
      title: 'The Worli Sea Face Penthouse Jharokha',
      location: 'Worli Sea Face, Mumbai, India',
      type: 'Freestanding Jharokha Mandir (6.5ft W × 8.8ft H)',
      stone: 'Makrana Dungri Marble with Crystalline Vein',
      img: '/gallery/mandir-freestanding-jharokha.webp',
      desc: 'A luxury sea-facing duplex required a consecrated sanctum that complemented contemporary interior architecture while preserving strict Ayadi Vastu mathematics. Our sculptors hand-chiseled curved bowfront storage drawers and translucent marble jali panels that cast radiant spiritual warmth at sunset.',
      patron: 'Ananya & Sameer Mehta'
    },
    {
      title: 'The Alibaug Coastal Estate Cascade',
      location: 'Alibaug Coast, Maharashtra, India',
      type: '3-Tier Monolithic Cascading Fountain (7.8ft H · 12ft Catch Pool)',
      stone: '100% Solid Rajnagar Hydraulic White Marble',
      img: '/gallery/fountain-classical-four-tier.webp',
      desc: 'Crafted for the central courtyard driveway of a private coastal retreat. Engineered with a closed-loop marine-grade 316 stainless steel manifold and precision-chiseled acanthus lips that produce a soothing harmonic water cadence without splashing.',
      patron: 'Estate Patronage Private Trust'
    }
  ];

  return (
    <>
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Atelier Portfolio</span>
            <span>/</span>
            <span>Private Commissions &amp; Global Patrons</span>
          </div>
          <h1>Private Commissions &amp; Global Patrons</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Explore curated architectural case studies of bespoke Makrana marble sanctums, monumental temples, and estate water cascades commissioned across London, Dubai, Manhattan, Mumbai, and Zurich.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="subpage-body" style={{ padding: '60px 0' }}>
        <div className="sec-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {COMMISSIONS.map((comm, idx) => (
              <div key={idx} className="creation-card" style={{ padding: '36px', background: '#ffffff', border: '1px solid rgba(184, 134, 63, 0.25)' }}>
                <div className="page-grid-2">
                  <div className="page-media-frame">
                    <img
                      src={comm.img}
                      alt={comm.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="media-caption-badge">{comm.location}</div>
                  </div>
                  <div className="page-info-block">
                    <span className="card-badge">{comm.type}</span>
                    <h2 style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: '#1c1813', margin: '8px 0 12px' }}>
                      {comm.title}
                    </h2>
                    <div style={{ fontSize: '12px', color: '#b08a4f', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
                      Stone: {comm.stone}
                    </div>
                    <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '20px', fontSize: '14px' }}>
                      {comm.desc}
                    </p>
                    <div style={{ padding: '14px 18px', background: '#faf6ee', borderRadius: '6px', borderLeft: '3px solid #b8863f', marginBottom: '24px' }}>
                      <span style={{ fontSize: '11px', color: '#8c6220', textTransform: 'uppercase', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                        Patron Commission
                      </span>
                      <strong style={{ fontSize: '14px', color: '#1c1813' }}>{comm.patron}</strong>
                    </div>
                    <div className="info-actions">
                      <a
                        href={`https://wa.me/917597417274?text=${encodeURIComponent(`Namaste AFG Marble, I am interested in a commission similar to "${comm.title}". Please share details and pricing.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        <span className="btn-primary__text">Inquire Similar Commission</span>
                        <span className="btn-primary__icon">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Difference Table & Consultation */}
      <DifferenceTable />
      <ConsultationCard />
    </>
  );
}
