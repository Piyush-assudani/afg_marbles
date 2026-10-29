'use client';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function QuarryTimeline() {
  const steps = [
    {
      num: '01',
      title: '350-Foot Subterranean Bedrock Extraction',
      location: 'Chak Dungri & Albeta Mines, Makrana',
      desc: 'Extracted exclusively from 300+ feet deep bedrock where pressure has formed pure 99% CaCO3 calcite crystals. Tested for zero micro-porosity (<0.04%) and high structural density.',
      badge: 'Certified 99% Calcite',
    },
    {
      num: '02',
      title: 'Ayadi Vastu Geometry & Rough Blocking',
      location: 'Sthapatya Drafting Studio, Makrana',
      desc: 'Master Sthapatis align raw blocks to the client’s spatial orientation and Ayadi 6-formula harmonics (Aya, Vya, Rasi, Nakshatra) to maximize cosmic resonance.',
      badge: 'Sthapatya Veda Ratios',
    },
    {
      num: '03',
      title: '5-Stage Hand Carving by Silawat Lineage',
      location: 'Heritage Guild Atelier, Makrana',
      desc: 'Chiseled entirely by hand using hardened carbon-tipped chisels. Spire shikharas, lotus corbels, and pierced jaali lattices are sculpted with millimeter precision.',
      badge: 'Zero Hollow Core',
    },
    {
      num: '04',
      title: 'Pre-Assembly Dry-Fit & White-Glove Crate',
      location: 'Inspection Yard & Global Doorstep',
      desc: 'Every creation is 100% pre-assembled in our yard for client 4K video inspection. Numbered modular interlocking blocks pack into ISPM-15 fumigated pine crates for global dispatch.',
      badge: '4–6 Hr Dry-Joint Setup',
    },
  ];

  return (
    <section className="sec-quarry-provenance" style={{ padding: '80px 0', background: '#fcfaf6' }}>
      <div className="sec-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        <div className="sec-header text-center" style={{ marginBottom: '54px' }}>
          <span
            className="card-badge"
            style={{ position: 'static', display: 'inline-block', marginBottom: '12px', background: 'rgba(176, 138, 79, 0.15)', color: '#8c6a36' }}
          >
            BEDROCK TO SANCTUM JOURNEY
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813', marginBottom: '12px' }}>
            From 350-Foot Makrana Bedrock to Consecration
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
          <p style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
            The transparent 4-stage journey of each monumental creation. Trace the lineage of authentic Rajasthan marble from subterranean quarrying to white-glove setup.
          </p>
        </div>

        {/* Architectural Linear Timeline Rail */}
        <div className="quarry-timeline-wrapper">
          <div className="quarry-timeline-conduit" aria-hidden="true">
            <div className="quarry-timeline-conduit__line"></div>
          </div>

          <div className="quarry-timeline-grid">
            {steps.map((st, i) => (
              <div key={st.num} className="quarry-timeline-card">
                {/* Station Node Marker */}
                <div className="quarry-station-node" aria-hidden="true">
                  <span className="quarry-station-node__ring"></span>
                  <span className="quarry-station-node__core">0{i + 1}</span>
                </div>

                <div className="quarry-card-inner">
                  <div className="quarry-card-header">
                    <span className="quarry-phase-tag">PHASE {st.num}</span>
                    <span className="quarry-badge-spec">{st.badge}</span>
                  </div>

                  <h3 className="quarry-card-title">
                    {st.title}
                  </h3>

                  <div className="quarry-location">
                    <span className="quarry-location__pin"><MapPin size={13} style={{ display: 'inline', verticalAlign: '-1px' }} /></span>
                    <span>{st.location}</span>
                  </div>

                  <p className="quarry-card-desc">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Center */}
        <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="/makrana-calcite-mine" className="btn-primary">
            <span className="btn-primary__text">Explore 99% Calcite Mineral Science</span>
            <span className="btn-primary__icon">→</span>
          </Link>
          <Link href="/temple-maintenance-guide" className="btn-outline-gold">
            <span>View Ritual Maintenance Guide</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
