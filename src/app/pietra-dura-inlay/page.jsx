'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function PietraDuraInlayPage() {
  const INLAYS = [
    {
      id: 'sanctum-floor-mandala',
      title: 'The Taj Mahal Royal Floor Mandala',
      gemstones: 'Lapis Lazuli, Malachite, Jasper & Carnelian',
      desc: 'Circular temple floor medallion chiseled flush with diamond precision. Featuring radiating lotus geometry, authentic lapis lazuli borders, and zero resin gaps.',
      img: '/gallery/sanctum-inlay-floor.webp',
      badge: 'Taj Mahal Technique',
      tag: 'Floor Medallion'
    },
    {
      id: 'mother-of-pearl-tree',
      title: 'The Kalpavriksha Mother-of-Pearl Halo',
      gemstones: 'Natural Ocean Mother-of-Pearl & 24K Gold Leaf',
      desc: 'The wish-fulfilling sacred Kalpavriksha tree chiseled into Makrana marble. The iridescent mother-of-pearl leaves shimmer with sacred warmth when sanctum lights are turned on.',
      img: '/gallery/sanctum-mother-pearl-tree.webp',
      badge: 'Iridescent Gem Inlay',
      tag: 'Sanctum Backdrop'
    },
    {
      id: 'gold-bas-relief-creeper',
      title: 'The Imperial Floral Parchin Kari Border',
      gemstones: 'Semi-Precious Agate, Turquoise & Malachite',
      desc: 'Classical Mughal-Rajasthani vine scroll inlaid around sanctum archways and door frames. Each flower petal is individually shaped on emery wheels by master inlayers.',
      img: '/gallery/sanctum-gold-bas-relief.webp',
      badge: 'Custom Border',
      tag: 'Archway Inlay'
    },
    {
      id: 'silver-kalash-damask',
      title: 'The Auspicious Ashta-Mangala Plinth Inlay',
      gemstones: 'Silver Foil, Coral & Lapis Lazuli',
      desc: 'Eight sacred Vedic auspicious symbols (Kalash, Swastika, Shankha, Chakra, Padma) inlaid into the temple plinth steps to welcome prosperity and auspiciousness.',
      img: '/gallery/sanctum-silver-kalash-inlay.webp',
      badge: 'Sacred Symbols',
      tag: 'Plinth Steps'
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
            <span>Stone Inlay Work</span>
          </div>
          <h1>Handmade Stone Inlay &amp; Floral Art</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            The famous Taj Mahal stone inlay art (Parchin Kari). Colorful natural semi-precious stones and mother-of-pearl are carefully hand-cut and inlaid flush into pure white Makrana marble.
          </p>
        </div>
      </section>

      {/* Inlay Showcase Grid */}
      <section className="subpage-body">
        <div className="sec-container">
          <div className="creations-grid">
            {INLAYS.map((item) => (
              <div key={item.id} className="creation-card product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-media product-card__media">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span className="card-badge product-badge" style={{ zIndex: 3 }}>{item.badge}</span>
                  <div className="angle-tag-pill" style={{ position: 'absolute', bottom: '12px', left: '14px', zIndex: 3, background: 'rgba(255, 255, 255, 0.92)', color: '#1c1813', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '4px' }}>
                    {item.tag}
                  </div>
                </div>
                <div className="card-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#b08a4f', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                    {item.gemstones}
                  </span>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: '#1c1813', margin: '4px 0 8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6b5f52', lineHeight: 1.6, marginBottom: '16px' }}>
                    {item.desc}
                  </p>
                  <div style={{ marginTop: 'auto' }}>
                    <button
                      type="button"
                      className="btn-whatsapp-pill"
                      onClick={() => {
                        const text = `Namaste AFG Marble, I am inquiring about custom stone inlay work: "${item.title}". Please share patterns and pricing.`;
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
