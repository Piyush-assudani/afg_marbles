'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function MaterialsGuidePage() {
  const handleOpenInquiry = (topic) => {
    if (typeof window !== 'undefined' && window.afgOpenInquiry) {
      window.afgOpenInquiry({ title: topic || 'Noble Stone & Calcite Inquiry' });
    }
  };

  return (
    <>
      {/* ============ SUBPAGE HERO ============ */}
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Atelier Knowledge</span>
            <span>/</span>
            <span>Makrana Calcite Science</span>
          </div>
          <h1>The Makrana Calcite &amp; Noble Stone Guide</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            Understanding pure Makrana calcite: why the Taj Mahal and historic royal sanctums built from this geological wonder remain pure white for centuries without degradation.
          </p>
        </div>
      </section>

      {/* ============ CONTENT SECTION ============ */}
      <section className="subpage-body">
        <div className="sec-container">
          <div className="page-grid-2">
            <div className="page-media-frame">
              <img
                src="/gallery/mandir-pure-makrana.webp"
                alt="Authentic Pure Makrana Calcite Marble"
                loading="lazy"
              />
              <div className="media-caption-badge">99% Pure Calcite Bedrock</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">GEOLOGICAL EXCELLENCE</span>
              <h2>99% Pure Calcite Structure</h2>
              <div className="gold-rule"></div>
              <p>
                Unlike commercial imported marbles or dolomitic stones containing high levels of iron, magnesium, and clay, authentic Makrana marble quarried from Nagaur district, Rajasthan is composed of 98% to 99% pure calcium carbonate calcite crystals.
              </p>
              <ul className="spec-list-luxury">
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Zero Porosity Absorption:</strong> 0.01% porosity means it will not absorb milk, honey, sandalwood paste, or diya oil during sacred daily puja rituals.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Self-Polishing Luster:</strong> The more Makrana marble is touched, washed, and worshipped, the more brilliant its diamond-crystalline glow becomes over generations.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Zero Chemical Resins:</strong> Cut directly from monolithic bedrock without epoxy mesh backing, polyester adhesives, or synthetic resin hardening.</span>
                </li>
              </ul>
              <div className="info-actions" style={{ marginTop: '24px' }}>
                <a
                  href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20would%20like%20to%20learn%20more%20about%20Makrana%20White%20Blocks%20and%20authenticity%20certification."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span className="btn-primary__text">Inquire on Raw Quarry Blocks</span>
                  <span className="btn-primary__icon">→</span>
                </a>
              </div>
            </div>
          </div>

          <div className="page-grid-2 reverse" style={{ marginTop: '64px' }}>
            <div className="page-media-frame">
              <img
                src="/gallery/mandir-emerald-onyx.webp"
                alt="Translucent Onyx and Noble Stone Inlay"
                loading="lazy"
              />
              <div className="media-caption-badge">Illuminated Onyx &amp; Inlay</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">NOBLE MATERIAL PALETTE</span>
              <h2>Global Stones &amp; Heritage Sandstones</h2>
              <div className="gold-rule"></div>
              <p>
                While Makrana white remains our cornerstone for consecrated pooja sanctums, our master artisans also sculpt in prized European and Indian stones selected for courtyards and palatial villas.
              </p>
              <ul className="spec-list-luxury">
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Bansi Paharpur Pink Sandstone:</strong> The noble pink stone of Rajasthan palaces and monumental temple shrines like the Ayodhya Ram Mandir.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Italian Calacatta Oro &amp; Botticino:</strong> Warm golden-veined European marbles ideal for classical fountains and luxury foyer pedestals.</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><strong>Translucent Honey &amp; Green Onyx:</strong> Illuminated altar backdrops that glow with radiant spiritual warmth when lit from behind.</span>
                </li>
              </ul>
              <div className="info-actions" style={{ marginTop: '24px' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => handleOpenInquiry('Request Noble Stone Physical Samples')}
                >
                  <span className="btn-primary__text">Request Stone Samples</span>
                  <span className="btn-primary__icon">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stone Comparison Cards */}
          <div className="page-cards-grid-3" style={{ marginTop: '64px' }}>
            <div className="page-card-item">
              <span className="card-badge">THE GOLD STANDARD</span>
              <h3>Pure Makrana Calcite</h3>
              <p>
                100% natural calcite marble. Non-porous, zero yellowing over decades, stain-free, and ideal for sacred pooja rituals, daily abhishek, and oil lamps.
              </p>
            </div>
            <div className="page-card-item">
              <span className="card-badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                COMMERCIAL PITFALL
              </span>
              <h3>Ordinary Dolomitic Marble</h3>
              <p>
                Contains heavy iron and high porosity. Absorbs oil, ghee, and moisture, turning yellowish and dull within just 2 to 3 years.
              </p>
            </div>
            <div className="page-card-item">
              <span className="card-badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                HAZARDOUS FOR PUJA
              </span>
              <h3>Artificial Composite Stones</h3>
              <p>
                Contains plastic resin binders that discolour, warp, or scorch when exposed to daily brass diya heat, incense sticks, and camphor flames.
              </p>
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
