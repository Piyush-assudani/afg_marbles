'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function PietraDuraInlayPage() {
  const INLAYS = [
    {
      id: 'inlay-round-medallion-table',
      title: 'Handcrafted Marble Inlay Table & Floor Medallion',
      gemstones: 'Lapis Lazuli, Jasper, Malachite & Agate',
      desc: 'Circular pure white marble inlay top with intricate floral motifs and radiating gemstone patterns. Hand-chiseled flush with zero resin gaps.',
      img: '/gallery/inlay-work-round-table-medallion.webp',
      badge: 'Marble Inlay Work',
      tag: 'Round Medallion'
    },
    {
      id: 'inlay-floral-panel-art',
      title: 'Royal Marble Inlay Wall Panel',
      gemstones: 'Semi-Precious Gemstones & Mother-of-Pearl',
      desc: 'Elegant vertical marble wall art panel featuring traditional floral vines and blooming flower buds inlaid into pure Makrana white marble.',
      img: '/gallery/inlay-work-floral-panel.webp',
      badge: 'Wall Panel Art',
      tag: 'Temple Backdrop'
    },
    {
      id: 'inlay-grand-mandala-floor',
      title: 'Grand Marble Inlay Floor Mandala',
      gemstones: 'Cornelian, Malachite, Lapis & Onyx',
      desc: 'Detailed geometric and floral floor mandala design for luxury living halls, temple sanctums, and villa entrance foyers.',
      img: '/gallery/inlay-work-grand-mandala.webp',
      badge: 'Floor Mandala',
      tag: 'Foyer & Hall'
    },
    {
      id: 'inlay-border-runner-design',
      title: 'Marble Inlay Border & Door Frame Runner',
      gemstones: 'Multi-Color Natural Stone Inlay',
      desc: 'Classical floral border runners and frame inlay work for temple entrance doorways, floor borders, and wall panels.',
      img: '/gallery/inlay-work-border-runner.webp',
      badge: 'Border Runner',
      tag: 'Doorway & Border'
    },
    {
      id: 'inlay-peacock-art-medallion',
      title: 'Decorative Marble Inlay Art Piece',
      gemstones: 'Natural Stones & Precision Cut Gems',
      desc: 'Fine artisan handcrafted marble inlay showcase piece displaying delicate stone-cutting and traditional Rajasthani floral artistry.',
      img: '/gallery/inlay-work-peacock-art.webp',
      badge: 'Artisan Showcase',
      tag: 'Custom Inlay'
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
            <span>Marble Inlay Work</span>
          </div>
          <h1>Marble Inlay Work</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Traditional pure marble inlay work (Parchin Kari). Colorful natural semi-precious stones, lapis lazuli, malachite, and mother-of-pearl are carefully hand-cut and inlaid flush into pure white Makrana marble.
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
                        const text = `Namaste AFG Marble, I am inquiring about custom Marble Inlay Work: "${item.title}". Please share patterns and pricing.`;
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
