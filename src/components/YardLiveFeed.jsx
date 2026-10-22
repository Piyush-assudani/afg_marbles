'use client';
import { useState } from 'react';

const YARD_BAYS = [
  {
    id: 'bay-1',
    code: 'BAY 01 — PRE-ASSEMBLY TRIAL',
    title: 'Dry-Joint Fitment & 4K Verification Yard',
    location: 'Jaipur Atelier Yard North',
    image: '/gallery/atelier-yard-preassembly.webp',
    status: 'ACTIVE INSPECTION',
    inspector: 'Master Sthapati Ramswaroop Silawat',
    project: '18ft Monolithic Nagara Temple for London Estate',
    details: 'Every pillar, arch, and spire is pre-assembled in our open Jaipur yard to verify dry-joint tolerance down to 0.5mm before crating. Full 360-degree video recorded for patron signoff.'
  },
  {
    id: 'bay-2',
    code: 'BAY 02 — MONOLITH CHISELING',
    title: '4th-Generation Silawat Sculptor Station',
    location: 'Jaipur Carving Pavilion East',
    image: '/gallery/atelier-sculptor-chisel-block.webp',
    status: 'CHISELING IN PROGRESS',
    inspector: 'Senior Shilpkar Govind Silawat',
    project: 'Deep-Undercut Peacock Torana Archway',
    details: 'Traditional hammer-and-flat-chisel execution directly on a 4.5-ton virgin Makrana block. No high-speed rotary grinders used for sanctum icons to preserve sacred stone frequency.'
  },
  {
    id: 'bay-3',
    code: 'BAY 03 — BEDROCK ULTRASONIC TEST',
    title: 'Virgin Makrana Calcite Seam Selection',
    location: 'Makrana Quarry Deep Pit',
    image: '/gallery/mandir-pure-makrana.webp',
    status: 'PURITY CERTIFIED',
    inspector: 'Quarry Metallurgist & Stone Geologist',
    project: 'Single-Seam Monolith Extraction',
    details: 'Ultrasonic pulse velocity testing conducted across the raw extraction boulder to detect internal hairline stress fractures or iron pyrite veins. Guaranteed zero-yellowing warranty.'
  },
  {
    id: 'bay-4',
    code: 'BAY 04 — ISPM-15 EXPORT CRATING',
    title: 'White-Glove International Staging',
    location: 'Jaipur Dispatch Terminal',
    image: '/gallery/atelier-ispm15-crating-export.webp',
    status: 'EXPORT READY',
    inspector: 'Logistics Lead Manoj Rathore',
    project: 'Global ISPM-15 Certified Sea/Air Crating',
    details: 'Fumigated heat-treated marine plywood boxes engineered with 50mm high-density shock EVA foam cradles. Delivered safely to USA, UK, UAE, Canada, and pan-India with installation crew.'
  }
];

export default function YardLiveFeed({ onOpenInquiry }) {
  const [activeBay, setActiveBay] = useState(YARD_BAYS[0]);

  const handleRequestLiveTour = () => {
    const text = `*AFG MARBLE & ARTS — LIVE YARD VIDEO TOUR REQUEST*\n\n` +
      `Hello, I would like to request a 15-minute live WhatsApp video walkthrough of the Jaipur Atelier Yard to inspect the ongoing mandir dry-fitment trials and raw Makrana calcite bedrock.\n\n` +
      `Inspecting Bay: ${activeBay.code} (${activeBay.title})\n` +
      `Please schedule my live video session with the Master Sthapati.`;

    const url = `https://wa.me/917597417274?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="sec-yard-live-feed" style={{ padding: '90px 0', background: '#14110e', color: '#ffffff' }}>
      <div className="sec-container">
        {/* Header */}
        <div className="sec-header text-center" style={{ marginBottom: '44px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(212, 175, 55, 0.12)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            padding: '6px 16px',
            borderRadius: '999px',
            marginBottom: '16px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#2ecc71',
              boxShadow: '0 0 10px #2ecc71',
              display: 'inline-block'
            }}></span>
            <span style={{ color: '#ecd39b', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              DIRECT JAIPUR ATELIER YARD INSPECTION
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.8vw, 44px)', color: '#ffffff', letterSpacing: '-0.01em' }}>
            Real Stone. Real Yard. Zero Facades.
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px', background: '#b08a4f' }}></div>
          <p className="sub-lead" style={{ maxWidth: '760px', margin: '0 auto', fontSize: '15px', color: '#b8ab9a', lineHeight: 1.6 }}>
            Unlike digital resellers using stock 3D renders, AFG Marble operates an expansive open stone assembly yard in Jaipur. Hover below to inspect live pre-assembly dry-joints, block selection, and generational Silawats chiseling live.
          </p>
        </div>

        {/* Live Yard Camera Screen Frame */}
        <div className="yard-feed-console" style={{
          background: '#1d1915',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(212, 175, 55, 0.28)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)'
        }}>
          {/* Top Camera Selector Bar */}
          <div className="yard-camera-tabs" style={{
            display: 'flex',
            flexWrap: 'wrap',
            background: '#120f0d',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            {YARD_BAYS.map((bay) => {
              const isActive = activeBay.id === bay.id;
              return (
                <button
                  key={bay.id}
                  type="button"
                  onClick={() => setActiveBay(bay)}
                  style={{
                    flex: '1 1 200px',
                    padding: '16px 20px',
                    background: isActive ? '#1d1915' : 'transparent',
                    border: 'none',
                    borderBottom: isActive ? '2px solid #ecd39b' : '2px solid transparent',
                    color: isActive ? '#ffffff' : '#8c8071',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: isActive ? '#2ecc71' : '#685d50'
                    }}></span>
                    <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.1em', color: isActive ? '#ecd39b' : '#8c8071' }}>
                      {bay.code.split('—')[0].trim()}
                    </span>
                  </div>
                  <div style={{ fontSize: '12.5px', fontWeight: 600, marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {bay.title.split('&')[0].trim()}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Inspection View Area */}
          <div className="yard-main-view" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '0'
          }}>
            {/* Viewport Image Frame */}
            <div style={{ position: 'relative', height: '440px', background: '#0a0908', overflow: 'hidden' }}>
              <img
                src={activeBay.image}
                alt={activeBay.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease'
                }}
              />

              {/* Live Overlay HUD Elements */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(6px)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#2ecc71',
                border: '1px solid rgba(46, 204, 113, 0.3)'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2ecc71', animation: 'pulse 1.5s infinite' }}></span>
                <span>REC ● 4K ATELIER FEED</span>
              </div>

              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(6px)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                color: '#ecd39b',
                fontFamily: 'monospace'
              }}>
                LOCATION: {activeBay.location.toUpperCase()}
              </div>

              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(18, 15, 12, 0.88)',
                backdropFilter: 'blur(8px)',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#9c8c78', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Current Commission in Yard</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>{activeBay.project}</div>
                </div>
                <div style={{ fontSize: '11px', color: '#ecd39b', fontWeight: 600 }}>
                  Lead: {activeBay.inspector}
                </div>
              </div>
            </div>

            {/* Information & Verification Actions Panel */}
            <div style={{ padding: 'clamp(24px, 3.5vw, 40px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#ecd39b', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {activeBay.code}
                </span>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#ffffff', margin: '8px 0 16px' }}>
                  {activeBay.title}
                </h3>
                <p style={{ color: '#b8ab9a', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                  {activeBay.details}
                </p>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '24px'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#e6c885', textTransform: 'uppercase', marginBottom: '8px' }}>
                    PATRON INSPECTION PROTOCOLS
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', color: '#d8cdbe' }}>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: '#2ecc71' }}>✓</span> 100% full dry-fitment assembled before final payment
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: '#2ecc71' }}>✓</span> 4K video walkthrough with centimeter ruler measurements
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: '#2ecc71' }}>✓</span> Ultrasonic pulse report verifying virgin Makrana bedrock
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ color: '#2ecc71' }}>✓</span> Direct FaceTime or physical walkthrough in Jaipur welcomed
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleRequestLiveTour}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    minWidth: '220px',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    borderColor: '#25D366',
                    boxShadow: '0 6px 20px rgba(37, 211, 102, 0.28)'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  <span>Book 15-Min Live Yard Video Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenInquiry && onOpenInquiry({ title: 'Jaipur Atelier Yard Visit Appointment' })}
                  className="btn-outline-gold"
                  style={{ flex: 1, minWidth: '180px', color: '#ffffff', borderColor: '#b08a4f', justifyContent: 'center' }}
                >
                  <span>Visit Jaipur Yard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
