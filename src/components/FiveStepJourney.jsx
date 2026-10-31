'use client';
import { useState } from 'react';

export default function FiveStepJourney({ onOpenInquiry }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: "1. Free Design Discussion",
      tagline: 'Tell us your room size and the design you want',
      milestone: 'Design Discussion',
      desc: 'Talk with our marble temple expert on WhatsApp, phone, or video call. Simply share your room measurements and photos to get started.',
      bullets: [
        'Share your room photos and width, depth, height measurements',
        'Choose where your deities will sit, drawer storage, and lighting preferences',
        'Receive immediate advice and marble recommendations',
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
      title: '2. Free 2D Design Drawing',
      tagline: 'See exact drawings of your temple before carving',
      milestone: '2D Design Drawing Ready',
      desc: 'We make clear 2D design drawings with exact measurements to fit your room perfectly. You can review the pillars, carvings, drawers, and lights before we start cutting stone.',
      bullets: [
        'Custom design showing front, side, and inside views of the temple',
        'Numbered interlocking parts designed for easy home assembly',
        'Choose gold leaf work, flower inlay, and warm LED lighting points',
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
      title: '3. Pure Marble Hand-Carving',
      tagline: '100% natural Makrana marble carved by master craftsmen',
      milestone: 'Hand-Carving in Progress',
      desc: 'We select 100% pure white Makrana marble blocks without cracks or iron impurities. Master Rajasthani stone carvers hand-chisel every pillar and detail, sending you photo and video updates on WhatsApp.',
      bullets: [
        '100% pure Makrana white marble — guaranteed never to turn yellow or absorb stains',
        'Hand-carved by traditional master stone sculptors with generations of experience',
        'Regular photo and video progress updates sent directly to your WhatsApp',
      ],
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
    },
    {
      num: '04',
      title: '4. Full Trial Setup & Video Check',
      tagline: 'We build your entire temple in our workshop to test every joint',
      milestone: 'Customer Video Verification',
      desc: 'Before packing, we assemble the whole temple in our workshop. We test all joints, drawers, and lights, and send you a clear HD video walkthrough so you see exactly what you get.',
      bullets: [
        'Full HD video walkthrough and close-up photos sent to you on WhatsApp',
        'Complete measurement verification with tape measure shown on video',
        'Each piece is numbered for simple matching when it reaches your home',
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
      title: '5. Safe Wooden Box Packing & Home Delivery',
      tagline: 'Safe delivery to your home in India or abroad, and easy assembly',
      milestone: 'Home Delivery & Setup',
      desc: 'Your temple is packed in strong, cushioned wooden boxes with full safety insurance. Pieces are numbered for an easy 4-hour setup at your home with zero mess and no cement needed.',
      bullets: [
        'Heavy-duty wooden crates with thick foam cushions shipped safely across India and 28+ countries',
        'Easy 4 to 6 hour clean setup inside your home with no dust, cement, or wet mortar',
        'Easy care guide included: simply clean with water and cotton cloth',
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
            How We Make Your Marble Temple in 5 Simple Steps
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
          <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
            From your room measurements to final home delivery, we guide you at every step so you get the exact temple you envisioned.
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
                <strong style={{ display: 'block', fontSize: '15px', color: '#1c1813' }}>Our Quality Promise</strong>
                <span style={{ fontSize: '12px', color: '#8a8073' }}>Trusted by over 1,200 families &amp; homes across India and worldwide</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(176, 138, 79, 0.15)', paddingTop: '16px' }}>
              <strong style={{ display: 'block', fontSize: '13px', color: '#1c1813', marginBottom: '6px' }}>
                What happens at this step?
              </strong>
              <p style={{ fontSize: '12px', color: '#6b5f52', lineHeight: 1.6, margin: 0 }}>
                You speak directly with our senior temple craft expert. No middlemen, no confusion. You approve every visual update before we move forward.
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
                  {activeStep === 0 ? 'Within 24 Hours' : activeStep === 1 ? '1 to 2 Days' : activeStep === 2 ? '25 to 40 Days' : activeStep === 3 ? 'Same Day Video' : 'Direct Home Delivery'}
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
