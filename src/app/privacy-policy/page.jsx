'use client';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <>
      <section className="subpage-hero" style={{ padding: '70px 0 50px', background: 'linear-gradient(180deg, #f7f3ec 0%, #fbf9f4 100%)', textAlign: 'center' }}>
        <div className="sec-container">
          <div className="breadcrumbs" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#8c6a36', marginBottom: '16px', letterSpacing: '0.06em' }}>
            <Link href="/" style={{ color: '#8c6a36', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>Legal Governance</span>
            <span>/</span>
            <span style={{ color: '#1c1813', fontWeight: 600 }}>Privacy &amp; Patron Confidentiality</span>
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4vw, 52px)', color: '#1c1813', margin: '0 0 12px' }}>
            Patron Confidentiality &amp; Privacy Charter
          </h1>
          <div className="gold-rule center" style={{ margin: '14px auto 20px' }}></div>
          <p className="sub-lead" style={{ maxWidth: '740px', margin: '0 auto', fontSize: '15px', color: '#6b5f52', lineHeight: 1.65 }}>
            Official security and confidentiality governance protecting the sacred blueprints, private residence layouts, and bespoke architectural commissions of A.F.G Marble &amp; Arts patrons globally.
          </p>
        </div>
      </section>

      <section className="subpage-body" style={{ padding: '70px 0 100px', background: '#fbf9f4' }}>
        <div className="sec-container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div
            className="legal-article"
            style={{
              background: '#ffffff',
              padding: '48px 44px',
              borderRadius: '12px',
              border: '1px solid rgba(176, 138, 79, 0.2)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
              lineHeight: 1.8,
              fontSize: '14.5px',
              color: '#4a4239',
            }}
          >
            <div style={{ padding: '16px 20px', background: '#faf6ee', borderRadius: '8px', borderLeft: '4px solid #b8863f', marginBottom: '36px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#7a6032', fontWeight: 500 }}>
                <strong>Strict Atelier Mandate:</strong> A.F.G Marble &amp; Arts strictly upholds sovereign privacy for high-net-worth patrons, royal families, and temple trusts. Client estate locations and sanctum photos are never commercialized, published, or shared without express written authorization.
              </p>
            </div>

            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: '#1c1813', margin: '0 0 12px' }}>
              1. Residence Layout &amp; Space Dimensions Confidentiality
            </h3>
            <p>
              When you submit ceiling heights, room dimensions, CAD drawings, or residence photographs to our Master Sthapati desk via WhatsApp or our digital inquiry register, all materials are treated under absolute commercial non-disclosure. We do not distribute, sell, or permit third-party advertising access to residential property plans.
            </p>

            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: '#1c1813', margin: '32px 0 12px' }}>
              2. Photographic Embargo &amp; Non-Publication Policy
            </h3>
            <p>
              Every bespoke marble mandir, private courtyard fountain, and sacred garbhagriha is unique. Photographs captured during on-site trial assembly in our Jaipur yard or post-installation in private estates are strictly archived under patron pseudonymity. No media crew or social marketing agency is granted access to residential sanctums without sealed client consent.
            </p>

            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: '#1c1813', margin: '32px 0 12px' }}>
              3. WhatsApp Media &amp; Space Consultation Governance
            </h3>
            <p>
              Direct architectural consultations via WhatsApp (+91 7597417274) are routed through our authenticated atelier management team in Jaipur and Makrana. Videos of quarry block selection, chiseling milestones, and trial fitments sent to clients are protected under bilateral privacy agreements.
            </p>

            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: '#1c1813', margin: '32px 0 12px' }}>
              4. Global ISPM-15 Export &amp; Customs Security
            </h3>
            <p>
              For international shipments across North America, the United Kingdom, the European Union, Australia, and the Middle East, client consignee records and delivery addresses are utilized strictly for customs clearance documentation, port handling, and ISPM-15 phytosanitary certification. Transit documents are sealed and protected against commercial data harvesting.
            </p>

            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: '#1c1813', margin: '32px 0 12px' }}>
              5. Digital Inquiries &amp; Local Ledger Persistence
            </h3>
            <p>
              To provide continuous architectural support across generations of marble care, inquiry registers and calcite certificate IDs are logged into our secure atelier database. Patrons may at any time request complete deletion of their space measurements or dossier history.
            </p>

            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: '#1c1813', margin: '32px 0 12px' }}>
              6. Atelier Concierge &amp; Legal Desk
            </h3>
            <p style={{ marginBottom: '24px' }}>
              For formal privacy inquiries, custom non-disclosure agreements (NDAs) for palatial estate projects, or architectural dossier management, please contact:
            </p>

            <div style={{ padding: '20px 24px', background: '#fcfaf6', borderRadius: '8px', border: '1px solid rgba(176, 138, 79, 0.18)' }}>
              <p style={{ margin: '0 0 6px', fontWeight: 600, color: '#1c1813' }}>A.F.G MARBLE &amp; ARTS — Legal &amp; Patron Desk</p>
              <p style={{ margin: '0 0 4px', fontSize: '13px' }}><strong>Jaipur Atelier:</strong> Near Marble Market, Vishwakarma Industrial Area, Jaipur, Rajasthan 302013</p>
              <p style={{ margin: '0 0 4px', fontSize: '13px' }}><strong>Makrana Works:</strong> Gunawati Road, Makrana Calcite Belt, Nagaur, Rajasthan 341505</p>
              <p style={{ margin: '0 0 4px', fontSize: '13px' }}><strong>Direct Concierge:</strong> +91 7597417274 &nbsp;|&nbsp; +91 9414434220</p>
              <p style={{ margin: 0, fontSize: '13px' }}><strong>Electronic Mail:</strong> <a href="mailto:info@afgmarbel.com" style={{ color: '#8c6a36' }}>info@afgmarbel.com</a></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
