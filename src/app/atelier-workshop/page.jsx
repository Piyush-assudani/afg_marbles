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
      title: 'Quarry Selection & Ultrasonic Testing',
      lead: 'Direct extraction from Makrana’s oldest virgin calcite seams.',
      desc: 'Our master sthapatis inspect blocks at the quarry face in Makrana. Every raw block undergoes ultrasonic pulse velocity testing to verify complete internal molecular homogeneity and zero micro-fractures before carving begins.'
    },
    {
      num: '02',
      title: 'Architectural 2D CAD Space Elevation Drafting',
      lead: 'Sacred architectural proportions tailored to your space.',
      desc: 'Before touching stone, our temple architects draft precision millimetric 2D CAD elevations based on your residence or room orientation, ensuring every proportion is verified. (3D CAD rendering available on special client request).'
    },
    {
      num: '03',
      title: 'Hand Chiseling by Generational Silawats',
      lead: 'The ancestral lineage that carved India’s eternal royal shrines.',
      desc: 'Employing traditional hand-forged diamond tipped steel chisels, our master carvers create pierced marble jali screens, multi-tiered shikhara domes, fluted monolithic pillars, and floral toranas with astonishing three-dimensional depth.'
    },
    {
      num: '04',
      title: 'Jaipur Pre-Assembly & Dry-Joint Trial',
      lead: 'Zero surprises at your home: 100% dry fit before packing.',
      desc: 'In our Jaipur pre-assembly yard, the entire sanctum or fountain is fully erected with precision interlocking tenons. We record an extensive 4K walkthrough video with dimensional calipers for your sign-off before uncoupling.'
    },
    {
      num: '05',
      title: 'ISPM-15 Export Sea & Air Crating',
      lead: 'Certified shock-proof packaging for domestic and international transit.',
      desc: 'Each component is wrapped in non-abrasive acid-free fleece, nestled inside custom 50mm high-density EVA shock foam, and encased in heat-treated fumigated wooden export crates with stainless steel bands and tilt indicators.'
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
            <span>Atelier Heritage</span>
            <span>/</span>
            <span>Silawat Guild Workshop</span>
          </div>
          <h1>The Silawat Master Sculptor Guild &amp; Workshop</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Preserving Rajasthan’s sacred stonecraft since 1987. From Makrana bedrock extraction to our Jaipur pre-assembly yard, discover how our generational artisans transform noble calcite into living architectural marvels.
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
              <div className="media-caption-badge">Jaipur &amp; Makrana Master Guild</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">THE ROYAL SILAWAT LINEAGE</span>
              <h2>Generational Master Sculptors Since 1987</h2>
              <div className="gold-rule"></div>
              <p>
                The Silawats of Rajasthan represent one of the world&rsquo;s most revered artisanal stone-carving dynasties. For centuries, our families have held the sacred knowledge of temple architecture, transforming raw Makrana marble into divine abodes with mathematical precision and spiritual devotion.
              </p>
              <p>
                Unlike commercial factories using computerized CNC water-jets that leave sterile, lifeless grooves, every arch, floral petal, and deity halo at A.F.G Marble &amp; Arts is brought to life by the nuanced touch of human hands.
              </p>
              <div className="info-actions" style={{ marginTop: '24px' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleOpenInquiry('Book Workshop & Studio Visit')}
                >
                  <span className="btn-primary__text">Schedule Jaipur Studio Visit</span>
                  <span className="btn-primary__icon">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* 5-Stage Craft Process */}
          <div className="workshop-stages-section" style={{ marginTop: '64px' }}>
            <div className="sec-header text-center">
              <span className="card-badge">RIGOROUS 5-STAGE METHODOLOGY</span>
              <h2>From Raw Bedrock to Divine Consecration</h2>
              <div className="gold-rule center"></div>
              <p className="sub-lead">
                Every bespoke sanctum follows a strict five-phase architectural lifecycle ensuring heirloom durability.
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
            <span className="card-badge">EXPERIENCE HUBS</span>
            <h2>Visit Our Makrana Quarries &amp; Jaipur Studio</h2>
            <p>
              We welcome patrons, architects, and interior designers to personally inspect raw calcite marble blocks, observe our generational artisans at work, and view ongoing sanctum dry-fit trials.
            </p>
            <div className="workshop-locations-grid">
              <div className="w-loc-card">
                <h4>Jaipur Experience Studio &amp; Yard</h4>
                <p>Mansarovar Ext. / Tonk Road, Jaipur, Rajasthan</p>
                <span className="loc-note">Features live dry-assembly trials &amp; finished creations</span>
              </div>
              <div className="w-loc-card">
                <h4>Makrana Quarry Atelier</h4>
                <p>Industrial Area, Makrana, Nagaur Dist., Rajasthan 341505</p>
                <span className="loc-note">Direct bedrock extraction &amp; raw block selection</span>
              </div>
            </div>
            <div style={{ marginTop: '28px' }}>
              <a
                href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20would%20like%20to%20plan%20a%20visit%20to%20your%20Jaipur%20Studio%20and%20Makrana%20Quarry."
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
