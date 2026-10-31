'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function GlobalShippingPage() {
  const PROTOCOLS = [
    {
      title: 'Solid Wooden Box Packing',
      desc: 'All packaging uses certified export-grade treated wooden crates approved for customs in the USA, UK, UAE, Canada, Australia, and worldwide.'
    },
    {
      title: 'Thick Shockproof Foam Padding',
      desc: 'Every single carved piece is wrapped in thick shock-absorbing foam to prevent any damage, scratches, or cracks during transport.'
    },
    {
      title: 'Safe Handling Sensors',
      desc: 'Wooden boxes carry tilt and shock indicators to ensure gentle handling throughout road, sea, or air shipping.'
    },
    {
      title: 'Expert Installation Team Support',
      desc: 'For large temples, our skilled artisan team can travel directly to your home anywhere in India or abroad to assemble and install the temple perfectly.'
    }
  ];

  const COUNTRIES = [
    'United States (New York, California, Texas, New Jersey, Florida)',
    'United Kingdom (London, Leicester, Manchester, Birmingham)',
    'United Arab Emirates (Dubai, Abu Dhabi, Sharjah)',
    'Canada (Toronto, Vancouver, Calgary)',
    'Australia (Sydney, Melbourne, Perth)',
    'Singapore, Malaysia, Kenya, South Africa, Switzerland'
  ];

  return (
    <>
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Delivery &amp; Installation</span>
            <span>/</span>
            <span>Safe Worldwide Delivery</span>
          </div>
          <h1>Safe Home Delivery Across India &amp; Worldwide</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Delivering pure marble home temples across 28+ countries with 100% safe arrival guarantee since 1987. Strong wooden box packing, full insurance, customs clearance, and home installation options.
          </p>
        </div>
      </section>

      {/* Shipping Details */}
      <section className="subpage-body" style={{ padding: '60px 0' }}>
        <div className="sec-container">
          <div className="page-grid-2" style={{ marginBottom: '60px' }}>
            <div className="page-media-frame">
              <img
                src="/gallery/atelier-ispm15-crating-export.webp"
                alt="ISPM-15 Heavy-Duty Export Crating with Shock Foam"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="media-caption-badge">Strong Export Wooden Box Packing</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">100% SAFE ARRIVAL</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: '#1c1813', margin: '12px 0 16px' }}>
                Delivering Your Temple Without a Single Scratch
              </h2>
              <div className="gold-rule"></div>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '18px' }}>
                Solid marble is heavy and precious. Large temples can weigh anywhere from 500 kg to over 3,000 kg.
              </p>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '22px' }}>
                We design all our temples in easy interlocking sections. Each piece fits easily into normal home lifts, staircases, and apartment doorways for hassle-free installation.
              </p>
              <div className="info-actions">
                <a
                  href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20am%20located%20overseas%20and%20would%20like%20to%20know%20shipping%20and%20customs%20rates%20to%20my%20city."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span className="btn-primary__text">Ask for Delivery Charges on WhatsApp</span>
                  <span className="btn-primary__icon">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Protocols Grid */}
          <div style={{ marginBottom: '60px' }}>
            <div className="sec-header text-center" style={{ marginBottom: '36px' }}>
              <span className="card-badge">4-LAYER SAFE PACKING</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '30px', color: '#1c1813' }}>
                Built for 100% Safe Delivery to Your Doorstep
              </h2>
              <div className="gold-rule center"></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
              {PROTOCOLS.map((p, idx) => (
                <div key={idx} className="creation-card" style={{ padding: '30px' }}>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '19px', color: '#1c1813', marginBottom: '8px' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#5c5246', lineHeight: 1.6, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Global Reach Bar */}
            <div className="creation-card" style={{ padding: '36px', background: '#faf6ee', border: '1px solid rgba(184, 134, 63, 0.25)' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: '#1c1813', marginBottom: '14px' }}>
                Countries Where We Deliver Regularly
              </h3>
              <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
                {COUNTRIES.map((c, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#4a4239' }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
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
