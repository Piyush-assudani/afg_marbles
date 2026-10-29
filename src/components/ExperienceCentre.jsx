'use client';

export default function ExperienceCentre({ onOpenInquiry }) {
  return (
    <section className="sec-experience-centres" style={{ padding: '90px 0', background: '#fcfaf6' }}>
      <div className="sec-container">
        <div className="sec-header text-center" style={{ marginBottom: '48px' }}>
          <span className="card-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '12px' }}>
            ATELIER &amp; EXPERIENCE CENTRES
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#1c1813' }}>
            Visit Our Flagship Artisanal Studios
          </h2>
          <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
          <p className="sub-lead" style={{ maxWidth: '720px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.6 }}>
            Experience the luminescence of virgin Makrana Albeta marble in person. Walk through life-size sanctums, inspect hand-chiseled jalis, and consult directly with our master Sthapathis.
          </p>
        </div>

        {/* Experience Centres Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            maxWidth: '1060px',
            margin: '0 auto 48px',
          }}
        >
          {/* Card 1: Makrana Master Atelier & Yard */}
          <div
            className="experience-card"
            style={{
              background: '#fff',
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1px solid rgba(176, 138, 79, 0.22)',
              boxShadow: '0 8px 30px rgba(28, 24, 19, 0.06)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img
                src="/gallery/mandir-grand-makrana-8361.webp?v=real"
                alt="AFG Marble Master Artisanal Yard Makrana"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: '#1c1813',
                  color: '#ecd39b',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  letterSpacing: '0.06em',
                }}
              >
                MASTER ATELIER &amp; YARD
              </span>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: '#1c1813', marginBottom: '8px' }}>
                A.F.G Marble &amp; Arts — Makrana Master Atelier
              </h3>
              <p style={{ fontSize: '13px', color: '#6b5f52', lineHeight: 1.5, marginBottom: '14px' }}>
                Makrana Bypass Rd, Borawar, Gunawati Jageer, Rajasthan 341502
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#8c6a36', marginBottom: '18px' }}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Mon – Sun | 9:30 AM – 7:00 PM (Prior Appointment)</span>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => onOpenInquiry?.({ title: 'Schedule Visit: Makrana Master Atelier' })}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span className="btn-primary__text">Schedule Private Atelier Visit</span>
                  <span className="btn-primary__icon">→</span>
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <a
                    href="https://maps.google.com/?q=Makrana+Bypass+Rd+Borawar+Gunawati+Jageer+Rajasthan+341502"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gold"
                    style={{ fontSize: '11px', padding: '9px 12px', textAlign: 'center', justifyContent: 'center' }}
                  >
                    <span>Get Directions</span>
                  </a>
                  <a
                    href="tel:+917597417274"
                    className="btn-outline-gold"
                    style={{ fontSize: '11px', padding: '9px 12px', textAlign: 'center', justifyContent: 'center' }}
                  >
                    <span>Call Concierge</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Makrana Quarry & Calcite Sourcing Hub */}
          <div
            className="experience-card"
            style={{
              background: '#fff',
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1px solid rgba(176, 138, 79, 0.22)',
              boxShadow: '0 8px 30px rgba(28, 24, 19, 0.06)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img
                src="/gallery/stone-makrana-calcite-slab.webp?v=spotless100"
                alt="Makrana Quarry Calcite Selection Centre"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: '#1c1813',
                  color: '#ecd39b',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  letterSpacing: '0.06em',
                }}
              >
                QUARRY &amp; BEDROCK SELECTION
              </span>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: '#1c1813', marginBottom: '8px' }}>
                A.F.G Makrana Virgin Calcite Studio
              </h3>
              <p style={{ fontSize: '13px', color: '#6b5f52', lineHeight: 1.5, marginBottom: '14px' }}>
                Makrana Bypass Rd, Borawar, Gunawati Jageer, Rajasthan 341502
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#8c6a36', marginBottom: '18px' }}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Mon – Sat | 9:00 AM – 6:00 PM (Quarry Inspections)</span>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a
                  href={`https://wa.me/917597417274?text=${encodeURIComponent(
                    'Namaste AFG Marble, I want to book a Makrana quarry bedrock inspection & live video slab selection session.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span className="btn-primary__text">Book Live Video Slab Selection</span>
                  <span className="btn-primary__icon">→</span>
                </a>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <a
                    href="https://wa.me/917597417274?text=Hello%20AFG%20Marble,%20please%20share%20Makrana%20location"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-gold"
                    style={{ fontSize: '11px', padding: '9px 12px', textAlign: 'center', justifyContent: 'center' }}
                  >
                    <span>WhatsApp Location</span>
                  </a>
                  <a
                    href="tel:+917597417274"
                    className="btn-outline-gold"
                    style={{ fontSize: '11px', padding: '9px 12px', textAlign: 'center', justifyContent: 'center' }}
                  >
                    <span>Sourcing Lead</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pan-India & Global Delivery Network (Tilak Style) */}
        <div
          style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '28px 32px',
            border: '1px solid rgba(176, 138, 79, 0.2)',
            maxWidth: '1060px',
            margin: '0 auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#b08a4f" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <h4 style={{ fontFamily: 'var(--serif)', fontSize: '16px', color: '#1c1813', margin: 0 }}>
              Global Delivery &amp; White-Glove On-Site Assembly Presence
            </h4>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8c6a36', display: 'block', marginBottom: '6px' }}>
              Commissions Executed Across India:
            </span>
            <p style={{ fontSize: '13px', color: '#4a4239', lineHeight: 1.6, margin: 0 }}>
              Mumbai · New Delhi &amp; NCR · Bengaluru · Hyderabad · Ahmedabad · Surat · Kolkata · Chennai · Pune · Jaipur · Udaipur · Lucknow · Chandigarh · Indore
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(176, 138, 79, 0.15)', paddingTop: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8c6a36', display: 'block', marginBottom: '6px' }}>
              International ISPM-15 Certified Dispatches:
            </span>
            <p style={{ fontSize: '13px', color: '#4a4239', lineHeight: 1.6, margin: 0 }}>
              United States (New York, California, Texas, New Jersey) · United Kingdom (London, Leicester) · United Arab Emirates (Dubai, Abu Dhabi) · Australia (Sydney, Melbourne) · Singapore · Canada · Tanzania · South Africa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
