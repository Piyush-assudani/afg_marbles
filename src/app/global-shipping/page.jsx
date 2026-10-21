'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function GlobalShippingPage() {
  const PROTOCOLS = [
    {
      title: 'ISPM-15 Heat-Treated Crating',
      desc: 'All packaging uses certified HT-stamped fumigated heavy marine pine timber compliant with US Customs, UK DEFRA, and Australian Biosecurity import standards.'
    },
    {
      title: '50mm High-Density EVA Shock Foam',
      desc: 'Every carved marble element is individually suspended in CNC-milled closed-cell EVA foam, isolating fragile kalash finials and jali screens from transit vibrations.'
    },
    {
      title: 'Real-Time Tilt & Shock Indicators',
      desc: 'External crates are equipped with calibrated ShockWatch™ and TiltWatch™ sensors that trigger if crates experience sudden drop impacts during ocean or air freight.'
    },
    {
      title: 'Worldwide Master Artisan Crew',
      desc: 'For monumental temples and large sanctums, AFG dispatches our senior Rajasthani artisan team directly to your global doorstep for flawless on-site installation.'
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
            <span>Logistics &amp; Installation</span>
            <span>/</span>
            <span>Global White-Glove Export</span>
          </div>
          <h1>Global Export &amp; White-Glove Installation</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Delivering consecrated marble sanctums across 28+ countries with zero breakage since 1987. Full ISPM-15 certified export crating, international customs clearance, all-risk marine insurance, and dedicated on-site artisan installation teams.
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
              <div className="media-caption-badge">ISPM-15 Heavy Export Crating</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">SEAMLESS WORLDWIDE ARRIVAL</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: '#1c1813', margin: '12px 0 16px' }}>
                Delivering Sacred Devotion Without a Single Scratch
              </h2>
              <div className="gold-rule"></div>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '18px' }}>
                International stone shipping is an engineering discipline. Makrana marble is dense (2.71 g/cm³), meaning large temple assemblies can weigh between 1,500 kg and 8,000 kg.
              </p>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '22px' }}>
                We engineer our sanctums into modular interlocking components. Each section fits through standard residential elevators and 36-inch penthouse doorways, eliminating expensive crane hoisting.
              </p>
              <div className="info-actions">
                <a
                  href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20am%20located%20overseas%20and%20would%20like%20to%20know%20shipping%20and%20customs%20rates%20to%20my%20city."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span className="btn-primary__text">Inquire International Freight</span>
                  <span className="btn-primary__icon">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Protocols Grid */}
          <div style={{ marginBottom: '60px' }}>
            <div className="sec-header text-center" style={{ marginBottom: '36px' }}>
              <span className="card-badge">THE 4-TIER PACKAGING SHIELD</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '30px', color: '#1c1813' }}>
                Engineered for International Ocean &amp; Air Freight
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
                Primary International Delivery Corridors
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
