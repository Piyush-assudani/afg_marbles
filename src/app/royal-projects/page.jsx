import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Royal Heritage Projects & Private Estate Commissions | A.F.G Marble & Arts',
  description:
    'Explore completed landmark marble commissions, palatial courtyard fountains, and Nagara shikhar pooja sanctums installed across Udaipur, Dubai, London, and Delhi NCR.',
};

const PROJECTS = [
  {
    id: 'udaipur-lake-estate',
    title: 'The Lake Pichola Private Estate Fountain & Pavilions',
    location: 'Udaipur, Rajasthan',
    year: 'Commissioned 2024',
    category: 'Palatial Water & Heritage Pavilions',
    stone: 'Solid Makrana White & Bidasar Green Marble',
    scale: '16ft Diameter Basin · 12ft Chhatri Pavilion Pair',
    heroImage: '/gallery/fountain-courtyard-circular.webp',
    gallery: [
      '/gallery/fountain-classical-four-tier.webp',
      '/gallery/chhatri-makrana-dome.webp',
      '/gallery/fountain-palatial-night.webp',
    ],
    brief:
      'Built for a private estate overlooking Lake Pichola. Features a central tiered lotus fountain with two matching carved marble pavilions on both sides.',
    execution:
      'Carved from a solid 24-tonne Makrana marble block. Integrated with water pumps and warm underwater lighting.',
    deliveryTime: '14 Weeks from Design Drawing to Home Installation',
  },
  {
    id: 'london-mayfair-sanctum',
    title: 'The Mayfair London Penthouse Pure White Marble Temple',
    location: 'Mayfair, London, UK',
    year: 'Commissioned 2024',
    category: 'Contemporary Pooja Sanctums',
    stone: 'Makrana Pure White Marble & 24K Pure Gold Leaf Inlay',
    scale: '8.5ft Width × 4.2ft Depth × 9.0ft Height',
    heroImage: '/gallery/mandir-grand-makrana-8361.webp',
    gallery: [
      '/gallery/mandir-pure-white-om-before.webp',
      '/gallery/sanctum-tall-shikhara.webp',
      '/gallery/sanctum-ram-darbar-dome.webp',
    ],
    brief:
      'Custom home temple designed for a luxury apartment in Mayfair, London. Built to fit strict room measurements and light weight limits with easy no-cement interlocking assembly.',
    execution:
      'Built with interlocking modular blocks that slide together securely. Includes smoke vents, smooth sliding drawers, and soft warm lighting.',
    deliveryTime: 'Shipped by air in strong wooden boxes, installed smoothly in just 5 hours.',
  },
  {
    id: 'dubai-palm-cascade',
    title: 'The Palm Jumeirah Estate Multi-Tier Cascading Fountain',
    location: 'Palm Jumeirah, Dubai, UAE',
    year: 'Commissioned 2023',
    category: 'Palatial Water Architecture',
    stone: '100% Rajnagar Hydraulic White Calcite',
    scale: '14ft Catch Pool · 8.5ft Monumental Height',
    heroImage: '/gallery/fountain-black-marquina-cascade.webp',
    gallery: [
      '/gallery/fountain-french-courtyard.webp',
      '/gallery/fountain-sculpted-horses.webp',
      '/gallery/fountain-octagonal-topdown.webp',
    ],
    brief:
      'Large courtyard fountain for a beachfront villa. Built to withstand strong sun, sea salt air, and 50°C summer heat without cracking or turning yellow.',
    execution:
      'Carved from high-density pure marble that absorbs zero water. Features 4 carved lion spouts, 3 cascading water bowls, and heavy-duty brass piping.',
    deliveryTime: 'Shipped by sea to Dubai port, installed smoothly in 3 days.',
  },
  {
    id: 'delhi-farmhouse-complex',
    title: 'The Chhatarpur Farmhouse Grand Marble Spire Temple',
    location: 'Chhatarpur, New Delhi',
    year: 'Commissioned 2023',
    category: 'Monumental Heritage Temples',
    stone: '100% Solid Makrana Pure White Marble',
    scale: '22ft Length × 14ft Width × 19.5ft Monumental Spire',
    heroImage: '/gallery/mandir-monumental-temple.webp',
    gallery: [
      '/gallery/chhatri-torana-monumental-gate.webp',
      '/gallery/sanctum-fluted-colonnade.webp',
      '/gallery/sanctum-triple-shikhar-room.webp',
    ],
    brief:
      'A grand private temple built inside a 4-acre farmhouse estate. Built with traditional temple spire, carved elephant base, and full prayer walkway around the shrine.',
    execution:
      'Over 60 tonnes of pure Makrana white marble hand-carved by 24 stone carvers over 9 months. 100% full trial setup tested at our workshop before shipping.',
    deliveryTime: 'Dedicated 8-artisan team on-site for 30-day consecration and final polishing.',
  },
];

export default function RoyalProjectsPage() {
  return (
    <div className="subpage-container" style={{ paddingTop: '110px', background: '#fdfbf7', minHeight: '100vh' }}>
      {/* Hero Header */}
      <section style={{ padding: '60px 24px 40px', textAlign: 'center', maxWidth: '960px', margin: '0 auto' }}>
        <span
          className="card-badge"
          style={{ position: 'static', display: 'inline-block', marginBottom: '14px', background: 'rgba(176, 138, 79, 0.15)', color: '#8c6a36' }}
        >
          COMPLETED PROJECTS
        </span>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4vw, 52px)', color: '#1c1813', lineHeight: 1.2, marginBottom: '18px' }}>
          Our Completed Temple &amp; Fountain Projects
        </h1>
        <div className="gold-rule center" style={{ margin: '14px auto 22px' }}></div>
        <p style={{ fontSize: '16px', color: '#6b5f52', lineHeight: 1.7, maxWidth: '760px', margin: '0 auto' }}>
          From private villas and estates in India to penthouses in London and Dubai — see real photos and details of marble temples, garden fountains, and pavilions crafted and installed by our master stone carvers.
        </p>
      </section>

      {/* Projects Showcase */}
      <section style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          {PROJECTS.map((proj, idx) => (
            <article
              key={proj.id}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid rgba(176, 138, 79, 0.22)',
                boxShadow: '0 18px 48px rgba(28, 24, 19, 0.08)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: idx % 2 === 0 ? '1.15fr 1fr' : '1fr 1.15fr',
              }}
            >
              {/* Media Column */}
              <div
                style={{
                  order: idx % 2 === 0 ? 1 : 2,
                  position: 'relative',
                  minHeight: '380px',
                  backgroundColor: '#efe9df',
                }}
              >
                <img
                  src={proj.heroImage}
                  alt={proj.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '18px',
                    left: '18px',
                    background: 'rgba(28, 24, 19, 0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#fdfbf7',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  <MapPin size={12} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
                  {proj.location} · {proj.year}
                </span>

                {/* Micro Preview Thumbnails */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    display: 'flex',
                    gap: '8px',
                    background: 'rgba(20, 16, 12, 0.75)',
                    backdropFilter: 'blur(8px)',
                    padding: '6px',
                    borderRadius: '10px',
                  }}
                >
                  {proj.gallery.map((gImg, gIdx) => (
                    <div
                      key={gIdx}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.4)',
                      }}
                    >
                      <img src={gImg} alt="Detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Information Column */}
              <div
                style={{
                  order: idx % 2 === 0 ? 2 : 1,
                  padding: '36px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', color: '#b08a4f', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {proj.category}
                </span>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '26px', color: '#1c1813', lineHeight: 1.3, marginBottom: '14px' }}>
                  {proj.title}
                </h2>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    background: '#fcfaf6',
                    padding: '14px 18px',
                    borderRadius: '10px',
                    border: '1px solid rgba(176, 138, 79, 0.18)',
                    marginBottom: '20px',
                    fontSize: '13px',
                  }}
                >
                  <div>
                    <span style={{ color: '#8c6a36', fontWeight: 600, display: 'block' }}>Primary Stone:</span>
                    <strong style={{ color: '#1c1813' }}>{proj.stone}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#8c6a36', fontWeight: 600, display: 'block' }}>Scale &amp; Dimensions:</span>
                    <strong style={{ color: '#1c1813' }}>{proj.scale}</strong>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8c6a36', marginBottom: '6px' }}>
                    Architectural Mandate
                  </h4>
                  <p style={{ fontSize: '14px', color: '#52473c', lineHeight: 1.6 }}>{proj.brief}</p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8c6a36', marginBottom: '6px' }}>
                    Artisan Execution &amp; Engineering
                  </h4>
                  <p style={{ fontSize: '14px', color: '#52473c', lineHeight: 1.6 }}>{proj.execution}</p>
                  <p style={{ fontSize: '12px', color: '#7a6f62', marginTop: '6px', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {proj.deliveryTime}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <a
                    href={`https://wa.me/917597417274?text=${encodeURIComponent(
                      `Namaste AFG Marble, I am interested in commissioning an estate project similar to "${proj.title}" (${proj.location}). Please share technical CAD portfolios and consultation details.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ padding: '10px 22px', fontSize: '13px' }}
                  >
                    <span>Inquire on Similar Commission</span>
                    <span>→</span>
                  </a>
                  <Link href="/bespoke-consultation" className="btn-outline-gold" style={{ padding: '10px 20px', fontSize: '13px' }}>
                    <span>Book 2D CAD Session</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Callout Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1c1813 0%, #2b241c 100%)',
          color: '#fdfbf7',
          padding: '64px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: '#ecd39b', marginBottom: '14px' }}>
            Have a Private Estate or Sacred Sanctuary in Mind?
          </h2>
          <p style={{ fontSize: '15px', color: '#d8ccb8', lineHeight: 1.7, marginBottom: '28px' }}>
            Our marble temple experts work directly with homeowners, architects, and builders globally. Receive free 2D design drawings and price estimates within 24 hours.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/917597417274?text=Namaste%20AFG%20Marble%2C%20I%20would%20like%20to%20discuss%20a%20private%20estate%20or%20temple%20commission."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ background: '#25d366', color: '#ffffff', borderColor: '#20ba59' }}
            >
              <span>Chat with Our Temple Expert on WhatsApp</span>
            </a>
            <Link href="/contact" className="btn-outline-gold" style={{ borderColor: '#d8bb84', color: '#ecd39b' }}>
              <span>Visit Our Makrana Workshops</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
