'use client';
import Link from 'next/link';
import DifferenceTable from '../../components/DifferenceTable';
import ConsultationCard from '../../components/ConsultationCard';

export default function PreAssemblyTrialPage() {
  const STAGES = [
    {
      step: '01',
      title: 'Numbering Every Marble Part',
      desc: 'Every pillar, arch, jali door, and top dome is numbered clearly. All parts are set up together on flat level ground in our workshop to test the exact fit.'
    },
    {
      step: '02',
      title: 'Perfect Interlocking Joints',
      desc: 'Our senior craftsmen test each joint. All marble pieces slot together firmly without shaking, uneven gaps, or messy glue.'
    },
    {
      step: '03',
      title: 'Testing Lights & Wiring',
      desc: 'All built-in LED warm lights, backlighting, and wire passages are tested continuously to ensure safe, flawless lighting.'
    },
    {
      step: '04',
      title: 'Video & Photo Check for You',
      desc: 'Before packing, we take detailed videos and close-up photos of your temple from every angle and send them to you on WhatsApp for complete approval.'
    }
  ];

  return (
    <>
      <section className="subpage-hero">
        <div className="sec-container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Quality Check</span>
            <span>/</span>
            <span>Full Setup Trial in Workshop</span>
          </div>
          <h1>100% Full Setup Trial Before Delivery</h1>
          <div className="gold-rule center"></div>
          <p className="sub-lead">
            We never send loose pieces. Every temple and fountain is completely assembled and tested in our workshop first. You inspect it via video and photos before we pack it safely in wooden crates.
          </p>
        </div>
      </section>

      {/* Trial Yard Walkthrough */}
      <section className="subpage-body" style={{ padding: '60px 0' }}>
        <div className="sec-container">
          <div className="page-grid-2" style={{ marginBottom: '60px' }}>
            <div className="page-media-frame">
              <img
                src="/gallery/atelier-yard-preassembly.webp?v=realphoto"
                alt="Makrana Atelier Trial Assembly Yard"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="media-caption-badge">Full Workshop Trial Setup</div>
            </div>
            <div className="page-info-block">
              <span className="card-badge">ZERO RISK FOR YOU</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: '#1c1813', margin: '12px 0 16px' }}>
                Why We Build the Full Temple Before Shipping
              </h2>
              <div className="gold-rule"></div>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '18px' }}>
                Ordinary market sellers often deliver loose pieces that do not fit properly when assembled at your home, leading to uneven gaps and ugly glue work.
              </p>
              <p style={{ color: '#4a4239', lineHeight: 1.65, marginBottom: '22px' }}>
                At A.F.G Marble &amp; Arts, we fully assemble your complete temple at our workshop first. Every single piece is checked to fit smoothly and easily at your home.
              </p>
              <div className="info-actions">
                <a
                  href="https://wa.me/917597417274?text=Hello%20AFG%20Marble%2C%20I%20would%20like%20to%20see%20a%20sample%20trial%20video%20for%20a%20marble%20mandir."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span className="btn-primary__text">See Sample Trial Video on WhatsApp</span>
                  <span className="btn-primary__icon">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* 4 Steps Grid */}
          <div style={{ marginBottom: '60px' }}>
            <div className="sec-header text-center" style={{ marginBottom: '36px' }}>
              <span className="card-badge">OUR 4-STEP CHECK</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: '30px', color: '#1c1813' }}>
                Our 4-Step Quality Check in the Workshop
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
