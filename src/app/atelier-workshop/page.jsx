'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function AtelierWorkshopPage() {
  const handleOpenInquiry = (topic) => {
    if (typeof window !== 'undefined' && window.afgOpenInquiry) {
      window.afgOpenInquiry({ title: topic || 'Workshop Visit Booking' });
    }
  };

  const STAGES = [
    {
      num: '01',
      title: 'Handpicking Solid Marble Blocks',
      lead: 'Direct selection from Makrana white marble mines.',
      desc: 'Our senior craftsmen inspect every marble block in Makrana. We check the stone thoroughly to make sure there are zero internal cracks or flaws before carving starts.'
    },
    {
      num: '02',
      title: 'Free 2D Design Drawing',
      lead: 'Custom drawings made to fit your room dimensions.',
      desc: 'Before touching stone, our temple designers create accurate 2D drawings matching your room size and prayer needs so you can see the front and side views clearly.'
    },
    {
      num: '03',
      title: 'Hand-Carving by Master Craftsmen',
      lead: 'Generations of traditional stone carving skill.',
      desc: 'Using hand tools and traditional chisels, our skilled artisans carve every delicate pillar, floral arch, and jali screen with deep 3D details.'
    },
    {
      num: '04',
      title: 'Full Workshop Setup & Video Approval',
      lead: 'Full trial setup before packing: zero surprises at home.',
      desc: 'We fully assemble the entire temple in our workshop first. We record clear videos and photos from all angles and share them with you on WhatsApp for your approval.'
    },
    {
      num: '05',
      title: 'Safe Wooden Box Packing & Home Delivery',
      lead: 'Tough wooden crates with thick foam protection.',
      desc: 'Every piece is wrapped in soft foam and packed inside heavy treated wooden crates to ensure 100% safe delivery right to your home.'
    }
  ];

  return (
    <>
      {/* ============ SUBPAGE HERO ============ */}
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Our Craft</span>
            <span>/</span>
            <span>Our Workshops</span>
          </div>
          <h1>Our Marble Workshop &amp; Master Craftsmen</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Handcrafted in Rajasthan since 1987. From selecting pure Makrana marble to final carving and full trial setup, see how our master artisans handcraft every temple.
          </p>
        </div>
      </section>

      {/* ============ GUILD INTRO ============ */}
      <section className="subpage-body">
        <div className="sec-container">
          <div className="page-grid-2">
            <div className="page-media-frame">
              <img
                src="/gallery/mandir-pure-makrana.webp"
                alt="Silawat Master Artisan Hand Chiseling Makrana Marble"
                loading="lazy"
              />
              <div className="media-caption-badge">Makrana Workshop Craftsmen</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">TRADITIONAL ARTISANS</span>
              <h2>Traditional Master Craftsmen Since 1987</h2>
              <div className="gold-rule"></div>
              <p>
                Our traditional artisan families in Rajasthan have practiced the art of marble temple carving for generations. We transform genuine Makrana marble into beautiful home temples with careful handcrafting and deep respect.
              </p>
              <p>
                Unlike commercial factories that use fast machine cutting with flat, sharp edges, every arch, flower petal, and carved pillar at A.F.G Marble &amp; Arts is lovingly finished by skilled human hands.
              </p>
              <div className="info-actions" style={{ marginTop: '24px' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleOpenInquiry('Book Workshop & Studio Visit')}
                >
                  <span className="btn-primary__text">Visit Our Workshop in Makrana</span>
                  <span className="btn-primary__icon">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* 5-Stage Craft Process */}
          <div className="workshop-stages-section" style={{ marginTop: '64px' }}>
            <div className="sec-header text-center">
              <span className="card-badge">OUR 5-STEP WORKFLOW</span>
              <h2>From Pure Marble Block to Your Home Temple</h2>
              <div className="gold-rule center"></div>
              <p className="sub-lead">
                Every custom temple follows a clear 5-step process to ensure lifetime quality and beauty.
              </p>
            </div>

            <div className="stages-timeline">
              {STAGES.map((stage, idx) => (
                <div key={idx} className="stage-card">
                  <div className="stage-num-badge">{stage.num}</div>
                  <div className="stage-body">
                    <h3>{stage.title}</h3>
                    <div className="stage-lead">{stage.lead}</div>
                    <p>{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workshop Coordinates Card */}
          <div className="page-cta-banner" style={{ marginTop: '64px' }}>
            <span className="card-badge">VISIT US</span>
            <h2>Visit Our Workshops in Makrana, Rajasthan</h2>
            <p>
              You are always welcome to visit our workshop, see pure Makrana marble blocks in person, meet our artisans, and view ongoing temple setups.
            </p>
            <div className="workshop-locations-grid">
              <div className="w-loc-card">
                <h4>Makrana Main Workshop &amp; Display Center</h4>
                <p>Makrana Bypass Rd, Borawar, Gunawati Jageer, Rajasthan 341502</p>
                <span className="loc-note">See live temple setups and finished temples</span>
              </div>
              <div className="w-loc-card">
                <h4>Makrana Marble Yard</h4>
                <p>Makrana Bypass Rd, Borawar, Gunawati Jageer, Rajasthan 341502</p>
                <span className="loc-note">Direct pure marble block selection</span>
              </div>
            </div>
            <div style={{ marginTop: '28px' }}>
              <a
                href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20would%20like%20to%20plan%20a%20visit%20to%20your%20Makrana%20workshop."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span className="btn-primary__text">Plan Atelier Visit via WhatsApp</span>
                <span className="btn-primary__icon">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE AFG DIFFERENCE ============ */}
      <DifferenceTable onOpenInquiry={handleOpenInquiry} />

      {/* ============ ALL WE NEED IS YOUR SPACE DIMENSIONS ============ */}
      <ConsultationCard onOpenInquiry={handleOpenInquiry} />
    </>
  );
}
