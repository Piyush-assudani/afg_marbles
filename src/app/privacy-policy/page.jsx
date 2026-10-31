'use client';
import Link from 'next/link';
import { Shield, Lock, FileCheck, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <>
      <section className="subpage-hero" style={{ padding: 'clamp(115px, 13vw, 155px) 24px clamp(40px, 5vw, 60px)', background: 'radial-gradient(ellipse at center, #ffffff 0%, #f6efe4 100%)', textAlign: 'center' }}>
        <div className="sec-container" style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="breadcrumbs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#8c6a36', marginBottom: '20px', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
            <Link href="/" style={{ color: '#8c6a36', textDecoration: 'none' }}>Home</Link>
            <span style={{ opacity: 0.5 }}>/</span>
            <span style={{ opacity: 0.8 }}>Legal &amp; Privacy Policy</span>
            <span style={{ opacity: 0.5 }}>/</span>
            <span style={{ color: '#1c1813', fontWeight: 700 }}>Customer Privacy &amp; Data Protection</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(184, 134, 63, 0.12)', border: '1px solid rgba(184, 134, 63, 0.3)', borderRadius: '999px', padding: '5px 16px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#7a5a22', marginBottom: '18px' }}>
            <Shield size={13} strokeWidth={2.4} />
            <span>Privacy &amp; Data Security Promise · Est. 1987</span>
          </div>

          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4.4vw, 56px)', color: '#1c1813', margin: '0 0 16px', lineHeight: 1.15, fontWeight: 400 }}>
            Customer Privacy &amp; Data Protection Policy
          </h1>
          <div className="gold-rule center" style={{ margin: '14px auto 20px', width: '70px', height: '2px', background: 'linear-gradient(90deg, transparent, #b8863f, transparent)' }}></div>
          <p className="sub-lead" style={{ maxWidth: '780px', margin: '0 auto', fontSize: '16px', color: '#5e5245', lineHeight: 1.7 }}>
            How we protect your temple drawings, room dimensions, contact details, and custom orders with 100% privacy.
          </p>
        </div>
      </section>

      <section className="subpage-body" style={{ padding: '60px 24px 100px', background: '#faf6ee' }}>
        <div className="sec-container" style={{ maxWidth: '920px', margin: '0 auto' }}>
          
          {/* Sovereign Guarantee Callout */}
          <div
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #fdfbf7 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(184, 134, 63, 0.35)',
              boxShadow: '0 12px 40px rgba(28, 24, 19, 0.06)',
              padding: '28px 32px',
              marginBottom: '36px',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #b8863f, #8c6a36)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 6px 16px rgba(184, 134, 63, 0.35)',
              }}
            >
              <Lock size={22} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 6px', fontFamily: 'var(--serif)', fontSize: '18px', color: '#1c1813', letterSpacing: '-0.01em' }}>
                100% Client Privacy Guarantee
              </h4>
              <p style={{ margin: 0, fontSize: '14px', color: '#685c4f', lineHeight: 1.7 }}>
                A.F.G Marble &amp; Arts guarantees complete privacy for all customers. Your home measurements, mandir photos, and design drawings are <strong>never sold, published, or shared</strong> with anyone without your clear permission.
              </p>
            </div>
          </div>

          {/* Main Legal Covenants */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid rgba(184, 134, 63, 0.22)',
              boxShadow: '0 8px 32px rgba(28, 24, 19, 0.04)',
              padding: 'clamp(32px, 5vw, 56px)',
              lineHeight: 1.85,
              fontSize: '15px',
              color: '#423a31',
            }}
          >
            {/* Clause I */}
            <div style={{ marginBottom: '40px', paddingBottom: '36px', borderBottom: '1px solid rgba(184, 134, 63, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#b8863f', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Article I</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#b8863f' }}></span>
                <span style={{ fontSize: '12px', color: '#8c7b69', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Spatial Data</span>
              </div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#1c1813', margin: '0 0 14px', fontWeight: 500 }}>
                Residence Layout &amp; Room Size Privacy
              </h3>
              <p style={{ margin: 0 }}>
                When you submit room dimensions, photos, or design drawings to our team via WhatsApp or our consultation forms, all information is kept strictly private. We never share, sell, or disclose your personal details or room plans to any third parties.
              </p>
            </div>

            {/* Clause II */}
            <div style={{ marginBottom: '40px', paddingBottom: '36px', borderBottom: '1px solid rgba(184, 134, 63, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#b8863f', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Article II</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#b8863f' }}></span>
                <span style={{ fontSize: '12px', color: '#8c7b69', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Photography Protocol</span>
              </div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#1c1813', margin: '0 0 14px', fontWeight: 500 }}>
                Photographic Privacy Policy
              </h3>
              <p style={{ margin: 0 }}>
                Every custom marble temple and fountain is unique. Photos of trial setups and finished temples are kept strictly private unless explicitly permitted by the client.
              </p>
            </div>

            {/* Clause III */}
            <div style={{ marginBottom: '40px', paddingBottom: '36px', borderBottom: '1px solid rgba(184, 134, 63, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#b8863f', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Article III</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#b8863f' }}></span>
                <span style={{ fontSize: '12px', color: '#8c7b69', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Direct Messaging</span>
              </div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#1c1813', margin: '0 0 14px', fontWeight: 500 }}>
                WhatsApp Privacy &amp; Consultation Security
              </h3>
              <p style={{ margin: 0 }}>
                Direct conversations and consultations via WhatsApp (<a href="tel:+917597417274" style={{ color: '#8c6a36', fontWeight: 600 }}>+91 7597417274</a>) are handled directly by our workshop team. All photos and videos of your temple creation and trial setup are kept completely private.
              </p>
            </div>

            {/* Clause IV */}
            <div style={{ marginBottom: '40px', paddingBottom: '36px', borderBottom: '1px solid rgba(184, 134, 63, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#b8863f', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Article IV</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#b8863f' }}></span>
                <span style={{ fontSize: '12px', color: '#8c7b69', textTransform: 'uppercase', letterSpacing: '0.08em' }}>International Customs</span>
              </div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#1c1813', margin: '0 0 14px', fontWeight: 500 }}>
                Global ISPM-15 Export &amp; Consignee Security
              </h3>
              <p style={{ margin: 0 }}>
                For international shipments across the United States, United Kingdom, UAE, Australia, Canada, and Africa, client consignee records and delivery addresses are utilized strictly for customs clearance documentation, port handling, and ISPM-15 phytosanitary certification. Transit documents are sealed and protected against commercial data harvesting.
              </p>
            </div>

            {/* Clause V */}
            <div style={{ marginBottom: '40px', paddingBottom: '36px', borderBottom: '1px solid rgba(184, 134, 63, 0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#b8863f', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Article V</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#b8863f' }}></span>
                <span style={{ fontSize: '12px', color: '#8c7b69', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Generational Care</span>
              </div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#1c1813', margin: '0 0 14px', fontWeight: 500 }}>
                Digital Inquiries &amp; Local Ledger Persistence
              </h3>
              <p style={{ margin: 0 }}>
                To provide continuous support for marble care, inquiries are logged into our secure database. Clients may at any time request complete deletion of their space measurements or inquiry history.
              </p>
            </div>

            {/* Clause VI - Concierge Desk */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#b8863f', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Article VI</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#b8863f' }}></span>
                <span style={{ fontSize: '12px', color: '#8c7b69', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Concierge Desk</span>
              </div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', color: '#1c1813', margin: '0 0 14px', fontWeight: 500 }}>
                Atelier Concierge &amp; Legal Desk
              </h3>
              <p style={{ marginBottom: '24px' }}>
                For formal privacy inquiries, custom non-disclosure agreements (NDAs) for large estate projects, or design inquiry management, please contact our team:
              </p>

              <div
                style={{
                  background: '#fcfaf6',
                  borderRadius: '12px',
                  border: '1px solid rgba(184, 134, 63, 0.28)',
                  padding: '28px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '24px',
                }}
              >
                <div>
                  <p style={{ margin: '0 0 8px', fontWeight: 700, color: '#1c1813', fontSize: '15px' }}>
                    A.F.G MARBLE &amp; ARTS
                  </p>
                  <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#685c4f' }}>
                    <strong>Master Atelier &amp; Works:</strong> Makrana Bypass Rd, Borawar, Gunawati Jageer, Rajasthan 341502
                  </p>
                </div>
                <div>
                  <p style={{ margin: '0 0 8px', fontWeight: 700, color: '#1c1813', fontSize: '15px' }}>
                    Direct Patrons Desk
                  </p>
                  <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#685c4f' }}>
                    <strong>Direct Concierge:</strong> <a href="tel:+917597417274" style={{ color: '#8c6a36', fontWeight: 600 }}>+91 7597417274</a>
                  </p>
                  <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#685c4f' }}>
                    <strong>Electronic Mail:</strong> <a href="mailto:mh213702@gmail.com" style={{ color: '#8c6a36', fontWeight: 600 }}>mh213702@gmail.com</a>
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#685c4f' }}>
                    <strong>Turnaround:</strong> Formal NDA countersigned within 24 hours.
                  </p>
                </div>
              </div>

              {/* Atelier Seal Sign-Off */}
              <div
                style={{
                  marginTop: '36px',
                  paddingTop: '28px',
                  borderTop: '1px dashed rgba(184, 134, 63, 0.3)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8c6a36', fontWeight: 700 }}>
                    Authenticated Document
                  </p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#1c1813', fontWeight: 600 }}>
                    A.F.G Marble &amp; Arts Management &amp; Customer Care Desk
                  </p>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#27ae60', fontSize: '13px', fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>Verified Data Privacy Standard</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}
