'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function JaaliScreensPage() {
  const JAALIS = [
    {
      id: 'pooja-folding-jaali-doors',
      title: 'The Bi-Fold Monolithic Temple Jaali Doors',
      pattern: 'Traditional Mughal Floral Lattice (Pierced Openwork)',
      desc: 'Pair of folding temple doors hand-pierced from monolithic 30mm Makrana marble slabs. Features solid brass antique pivot hinges and intricate floral creepers that filter sanctum daylight into soft sacred shadows.',
      img: '/gallery/sanctum-jaali-doors.webp',
      badge: 'Bestseller Sanctum Door',
      tag: 'Folding Doors'
    },
    {
      id: 'geometric-star-partition',
      title: 'The Octagonal Geometry Villa Divider Screen',
      pattern: 'Sacred Vedic Octagonal Star Lattice',
      desc: 'Full-height freestanding room partition crafted for luxury penthouses and prayer spaces. Creates elegant visual privacy between the pooja room and living areas while preserving air ventilation.',
      img: '/gallery/sanctum-pure-lattice.webp',
      badge: 'Architectural Divider',
      tag: 'Room Partition'
    },
    {
      id: 'peacock-arch-filigree',
      title: 'The Hand-Carved Peacock Arch Jali',
      pattern: 'Peacock Feather & Arch Cutwork',
      desc: 'Decorative arched screen designed for pooja room niches and doorways. Every cutwork hole is carved entirely by hand with hammer and chisel, ensuring it stays strong and bright forever.',
      img: '/gallery/sanctum-decorative-arch.webp',
      badge: 'Carved Arch',
      tag: 'Niche Arch'
    },
    {
      id: 'sanctum-colonnade-screens',
      title: 'The Mandap Colonnade Perimeter Screen',
      pattern: 'Diamond Honeycomb & Floral Rosette Lattice',
      desc: 'Modular perimeter screening for temple parikrama walkways and sanctum verandas. Engineered with dry-joint tongue-and-groove marble joints for rapid assembly.',
      img: '/gallery/sanctum-fluted-colonnade.webp',
      badge: 'Temple Mandap Screen',
      tag: 'Perimeter Screen'
    }
  ];

  return (
    <>
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Catalog</span>
            <span>/</span>
            <span>Marble Jali Screens</span>
          </div>
          <h1>Hand-Carved Marble Jali Screens &amp; Doors</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Handmade marble jali screens and temple folding doors carved from solid natural Makrana marble slabs. Pierced by hand using traditional tools to allow gentle light, air flow, and incense smoke to vent naturally.
          </p>
        </div>
      </section>

      {/* Jaali Grid */}
      <section className="subpage-body">
        <div className="sec-container">
          <div className="creations-grid">
            {JAALIS.map((jaali) => (
              <div key={jaali.id} className="creation-card product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-media product-card__media">
                  <img
                    src={jaali.img}
                    alt={jaali.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span className="card-badge product-badge" style={{ zIndex: 3 }}>{jaali.badge}</span>
                  <div className="angle-tag-pill" style={{ position: 'absolute', bottom: '12px', left: '14px', zIndex: 3, background: 'rgba(255, 255, 255, 0.92)', color: '#1c1813', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '4px' }}>
                    {jaali.tag}
                  </div>
                </div>
                <div className="card-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#b08a4f', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                    {jaali.pattern}
                  </span>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: '#1c1813', margin: '4px 0 8px' }}>
                    {jaali.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6b5f52', lineHeight: 1.6, marginBottom: '16px' }}>
                    {jaali.desc}
                  </p>
                  <div style={{ marginTop: 'auto' }}>
                    <button
                      type="button"
                      className="btn-whatsapp-pill"
                      onClick={() => {
                        const text = `Namaste AFG Marble, I am inquiring about custom marble jali screens: "${jaali.title}". Please share designs, sizes, and pricing.`;
                        window.open(`https://wa.me/917597417274?text=${encodeURIComponent(text)}`, '_blank');
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '9px',
                        padding: '12px 20px',
                        background: 'linear-gradient(135deg, #1c1813 0%, #2b241c 100%)',
                        color: '#ecd39b',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        border: '1px solid rgba(212, 175, 55, 0.45)',
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(28, 24, 19, 0.16)',
                      }}
                    >
                      <span>Get Price &amp; Details</span>
                    </button>
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
