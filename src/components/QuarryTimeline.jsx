'use client';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function QuarryTimeline() {
  const steps = [
    {
      num: '01',
      title: 'Selecting 100% Pure Makrana Marble',
      location: 'Chak Dungri & Albeta Mines, Makrana',
      desc: 'Directly sourced from deep natural Makrana marble quarries in Rajasthan. Tested for 100% pure stone density with zero stains and zero yellowing.',
      badge: '100% Pure Marble',
    },
    {
      num: '02',
      title: 'Vastu Dimensions & Design Drawing',
      location: 'Design Studio, Makrana',
      desc: 'Our temple designers calculate auspicious Vastu measurements and prepare 2D design drawings tailored to fit your room dimensions.',
      badge: 'Auspicious Vastu Sizes',
    },
    {
      num: '03',
      title: 'Hand Carving by Master Artisans',
      location: 'Artisan Workshop, Makrana',
      desc: 'Chiseled entirely by skilled hands using traditional stonecraft techniques. Pillars, domes, and jali doors are carved with deep, beautiful 3D detail.',
      badge: 'Solid Natural Marble',
    },
    {
      num: '04',
      title: 'Full Workshop Setup & Safe Packing',
      location: 'Inspection Yard & Delivery Team',
      desc: 'Every temple is fully assembled in our workshop for your video and photo approval. Numbered interlocking parts are packed inside strong wooden crates for 100% safe delivery.',
      badge: 'Easy Interlocking Fit',
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
            OUR 4-STEP CRAFT JOURNEY
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813', marginBottom: '12px' }}>
            From Pure Makrana Marble to Your Home Temple
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
          <p style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
            The transparent 4-step journey of your temple. From pure Rajasthan marble selection to safe delivery and setup in your home.
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
