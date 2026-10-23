'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function PreAssemblyTrialPage() {
  const STAGES = [
    {
      step: '01',
      title: 'Monolith Section Numbering & Dry-Fit',
      desc: 'Every carved marble pillar, arch, jali screen, and shikhara spire is given laser-etched orientation codes. Sections are dry-assembled onto perfectly level granite trial beds in our Jaipur yard.'
    },
    {
      step: '02',
      title: 'Precision Tenon Joint Tolerances',
      desc: 'Our Master Sthapatis inspect joint lines using 0.5mm feeler gauges. All dry-joint marble tenons must lock together seamlessly without rocking, tension, or the need for synthetic epoxy adhesives.'
    },
    {
      step: '03',
      title: 'Concealed LED & Cable Channel Verification',
      desc: 'All electrical conduits for warm 3000K LED halos, backlight translucent stone panels, and diya heat vents are tested continuously for 72 hours under variable voltage (110V–240V).'
    },
    {
      step: '04',
      title: '4K Ultra-HD Video Inspection for Client',
      desc: 'Before a single crate is packed, we record an exhaustive 4K video walkthrough with micro-detail zoom of every peacock arch, drawer alignment, and carving, sent directly to you on WhatsApp.'
    }
  ];

  return (
    <>
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Atelier Protocol</span>
            <span>/</span>
            <span>Pre-Assembly Trial Yard</span>
          </div>
          <h1>100% Pre-Assembly Trial &amp; Fitment Yard</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            We never ship loose, unverified marble slabs. Every temple and palatial fountain is 100% fully assembled in our Jaipur yard, inspected with 4K video documentation, and certified before international crating.
          </p>
        </div>
      </section>

      {/* Trial Yard Walkthrough */}
      <section className="subpage-body" style={{ padding: '60px 0' }}>
        <div className="sec-container">
          <div className="page-grid-2" style={{ marginBottom: '60px' }}>
            <div className="page-media-frame">
              <img
                src="/gallery/atelier-yard-preassembly.webp"
                alt="Jaipur Atelier Trial Assembly Yard"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="media-caption-badge">Jaipur Master Yard Assembly</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">THE ZERO-SURPRISE PROMISE</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: '#1c1813', margin: '12px 0 16px' }}>
                Why Trial Assembly is the Mark of a True Atelier
              </h2>
              <div className="gold-rule"></div>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '18px' }}>
                Local commercial stone dealers dispatch loose marble slabs in open trucks. When workers arrive at your residence, they discover uneven gaps, misaligned pillars, and cracked tenons, forcing them to use toxic chemical fillers.
              </p>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '22px' }}>
                At A.F.G Marble &amp; Arts, trial assembly is sacred. By the time our crates arrive at your villa in Mumbai, London, or Dubai, every single piece has already been tested, verified, and certified down to the millimeter.
              </p>
              <div className="info-actions">
                <a
                  href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20would%20like%20to%20see%20a%20sample%204K%20Pre-Assembly%20Trial%20video%20for%20a%20marble%20mandir."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span className="btn-primary__text">Request Sample Trial Video</span>
                  <span className="btn-primary__icon">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* 4 Steps Grid */}
          <div style={{ marginBottom: '60px' }}>
            <div className="sec-header text-center" style={{ marginBottom: '36px' }}>
              <span className="card-badge">INSPECTION PROTOCOL</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '30px', color: '#1c1813' }}>
                4-Point Jaipur Yard Pre-Dispatch Verification
              </h2>
              <div className="gold-rule center"></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {STAGES.map((s, idx) => (
                <div key={idx} className="creation-card" style={{ padding: '30px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #b88636, #8c6220)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '13px', marginBottom: '16px' }}>
                    {s.step}
                  </div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '19px', color: '#1c1813', marginBottom: '8px' }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#5c5246', lineHeight: 1.6, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Difference Table & Consultation */}
      <DifferenceTable />
      <ConsultationCard />
    </>
  );
}
