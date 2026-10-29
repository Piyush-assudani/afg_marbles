'use client';
import { useState } from 'react';

export default function FiveStepJourney({ onOpenInquiry }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: "One-on-One Space Discovery",
      tagline: 'We understand your space, your sacred faith & your aesthetic vision',
      milestone: 'Discovery Session',
      desc: 'Connect with our senior architectural stone consultant over video or in person. Share your floor dimensions, wall photographs, ceiling height, and family deity preferences.',
      bullets: [
        'Share your site photographs & wall/floor measurements down to the centimeter',
        'Define deity positions, aarti diya smoke venting & parikrama clearance',
        'Receive immediate preliminary feasibility review and stone options',
      ],
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      num: '02',
      title: 'Bespoke 2D CAD Elevation Blueprint',
      tagline: 'Precision architectural elevation drafted to your room dimensions',
      milestone: '2D CAD Elevation & Stone Measurement Plan',
      desc: 'Our architectural team drafts comprehensive 2D CAD elevations and stone cross-sections tailored to your space. (3D CAD rendering available upon special client request). Every shikhara curve, jali pattern, and hidden lighting channel is planned with precision.',
      bullets: [
        'Custom space orientation & architectural proportions tailored to your space and preferences',
        'Detailed modular interlocking joint schematics for easy indoor assembly',
        'Select gold leaf gilding, mother-of-pearl inlay, and ambient illumination points',
      ],
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      ),
    },
    {
      num: '03',
      title: 'Virgin Bedrock Selection & Hand-Chiseling',
      tagline: 'Direct quarry selection in Makrana with zero iron inclusions',
      milestone: 'Artisan Chiseling Commences',
      desc: 'We inspect virgin calcite seams in Makrana using ultrasonic sound wave testing to guarantee flawless monolithic blocks with zero internal hairline fractures.',
      bullets: [
        '100% pure Makrana white marble — guaranteed never to yellow or stain from puja liquids',
        'Hand-chiseled by traditional master sculptors with generations of temple craft heritage',
        'Bi-weekly photo and video updates sent directly to your WhatsApp',
      ],
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      num: '04',
      title: '100% Pre-Assembly Trial & 4K Approval',
      tagline: 'Zero surprises — assembled completely in our yard before packaging',
      milestone: 'Client Milestone Verification',
      desc: 'Before any piece is packed, we erect the entire temple inside our Makrana artisanal yard. All dry joints, lighting circuits, and smooth drawer glides are inspected on live video.',
      bullets: [
        '4K multi-angle video walkthrough and high-res macro photos sent to you',
        'Detailed metric ruler verification of outer and inner dimensions',
        'Dry-fit interlocking numbers stamped discretely on joint faces',
      ],
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 14 14" />
        </svg>
      ),
    },
    {
      num: '05',
      title: 'ISPM-15 Crating & White-Glove Installation',
      tagline: 'Safe international transit & seamless indoor setup in 4–6 hours',
      milestone: 'Doorstep Delivery & Sacred Consecration',
      desc: 'Sealed inside custom heat-treated fumigated pine crates lined with 50mm shock EVA foam and tilt/shock monitors. Delivered directly to your residence worldwide with artisan assistance.',
      bullets: [
        'ISPM-15 certified customs-cleared marine shipping across 28+ countries',
        'Numbered interlocking blocks enable effortless 4–6 hour white-glove setup',
        'Complete sacred care guide with natural calcite maintenance instructions',
      ],
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="sec-five-steps" style={{ padding: '90px 0', background: '#fcfaf6' }}>
      <div className="sec-container">
        <div className="sec-header text-center" style={{ marginBottom: '48px' }}>
          <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
            HOW IT WORKS
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
            Design Your Sacred Sanctum in 5 Easy Steps
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
          <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
            From your first room sketch to the final consecrated aarti, our structured atelier process guarantees architectural perfection, zero hidden surprises, and lifetime durability.
          </p>
        </div>

        {/* Horizontal Steps Nav Strip */}
        <div
          className="steps-nav-strip"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          {steps.map((s, idx) => {
            const isActive = idx === activeStep;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                style={{
                  padding: '16px 14px',
                  borderRadius: '12px',
                  border: isActive ? '1px solid #b08a4f' : '1px solid rgba(28, 24, 19, 0.12)',
                  background: isActive ? '#1c1813' : '#fff',
                  color: isActive ? '#ecd39b' : '#383026',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 8px 24px rgba(28, 24, 19, 0.14)' : '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: isActive ? '#ecd39b' : '#b08a4f',
                    }}
                  >
                    STEP {s.num}
                  </span>
                  <span style={{ opacity: isActive ? 1 : 0.4 }}>{s.icon}</span>
                </div>
                <strong style={{ fontSize: '13px', lineHeight: 1.3, color: isActive ? '#fff' : '#1c1813' }}>
                  {s.title}
                </strong>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        <div
          className="active-step-card"
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: 'clamp(24px, 4vw, 40px)',
            border: '1px solid rgba(176, 138, 79, 0.22)',
            boxShadow: '0 12px 40px rgba(28, 24, 19, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '36px',
            alignItems: 'center',
          }}
        >
          {/* Left: Content */}
          <div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
              <span
                style={{
                  background: '#1c1813',
                  color: '#ecd39b',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  letterSpacing: '0.08em',
                }}
              >
                STAGE {steps[activeStep].num} OF 05
              </span>
              <span
                style={{
                  background: 'rgba(176, 138, 79, 0.12)',
                  color: '#8c6a36',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: '999px',
                }}
              >
                {steps[activeStep].milestone}
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: '#1c1813', marginBottom: '8px' }}>
              {steps[activeStep].title}
            </h3>
            <p style={{ fontSize: '14px', color: '#8c6a36', fontWeight: 500, marginBottom: '16px' }}>
              {steps[activeStep].tagline}
            </p>
            <p style={{ fontSize: '14px', color: '#4a4239', lineHeight: 1.65, marginBottom: '20px' }}>
              {steps[activeStep].desc}
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {steps[activeStep].bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '13px', color: '#383026' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b08a4f" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={() => onOpenInquiry?.({ title: `Inquiry on Step ${steps[activeStep].num}: ${steps[activeStep].title}` })}
              >
                <span className="btn-primary__text">Start Step 1: Book Discovery Call</span>
                <span className="btn-primary__icon">→</span>
              </button>
              <a
                href={`https://wa.me/917597417274?text=${encodeURIComponent(
                  `Namaste AFG Marble, I want to start Step ${steps[activeStep].num} (${steps[activeStep].title}) for my home pooja space. Here are my room details:`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold"
              >
                <span>WhatsApp Architectural Desk</span>
              </a>
            </div>
          </div>

          {/* Right: Stage Visual & Trust Highlight */}
          <div
            style={{
              background: '#fcfaf6',
              borderRadius: '12px',
              padding: '28px',
              border: '1px solid rgba(176, 138, 79, 0.18)',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #1c1813 0%, #383026 100%)',
                  color: '#ecd39b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {steps[activeStep].icon}
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '15px', color: '#1c1813' }}>AFG Atelier Commitment</strong>
                <span style={{ fontSize: '12px', color: '#8a8073' }}>Trusted by over 1,200 royal estates &amp; residences worldwide</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(176, 138, 79, 0.15)', paddingTop: '16px' }}>
              <strong style={{ display: 'block', fontSize: '13px', color: '#1c1813', marginBottom: '6px' }}>
                What happens at this milestone?
              </strong>
              <p style={{ fontSize: '12px', color: '#6b5f52', lineHeight: 1.6, margin: 0 }}>
                You maintain direct one-on-one communication with our senior Sthapathi and project lead. No intermediaries, no robotic ticketing. You approve every visual checkpoint before we move forward.
              </p>
            </div>

            <div
              style={{
                background: '#fff',
                padding: '14px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(176, 138, 79, 0.2)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: '#8a8073', display: 'block' }}>Estimated Timeline</span>
                <strong style={{ fontSize: '13px', color: '#1c1813' }}>
                  {activeStep === 0 ? 'Within 24 Hours' : activeStep === 1 ? '3 to 5 Days' : activeStep === 2 ? '25 to 45 Days' : activeStep === 3 ? '48 Hours Live' : 'ISPM-15 Priority Air/Sea'}
                </strong>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#b08a4f' }}>Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
