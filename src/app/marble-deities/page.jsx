'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function MarbleDeitiesPage() {
  const DEITIES = [
    {
      id: 'ram-darbar-murti',
      title: 'The Sacred Ayodhya Ram Darbar',
      stone: '100% Monolithic Makrana Pure Calcite',
      scale: '3.5ft to 6.0ft Height (Custom Scale)',
      desc: 'Hand-sculpted in flawless single-block Makrana white marble. Features Bhagwan Shri Ram, Mata Sita, Lakshman ji, and Bhakt Hanuman in classical Raghuvanshi posture with authentic gemstone pigment eye painting and 24K pure gold leaf mukut gilding.',
      img: '/gallery/sanctum-ram-darbar-dome.webp',
      badge: 'Temple Trust Benchmark',
      tag: 'Ram Darbar'
    },
    {
      id: 'ganesha-lakshmi-saraswati',
      title: 'Shri Ganesha, Lakshmi & Saraswati Sanctum Murti',
      stone: 'Quarry-Select Translucent Makrana Albeta',
      scale: '2.5ft to 5.0ft Height',
      desc: 'Auspicious trio sculpted with micro-chiseled lotus pedestals, ornate prabhavali haloes, and intricate modak, veena, and kamal details. Every fold of sacred marble drapery is chiseled by 4th-generation Silawat sculptors.',
      img: '/gallery/sanctum-ganesha-lakshmi-shrine.webp',
      badge: 'Diwali Mahaparva',
      tag: 'Tridevi Trio'
    },
    {
      id: 'radha-krishna-yugal',
      title: 'The Vrindavan Radha Krishna Yugal Sarkar',
      stone: 'Vietnam Pure White Snow Calcite',
      scale: '3.0ft to 5.5ft Height',
      desc: 'The divine embodiment of eternal prema and bhakti. Sculpted in immaculate Vietnam snow-white marble with Tribhanga posture, delicate flute fingers, peacock feather crown, and gentle divine expressions that inspire lifelong devotion in home sanctums.',
      img: '/gallery/mandir-radha-krishna.webp',
      badge: 'Client Devotional Choice',
      tag: 'Yugal Sarkar'
    },
    {
      id: 'shiva-parvati-darbar',
      title: 'The Kailash Shiva Parvati & Nandi Darbar',
      stone: '100% Makrana Pure White Calcite',
      scale: '3.0ft to 6.0ft Height',
      desc: 'Serene representation of Lord Shiva in Dhyana Mudra with Mata Parvati and Ganesha-Kartikeya, accompanied by an intricately sculpted Nandi bull at the lotus feet.',
      img: '/gallery/mandir-gold-om-mandala.webp',
      badge: 'Mahadev Sanctum',
      tag: 'Shiva Family'
    }
  ];

  return (
    <>
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Masterpiece Catalog</span>
            <span>/</span>
            <span>Consecrated Marble Deities</span>
          </div>
          <h1>Consecrated Makrana Marble Idols &amp; Murti Carving</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Every deity is hand-sculpted from single monolithic blocks of certified 99% pure Makrana calcite marble. Crafted under strict Ayadi Vastu and Shilpa Shastra proportions so that Pran Pratishtha rituals invoke genuine divine peace, spiritual warmth, and positive energy for generations.
          </p>
        </div>
      </section>

      {/* Deities Grid */}
      <section className="subpage-body">
        <div className="sec-container">
          <div className="creations-grid">
            {DEITIES.map((deity) => (
              <div key={deity.id} className="creation-card product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="card-media product-card__media">
                  <img
                    src={deity.img}
                    alt={deity.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span className="card-badge product-badge" style={{ zIndex: 3 }}>{deity.badge}</span>
                  <div className="angle-tag-pill" style={{ position: 'absolute', bottom: '12px', left: '14px', zIndex: 3, background: 'rgba(255, 255, 255, 0.92)', color: '#1c1813', fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '4px' }}>
                    {deity.tag}
                  </div>
                </div>
                <div className="card-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#b08a4f', textTransform: 'uppercase', fontWeight: 600 }}>
                      {deity.stone}
                    </span>
                    <span style={{ fontSize: '12px', color: '#c4964e', fontWeight: 600 }}>★ 5.0 Pratishtha</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '21px', color: '#1c1813', margin: '4px 0 8px' }}>
                    {deity.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6b5f52', lineHeight: 1.6, marginBottom: '16px' }}>
                    {deity.desc}
                  </p>
                  <div className="card-specs-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#faf6ee', borderRadius: '6px', marginBottom: '18px', fontSize: '12px', color: '#4a4239' }}>
                    <span><strong>Scale:</strong> {deity.scale}</span>
                    <span><strong>Finish:</strong> Natural Diamond Hone</span>
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <button
                      type="button"
                      className="btn-whatsapp-pill"
                      onClick={() => {
                        const text = `Namaste AFG Marble, I am inquiring about the consecrated marble idol: "${deity.title}". Please share Ayadi dimensions, pricing, and Pran Pratishtha delivery details.`;
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
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="#25d366">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
                      </svg>
                      <span>Inquire for Deity Commission</span>
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
